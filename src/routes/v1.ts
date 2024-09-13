import { Router, Request, Response } from 'express';
import generator from './generator';

import auth from '../features/auth/controller';
import review from '../features/review/controller';

import reservation from '../features/reservation/controller';

import transaction from '../features/transaction/controller';

import cart from '../features/cart/controller';

import order from '../features/order/controller';

import notification from '../features/notification/controller';

import menu from '../features/menu/controller';

import category from '../features/category/controller';


import file from '../features/file/controller';

import user from '../features/user/controller';
import mongoose from 'mongoose';

const router = Router();

router.use('/auth', auth);
router.use('/user', user);

router.use('/file', file);

router.use('/category', category);
router.use('/menu', menu);
router.use('/notification', notification);
router.use('/order', order);
router.use('/cart', cart);
router.use('/transaction', transaction);
router.use('/reservation', reservation);
// router.use('/review', review);
router.use('/', generator);

export default router;
