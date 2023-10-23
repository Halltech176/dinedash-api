import { Router, Request, Response } from 'express';
import generator from './generator';

import auth from '../features/auth/controller';
import audioQuizSubmission from '../features/audioQuizSubmission/controller';

import audioQuiz from '../features/audioQuiz/controller';

import quessTheWordSubmission from '../features/guessTheWordSubmission/controller';

import quessTheWord from '../features/guessTheWord/controller';

import dailyQuizSubmission from '../features/dailyQuizSubmission/controller';

import mathQuizSubmission from '../features/mathQuizSubmission/controller';

import mathQuiz from '../features/mathQuiz/controller';

import dailyQuiz from '../features/dailyQuiz/controller';

import contestQuestions from '../features/contestQuestions/controller';

import contestSubmissions from '../features/contestSubmissions/controller';

import contest from '../features/contest/controller';

import quizSettings from '../features/quizSettings/controller';

import funAndLearnSubmission from '../features/funAndLearnSubmission/controller';

import QuizZoneSubmission from '../features/QuizZoneSubmission/controller';

import funAndLearn from '../features/funAndLearn/controller';

import language from '../features/language/controller';

import funAndLearnQuestion from '../features/funAndLearnQuestion/controller';

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
router.use('/funAndLearnQuestion', funAndLearnQuestion);
router.use('/language', language);
router.use('/funAndLearn', funAndLearn);
router.use('/QuizZoneSubmission', QuizZoneSubmission);
router.use('/funAndLearnSubmission', funAndLearnSubmission);
router.use('/quizSetting', quizSettings);
router.use('/contest', contest);
router.use('/contestSubmission', contestSubmissions);
router.use('/contestQuestions', contestQuestions);
router.use('/dailyQuiz', dailyQuiz);
router.use('/mathQuiz', mathQuiz);
router.use('/mathQuizSubmission', mathQuizSubmission);
router.use('/dailyQuizSubmission', dailyQuizSubmission);
router.use('/guessTheWord', quessTheWord);
router.use('/guessTheWordSubmission', quessTheWordSubmission);
router.use('/audioQuiz', audioQuiz);
router.use('/audioQuizSubmission', audioQuizSubmission);
router.use('/', generator);

export default router;
