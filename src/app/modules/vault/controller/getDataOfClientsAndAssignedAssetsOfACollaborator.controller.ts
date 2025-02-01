import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { getRequestAndGiveDataOfAssignedAssets } from '../../../../helpers_v2/request/getRequestAndGiveDataOfAssignedAssets.helper';
import { getRequestAndGiveDataOfClients } from '../../../../helpers/getRequestAndGiveDataOfClients';

export const getDataOfClientsAndAssignedAssetsOfACollaboratorController =
  myControllerHandler(async (req, res) => {
    const assignedAssetsData = await getRequestAndGiveDataOfAssignedAssets(req);
    const clientsData = await getRequestAndGiveDataOfClients(req);

    const myResponse = {
      message: 'Data Fetched Successfull',
      success: true,
      assignedAssetsData,
      clientsData,
    };
    res.status(StatusCodes.OK).json(myResponse);
  });
