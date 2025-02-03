import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { getAdminRequestAndGiveTotalNumberOfUser } from '../../../../helpers_v2/admin-requests/getAdminRequestAndGiveTotalNumberOfUser.helper';
import { getAdminRequestAndGiveTotalUserOfDifferentMonths } from '../../../../helpers_v2/admin-requests/getAdminRequestAndGiveTotalUserOfDifferentMonths.helper';

export const getUserRatioOfDifferentMonthsController = myControllerHandler(
  async (req, res) => {
    const usersDataInDifferentTimes =
      await getAdminRequestAndGiveTotalUserOfDifferentMonths(req);
    const myResponse = {
      message: 'Total Number of User fetched Successfully.',
      success: true,
      usersDataInDifferentTimes,
    };
    res.status(StatusCodes.OK).json(myResponse);
  }
);
