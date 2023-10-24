import { checkUserTypesService } from '../../middlewares/authentication';
import { GuardFunction } from '../../guards';

export const canCreateQuizZoneSubmission: GuardFunction = async (req, exec) => {
  try {
    await checkUserTypesService(req, ['super', 'individual']);
    // throw new Error('Not implemented');
    return {
      auth: true,
      message: 'Can create QuizZoneSubmission',
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

export const canFetchQuizZoneSubmission: GuardFunction = async (req, exec) => {
  try {
    await checkUserTypesService(req, ['super']);
    return {
      auth: true,
      message: 'Can fetch QuizZoneSubmission',
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

export const canUpdateQuizZoneSubmission: GuardFunction = async (req, exec) => {
  try {
    await checkUserTypesService(req, ['super']);
    return {
      auth: true,
      message: 'Can update QuizZoneSubmission',
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

export const canDeleteQuizZoneSubmission: GuardFunction = async (req, exec) => {
  try {
    await checkUserTypesService(req, ['super']);
    return {
      auth: true,
      message: 'Can delete QuizZoneSubmission',
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
