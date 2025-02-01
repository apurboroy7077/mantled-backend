import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { getRequestAndGiveDataOfAssignedAssets } from '../../../../helpers_v2/request/getRequestAndGiveDataOfAssignedAssets.helper';

export const getListOfAllTheAssetsAssignedToCollaboratorController =
  myControllerHandler(async (req, res) => {
    const refinedAssetsData = await getRequestAndGiveDataOfAssignedAssets(req);

    const myResponse = {
      message: 'Review Given Successfully',
      success: true,
      assignedAssets: refinedAssetsData,
    };
    res.status(StatusCodes.OK).json(myResponse);
  });
