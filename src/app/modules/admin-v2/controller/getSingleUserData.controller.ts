import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { getAdminRequestAndGiveSingleUserData } from '../../../../helpers_v2/admin-requests/getAdminRequestAndGiveSingleUserData.helper';

export const getSingleUserDataController = myControllerHandler(
  async (req, res) => {
    const singleUserData = await getAdminRequestAndGiveSingleUserData(req);

    const myResponse = {
      message: `User's data fetched successfully`,
      success: true,
      data: singleUserData,
    };
    res.status(StatusCodes.OK).json(myResponse);
  }
);
