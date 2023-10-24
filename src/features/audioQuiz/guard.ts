import { checkUserTypesService } from '../../middlewares/authentication';
import { GuardFunction } from '../../guards';

export const canCreateAudioQuiz: GuardFunction = async (req, exec) => {
  try {
    await checkUserTypesService(req, ['super']);
    // throw new Error('Not implemented');
    return {
      auth: true,
      message: 'Can create AudioQuiz',
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

export const canFetchAudioQuiz: GuardFunction = async (req, exec) => {
  try {
    await checkUserTypesService(req, ['super', 'individual']);
    return {
      auth: true,
      message: 'Can fetch AudioQuiz',
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

export const canUpdateAudioQuiz: GuardFunction = async (req, exec) => {
  try {
    await checkUserTypesService(req, ['super']);
    return {
      auth: true,
      message: 'Can update AudioQuiz',
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

export const canDeleteAudioQuiz: GuardFunction = async (req, exec) => {
  try {
    await checkUserTypesService(req, ['super']);
    return {
      auth: true,
      message: 'Can delete AudioQuiz',
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
