import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { getAdminRequestAndGiveRecentUsers } from '../../../../helpers_v2/admin-requests/getAdminRequestAndGiveRecentUsers.helper';
import { checkIfUserRequestingAdmin2 } from '../../../../helpers/checkIfRequestedUserAdmin';
import { jwtSecretKey } from '../../../../data/environmentVariables';
import { userModelOfMantled } from '../../auth_v2/model/userModelOfMantled.model';

export const getRecentUsersController = myControllerHandler(
  async (req, res) => {
    await checkIfUserRequestingAdmin2(req, jwtSecretKey, userModelOfMantled);
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
