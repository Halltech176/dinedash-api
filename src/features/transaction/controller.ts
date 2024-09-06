import express, { Request, Response } from 'express';
import {
  canCreateTransaction,
  canDeleteTransaction,
  canFetchTransaction,
  canUpdateTransaction,
} from './guard';
import TransactionService from './service';
import response, {
  throwIfError,
  throwPermIfError,
} from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { UpdateTransactionDto } from './dto';
import { NotificationModel, UserModel } from '../../models';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canCreateTransaction(req, true));
  const content = throwIfError(
    await TransactionService.create(req.body, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.get('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchTransaction(req, false));
  const content = throwIfError(
    await TransactionService.fetch(req.query, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.get('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchTransaction(req, false));
  const content = throwIfError(
    await TransactionService.fetchOne(req.query, {
      _id: req.params.id,
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.put('/:id', async (req: Request, res: Response) => {
  const body = validateDTO(UpdateTransactionDto, req.body);

  const perm = throwPermIfError(await canUpdateTransaction(req, false));
  const content = throwIfError(
    await TransactionService.updateOne(
      { _id: req.params.id, ...perm.query },
      body,
    ),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.put('/approve/:id', async (req: Request, res: Response) => {
  // const body = validateDTO(UpdateTransactionDto, req.body);

  const perm = throwPermIfError(await canUpdateTransaction(req, false));
  const content = throwIfError(
    await TransactionService.approvePayment(
      { _id: req.params.id, ...perm.query },
      {},
      // body,
    ),
  );
  const admin = await UserModel.findOne({
    type: 'super',
  });

  console.log({ admin });

  await NotificationModel.create({
    createdBy: admin?._id,
    userId: content.data?.createdBy,
    type: 'Payment Successful',
    message: `Your payment for order #${content.data?.orderId} has been successful.`,
  });
  return response(res, content.statusCode, content.message, content.data);
});

router.put('/cancel/:id', async (req: Request, res: Response) => {
  // const body = validateDTO(UpdateTransactionDto, req.body);

  const perm = throwPermIfError(await canUpdateTransaction(req, false));
  const content = throwIfError(
    await TransactionService.cancelPayment(
      { _id: req.params.id, ...perm.query },
      {},
    ),
  );

  const admin = await UserModel.findOne({
    type: 'super',
  });

  await NotificationModel.create({
    createdBy: admin?._id,
    userId: content.data?.createdBy,
    type: 'Payment Concellation',
    message: `Your payment for order #${content.data?.orderId} has been cancelled.`,
  });
  return response(res, content.statusCode, content.message, content.data);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canDeleteTransaction(req, false));
  const content = throwIfError(
    await TransactionService.deleteOne(req.params.id, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

export default router;
