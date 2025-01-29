import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import sendResponse from '../../../../shared/sendResponse';
import { unverifiedUsers } from '../../../../data/temporaryData';
import { userModelOfMantled } from '../model/userModelOfMantled.model';

export const verifyOtpController = myControllerHandler(async (req, res) => {
  const { otp } = req.body;
  const userData = unverifiedUsers.filter((data: any) => data.otp === otp)[0];
  console.log(userData);
  if (!userData) {
    throw new Error('Otp not valid');
  }
  const { email, role, fullName, phoneNumber, passwordHash } = userData;
  await userModelOfMantled.create({
    email,
    role,
    fullName,
    phoneNumber,
    passwordHash,
  });
  sendResponse(res, {
    code: StatusCodes.OK,
    message: 'Otp verification complete, account created successfully',
    data: {},
  });
});
