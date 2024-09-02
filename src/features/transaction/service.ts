import { QueryOptions, UpdateQuery } from 'mongoose';
import { QueryReturn, find, findOne } from '../../utilities/query';
import { CreateTransactionDto, UpdateTransactionDto } from './dto';
import { Transaction } from './schema';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { TransactionModel } from '../../models';

export default class TransactionService {
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType> {
    try {
      let foundTransactions;
      if (conditions) {
        foundTransactions = await find(TransactionModel, queries, conditions);
      }
      else {
      foundTransactions = await find(TransactionModel, queries);
      }
      return {
        success: true,
        message: 'Transactions fetched successfully',
        data: foundTransactions,
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
    payload: CreateTransactionDto,
    data: Partial<Transaction> = {},
  ): Promise<serviceResponseType<Transaction>> {
    // return await TransactionModel.create(data);
    validateDTO(CreateTransactionDto, payload);
    try {
      const createdTransaction = await TransactionModel.create({ ...payload, ...data });
      return {
        success: true,
        message: 'Transaction created successfully',
        data: createdTransaction,
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
      let foundTransaction;
      if (conditions) {
        foundTransaction = await findOne(TransactionModel, queries, conditions);
      }
      else {
      foundTransaction = await findOne(TransactionModel, queries);
      }
      return {
        success: true,
        message: 'Transaction fetched successfully',
        data: foundTransaction,
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
    data: Partial< UpdateTransactionDto>,
    others: UpdateQuery<Transaction> & Partial<Transaction> = {},
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType<Transaction | null>> {
    try {
      // const foundTransaction = await findOne(TransactionModel, queries);
      // if (!foundTransaction) {
      //   throw {
      //     message: 'Transaction not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const updatedTransaction = await TransactionModel.findOneAndUpdate(
        queries,
        { ...data, ...others },
        options,
      );
      if (!updatedTransaction) {
        throw {
          message: 'Transaction not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Transaction updated successfully',
        data: updatedTransaction,
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
  ): Promise<serviceResponseType<Transaction | null>> {
    try {
      // const foundTransaction = await findOne(TransactionModel, queries, {
      //   _id: id,
      // });
      // if (!foundTransaction) {
      //   throw {
      //     message: 'Transaction not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const deletedTransaction = await TransactionModel.findOneAndDelete({
        ...queries,
        _id: id,
      });
      if (!deletedTransaction) {
        throw {
          message: 'Transaction not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Transaction deleted successfully',
        data: deletedTransaction,
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
