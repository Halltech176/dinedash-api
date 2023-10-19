import { Router, Request, Response } from 'express';
import generator from './generator';

import auth from '../features/auth/controller';
import funAndLearnSubmission from '../features/funAndLearnSubmission/controller';

import QuizZoneSubmission from '../features/QuizZoneSubmission/controller';

import funAndLearn from '../features/funAndLearn/controller';

import language from '../features/language/controller';

import quiz from '../features/quiz/controller';

import question from '../features/question/controller';

import category from '../features/category/controller';

import quizZone from '../features/quizZone/controller';

import file from '../features/file/controller';

import user from '../features/user/controller';
import mongoose from 'mongoose';

const router = Router();

router.use('/auth', auth);
router.use('/user', user);

router.use('/file', file);
router.use('/quizZone', quizZone);
router.use('/category', category);
router.use('/question', question);
router.use('/quiz', quiz);
router.use('/language', language);
router.use('/funAndLearn', funAndLearn);
router.use('/QuizZoneSubmission', QuizZoneSubmission);
router.use('/funAndLearnSubmission', funAndLearnSubmission);
router.use('/', generator);

export default router;
