import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import sendResponse from '../../../../shared/sendResponse';
import { getAndParseJwtTokenFromHeader } from '../../../../helpers/getAndParseBearerTokenFromHeader';
import { jwtSecretKey } from '../../../../data/environmentVariables';
import { userModelOfMantled } from '../../auth_v2/model/userModelOfMantled.model';
import { assetModel } from '../../asset/model/asset.model';
import { collaborationModelOfMantled } from '../model/collaboration.model';
import { invitationModelOfMantled } from '../../invitation/model/invitation.controller';

export const addCollaboratorController = myControllerHandler(
  async (req, res) => {
    const authData = await getAndParseJwtTokenFromHeader(req, jwtSecretKey);
    const { assetId, emailOfCollaborator, permission } = req.body;
    const { email } = authData;
    const userData = await userModelOfMantled.findOne({ email });
    if (!userData) {
      throw new Error('user does not exists');
    }
    const userId = userData.id;
    const assetData = await assetModel.findOne({ id: assetId });
    if (!assetData) {
      throw new Error('Asset does not exists');
    }
    if (assetData.ownerId !== userId) {
      throw new Error('The user who requested is not owner of this asset');
    }

    await invitationModelOfMantled.create({
      assetId,
      inviterId: userId,
      inviteeEmail: emailOfCollaborator,
      permission,
    });

    sendResponse(res, {
      code: StatusCodes.OK,
      message: 'Invite Sent Successfully',
      data: {},
    });
  }
);
