import { QueryOptions, UpdateQuery } from 'mongoose';
import { QueryReturn, find, findOne } from '../../utilities/query';
import { CreateOrderDto, UpdateOrderDto } from './dto';
import { Order } from './schema';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { CartModel, OrderModel, TransactionModel } from '../../models';
import CartService from '../cart/service';
import TransactionService from '../transaction/service';
import { PaymentMethod, PaymentStatus } from '../transaction/schema';

export default class OrderService {
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType> {
    try {
      let foundOrders;
      if (conditions) {
        foundOrders = await find(OrderModel, queries, conditions);
      } else {
        foundOrders = await find(OrderModel, queries);
      }

      // remove all order itesm from cart

      return {
        success: true,
        message: 'Orders fetched successfully',
        data: foundOrders,
        statusCode: 200,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        data: error,
      };
    }
  }

  static async create(
    payload: CreateOrderDto,
    data: Partial<Order> = {},
  ): Promise<serviceResponseType<Order>> {
    // return await OrderModel.create(data);
    validateDTO(CreateOrderDto, payload);
    try {
      const createdOrder = await OrderModel.create({ ...payload, ...data });

      const idsToDelete = payload.items.map((item) => item.cartId);

      await CartModel.deleteMany({
        _id: { $in: idsToDelete },
      });

      await TransactionModel.create({
        paymentMethod: PaymentMethod.Cash,
        amount: payload.totalPrice,
        description: 'Cash Payment for an order',
        status: PaymentStatus.Pending,
        orderId: createdOrder._id,
        file: payload.fileId,
        createdBy: createdOrder.createdBy,
      });

      return {
        success: true,
        message: 'Order created successfully',
        data: createdOrder,
        statusCode: 201,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        data: error,
      };
    }
  }

  static async fetchOne(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType> {
    try {
      let foundOrder;
      if (conditions) {
        foundOrder = await findOne(OrderModel, queries, conditions);
      } else {
        foundOrder = await findOne(OrderModel, queries);
      }
      return {
        success: true,
        message: 'Order fetched successfully',
        data: foundOrder,
        statusCode: 200,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        data: error,
      };
    }
  }

  static async updateOne(
    queries: { [key: string]: any; _id: string },
    data: Partial<UpdateOrderDto>,
    others: UpdateQuery<Order> & Partial<Order> = {},
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType<Order | null>> {
    try {
      // const foundOrder = await findOne(OrderModel, queries);
      // if (!foundOrder) {
      //   throw {
      //     message: 'Order not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const updatedOrder = await OrderModel.findOneAndUpdate(
        queries,
        { ...data, ...others },
        options,
      );
      if (!updatedOrder) {
        throw {
          message: 'Order not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Order updated successfully',
        data: updatedOrder,
        statusCode: 200,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        data: error,
      };
    }
  }

  static async deleteOne(
    id: string,
    queries: { [key: string]: any },
  ): Promise<serviceResponseType<Order | null>> {
    try {
      // const foundOrder = await findOne(OrderModel, queries, {
      //   _id: id,
      // });
      // if (!foundOrder) {
      //   throw {
      //     message: 'Order not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const deletedOrder = await OrderModel.findOneAndDelete({
        ...queries,
        _id: id,
      });
      if (!deletedOrder) {
        throw {
          message: 'Order not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Order deleted successfully',
        data: deletedOrder,
        statusCode: 204,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        data: error,
      };
    }
  }
}
