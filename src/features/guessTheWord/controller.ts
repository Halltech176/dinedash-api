import express, { Request, Response } from 'express';
import { canCreateQuessTheWord, canDeleteQuessTheWord, canFetchQuessTheWord, canUpdateQuessTheWord } from './guard';
import QuessTheWordService from './service';
import response, {
  throwIfError,
  throwPermIfError,
} from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { UpdateQuessTheWordDto } from './dto';


const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canCreateQuessTheWord(req, true));
  const content = throwIfError(
    await QuessTheWordService.create(req.body, { 
      ...perm.query
     }),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.get('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchQuessTheWord(req, false));
  const content = throwIfError(
    await QuessTheWordService.fetch(req.query, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.get('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchQuessTheWord(req, false));
  const content = throwIfError(
    await QuessTheWordService.fetchOne(req.query, {
      _id: req.params.id,
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.put('/:id', async (req: Request, res: Response) => {
  const body = validateDTO(UpdateQuessTheWordDto, req.body);

  const perm = throwPermIfError(await canUpdateQuessTheWord(req, false));
  const content = throwIfError(
    await QuessTheWordService.updateOne({ _id: req.params.id, ...perm.query }, body),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.delete('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canDeleteQuessTheWord(req, false));
  const content = throwIfError(
    await QuessTheWordService.deleteOne(req.params.id, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

export default router;
