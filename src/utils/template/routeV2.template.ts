import express from 'express';
import { myController } from './controller.template';

const myRouterV2 = express.Router();

myRouterV2.post('/sign-in', myController);

export { myRouterV2 };
