import express, { Request, Response } from 'express';
import { canCreateDailyQuizSubmission, canDeleteDailyQuizSubmission, canFetchDailyQuizSubmission, canUpdateDailyQuizSubmission } from './guard';
import DailyQuizSubmissionService from './service';
import response, {
  throwIfError,
  throwPermIfError,
} from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { UpdateDailyQuizSubmissionDto } from './dto';


const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canCreateDailyQuizSubmission(req, true));
  const content = throwIfError(
    await DailyQuizSubmissionService.create(req.body, { 
      ...perm.query
     }),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.get('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchDailyQuizSubmission(req, false));
  const content = throwIfError(
    await DailyQuizSubmissionService.fetch(req.query, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.get('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchDailyQuizSubmission(req, false));
  const content = throwIfError(
    await DailyQuizSubmissionService.fetchOne(req.query, {
      _id: req.params.id,
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.put('/:id', async (req: Request, res: Response) => {
  const body = validateDTO(UpdateDailyQuizSubmissionDto, req.body);

  const perm = throwPermIfError(await canUpdateDailyQuizSubmission(req, false));
  const content = throwIfError(
    await DailyQuizSubmissionService.updateOne({ _id: req.params.id, ...perm.query }, body),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.delete('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canDeleteDailyQuizSubmission(req, false));
  const content = throwIfError(
    await DailyQuizSubmissionService.deleteOne(req.params.id, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

export default router;
