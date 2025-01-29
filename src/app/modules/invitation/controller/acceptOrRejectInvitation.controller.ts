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
    if (!inviteData) {
      throw new Error('Invalid invitation id');
    }
    if (inviteData.status !== 'pending') {
      throw new Error('Action for this invitation already taken');
    }
    if (email !== inviteData.inviteeEmail) {
      throw new Error('The user has no right to take action of this invite');
    }
    const { assetId, inviteeEmail, permission } = inviteData;
    const dataOfInvitee = await userModelOfMantled.findOne({
      email: inviteeEmail,
    });
    if (!dataOfInvitee) {
      throw new Error(
        'The invitee did not created a account yet to become collaborator'
      );
    }
    const idOfInvitee = await dataOfInvitee.id;

    if (action === 'accept') {
      await collaborationModelOfMantled.create({
        assetId: assetId,
        collaboratorId: idOfInvitee,
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
