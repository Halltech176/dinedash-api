import express, { Request, Response } from 'express';
import { canCreateAudioQuizSubmission, canDeleteAudioQuizSubmission, canFetchAudioQuizSubmission, canUpdateAudioQuizSubmission } from './guard';
import AudioQuizSubmissionService from './service';
import response, {
  throwIfError,
  throwPermIfError,
} from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { UpdateAudioQuizSubmissionDto } from './dto';


const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canCreateAudioQuizSubmission(req, true));
  const content = throwIfError(
    await AudioQuizSubmissionService.create(req.body, { 
      ...perm.query
     }),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.get('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchAudioQuizSubmission(req, false));
  const content = throwIfError(
    await AudioQuizSubmissionService.fetch(req.query, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.get('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchAudioQuizSubmission(req, false));
  const content = throwIfError(
    await AudioQuizSubmissionService.fetchOne(req.query, {
      _id: req.params.id,
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.put('/:id', async (req: Request, res: Response) => {
  const body = validateDTO(UpdateAudioQuizSubmissionDto, req.body);

  const perm = throwPermIfError(await canUpdateAudioQuizSubmission(req, false));
  const content = throwIfError(
    await AudioQuizSubmissionService.updateOne({ _id: req.params.id, ...perm.query }, body),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.delete('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canDeleteAudioQuizSubmission(req, false));
  const content = throwIfError(
    await AudioQuizSubmissionService.deleteOne(req.params.id, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

export default router;
