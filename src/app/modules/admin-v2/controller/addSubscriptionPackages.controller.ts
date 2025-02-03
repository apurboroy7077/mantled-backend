import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { subscriptionPackageModel } from '../../subscription_packages/model/subscriptionPackages.model';

export const addSubscriptionPackagesController = myControllerHandler(
  async (req, res) => {
    const { name, price, duration, details } = req.body;
    await subscriptionPackageModel.create({
      name,
      price: Number(price),
      duration,
      details,
    });
    const myResponse = {
      message: 'Subscription Package Created Successfull',
      success: true,
      data: {},
    };
    res.status(StatusCodes.OK).json(myResponse);
  }
);
