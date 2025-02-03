import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import sendResponse from '../../../../shared/sendResponse';
import { getAndParseTokenFromHeader2 } from '../../../../helpers/getAndParseBearerTokenFromHeader';
import { jwtSecretKeyOfVault } from '../../../../data/environmentVariables';
import { userModelOfMantled } from '../../auth_v2/model/userModelOfMantled.model';
import { assetModel } from '../../asset/model/asset.model';
import { checkIsBanned } from '../../../../helpers_v2/auth/checkIsBanned.helper';

export const getDataOfAssetController = myControllerHandler(
  async (req, res) => {
    const vaultTokenData = await getAndParseTokenFromHeader2(
      req,
      jwtSecretKeyOfVault,
      'vaulttoken'
    );
    const { email } = vaultTokenData;
    const { assetType } = req.body;

    const userData = await userModelOfMantled.findOne({ email });
    if (!userData) {
      throw new Error('user does not exists');
    }
    await checkIsBanned(userData);
    let dataForClient: any;

    if (assetType) {
      dataForClient = await assetModel.find({
        ownerId: userData.id,
        type: assetType,
      });
    } else {
      dataForClient = await assetModel.find({
        ownerId: userData.id,
      });
    }

    sendResponse(res, {
      code: StatusCodes.OK,
      message: 'Asset Data Fethed Successfull',
      data: {
        assetsData: dataForClient,
      },
    });
  }
);
