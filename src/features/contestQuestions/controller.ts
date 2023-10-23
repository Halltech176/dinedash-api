import express, { Request, Response } from 'express';
import { canCreateContestQuestions, canDeleteContestQuestions, canFetchContestQuestions, canUpdateContestQuestions } from './guard';
import ContestQuestionsService from './service';
import response, {
  throwIfError,
  throwPermIfError,
} from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { UpdateContestQuestionsDto } from './dto';


const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canCreateContestQuestions(req, true));
  const content = throwIfError(
    await ContestQuestionsService.create(req.body, { 
      ...perm.query
     }),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.get('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchContestQuestions(req, false));
  const content = throwIfError(
    await ContestQuestionsService.fetch(req.query, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.get('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchContestQuestions(req, false));
  const content = throwIfError(
    await ContestQuestionsService.fetchOne(req.query, {
      _id: req.params.id,
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.put('/:id', async (req: Request, res: Response) => {
  const body = validateDTO(UpdateContestQuestionsDto, req.body);

  const perm = throwPermIfError(await canUpdateContestQuestions(req, false));
  const content = throwIfError(
    await ContestQuestionsService.updateOne({ _id: req.params.id, ...perm.query }, body),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.delete('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canDeleteContestQuestions(req, false));
  const content = throwIfError(
    await ContestQuestionsService.deleteOne(req.params.id, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

export default router;
