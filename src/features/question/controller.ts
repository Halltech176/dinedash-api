import express, { Request, Response } from 'express';
import {
  canCreateQuestion,
  canDeleteQuestion,
  canFetchQuestion,
  canUpdateQuestion,
} from './guard';
import QuestionService from './service';
import response, {
  throwIfError,
  throwPermIfError,
} from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { UpdateQuestionDto } from './dto';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canCreateQuestion(req, true));
  const content = throwIfError(
    await QuestionService.create(req.body, {
      ...perm.query,
    }),
  );

  console.log({ content, body: req.body });
  return response(res, content.statusCode, content.message, content.data);
});

router.get('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchQuestion(req, false));
  const content = throwIfError(
    await QuestionService.fetch(req.query, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.get('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchQuestion(req, false));
  const content = throwIfError(
    await QuestionService.fetchOne(req.query, {
      _id: req.params.id,
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.put('/:id', async (req: Request, res: Response) => {
  const body = validateDTO(UpdateQuestionDto, req.body);

  const perm = throwPermIfError(await canUpdateQuestion(req, false));
  const content = throwIfError(
    await QuestionService.updateOne(
      { _id: req.params.id, ...perm.query },
      body,
    ),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canDeleteQuestion(req, false));
  const content = throwIfError(
    await QuestionService.deleteOne(req.params.id, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

export default router;
