import { QueryOptions, UpdateQuery } from 'mongoose';
import { QueryReturn, find, findOne } from '../../utilities/query';
import { CreateCartDto, UpdateCartDto } from './dto';
import { Cart } from './schema';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { CartModel } from '../../models';

export default class CartService {
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType> {
    try {
      let foundCarts;
      if (conditions) {
        foundCarts = await find(CartModel, queries, conditions);
      }
      else {
      foundCarts = await find(CartModel, queries);
      }
      return {
        success: true,
        message: 'Carts fetched successfully',
        data: foundCarts,
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
    payload: CreateCartDto,
    data: Partial<Cart> = {},
  ): Promise<serviceResponseType<Cart>> {
    // return await CartModel.create(data);
    validateDTO(CreateCartDto, payload);
    try {
      const createdCart = await CartModel.create({ ...payload, ...data });
      return {
        success: true,
        message: 'Cart created successfully',
        data: createdCart,
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
      let foundCart;
      if (conditions) {
        foundCart = await findOne(CartModel, queries, conditions);
      }
      else {
      foundCart = await findOne(CartModel, queries);
      }
      return {
        success: true,
        message: 'Cart fetched successfully',
        data: foundCart,
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
    data: Partial< UpdateCartDto>,
    others: UpdateQuery<Cart> & Partial<Cart> = {},
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType<Cart | null>> {
    try {
      // const foundCart = await findOne(CartModel, queries);
      // if (!foundCart) {
      //   throw {
      //     message: 'Cart not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const updatedCart = await CartModel.findOneAndUpdate(
        queries,
        { ...data, ...others },
        options,
      );
      if (!updatedCart) {
        throw {
          message: 'Cart not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Cart updated successfully',
        data: updatedCart,
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
  ): Promise<serviceResponseType<Cart | null>> {
    try {
      // const foundCart = await findOne(CartModel, queries, {
      //   _id: id,
      // });
      // if (!foundCart) {
      //   throw {
      //     message: 'Cart not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const deletedCart = await CartModel.findOneAndDelete({
        ...queries,
        _id: id,
      });
      if (!deletedCart) {
        throw {
          message: 'Cart not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Cart deleted successfully',
        data: deletedCart,
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
