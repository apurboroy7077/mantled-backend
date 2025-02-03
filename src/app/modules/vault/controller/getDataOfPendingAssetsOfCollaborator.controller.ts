import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { getRequestAndGiveDataOfPendingAssetsOfCollaborators } from '../../../../helpers_v2/request/getRequestAndGiveDataOfPendingAssetsOfCollaborators.helper';

export const getDataOfPendingAssetsOfCollaboratorController =
  myControllerHandler(async (req, res) => {
    const dataOfPendingAssets =
      await getRequestAndGiveDataOfPendingAssetsOfCollaborators(req);

    const myResponse = {
      message: 'Pending Asset Data Fetched Successfull',
      success: true,
      dataOfPendingAssets,
    };
    res.status(StatusCodes.OK).json(myResponse);
  });
