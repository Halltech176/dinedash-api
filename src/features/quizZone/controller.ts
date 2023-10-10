import express, { Request, Response } from 'express';
import {
  canCreateQuizZone,
  canDeleteQuizZone,
  canFetchQuizZone,
  canUpdateQuizZone,
} from './guard';
import QuizZoneService from './service';
import response, {
  throwIfError,
  throwPermIfError,
} from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { UpdateQuizZoneDto } from './dto';
import CategoryService from '../category/service';
import { Category } from '../category/schema';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canCreateQuizZone(req, true));

  // const category =

  const content = throwIfError(
    await QuizZoneService.create(req.body, {
      ...perm.query,
    }),
  );

  console.log({ content, body: req.body });

  const { category, description, image, subCategory } = req.body;

  return response(res, content.statusCode, content.message, content.data);
});

router.get('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchQuizZone(req, false));
  const content = throwIfError(
    await QuizZoneService.fetch(req.query, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.get('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchQuizZone(req, false));
  const content = throwIfError(
    await QuizZoneService.fetchOne(req.query, {
      _id: req.params.id,
      ...perm.query,
    }),
  );

  return response(res, content.statusCode, content.message, content.data);
});

router.put('/:id', async (req: Request, res: Response) => {
  const body = validateDTO(UpdateQuizZoneDto, req.body);

  const perm = throwPermIfError(await canUpdateQuizZone(req, false));
  const content = throwIfError(
    await QuizZoneService.updateOne(
      { _id: req.params.id, ...perm.query },
      body,
    ),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canDeleteQuizZone(req, false));
  const content = throwIfError(
    await QuizZoneService.deleteOne(req.params.id, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

export default router;
