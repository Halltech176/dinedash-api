import { checkUserTypesService } from '../../middlewares/authentication';
import { GuardFunction } from '../../guards';

export const canCreateDailyQuizSubmission: GuardFunction = async (
  req,
  exec,
) => {
  try {
    await checkUserTypesService(req, ['super', 'individual']);
    // throw new Error('Not implemented');
    return {
      auth: true,
      message: 'Can create DailyQuizSubmission',
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

export const canFetchDailyQuizSubmission: GuardFunction = async (req, exec) => {
  try {
    await checkUserTypesService(req, ['super', 'individual']);
    return {
      auth: true,
      message: 'Can fetch DailyQuizSubmission',
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

export const canUpdateDailyQuizSubmission: GuardFunction = async (
  req,
  exec,
) => {
  try {
    await checkUserTypesService(req, ['super']);
    return {
      auth: true,
      message: 'Can update DailyQuizSubmission',
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

export const canDeleteDailyQuizSubmission: GuardFunction = async (
  req,
  exec,
) => {
  try {
    await checkUserTypesService(req, ['super']);
    return {
      auth: true,
      message: 'Can delete DailyQuizSubmission',
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
