import express, { Request, Response } from 'express';
import {
  canCreateCategory,
  canDeleteCategory,
  canFetchCategory,
  canUpdateCategory,
} from './guard';
import CategoryService from './service';
import response, {
  throwIfError,
  throwPermIfError,
} from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { UpdateCategoryDto } from './dto';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canCreateCategory(req, true));
  const content = throwIfError(
    await CategoryService.create(req.body, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.get('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchCategory(req, false));
  const content = throwIfError(
    await CategoryService.fetch(req.query, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.get('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchCategory(req, false));
  const content = throwIfError(
    await CategoryService.fetchOne(req.query, {
      _id: req.params.id,
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.put('/:id', async (req: Request, res: Response) => {
  const body = validateDTO(UpdateCategoryDto, req.body);

  const perm = throwPermIfError(await canUpdateCategory(req, false));
  const content = throwIfError(
    await CategoryService.updateOne(
      { _id: req.params.id, ...perm.query },
      body,
    ),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canDeleteCategory(req, false));
  const content = throwIfError(
    await CategoryService.deleteOne(req.params.id, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

export default router;
