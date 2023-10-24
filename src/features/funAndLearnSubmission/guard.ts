import { checkUserTypesService } from '../../middlewares/authentication';
import { GuardFunction } from '../../guards';

export const canCreateFunAndLearnSubmission: GuardFunction = async (
  req,
  exec,
) => {
  try {
    await checkUserTypesService(req, ['super', 'individual']);
    // throw new Error('Not implemented');
    return {
      auth: true,
      message: 'Can create FunAndLearnSubmission',
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

export const canFetchFunAndLearnSubmission: GuardFunction = async (
  req,
  exec,
) => {
  try {
    await checkUserTypesService(req, ['super']);
    return {
      auth: true,
      message: 'Can fetch FunAndLearnSubmission',
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

export const canUpdateFunAndLearnSubmission: GuardFunction = async (
  req,
  exec,
) => {
  try {
    await checkUserTypesService(req, ['super']);
    return {
      auth: true,
      message: 'Can update FunAndLearnSubmission',
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

export const canDeleteFunAndLearnSubmission: GuardFunction = async (
  req,
  exec,
) => {
  try {
    await checkUserTypesService(req, ['super']);
    return {
      auth: true,
      message: 'Can delete FunAndLearnSubmission',
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
