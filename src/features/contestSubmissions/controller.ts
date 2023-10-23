import express, { Request, Response } from 'express';
import { canCreateContestSubmissions, canDeleteContestSubmissions, canFetchContestSubmissions, canUpdateContestSubmissions } from './guard';
import ContestSubmissionsService from './service';
import response, {
  throwIfError,
  throwPermIfError,
} from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { UpdateContestSubmissionsDto } from './dto';


const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canCreateContestSubmissions(req, true));
  const content = throwIfError(
    await ContestSubmissionsService.create(req.body, { 
      ...perm.query
     }),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.get('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchContestSubmissions(req, false));
  const content = throwIfError(
    await ContestSubmissionsService.fetch(req.query, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.get('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchContestSubmissions(req, false));
  const content = throwIfError(
    await ContestSubmissionsService.fetchOne(req.query, {
      _id: req.params.id,
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.put('/:id', async (req: Request, res: Response) => {
  const body = validateDTO(UpdateContestSubmissionsDto, req.body);

  const perm = throwPermIfError(await canUpdateContestSubmissions(req, false));
  const content = throwIfError(
    await ContestSubmissionsService.updateOne({ _id: req.params.id, ...perm.query }, body),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.delete('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canDeleteContestSubmissions(req, false));
  const content = throwIfError(
    await ContestSubmissionsService.deleteOne(req.params.id, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

export default router;
