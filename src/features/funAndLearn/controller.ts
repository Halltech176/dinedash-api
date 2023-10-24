import express, { Request, Response } from 'express';
import { canCreateFunAndLearn, canDeleteFunAndLearn, canFetchFunAndLearn, canUpdateFunAndLearn } from './guard';
import FunAndLearnService from './service';
import response, {
  throwIfError,
  throwPermIfError,
} from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { UpdateFunAndLearnDto } from './dto';


const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canCreateFunAndLearn(req, true));
  const content = throwIfError(
    await FunAndLearnService.create(req.body, { 
      ...perm.query
     }),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.get('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchFunAndLearn(req, false));
  const content = throwIfError(
    await FunAndLearnService.fetch(req.query, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.get('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchFunAndLearn(req, false));
  const content = throwIfError(
    await FunAndLearnService.fetchOne(req.query, {
      _id: req.params.id,
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.put('/:id', async (req: Request, res: Response) => {
  const body = validateDTO(UpdateFunAndLearnDto, req.body);

  const perm = throwPermIfError(await canUpdateFunAndLearn(req, false));
  const content = throwIfError(
    await FunAndLearnService.updateOne({ _id: req.params.id, ...perm.query }, body),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.delete('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canDeleteFunAndLearn(req, false));
  const content = throwIfError(
    await FunAndLearnService.deleteOne(req.params.id, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

export default router;
