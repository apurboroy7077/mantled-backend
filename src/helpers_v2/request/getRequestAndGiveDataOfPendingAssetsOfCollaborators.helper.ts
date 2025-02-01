import { assetModel } from '../../app/modules/asset/model/asset.model';
import { userModelOfMantled } from '../../app/modules/auth_v2/model/userModelOfMantled.model';
import { collaborationModelOfMantled } from '../../app/modules/collaboration/model/collaboration.model';
import { invitationModelOfMantled } from '../../app/modules/invitation/model/invitation.controller';
import { jwtSecretKeyOfVault } from '../../data/environmentVariables';
import { formatDateAR7 } from '../../helpers/formatTimeAR7';
import { getAndParseTokenFromHeader2 } from '../../helpers/getAndParseBearerTokenFromHeader';

export const getRequestAndGiveDataOfPendingAssetsOfCollaborators = (
  req: any
) => {
  return new Promise(async (resolve, reject) => {
    try {
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

      const invitationData = await invitationModelOfMantled.find({
        inviteeId: userData.id,
        status: 'pending',
      });
      const arrayOfAssetId = [];

      for (let i = 0; i < invitationData.length; i++) {
        arrayOfAssetId.push(invitationData[i].assetId);
      }

      const assetsData = await assetModel.find({ id: { $in: arrayOfAssetId } });

      const refinedAssetsData: any = [];

      for (let i = 0; i < assetsData.length; i++) {
        const { assetName, id, assetDocumentUrl } = assetsData[i];
        refinedAssetsData.push({
          assetName,
          assetId: id,
          assetImage: assetDocumentUrl,
        });
      }

      for (let i = 0; i < refinedAssetsData.length; i++) {
        const singleAssetData = refinedAssetsData[i];
        for (let i = 0; i < invitationData.length; i++) {
          const singleCollaborationData: any = invitationData[i];
          if (singleAssetData.assetId === singleCollaborationData.assetId) {
            singleAssetData.invitedOn = formatDateAR7(
              singleCollaborationData.createdAt
            );
          }
        }
      }
      resolve(refinedAssetsData);

      console.log(assetsData);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
