import express from 'express';
import { getSubscriptionPackagesController } from '../controller/getSubscriptionPackages.controller';

const subscriptionPackagesRouter = express.Router();

subscriptionPackagesRouter.get('/', getSubscriptionPackagesController);

export { subscriptionPackagesRouter };
