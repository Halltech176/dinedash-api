import { checkUserTypesService } from '../../middlewares/authentication';
import { GuardFunction } from '../../guards';

export const canCreateQuessTheWordSubmission: GuardFunction = async (
  req,
  exec,
) => {
  try {
    await checkUserTypesService(req, ['super']);
    // throw new Error('Not implemented');
    return {
      auth: true,
      message: 'Can create QuessTheWordSubmission',
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

export const canFetchQuessTheWordSubmission: GuardFunction = async (
  req,
  exec,
) => {
  try {
    await checkUserTypesService(req, ['super', 'individual']);
    return {
      auth: true,
      message: 'Can fetch QuessTheWordSubmission',
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

export const canUpdateQuessTheWordSubmission: GuardFunction = async (
  req,
  exec,
) => {
  try {
    await checkUserTypesService(req, ['super']);
    return {
      auth: true,
      message: 'Can update QuessTheWordSubmission',
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

export const canDeleteQuessTheWordSubmission: GuardFunction = async (
  req,
  exec,
) => {
  try {
    await checkUserTypesService(req, ['super']);
    return {
      auth: true,
      message: 'Can delete QuessTheWordSubmission',
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
