import { QueryOptions, UpdateQuery } from 'mongoose';
import { QueryReturn, find, findOne } from '../../utilities/query';
import { CreateMenuDto, UpdateMenuDto } from './dto';
import { Menu } from './schema';
import { serviceResponseType } from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { MenuModel } from '../../models';

export default class MenuService {
  static async fetch(
    queries: { [key: string]: any },
    conditions: {} | undefined = undefined,
  ): Promise<serviceResponseType> {
    try {
      let foundMenus;
      if (conditions) {
        foundMenus = await find(MenuModel, queries, conditions);
      }
      else {
      foundMenus = await find(MenuModel, queries);
      }
      return {
        success: true,
        message: 'Menus fetched successfully',
        data: foundMenus,
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
    payload: CreateMenuDto,
    data: Partial<Menu> = {},
  ): Promise<serviceResponseType<Menu>> {
    // return await MenuModel.create(data);
    validateDTO(CreateMenuDto, payload);
    try {
      const createdMenu = await MenuModel.create({ ...payload, ...data });
      return {
        success: true,
        message: 'Menu created successfully',
        data: createdMenu,
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
      let foundMenu;
      if (conditions) {
        foundMenu = await findOne(MenuModel, queries, conditions);
      }
      else {
      foundMenu = await findOne(MenuModel, queries);
      }
      return {
        success: true,
        message: 'Menu fetched successfully',
        data: foundMenu,
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
    data: Partial< UpdateMenuDto>,
    others: UpdateQuery<Menu> & Partial<Menu> = {},
    options: QueryOptions = { new: true, runValidators: true },
  ): Promise<serviceResponseType<Menu | null>> {
    try {
      // const foundMenu = await findOne(MenuModel, queries);
      // if (!foundMenu) {
      //   throw {
      //     message: 'Menu not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const updatedMenu = await MenuModel.findOneAndUpdate(
        queries,
        { ...data, ...others },
        options,
      );
      if (!updatedMenu) {
        throw {
          message: 'Menu not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Menu updated successfully',
        data: updatedMenu,
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
  ): Promise<serviceResponseType<Menu | null>> {
    try {
      // const foundMenu = await findOne(MenuModel, queries, {
      //   _id: id,
      // });
      // if (!foundMenu) {
      //   throw {
      //     message: 'Menu not found or access denied',
      //     statusCode: 404,
      //   };
      // }
      const deletedMenu = await MenuModel.findOneAndDelete({
        ...queries,
        _id: id,
      });
      if (!deletedMenu) {
        throw {
          message: 'Menu not found or access denied',
          statusCode: 404,
        };
      }
      return {
        success: true,
        message: 'Menu deleted successfully',
        data: deletedMenu,
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
