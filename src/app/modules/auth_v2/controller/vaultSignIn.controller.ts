import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import sendResponse from '../../../../shared/sendResponse';
import { getAndParseJwtTokenFromHeader } from '../../../../helpers/getAndParseBearerTokenFromHeader';
import {
  jwtSecretKey,
  jwtSecretKeyOfVault,
} from '../../../../data/environmentVariables';
import { userModelOfMantled } from '../model/userModelOfMantled.model';
import { checkMyPassword } from '../../../../helpers/passwordHashing';
import { giveAuthenticationToken } from '../../../../helpers/jwtAR7';

export const vaultSignInController = myControllerHandler(async (req, res) => {
  const authData = await getAndParseJwtTokenFromHeader(req, jwtSecretKey);
  const { email } = authData;
  const { vaultPassword } = req.body;
  const userData = await userModelOfMantled.findOne({ email });
  if (!userData) {
    throw new Error('User does not exists.');
  }
  const passwordHashOfVaultPassword = userData.vaultPasswordHash as string;
  await checkMyPassword(vaultPassword, passwordHashOfVaultPassword);
  const vaultToken = await giveAuthenticationToken(email, jwtSecretKeyOfVault);

  sendResponse(res, {
    code: StatusCodes.OK,
    message: 'Review Given Successfully',
    data: {
      vaultToken: `Bearer ${vaultToken}`,
    },
  });
});
