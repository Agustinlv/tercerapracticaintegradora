import userModel from "../models/user.models.js";
import { cartDao } from '../handler.js';
import { createHash } from '../../utils.js';
import { generateToken } from "../../config/token.js";
import { UserDto } from "../../dto/user.dto.js";

export class UserMongo{

    constructor(){
        this.model = userModel
    };

    async register(body){

        const { first_name, last_name, email, age, role, password } = body;
    
        const inUse = await this.model.findOne({email: email});
    
        if (inUse){

            return {
                code: 400,
                status: "Error",
                message: 'The email is already in use'
            };

        };
    
        const user = { first_name, last_name, email, age, role, password: createHash(password) };
    
        try {
    
            await this.model.create(user);
    
            return {
                code: 202,
                status: 'Success',
                message: 'User registered correctly'
            };
    
        } catch (error) {
    
            return{
                code: 400,
                status: "Error",
                message: error.message
            };

        };
    
    };
    
    async login (email){
    
        const user = await this.model.findOne({email: email});

        //Si es la primera vez que se loguea este usuario, creamos un cart y seteamos el user.cart    
        const response = await cartDao.createCart(user._id);
        
        user.cart = response.message._id;

        const userDto = new UserDto(user);

        const access_token = generateToken(user);
    
        return{
            status: "Success",
            message: "You have succesfully logged in",
            user: userDto,
            token: access_token,
        };
    
    };

};