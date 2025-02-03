import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { getAdminRequestAndGiveTotalNumberOfUser } from '../../../../helpers_v2/admin-requests/getAdminRequestAndGiveTotalNumberOfUser.helper';

export const getTotalNumberOfUserController = myControllerHandler(
  async (req, res) => {
    const totalNumberOfUser = await getAdminRequestAndGiveTotalNumberOfUser(
      req
    );
    const myResponse = {
      message: 'Total Number of User fetched Successfully.',
      success: true,
      totalNumberOfUser: totalNumberOfUser,
    };
    res.status(StatusCodes.OK).json(myResponse);
  }
);
