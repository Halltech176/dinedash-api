import mongoose from 'mongoose';
import log from '../logger';
import dotenv from 'dotenv';
import { env } from 'process';
const uniqueValidator = require('mongoose-unique-validator');
dotenv.config();
const option = {
  socketTimeoutMS: 30000,
};



mongoose.set('strictQuery', false);
// mongoose.set('debug', true);
mongoose.Promise = Promise;

const connectDb = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, option);
    log.info('Database connected successfully');
    mongoose.plugin(uniqueValidator);
  } catch (error) {
    log.error(error);
  }
};

export default connectDb;
