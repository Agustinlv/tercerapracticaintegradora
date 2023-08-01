//Module imports
import { Router } from "express";
import passport from "passport";

const router = Router();

//File imports
import { renderProducts, renderCart, renderProfile, renderRegister, renderLogin, redirectProducts, renderAddProduct, renderChat, renderAdmin } from '../dao/controllers/view.controller.js';
import { publicAccess } from "../middlewares/access.js";
import { validateRole } from "../middlewares/validations.js";

router.get('/', passport.authenticate('jwt', {session: false, failureRedirect: '/login'}), redirectProducts);

router.get('/login', publicAccess, renderLogin);

router.get('/register', publicAccess, renderRegister);

router.get('/profile', passport.authenticate('jwt', {session: false, failureRedirect: '/login'}), renderProfile);

router.get('/carts/:cid', passport.authenticate('jwt', {session: false, failureRedirect: '/login'}), validateRole(['user', 'premium']), renderCart);

router.get('/products', passport.authenticate('jwt', {session: false, failureRedirect: '/login'}), renderProducts);

router.get('/add', passport.authenticate('jwt', {session: false, failureRedirect: '/login'}), validateRole(['admin', 'premium']), renderAddProduct);

router.get('/admin', passport.authenticate('jwt', {session: false, failureRedirect: '/login'}), validateRole(['admin','premium']), renderAdmin);

router.get('/chat', passport.authenticate('jwt', {session: false, failureRedirect: '/login'}), validateRole(['user']), renderChat);

router.get('/forgot');

router.get('/reset');

export default router;