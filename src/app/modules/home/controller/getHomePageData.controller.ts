import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import sendResponse from '../../../../shared/sendResponse';
import { getAndParseJwtTokenFromHeader } from '../../../../helpers/getAndParseBearerTokenFromHeader';
import { jwtSecretKey } from '../../../../data/environmentVariables';
import { userModelOfMantled } from '../../auth_v2/model/userModelOfMantled.model';
import { assetModel } from '../../asset/model/asset.model';
import { collaborationModelOfMantled } from '../../collaboration/model/collaboration.model';
import { getTotalNumberOfUniqueCollaborators } from '../../../../helpers/getTotalUniqueCollaborators';
import { givePercentageOfAsset } from '../../../../helpers/givePercentageOfAssets';
import { givePercentageOfAsset2 } from '../../../../helpers/givePercentageOfAsset2';

export const getHomepageDataController = myControllerHandler(
  async (req, res) => {
    const tokenData = await getAndParseJwtTokenFromHeader(req, jwtSecretKey);
    const { email } = tokenData;
    let dataForClient: any = {};
    const userData = await userModelOfMantled.findOne({ email });
    if (!userData) {
      throw new Error('user does not exists');
    }

    if (userData.role === 'user') {
      dataForClient.username = userData.fullName;
      dataForClient.profileImageUrl = userData.profileImageUrl;
      const assetsData = await assetModel.find({ ownerId: userData.id });
      dataForClient.totalNumberOfAssets = assetsData.length;
      const arrayOfAssetId = [];
      for (let i = 0; i < assetsData.length; i++) {
        const singleId = assetsData[i].id;
        arrayOfAssetId.push(singleId);
      }
      const totalCollaborationData = await collaborationModelOfMantled.find({
        assetId: { $in: arrayOfAssetId },
      });
      const totalNumberOfCollaborators = getTotalNumberOfUniqueCollaborators(
        totalCollaborationData
      );
      dataForClient.totalNumberOfCollaborators = totalNumberOfCollaborators;
      const assetPercentage = givePercentageOfAsset2(assetsData);
      dataForClient.assetPercentage = assetPercentage;
    } else if (userData.role === 'collaborator') {
      dataForClient.username = userData.fullName;
      dataForClient.profileImageUrl = userData.profileImageUrl;
      const collaborationData = await collaborationModelOfMantled.find({
        collaboratorId: userData.id,
      });
      const arrayOfAssignedAssetId: any = [];
      for (let i = 0; i < collaborationData.length; i++) {
        const singleCollaborationData = collaborationData[i];
        arrayOfAssignedAssetId.push(singleCollaborationData.assetId);
      }
      const assignedAssetData = await assetModel.find({
        id: { $in: arrayOfAssignedAssetId },
      });
      dataForClient.totalNumberOfAssignedAssets = assignedAssetData.length;
      const percentageOfAssignedAssets =
        givePercentageOfAsset2(assignedAssetData);
      dataForClient.percentageOfAssignedAssets = percentageOfAssignedAssets;
    }

    const myResponse = {
      message: 'Data Fetched Successfully',
      success: true,
      ...dataForClient,
    };

    res.status(StatusCodes.OK).json(myResponse);
  }
);
