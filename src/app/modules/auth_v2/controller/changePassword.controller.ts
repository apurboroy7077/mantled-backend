import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import sendResponse from '../../../../shared/sendResponse';
import { parseJwtToken } from '../../../../helpers/jwtAR7';
import {
  adminChangingPasswordJwtSecretKey,
  secretKeyOfChangingPasswordToken,
} from '../../../../data/environmentVariables';
import { hashMyPassword } from '../../../../helpers/passwordHashing';
import { userDataModelOfWeatherConsumerReport } from '../../user/userModelOfWeatherConsumerReport.model';
import { userModelOfMantled } from '../model/userModelOfMantled.model';

export const changePasswordController = myControllerHandler(
  async (req, res) => {
    const { jwtToken, newPassword } = req.body;
    const { email } = await parseJwtToken(
      jwtToken,
      secretKeyOfChangingPasswordToken
    );
    const newHashedPassword = await hashMyPassword(newPassword);

    await userModelOfMantled.findOneAndUpdate(
      { email },
      { passwordHash: newHashedPassword }
    );

    sendResponse(res, {
      code: StatusCodes.OK,
      message: 'password changed successfully',
      data: {},
    });
  }
);
