//Module imports
import { Router } from 'express';
import passport from "passport";

const router = Router();

//File imports
import { getProducts, getProductByID, addProduct, updateProduct, deleteProduct } from '../dao/controllers/product.controller.js';
import { validateProduct } from '../middlewares/validations.js';
import { adminAccess } from '../middlewares/access.js';

router.get('/', passport.authenticate('jwt', {session: false, failureRedirect: '/login'}), getProducts);

router.get('/:pid', passport.authenticate('jwt', {session: false, failureRedirect: '/login'}), validateProduct, getProductByID);

router.post('/', passport.authenticate('jwt', {session: false, failureRedirect: '/login'}), adminAccess, addProduct);

router.put('/:pid', passport.authenticate('jwt', {session: false, failureRedirect: '/login'}), adminAccess, validateProduct, updateProduct);

router.delete('/:pid', passport.authenticate('jwt', {session: false, failureRedirect: '/login'}), adminAccess, validateProduct, deleteProduct);

export default router;