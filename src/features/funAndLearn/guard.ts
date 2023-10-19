import { checkUserTypesService } from '../../middlewares/authentication';
import { GuardFunction } from '../../guards';

export const canCreateFunAndLearn: GuardFunction = async (req, exec) => {
  try {
    await checkUserTypesService(req, ['super']);
    // throw new Error('Not implemented');
    return {
      auth: true,
      message: 'Can create FunAndLearn',
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

export const canFetchFunAndLearn: GuardFunction = async (req, exec) => {
  try {
    await checkUserTypesService(req, ['super', 'individual']);
    return {
      auth: true,
      message: 'Can fetch FunAndLearn',
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

export const canUpdateFunAndLearn: GuardFunction = async (req, exec) => {
  try {
    await checkUserTypesService(req, ['super']);
    return {
      auth: true,
      message: 'Can update FunAndLearn',
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

export const canDeleteFunAndLearn: GuardFunction = async (req, exec) => {
  try {
    await checkUserTypesService(req, ['super']);
    return {
      auth: true,
      message: 'Can delete FunAndLearn',
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
