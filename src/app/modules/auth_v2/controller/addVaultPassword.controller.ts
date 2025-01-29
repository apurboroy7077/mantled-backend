import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import sendResponse from '../../../../shared/sendResponse';
import { getAndParseJwtTokenFromHeader } from '../../../../helpers/getAndParseBearerTokenFromHeader';
import { jwtSecretKey } from '../../../../data/environmentVariables';
import { hashMyPassword } from '../../../../helpers/passwordHashing';
import { userModelOfMantled } from '../model/userModelOfMantled.model';

export const addVaultPasswordController = myControllerHandler(
  async (req, res) => {
    const tokenData = await getAndParseJwtTokenFromHeader(req, jwtSecretKey);
    const { email } = tokenData;
    const { vaultPassword } = req.body;
    const passwordHash = await hashMyPassword(vaultPassword);
    await userModelOfMantled.findOneAndUpdate(
      { email },
      { vaultPasswordHash: passwordHash }
    );

    sendResponse(res, {
      code: StatusCodes.OK,
      message: 'Vault password updated successfully',
      data: {},
    });
  }
);
