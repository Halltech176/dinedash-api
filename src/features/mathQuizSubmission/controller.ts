import express, { Request, Response } from 'express';
import { canCreateMathQuizSubmission, canDeleteMathQuizSubmission, canFetchMathQuizSubmission, canUpdateMathQuizSubmission } from './guard';
import MathQuizSubmissionService from './service';
import response, {
  throwIfError,
  throwPermIfError,
} from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { UpdateMathQuizSubmissionDto } from './dto';


const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canCreateMathQuizSubmission(req, true));
  const content = throwIfError(
    await MathQuizSubmissionService.create(req.body, { 
      ...perm.query
     }),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.get('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchMathQuizSubmission(req, false));
  const content = throwIfError(
    await MathQuizSubmissionService.fetch(req.query, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.get('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchMathQuizSubmission(req, false));
  const content = throwIfError(
    await MathQuizSubmissionService.fetchOne(req.query, {
      _id: req.params.id,
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.put('/:id', async (req: Request, res: Response) => {
  const body = validateDTO(UpdateMathQuizSubmissionDto, req.body);

  const perm = throwPermIfError(await canUpdateMathQuizSubmission(req, false));
  const content = throwIfError(
    await MathQuizSubmissionService.updateOne({ _id: req.params.id, ...perm.query }, body),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.delete('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canDeleteMathQuizSubmission(req, false));
  const content = throwIfError(
    await MathQuizSubmissionService.deleteOne(req.params.id, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

export default router;
