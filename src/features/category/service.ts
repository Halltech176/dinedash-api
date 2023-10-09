import { QueryOptions, UpdateQuery } from 'mongoose';
import { QueryReturn, find, findOne } from '../../utilities/query';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { Category } from './schema';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { CategoryModel } from '../../models';

export default class CategoryService {
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType> {
    try {
      let foundCategorys;
      if (conditions) {
        foundCategorys = await find(CategoryModel, queries, conditions);
      } else {
        foundCategorys = await find(CategoryModel, queries);
      }
      return {
        success: true,
        message: 'Categorys fetched successfully',
        data: foundCategorys,
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
    payload: CreateCategoryDto,
    data: Partial<Category> = {},
  ): Promise<serviceResponseType<Category>> {
    // return await CategoryModel.create(data);
    validateDTO(CreateCategoryDto, payload);
    try {
      const createdCategory = await CategoryModel.create({
        ...payload,
        ...data,
      });
      return {
        success: true,
        message: 'Category created successfully',
        data: createdCategory,
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
      let foundCategory;
      if (conditions) {
        foundCategory = await findOne(CategoryModel, queries, conditions);
      } else {
        foundCategory = await findOne(CategoryModel, queries);
      }
      return {
        success: true,
        message: 'Category fetched successfully',
        data: foundCategory,
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
    data: Partial<UpdateCategoryDto>,
    others: UpdateQuery<Category> & Partial<Category> = {},
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType<Category | null>> {
    try {
      // const foundCategory = await findOne(CategoryModel, queries);
      // if (!foundCategory) {
      //   throw {
      //     message: 'Category not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const updatedCategory = await CategoryModel.findOneAndUpdate(
        queries,
        { ...data, ...others },
        options,
      );
      if (!updatedCategory) {
        throw {
          message: 'Category not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Category updated successfully',
        data: updatedCategory,
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
  ): Promise<serviceResponseType<Category | null>> {
    try {
      // const foundCategory = await findOne(CategoryModel, queries, {
      //   _id: id,
      // });
      // if (!foundCategory) {
      //   throw {
      //     message: 'Category not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const deletedCategory = await CategoryModel.findOneAndDelete({
        ...queries,
        _id: id,
      });
      if (!deletedCategory) {
        throw {
          message: 'Category not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Category deleted successfully',
        data: deletedCategory,
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
