import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import sendResponse from '../../../../shared/sendResponse';
import { getAndParseJwtTokenFromHeader } from '../../../../helpers/getAndParseBearerTokenFromHeader';
import { jwtSecretKey } from '../../../../data/environmentVariables';
import { NotificationModel } from '../model/notification.model';
import { userModelOfMantled } from '../../auth_v2/model/userModelOfMantled.model';

export const getNotificationController = myControllerHandler(
  async (req, res) => {
    const authData = await getAndParseJwtTokenFromHeader(req, jwtSecretKey);
    const { email } = authData;
    const userData = await userModelOfMantled.findOne({ email });
    if (!userData) {
      throw new Error('user does not exists');
    }
    const notificationsData = await NotificationModel.find({
      userId: userData.id,
    })
      .sort({ createdAt: -1 }) // Sort by `createdAt` in descending order
      .limit(10);

    const myResponse = {
      message: 'Data Fetched Successfully',
      success: true,
      notificationsData,
    };

    res.status(StatusCodes.OK).json(myResponse);
  }
);
