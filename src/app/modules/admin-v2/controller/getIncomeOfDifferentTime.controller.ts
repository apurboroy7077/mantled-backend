import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { getAdminRequestAndGiveTotalAmountOfIncome } from '../../../../helpers_v2/admin-requests/getAdminRequestAndGiveTotalAmountOfIncome.helper';
import { getAdminRequestAndGiveDataOfIncomesOfDifferentMonths } from '../../../../helpers_v2/admin-requests/getAdminRequestAndGiveDataOfIncomesOfDifferentMonths.helper';

export const getIncomeOfDifferentMonthsController = myControllerHandler(
  async (req, res) => {
    const totalAmountOfEarnings =
      await getAdminRequestAndGiveDataOfIncomesOfDifferentMonths(req);
    const myResponse = {
      message: 'Review Given Successfully',
      success: true,
      totalEarnings: totalAmountOfEarnings,
    };
    res.status(StatusCodes.OK).json(myResponse);
  }
);
