import express, { Request, Response } from 'express';
import {
  canCreateFunAndLearnQuestion,
  canDeleteFunAndLearnQuestion,
  canFetchFunAndLearnQuestion,
  canUpdateFunAndLearnQuestion,
} from './guard';
import FunAndLearnQuestionService from './service';
import response, {
  throwIfError,
  throwPermIfError,
} from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { UpdateFunAndLearnQuestionDto } from './dto';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canCreateFunAndLearnQuestion(req, true));
  const content = throwIfError(
    await FunAndLearnQuestionService.create(req.body, {
      ...perm.query,
    }),
  );

  return response(res, content.statusCode, content.message, content.data);
});

router.get('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchFunAndLearnQuestion(req, false));
  const content = throwIfError(
    await FunAndLearnQuestionService.fetch(req.query, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.get('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchFunAndLearnQuestion(req, false));
  const content = throwIfError(
    await FunAndLearnQuestionService.fetchOne(req.query, {
      _id: req.params.id,
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.put('/:id', async (req: Request, res: Response) => {
  const body = validateDTO(UpdateFunAndLearnQuestionDto, req.body);

  const perm = throwPermIfError(await canUpdateFunAndLearnQuestion(req, false));
  const content = throwIfError(
    await FunAndLearnQuestionService.updateOne(
      { _id: req.params.id, ...perm.query },
      body,
    ),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canDeleteFunAndLearnQuestion(req, false));
  const content = throwIfError(
    await FunAndLearnQuestionService.deleteOne(req.params.id, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

export default router;
