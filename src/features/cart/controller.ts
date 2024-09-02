import express, { Request, Response } from 'express';
import {
  canCreateCart,
  canDeleteCart,
  canFetchCart,
  canUpdateCart,
} from './guard';
import CartService from './service';
import response, {
  throwIfError,
  throwPermIfError,
} from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { UpdateCartDto } from './dto';
import NotificationService from '../notification/service';
import { NotificationModel, UserModel } from '../../models';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canCreateCart(req, true));
  const content = throwIfError(
    await CartService.create(req.body, {
      ...perm.query,
    }),
  );

  const admin = await UserModel.findOne({
    type: 'super',
  });

  console.log({ admin: admin?._id });

  await NotificationModel.create({
    message: 'item added to cart',
    type: 'Cart Update',
    userId: admin?._id,
    createdBy : req.user._id
  });
  return response(res, content.statusCode, content.message, content.data);
});

router.get('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchCart(req, false));
  const content = throwIfError(
    await CartService.fetch(req.query, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.get('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchCart(req, false));
  const content = throwIfError(
    await CartService.fetchOne(req.query, {
      _id: req.params.id,
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.put('/:id', async (req: Request, res: Response) => {
  const body = validateDTO(UpdateCartDto, req.body);

  const perm = throwPermIfError(await canUpdateCart(req, false));
  const content = throwIfError(
    await CartService.updateOne({ _id: req.params.id, ...perm.query }, body),
  );
  return response(res, content.statusCode, content.message, content.data);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canDeleteCart(req, false));
  const content = throwIfError(
    await CartService.deleteOne(req.params.id, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

export default router;
