import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import sendResponse from '../../../../shared/sendResponse';
import { getAndParseJwtTokenFromHeader } from '../../../../helpers/getAndParseBearerTokenFromHeader';
import { jwtSecretKey } from '../../../../data/environmentVariables';
import { NotificationModel } from '../model/notification.model';

export const getNotificationController = myControllerHandler(
  async (req, res) => {
    const authData = await getAndParseJwtTokenFromHeader(req, jwtSecretKey);
    const { email } = authData;

    const notificationsData = await NotificationModel.find({
      userEmail: email,
    })
      .sort({ createdAt: -1 }) // Sort by `createdAt` in descending order
      .limit(10);

    sendResponse(res, {
      code: StatusCodes.OK,
      message: 'Notification Given Successfully',
      data: notificationsData,
    });
  }
);
