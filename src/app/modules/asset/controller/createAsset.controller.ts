import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import sendResponse from '../../../../shared/sendResponse';
import { getDataFromFormOfRequest } from '../../../../helpers/getDataFromFormAR7';
import { assetModel } from '../model/asset.model';
import { saveAndGiveRefinedUrl } from '../../../../helpers/saveAndGiveRefinedLink';
import { userModelOfMantled } from '../../auth_v2/model/userModelOfMantled.model';
import { sendCollaboratorInvitationEmail } from '../../../../helpers/sendEmailToJoinAsCollaborator';
import { sendEmailToSignUpAndJoinAsCollaborator } from '../../../../helpers/sendEmailToCreateANewAccountAndJoinAsCollaborator';
import { getAndParseJwtTokenFromHeader } from '../../../../helpers/getAndParseBearerTokenFromHeader';
import { jwtSecretKey } from '../../../../data/environmentVariables';
import { invitationModelOfMantled } from '../../invitation/model/invitation.controller';

export const createAssetController = myControllerHandler(async (req, res) => {
  const authData = await getAndParseJwtTokenFromHeader(req, jwtSecretKey);
  const { email } = authData;
  const userData = await userModelOfMantled.findOne({ email });
  if (!userData) {
    throw new Error('User does not exists');
  }
  const myData = await getDataFromFormOfRequest(req);
  const { fields, files } = myData;

  const assetType = fields.assetType[0].toLowerCase();
  const collaboratorEmail = fields.collaboratorEmail[0];
  const assetName = fields.assetName[0];
  const assetDetails = fields.assetDetails[0];
  const beneficiaryName = fields.beneficiaryName[0];
  const beneficiaryDateOfBirth = fields.beneficiaryDateOfBirth[0];
  const relationWithBeneficiary = fields.relationWithBeneficiary[0];

  const assetDocumentUrl = await saveAndGiveRefinedUrl(
    files.assetDocument[0],
    './public/images/documents/'
  );
  const beneficiaryDocumentUrl = await saveAndGiveRefinedUrl(
    files.beneficiaryDocument[0],
    './public/images/documents/'
  );

  let assetDateAfterSaved;

  if (assetType === 'real estate') {
    const assetCountry = fields.assetCountry[0];
    const assetState = fields.assetState[0];
    const assetAddress = fields.assetAddress[0];

    assetDateAfterSaved = await assetModel.create({
      ownerId: userData.id,
      assetName,
      type: assetType,
      assetDetails,
      assetCountry,
      assetState,
      assetAddress,
      beneficiaryName,
      beneficiaryDateOfBirth,
      relationWithBeneficiary,
      assetDocumentUrl,
      beneficiaryDocumentUrl,
    });
  } else if (
    assetType === 'financial asset' ||
    assetType === 'debts & liabilities'
  ) {
    const accountNumber = fields.accountNumber[0];
    const accountName = fields.accountName[0];

    assetDateAfterSaved = await assetModel.create({
      ownerId: userData.id,
      assetName,
      type: assetType,
      assetDetails,
      accountNumber,
      accountName,
      beneficiaryName,
      beneficiaryDateOfBirth,
      relationWithBeneficiary,
      assetDocumentUrl,
      beneficiaryDocumentUrl,
    });
  } else if (
    assetType === 'tangible asset' ||
    assetType === 'personal docs' ||
    assetType === 'memoirs/others'
  ) {
    assetDateAfterSaved = await assetModel.create({
      ownerId: userData.id,
      assetName,
      type: assetType,
      assetDetails,
      beneficiaryName,
      beneficiaryDateOfBirth,
      relationWithBeneficiary,
      assetDocumentUrl,
      beneficiaryDocumentUrl,
    });
  }

  if (collaboratorEmail) {
    const collaboratorData = await userModelOfMantled.findOne({
      email: collaboratorEmail,
    });
    if (collaboratorData) {
      if (collaboratorData.role === 'collaborator') {
        await sendCollaboratorInvitationEmail(
          collaboratorEmail,
          collaboratorData.fullName,
          assetName
        );
      } else {
        throw new Error(
          `The invited person is a ${collaboratorData.role}, not collaborator`
        );
      }
    } else {
      await sendEmailToSignUpAndJoinAsCollaborator(
        collaboratorEmail,
        assetName
      );
    }
    await invitationModelOfMantled.create({
      inviterEmail: email,
      inviteeEmail: collaboratorEmail,
      assetId: assetDateAfterSaved?.id,
    });
  }

  sendResponse(res, {
    code: StatusCodes.OK,
    message: 'Asset Created Successfully',
    data: {},
  });
});
