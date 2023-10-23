import express, { Request, Response } from 'express';
import { canCreateMathQuiz, canDeleteMathQuiz, canFetchMathQuiz, canUpdateMathQuiz } from './guard';
import MathQuizService from './service';
import response, {
  throwIfError,
  throwPermIfError,
} from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { UpdateMathQuizDto } from './dto';


const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canCreateMathQuiz(req, true));
  const content = throwIfError(
    await MathQuizService.create(req.body, { 
      ...perm.query
     }),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.get('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchMathQuiz(req, false));
  const content = throwIfError(
    await MathQuizService.fetch(req.query, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.get('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchMathQuiz(req, false));
  const content = throwIfError(
    await MathQuizService.fetchOne(req.query, {
      _id: req.params.id,
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.put('/:id', async (req: Request, res: Response) => {
  const body = validateDTO(UpdateMathQuizDto, req.body);

  const perm = throwPermIfError(await canUpdateMathQuiz(req, false));
  const content = throwIfError(
    await MathQuizService.updateOne({ _id: req.params.id, ...perm.query }, body),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.delete('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canDeleteMathQuiz(req, false));
  const content = throwIfError(
    await MathQuizService.deleteOne(req.params.id, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

export default router;
