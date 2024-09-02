import { QueryOptions, UpdateQuery } from 'mongoose';
import { QueryReturn, find, findOne } from '../../utilities/query';
import { CreateReviewDto, UpdateReviewDto } from './dto';
import { Review } from './schema';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { ReviewModel } from '../../models';

export default class ReviewService {
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType> {
    try {
      let foundReviews;
      if (conditions) {
        foundReviews = await find(ReviewModel, queries, conditions);
      }
      else {
      foundReviews = await find(ReviewModel, queries);
      }
      return {
        success: true,
        message: 'Reviews fetched successfully',
        data: foundReviews,
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
    payload: CreateReviewDto,
    data: Partial<Review> = {},
  ): Promise<serviceResponseType<Review>> {
    // return await ReviewModel.create(data);
    validateDTO(CreateReviewDto, payload);
    try {
      const createdReview = await ReviewModel.create({ ...payload, ...data });
      return {
        success: true,
        message: 'Review created successfully',
        data: createdReview,
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
      let foundReview;
      if (conditions) {
        foundReview = await findOne(ReviewModel, queries, conditions);
      }
      else {
      foundReview = await findOne(ReviewModel, queries);
      }
      return {
        success: true,
        message: 'Review fetched successfully',
        data: foundReview,
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
    data: Partial< UpdateReviewDto>,
    others: UpdateQuery<Review> & Partial<Review> = {},
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType<Review | null>> {
    try {
      // const foundReview = await findOne(ReviewModel, queries);
      // if (!foundReview) {
      //   throw {
      //     message: 'Review not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const updatedReview = await ReviewModel.findOneAndUpdate(
        queries,
        { ...data, ...others },
        options,
      );
      if (!updatedReview) {
        throw {
          message: 'Review not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Review updated successfully',
        data: updatedReview,
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
  ): Promise<serviceResponseType<Review | null>> {
    try {
      // const foundReview = await findOne(ReviewModel, queries, {
      //   _id: id,
      // });
      // if (!foundReview) {
      //   throw {
      //     message: 'Review not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const deletedReview = await ReviewModel.findOneAndDelete({
        ...queries,
        _id: id,
      });
      if (!deletedReview) {
        throw {
          message: 'Review not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Review deleted successfully',
        data: deletedReview,
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
