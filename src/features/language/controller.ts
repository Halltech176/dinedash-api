import express, { Request, Response } from 'express';
import {
  canCreateLanguage,
  canDeleteLanguage,
  canFetchLanguage,
  canUpdateLanguage,
} from './guard';
import LanguageService from './service';
import response, {
  throwIfError,
  throwPermIfError,
} from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { UpdateLanguageDto } from './dto';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canCreateLanguage(req, true));
  const content = throwIfError(
    await LanguageService.create(req.body, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.get('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchLanguage(req, false));
  const content = throwIfError(
    await LanguageService.fetch(req.query, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.get('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchLanguage(req, false));
  const content = throwIfError(
    await LanguageService.fetchOne(req.query, {
      _id: req.params.id,
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.put('/:id', async (req: Request, res: Response) => {
  const body = validateDTO(UpdateLanguageDto, req.body);

  const perm = throwPermIfError(await canUpdateLanguage(req, false));
  const content = throwIfError(
    await LanguageService.updateOne(
      { _id: req.params.id, ...perm.query },
      body,
    ),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canDeleteLanguage(req, false));
  const content = throwIfError(
    await LanguageService.deleteOne(req.params.id, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

export default router;
