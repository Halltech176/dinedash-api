import express, { Request, Response } from 'express';
import {
  canCreateFunAndLearnSubmission,
  canDeleteFunAndLearnSubmission,
  canFetchFunAndLearnSubmission,
  canUpdateFunAndLearnSubmission,
} from './guard';
import FunAndLearnSubmissionService from './service';
import response, {
  throwIfError,
  throwPermIfError,
} from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { UpdateFunAndLearnSubmissionDto } from './dto';
import { savePoints } from '../../utilities/submit';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(
    await canCreateFunAndLearnSubmission(req, true),
  );
  const content = throwIfError(
    await FunAndLearnSubmissionService.create(req.body, {
      ...perm.query,
    }),
  );

  const points = content.data.questions.reduce((acc, curr) => {
    return acc + curr.points;
  }, 0);

  await savePoints(req.user._id, points);
  return response(res, content.statusCode, content.message, content.data);

  return response(res, content.statusCode, content.message, content.data);
});

router.get('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(
    await canFetchFunAndLearnSubmission(req, false),
  );
  const content = throwIfError(
    await FunAndLearnSubmissionService.fetch(req.query, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.get('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(
    await canFetchFunAndLearnSubmission(req, false),
  );
  const content = throwIfError(
    await FunAndLearnSubmissionService.fetchOne(req.query, {
      _id: req.params.id,
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.put('/:id', async (req: Request, res: Response) => {
  const body = validateDTO(UpdateFunAndLearnSubmissionDto, req.body);

  const perm = throwPermIfError(
    await canUpdateFunAndLearnSubmission(req, false),
  );
  const content = throwIfError(
    await FunAndLearnSubmissionService.updateOne(
      { _id: req.params.id, ...perm.query },
      body,
    ),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(
    await canDeleteFunAndLearnSubmission(req, false),
  );
  const content = throwIfError(
    await FunAndLearnSubmissionService.deleteOne(req.params.id, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

export default router;
