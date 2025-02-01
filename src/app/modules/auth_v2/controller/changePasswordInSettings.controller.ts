import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { getAndParseJwtTokenFromHeader } from '../../../../helpers/getAndParseBearerTokenFromHeader';
import { jwtSecretKey } from '../../../../data/environmentVariables';
import { userModelOfMantled } from '../model/userModelOfMantled.model';
import {
  checkMyPassword,
  hashMyPassword,
} from '../../../../helpers/passwordHashing';

export const changePasswordInSettingsController = myControllerHandler(
  async (req, res) => {
    const authData = await getAndParseJwtTokenFromHeader(req, jwtSecretKey);
    const { email } = authData;
    const userData = await userModelOfMantled.findOne({ email });
    if (!userData) {
      throw new Error('User does not exists');
    }
    const { oldPassword, newPassword } = req.body;
    await checkMyPassword(oldPassword, userData.passwordHash);

    const passwordHashOfNewPassword = await hashMyPassword(newPassword);
    await userModelOfMantled.findOneAndUpdate(
      {
        id: userData.id,
      },
      {
        passwordHash: passwordHashOfNewPassword,
      }
    );

    res.status(StatusCodes.OK).json({
      message: 'Password Changed Successfully',
      success: true,
      data: {},
    });
  }
);
