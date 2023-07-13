//Module imports
import { Router } from 'express';
import passport from "passport";

const router = Router();

//File imports
import { addToCart, createCart, deleteFromCart, emptyCart, getCart, replaceCart, updateProductQty, purchaseCart } from '../dao/controllers/cart.controller.js';
import { validateCart, validateProduct, validateQuantity, validateCartContent } from '../middlewares/validations.js';
import { userAccess } from '../middlewares/access.js';

router.post('/:uid', passport.authenticate('jwt', {session: false, failureRedirect: '/login'}), userAccess, createCart);

router.post('/:cid/product/:pid', passport.authenticate('jwt', {session: false, failureRedirect: '/login'}), userAccess, validateCart, validateProduct, addToCart);

router.delete('/:cid/product/:pid', passport.authenticate('jwt', {session: false, failureRedirect: '/login'}), userAccess, validateCart, validateProduct, validateCartContent, deleteFromCart);

router.delete('/:cid', passport.authenticate('jwt', {session: false, failureRedirect: '/login'}), userAccess, validateCart, emptyCart);

router.get('/:cid', passport.authenticate('jwt', {session: false, failureRedirect: '/login'}), userAccess, validateCart, getCart);

router.post('/:cid/purchase', passport.authenticate('jwt', {session: false, failureRedirect: '/login'}), userAccess, purchaseCart);

router.put('/:cid', passport.authenticate('jwt', {session: false, failureRedirect: '/login'}), userAccess, validateCart, replaceCart);

router.put('/:cid/product/:pid', passport.authenticate('jwt', {session: false, failureRedirect: '/login'}), userAccess, validateCart, validateProduct, validateQuantity, updateProductQty);

export default router;