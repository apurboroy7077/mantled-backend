import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { getAdminRequestAndGiveNotifications } from '../../../../helpers_v2/admin-requests/getAdminRequestAndGiveNotifications.helper';

export const getNotificationsForAdminController = myControllerHandler(
  async (req, res) => {
    const notifications = await getAdminRequestAndGiveNotifications(req);
    console.log(notifications);
    const myResponse = {
      message: 'Review Given Successfully',
      success: true,
      notifications,
    };
    res.status(StatusCodes.OK).json(myResponse);
  }
);
