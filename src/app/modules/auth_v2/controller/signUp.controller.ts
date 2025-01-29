import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import sendResponse from '../../../../shared/sendResponse';
import { userModelOfMantled } from '../model/userModelOfMantled.model';
import { hashMyPassword } from '../../../../helpers/passwordHashing';
import { GenerateRandom6DigitNumber } from '../../../../helpers/GenerateRandom5DigitNumber';
import { unverifiedUsers } from '../../../../data/temporaryData';
import { sendOtpViaEmail } from '../../../../helpers/sendOtp';

export const signUpController = myControllerHandler(async (req, res) => {
  const { email, password, role, fullName, phoneNumber } = req.body;
  if (!email || !password || !role || !fullName || !phoneNumber) {
    throw new Error(
      'All fields are required: email, password, role, fullName, phoneNumber'
    );
  }

  const userData = await userModelOfMantled.findOne({ email });
  if (userData) {
    throw new Error('User with this email already exists');
  }
  const passwordHash = await hashMyPassword(password);
  const otp = GenerateRandom6DigitNumber().toString();
  const temporaryUserData = {
    email,
    password,
    role,
    fullName,
    phoneNumber,
    passwordHash,
    otp,
  };
  unverifiedUsers.push(temporaryUserData);
  await sendOtpViaEmail(fullName, email, otp);

  sendResponse(res, {
    code: StatusCodes.OK,
    message: 'Otp Sent Successfully',
    data: {},
  });
});
