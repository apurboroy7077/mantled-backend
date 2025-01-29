import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import sendResponse from '../../../../shared/sendResponse';
import { GenerateRandom6DigitNumber } from '../../../../helpers/GenerateRandom5DigitNumber';
import { dataOfResetPasswordRequests } from '../../../../data/temporaryData';
import { sendOtpViaEmail } from '../../../../helpers/sendOtp';
import { sendOtpForPasswordChange } from '../../../../helpers/sendOtpToResetPassword';
import { userModelOfMantled } from '../model/userModelOfMantled.model';

export const forgotPasswordController = myControllerHandler(
  async (req, res) => {
    const { email } = req.body;
    const savedUserData = await userModelOfMantled.findOne({ email });
    if (!savedUserData) {
      throw new Error('No user exists with this email');
    }
    const otp = GenerateRandom6DigitNumber().toString();
    const nameOfUser = savedUserData.fullName;
    const dataOfUser = {
      email,
      otp,
    };
    dataOfResetPasswordRequests.push(dataOfUser);
    await sendOtpForPasswordChange(nameOfUser, email, otp);
    sendResponse(res, {
      code: StatusCodes.OK,
      message: 'Otp sent successfull',
      data: {},
    });
  }
);
