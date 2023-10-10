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

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canCreateQuiz(req, true));

  const question = throwIfError(
    await QuestionService.fetchOne(req.query, {
      _id: req.body.questionId,
    }),
  );

  let points = 0;

  if (+question.data.correctOptionIndex === +req.body.option) {
    req.body.correct = true;
    points = question.data.points;
  } else {
    req.body.correct = false;
  }
  const content = throwIfError(
    await QuizService.create(req.body, {
      ...perm.query,
    }),
  );

  const data = throwIfError(
    await UserService.updatePoints(
      { ...perm.query, _id: req.user.id },
      {
        points,
      },
    ),
  );

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
