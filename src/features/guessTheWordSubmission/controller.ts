import express, { Request, Response } from 'express';
import { canCreateQuessTheWordSubmission, canDeleteQuessTheWordSubmission, canFetchQuessTheWordSubmission, canUpdateQuessTheWordSubmission } from './guard';
import QuessTheWordSubmissionService from './service';
import response, {
  throwIfError,
  throwPermIfError,
} from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { UpdateQuessTheWordSubmissionDto } from './dto';


const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canCreateQuessTheWordSubmission(req, true));
  const content = throwIfError(
    await QuessTheWordSubmissionService.create(req.body, { 
      ...perm.query
     }),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.get('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchQuessTheWordSubmission(req, false));
  const content = throwIfError(
    await QuessTheWordSubmissionService.fetch(req.query, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.get('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchQuessTheWordSubmission(req, false));
  const content = throwIfError(
    await QuessTheWordSubmissionService.fetchOne(req.query, {
      _id: req.params.id,
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.put('/:id', async (req: Request, res: Response) => {
  const body = validateDTO(UpdateQuessTheWordSubmissionDto, req.body);

  const perm = throwPermIfError(await canUpdateQuessTheWordSubmission(req, false));
  const content = throwIfError(
    await QuessTheWordSubmissionService.updateOne({ _id: req.params.id, ...perm.query }, body),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.delete('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canDeleteQuessTheWordSubmission(req, false));
  const content = throwIfError(
    await QuessTheWordSubmissionService.deleteOne(req.params.id, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

export default router;
