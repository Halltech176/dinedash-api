import { checkUserTypesService } from '../../middlewares/authentication';
import { GuardFunction } from '../../guards';

export const canCreateQuessTheWord: GuardFunction = async (req, exec) => {
  try {
    await checkUserTypesService(req, ['super', 'individual']);
    // throw new Error('Not implemented');
    return {
      auth: true,
      message: 'Can create QuessTheWord',
      query: {
        createdBy: req.user._id,
      },
    };
  } catch (error) {
    return {
      auth: false,
      message: error.message,
      query: {},
    };
  }
};

export const canFetchQuessTheWord: GuardFunction = async (req, exec) => {
  try {
    await checkUserTypesService(req, ['super']);
    return {
      auth: true,
      message: 'Can fetch QuessTheWord',
      query: {},
    };
  } catch (error) {
    return {
      auth: false,
      message: error.message,
      query: {},
    };
  }
};

export const canUpdateQuessTheWord: GuardFunction = async (req, exec) => {
  try {
    await checkUserTypesService(req, ['super']);
    return {
      auth: true,
      message: 'Can update QuessTheWord',
      query: {},
    };
  } catch (error) {
    return {
      auth: false,
      message: error.message,
      query: {},
    };
  }
};

export const canDeleteQuessTheWord: GuardFunction = async (req, exec) => {
  try {
    await checkUserTypesService(req, ['super']);
    return {
      auth: true,
      message: 'Can delete QuessTheWord',
      query: {},
    };
  } catch (error) {
    return {
      auth: false,
      message: error.message,
      query: {},
    };
  }
};
