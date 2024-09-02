import { QueryOptions, UpdateQuery } from 'mongoose';
import { QueryReturn, find, findOne } from '../../utilities/query';
import { CreateNotificationDto, UpdateNotificationDto } from './dto';
import { Notification } from './schema';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { NotificationModel } from '../../models';

export default class NotificationService {
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType> {
    try {
      let foundNotifications;
      if (conditions) {
        foundNotifications = await find(NotificationModel, queries, conditions);
      }
      else {
      foundNotifications = await find(NotificationModel, queries);
      }
      return {
        success: true,
        message: 'Notifications fetched successfully',
        data: foundNotifications,
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
    payload: CreateNotificationDto,
    data: Partial<Notification> = {},
  ): Promise<serviceResponseType<Notification>> {
    // return await NotificationModel.create(data);
    validateDTO(CreateNotificationDto, payload);
    try {
      const createdNotification = await NotificationModel.create({ ...payload, ...data });
      return {
        success: true,
        message: 'Notification created successfully',
        data: createdNotification,
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
      let foundNotification;
      if (conditions) {
        foundNotification = await findOne(NotificationModel, queries, conditions);
      }
      else {
      foundNotification = await findOne(NotificationModel, queries);
      }
      return {
        success: true,
        message: 'Notification fetched successfully',
        data: foundNotification,
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
    data: Partial< UpdateNotificationDto>,
    others: UpdateQuery<Notification> & Partial<Notification> = {},
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType<Notification | null>> {
    try {
      // const foundNotification = await findOne(NotificationModel, queries);
      // if (!foundNotification) {
      //   throw {
      //     message: 'Notification not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const updatedNotification = await NotificationModel.findOneAndUpdate(
        queries,
        { ...data, ...others },
        options,
      );
      if (!updatedNotification) {
        throw {
          message: 'Notification not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Notification updated successfully',
        data: updatedNotification,
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
  ): Promise<serviceResponseType<Notification | null>> {
    try {
      // const foundNotification = await findOne(NotificationModel, queries, {
      //   _id: id,
      // });
      // if (!foundNotification) {
      //   throw {
      //     message: 'Notification not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const deletedNotification = await NotificationModel.findOneAndDelete({
        ...queries,
        _id: id,
      });
      if (!deletedNotification) {
        throw {
          message: 'Notification not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Notification deleted successfully',
        data: deletedNotification,
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
