import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import sendResponse from '../../../../shared/sendResponse';
import { getAndParseJwtTokenFromHeader } from '../../../../helpers/getAndParseBearerTokenFromHeader';
import { jwtSecretKey } from '../../../../data/environmentVariables';
import { invitationModelOfMantled } from '../model/invitation.controller';
import { collaborationModelOfMantled } from '../../collaboration/model/collaboration.model';
import { userModelOfMantled } from '../../auth_v2/model/userModelOfMantled.model';

export const acceptOrRejectInvitationController = myControllerHandler(
  async (req, res) => {
    const authData = await getAndParseJwtTokenFromHeader(req, jwtSecretKey);
    const { email } = authData;
    const { inviteId, action } = req.body;
    const inviteData = await invitationModelOfMantled.findOne({ id: inviteId });
    const userData = await userModelOfMantled.findOne({ email });
    console.log(userData);
    if (!userData) {
      throw new Error('User with this token does not exists');
    }
    if (!inviteData) {
      throw new Error('Invalid invitation id');
    }

    if (inviteData.status !== 'pending') {
      throw new Error('Action for this invitation already taken');
    }
    if (userData.id !== inviteData.inviteeId) {
      throw new Error('The user has no right to take action of this invite');
    }
    const { assetId, permission } = inviteData;

    if (action === 'accept') {
      await collaborationModelOfMantled.create({
        assetId: assetId,
        collaboratorId: inviteData.inviteeId,
        permission: permission,
      });
      await invitationModelOfMantled.findOneAndUpdate(
        { id: inviteId },
        {
          status: 'accepted',
        }
      );
    } else if (action === 'reject') {
      await invitationModelOfMantled.findOneAndUpdate(
        { id: inviteId },
        {
          status: 'rejected',
        }
      );
    }

    sendResponse(res, {
      code: StatusCodes.OK,
      message: 'Invitation Action Completed',
      data: {},
    });
  }
);
