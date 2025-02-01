import express from 'express';
import { getOwnDataOfUserController } from '../controller/getOwnData.controller';

const userRouterV2 = express.Router();

userRouterV2.get('/get-own-data', getOwnDataOfUserController);

export { userRouterV2 };
