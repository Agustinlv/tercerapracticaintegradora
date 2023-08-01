//Module imports
import mongoose from 'mongoose';
//File imports
import productModel from '../models/product.model.js';
import cartModel from '../models/cart.model.js';

export class ViewMongo{

    constructor(){
        this.productModel = productModel,
        this.cartModel = cartModel
    };

    async renderProducts(limit = 10, page = 1, category, available, sort, user = {}, adminPage = false){
        
        const uid = String(user._id);
        
        let query = {};

        if (category) {

            query = {category: category};

        };

        if (available) {

            query = {...query, stock: { $gt: 0}};

        };

        if (user.role === 'premium') {


            if (adminPage) {

                query = {owner: uid};

            } else {

                query = {owner: { $ne: uid }};

            };

        };

        console.log(query);

        const {docs, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages} = await this.productModel.paginate(
            query,
            {
                limit: limit,
                sort:{ price: sort },
                page: page,
                lean: true
            }
        );

        const payload = docs;

        const prevLink = hasPrevPage === false ? null : `/products?page=${prevPage}`;

        const nextLink = hasNextPage === false ? null : `/products?page=${nextPage}`;

        return {
            payload: payload,
            totalPages: totalPages,
            prevPage: prevPage,
            nextPage: nextPage,
            page: page,
            hasNextPage: hasNextPage,
            hasPrevPage: hasPrevPage,
            prevLink: prevLink,
            nextLink: nextLink
        };

    };

    async renderCart(cid){

        try {

            return await this.cartModel.findById(cid).populate({path:'products.product'}).lean();

        } catch (error) {

            return{
                code:400,
                status: "Error",
                message: error.message
            };

        };

    };

};