import express from 'express';
import { getSubscriptionPackagesController } from '../controller/getSubscriptionPackages.controller';
import { buySubscriptionPackagesController } from '../controller/buySubscriptionPackages.controller copy';
import { saveNewSubscriptionPackagesController } from '../controller/saveNewTransactionData.controller';

const subscriptionPackagesRouter = express.Router();

subscriptionPackagesRouter.get('/', getSubscriptionPackagesController);
subscriptionPackagesRouter.post('/buy', buySubscriptionPackagesController);
subscriptionPackagesRouter.post('/save', saveNewSubscriptionPackagesController);

export { subscriptionPackagesRouter };
