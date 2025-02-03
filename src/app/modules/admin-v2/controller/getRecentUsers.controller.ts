import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { getAdminRequestAndGiveRecentUsers } from '../../../../helpers_v2/admin-requests/getAdminRequestAndGiveRecentUsers.helper';

export const getRecentUsersController = myControllerHandler(
  async (req, res) => {
    const recentUsers = await getAdminRequestAndGiveRecentUsers(req);
    console.log(recentUsers);
    const myResponse = {
      message: 'Review Given Successfully',
      success: true,
      recentUsers,
    };
    res.status(StatusCodes.OK).json(myResponse);
  }
);
