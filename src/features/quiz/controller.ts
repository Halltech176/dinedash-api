import express, { Request, Response } from 'express';
import {
  canCreateQuiz,
  canDeleteQuiz,
  canFetchQuiz,
  canUpdateQuiz,
} from './guard';
import QuizService from './service';
import response, {
  throwIfError,
  throwPermIfError,
} from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { UpdateQuizDto } from './dto';
import { canFetchQuestion } from '../question/guard';
import QuestionService from '../question/service';
import UserService from '../user/service';
import { ProfileModel } from '../../models';
import { Types } from 'mongoose';
import { savePoints } from '../../utilities/submit';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canCreateQuiz(req, true));

  const content = throwIfError(
    await QuizService.create(req.body, {
      ...perm.query,
    }),
  );

  const points = content.data.questions.reduce((acc, curr) => {
    return acc + curr.points;
  }, 0);

  await savePoints(req.user._id, points);

  return response(res, content.statusCode, content.message, content.data);
});

router.get('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchQuiz(req, false));
  const content = throwIfError(
    await QuizService.fetch(req.query, {
      ...perm.query,
    }),
  );

  return response(res, content.statusCode, content.message, content.data);
});

router.get('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchQuiz(req, false));
  const content = throwIfError(
    await QuizService.fetchOne(req.query, {
      _id: req.params.id,
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.put('/:id', async (req: Request, res: Response) => {
  const body = validateDTO(UpdateQuizDto, req.body);

  const perm = throwPermIfError(await canUpdateQuiz(req, false));
  const content = throwIfError(
    await QuizService.updateOne({ _id: req.params.id, ...perm.query }, body),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canDeleteQuiz(req, false));
  const content = throwIfError(
    await QuizService.deleteOne(req.params.id, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

export default router;
