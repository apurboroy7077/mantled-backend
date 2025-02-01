import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { getAndParseJwtTokenFromHeader } from '../../../../helpers/getAndParseBearerTokenFromHeader';
import { jwtSecretKey } from '../../../../data/environmentVariables';
import {
  checkMyPassword,
  hashMyPassword,
} from '../../../../helpers/passwordHashing';
import { userModelOfMantled } from '../model/userModelOfMantled.model';

export const updateVaultPasswordController = myControllerHandler(
  async (req, res) => {
    const authData = await getAndParseJwtTokenFromHeader(req, jwtSecretKey);
    const { email } = authData;
    const { oldVaultPassword, newVaultPassword } = req.body;
    const userData = await userModelOfMantled.findOne({ email });
    if (!userData) {
      throw new Error('User does not exists with this token');
    }
    const vaultPasswordHash = userData.vaultPasswordHash as string;

    await checkMyPassword(oldVaultPassword, vaultPasswordHash);
    const newVaultPasswordHash = await hashMyPassword(newVaultPassword);
    await userModelOfMantled.findOneAndUpdate(
      { id: userData.id },
      { vaultPasswordHash: newVaultPasswordHash }
    );

    res.status(StatusCodes.OK).json({
      message: 'Vault Password Updated Successfully',
      success: true,
      data: {},
    });
  }
);
