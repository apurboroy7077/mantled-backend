import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { getAndParseTokenFromHeader2 } from '../../../../helpers/getAndParseBearerTokenFromHeader';
import { jwtSecretKeyOfVault } from '../../../../data/environmentVariables';
import { userModelOfMantled } from '../../auth_v2/model/userModelOfMantled.model';
import { invitationModelOfMantled } from '../../invitation/model/invitation.controller';
import { removeDuplicates } from '../../../../helpers/removeDuplicatesFromStringOfArray';
import { checkIsBanned } from '../../../../helpers_v2/auth/checkIsBanned.helper';

export const getDataOfInvitationSentToCollaboratorController =
  myControllerHandler(async (req, res) => {
    const vaultTokenData = await getAndParseTokenFromHeader2(
      req,
      jwtSecretKeyOfVault,
      'vaulttoken'
    );
    const { email } = vaultTokenData;
    const userData = await userModelOfMantled.findOne({ email });
    if (!userData) {
      throw new Error('User Does not Exists');
    }
    await checkIsBanned(userData);
    const dataOfInvitations = await invitationModelOfMantled.find({
      inviterId: userData.id,
    });
    let arrayOfInviteeId: any = [];

    for (let i = 0; i < dataOfInvitations.length; i++) {
      arrayOfInviteeId.push(dataOfInvitations[i].inviteeId);
    }

    arrayOfInviteeId = removeDuplicates(arrayOfInviteeId);

    const inviteeData = await userModelOfMantled.find({
      id: { $in: arrayOfInviteeId },
    });

    const refinedDataOfInvitation: any = [];
    for (let i = 0; i < dataOfInvitations.length; i++) {
      const singleInvitationData = dataOfInvitations[i];
      const data = {
        date: singleInvitationData.createdAt,
        inviteeId: singleInvitationData.inviteeId,
        assetId: singleInvitationData.assetId,
        invitationStatus: singleInvitationData.status,
      };
      refinedDataOfInvitation.push(data);
    }

    for (let i = 0; i < refinedDataOfInvitation.length; i++) {
      const singleData = refinedDataOfInvitation[i];
      for (let i = 0; i < inviteeData.length; i++) {
        if (inviteeData[i].id === singleData.inviteeId) {
          singleData.imageUrlOfInvitee = inviteeData[i].profileImageUrl;
          singleData.inviteeName = inviteeData[i].fullName;
        }
      }
    }
    console.log(refinedDataOfInvitation);

    res.status(StatusCodes.OK).json({
      message: 'Invitation Data Given Successfully',
      success: true,
      dataOfInvitations: refinedDataOfInvitation,
    });
  });
