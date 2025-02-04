import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { getAdminRequestAndGiveSingleUserData } from '../../../../helpers_v2/admin-requests/getAdminRequestAndGiveSingleUserData.helper';
import { checkIfUserRequestingAdmin2 } from '../../../../helpers/checkIfRequestedUserAdmin';
import { jwtSecretKey } from '../../../../data/environmentVariables';
import { userModelOfMantled } from '../../auth_v2/model/userModelOfMantled.model';

export const getSingleUserDataController = myControllerHandler(
  async (req, res) => {
    await checkIfUserRequestingAdmin2(req, jwtSecretKey, userModelOfMantled);
    const singleUserData = await getAdminRequestAndGiveSingleUserData(req);

    const myResponse = {
      message: `User's data fetched successfully`,
      success: true,
      data: singleUserData,
    };
    res.status(StatusCodes.OK).json(myResponse);
  }
);
