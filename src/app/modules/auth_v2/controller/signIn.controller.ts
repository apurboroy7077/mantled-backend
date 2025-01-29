import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import sendResponse, { sendResponse2 } from '../../../../shared/sendResponse';
import { userModelOfMantled } from '../model/userModelOfMantled.model';
import { checkMyPassword } from '../../../../helpers/passwordHashing';
import { giveAuthenticationToken } from '../../../../helpers/jwtAR7';
import { jwtSecretKey } from '../../../../data/environmentVariables';

export const signInController = myControllerHandler(async (req, res) => {
  const { email, password } = req.body;
  const userData = await userModelOfMantled.findOne({ email });
  if (!userData) {
    throw new Error('No user is registered with this email');
  }
  const { passwordHash } = userData;
  //   check password
  await checkMyPassword(password, passwordHash);
  //   make authentication token
  const jwtToken = await giveAuthenticationToken(email, jwtSecretKey);
  const bearerToken = `Bearer ${jwtToken}`;

  sendResponse2(res, {
    code: StatusCodes.OK,
    message: 'Signed in Successfully',
    data: {},
    token: bearerToken,
  });
});
