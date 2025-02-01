import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import sendResponse from '../../../../shared/sendResponse';
import { getAndParseTokenFromHeader2 } from '../../../../helpers/getAndParseBearerTokenFromHeader';
import { jwtSecretKeyOfVault } from '../../../../data/environmentVariables';
import { userModelOfMantled } from '../../auth_v2/model/userModelOfMantled.model';
import { assetModel } from '../../asset/model/asset.model';
import { collaborationModelOfMantled } from '../../collaboration/model/collaboration.model';
import { removeDuplicates } from '../../../../helpers/removeDuplicatesFromStringOfArray';

export const getAssignedCollaboratorDataController = myControllerHandler(
  async (req, res) => {
    const vaultTokenData = await getAndParseTokenFromHeader2(
      req,
      jwtSecretKeyOfVault,
      'vaulttoken'
    );
    const { email } = vaultTokenData;

    const userData = await userModelOfMantled.findOne({ email });
    if (!userData) {
      throw new Error('User does not exists');
    }
    const assetsOfUser = await assetModel.find({ ownerId: userData.id });
    const arrayOfAssetId: any = [];
    for (let i = 0; i < assetsOfUser.length; i++) {
      arrayOfAssetId.push(assetsOfUser[i].id);
    }
    const collaborationDataOfUser = await collaborationModelOfMantled.find({
      assetId: { $in: arrayOfAssetId },
    });
    let arrayOfCollaboratorId: any = [];
    for (let i = 0; i < collaborationDataOfUser.length; i++) {
      arrayOfCollaboratorId.push(collaborationDataOfUser[i].collaboratorId);
    }
    arrayOfCollaboratorId = removeDuplicates(arrayOfCollaboratorId);
    const dataOfCollaborators = await userModelOfMantled.find({
      id: { $in: arrayOfCollaboratorId },
    });
    const refinedDataOfCollaborator = [];
    for (let i = 0; i < dataOfCollaborators.length; i++) {
      const singleData = dataOfCollaborators[i];
      const { id, email, fullName, phoneNumber, profileImageUrl } = singleData;
      const refinedSingleData = {
        id,
        email,
        fullName,
        phoneNumber,
        profileImageUrl,
      };
      refinedDataOfCollaborator.push(refinedSingleData);
    }

    sendResponse(res, {
      code: StatusCodes.OK,
      message: 'Review Given Successfully',
      data: {
        dataOfCollaborators: refinedDataOfCollaborator,
      },
    });
  }
);
