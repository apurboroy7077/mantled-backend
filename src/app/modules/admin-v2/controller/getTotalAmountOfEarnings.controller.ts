import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { getAdminRequestAndGiveTotalAmountOfIncome } from '../../../../helpers_v2/admin-requests/getAdminRequestAndGiveTotalAmountOfIncome.helper';

export const getTotalAmountOfEarningsController = myControllerHandler(
  async (req, res) => {
    const totalAmountOfEarnings =
      await getAdminRequestAndGiveTotalAmountOfIncome(req);

    const myResponse = {
      message: 'Review Given Successfully',
      success: true,
      totalEarnings: totalAmountOfEarnings,
    };
    res.status(StatusCodes.OK).json(myResponse);
  }
);
