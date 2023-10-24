import express, { Request, Response } from 'express';
import { canCreateQuizSettings, canDeleteQuizSettings, canFetchQuizSettings, canUpdateQuizSettings } from './guard';
import QuizSettingsService from './service';
import response, {
  throwIfError,
  throwPermIfError,
} from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { UpdateQuizSettingsDto } from './dto';


const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canCreateQuizSettings(req, true));
  const content = throwIfError(
    await QuizSettingsService.create(req.body, { 
      ...perm.query
     }),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.get('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchQuizSettings(req, false));
  const content = throwIfError(
    await QuizSettingsService.fetch(req.query, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.get('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchQuizSettings(req, false));
  const content = throwIfError(
    await QuizSettingsService.fetchOne(req.query, {
      _id: req.params.id,
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.put('/:id', async (req: Request, res: Response) => {
  const body = validateDTO(UpdateQuizSettingsDto, req.body);

  const perm = throwPermIfError(await canUpdateQuizSettings(req, false));
  const content = throwIfError(
    await QuizSettingsService.updateOne({ _id: req.params.id, ...perm.query }, body),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.delete('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canDeleteQuizSettings(req, false));
  const content = throwIfError(
    await QuizSettingsService.deleteOne(req.params.id, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

export default router;
