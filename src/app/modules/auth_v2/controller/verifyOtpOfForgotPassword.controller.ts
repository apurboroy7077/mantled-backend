import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import sendResponse, { sendResponse2 } from '../../../../shared/sendResponse';
import { dataOfResetPasswordRequests } from '../../../../data/temporaryData';
import { giveAuthenticationToken } from '../../../../helpers/jwtAR7';
import { secretKeyOfChangingPasswordToken } from '../../../../data/environmentVariables';

export const verifyOtpOfForgotPasswordController = myControllerHandler(
  async (req, res) => {
    const { otp } = req.body;

    const userData = dataOfResetPasswordRequests.filter(
      (data: any) => otp === data.otp
    )[0];
    if (!userData) {
      throw new Error('Otp Not Valid');
    }
    const { email } = userData;
    const token = await giveAuthenticationToken(
      email,
      secretKeyOfChangingPasswordToken
    );

    sendResponse2(res, {
      code: StatusCodes.OK,
      message: 'Otp verified successfully',
      data: {},
      token,
    });
  }
);
