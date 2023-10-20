import { checkUserTypesService } from '../../middlewares/authentication';
import { GuardFunction } from '../../guards';

export const canCreateMathQuiz: GuardFunction = async (req, exec) => {
  try {
    await checkUserTypesService(req, ['super']);
    // throw new Error('Not implemented');
    return {
      auth: true,
      message: 'Can create MathQuiz',
      query: {
        createdBy: req.user._id
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

export const canFetchMathQuiz: GuardFunction = async (req, exec) => {
  try {
    await checkUserTypesService(req, ['super']);
    return {
      auth: true,
      message: 'Can fetch MathQuiz',
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

export const canUpdateMathQuiz: GuardFunction = async (req, exec) => {
  try {
    await checkUserTypesService(req, ['super']);
    return {
      auth: true,
      message: 'Can update MathQuiz',
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

export const canDeleteMathQuiz: GuardFunction = async (req, exec) => {
  try {
    await checkUserTypesService(req, ['super']);
    return {
      auth: true,
      message: 'Can delete MathQuiz',
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
