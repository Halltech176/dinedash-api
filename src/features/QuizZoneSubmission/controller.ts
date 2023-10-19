import express, { Request, Response } from 'express';
import {
  canCreateQuizZoneSubmission,
  canDeleteQuizZoneSubmission,
  canFetchQuizZoneSubmission,
  canUpdateQuizZoneSubmission,
} from './guard';
import QuizZoneSubmissionService from './service';
import response, {
  throwIfError,
  throwPermIfError,
} from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { UpdateQuizZoneSubmissionDto } from './dto';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canCreateQuizZoneSubmission(req, true));
  const content = throwIfError(
    await QuizZoneSubmissionService.create(req.body, {
      ...perm.query,
    }),
  );

  return response(res, content.statusCode, content.message, content.data);
});

router.get('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchQuizZoneSubmission(req, false));
  const content = throwIfError(
    await QuizZoneSubmissionService.fetch(req.query, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.get('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchQuizZoneSubmission(req, false));
  const content = throwIfError(
    await QuizZoneSubmissionService.fetchOne(req.query, {
      _id: req.params.id,
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.put('/:id', async (req: Request, res: Response) => {
  const body = validateDTO(UpdateQuizZoneSubmissionDto, req.body);

  const perm = throwPermIfError(await canUpdateQuizZoneSubmission(req, false));
  const content = throwIfError(
    await QuizZoneSubmissionService.updateOne(
      { _id: req.params.id, ...perm.query },
      body,
    ),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canDeleteQuizZoneSubmission(req, false));
  const content = throwIfError(
    await QuizZoneSubmissionService.deleteOne(req.params.id, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

export default router;
