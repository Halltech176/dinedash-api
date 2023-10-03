import { Router, Request, Response } from 'express';
import generator from './generator';

import auth from '../features/auth/controller';
import quizZone from '../features/quizZone/controller';

import file from '../features/file/controller';

import user from '../features/user/controller';

const router = Router();

router.use('/auth', auth);
router.use('/user', user);

router.use('/file', file);
router.use('/quizZone', quizZone);
router.use('/', generator);

export default router;
