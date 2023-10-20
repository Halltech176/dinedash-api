import express, { Request, Response } from 'express';
import { canCreateDailyQuiz, canDeleteDailyQuiz, canFetchDailyQuiz, canUpdateDailyQuiz } from './guard';
import DailyQuizService from './service';
import response, {
  throwIfError,
  throwPermIfError,
} from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { UpdateDailyQuizDto } from './dto';


const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canCreateDailyQuiz(req, true));
  const content = throwIfError(
    await DailyQuizService.create(req.body, { 
      ...perm.query
     }),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.get('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchDailyQuiz(req, false));
  const content = throwIfError(
    await DailyQuizService.fetch(req.query, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.get('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchDailyQuiz(req, false));
  const content = throwIfError(
    await DailyQuizService.fetchOne(req.query, {
      _id: req.params.id,
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.put('/:id', async (req: Request, res: Response) => {
  const body = validateDTO(UpdateDailyQuizDto, req.body);

  const perm = throwPermIfError(await canUpdateDailyQuiz(req, false));
  const content = throwIfError(
    await DailyQuizService.updateOne({ _id: req.params.id, ...perm.query }, body),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.delete('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canDeleteDailyQuiz(req, false));
  const content = throwIfError(
    await DailyQuizService.deleteOne(req.params.id, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

export default router;
