import express, { Request, Response } from 'express';
import { canCreateAudioQuiz, canDeleteAudioQuiz, canFetchAudioQuiz, canUpdateAudioQuiz } from './guard';
import AudioQuizService from './service';
import response, {
  throwIfError,
  throwPermIfError,
} from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { UpdateAudioQuizDto } from './dto';


const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canCreateAudioQuiz(req, true));
  const content = throwIfError(
    await AudioQuizService.create(req.body, { 
      ...perm.query
     }),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.get('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchAudioQuiz(req, false));
  const content = throwIfError(
    await AudioQuizService.fetch(req.query, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.get('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchAudioQuiz(req, false));
  const content = throwIfError(
    await AudioQuizService.fetchOne(req.query, {
      _id: req.params.id,
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.put('/:id', async (req: Request, res: Response) => {
  const body = validateDTO(UpdateAudioQuizDto, req.body);

  const perm = throwPermIfError(await canUpdateAudioQuiz(req, false));
  const content = throwIfError(
    await AudioQuizService.updateOne({ _id: req.params.id, ...perm.query }, body),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.delete('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canDeleteAudioQuiz(req, false));
  const content = throwIfError(
    await AudioQuizService.deleteOne(req.params.id, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

export default router;
