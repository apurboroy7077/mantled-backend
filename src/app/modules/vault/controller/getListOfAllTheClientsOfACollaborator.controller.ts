import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { getRequestAndGiveDataOfClients } from '../../../../helpers/getRequestAndGiveDataOfClients';

export const getListOfAllTheClientsOfACollaboratorController =
  myControllerHandler(async (req, res) => {
    const clientsData = await getRequestAndGiveDataOfClients(req);
    const myResponse = {
      message: 'Data Of Clients Fetched Successful',
      success: true,
      clientsData: clientsData,
    };
    res.status(StatusCodes.OK).json(myResponse);
  });
