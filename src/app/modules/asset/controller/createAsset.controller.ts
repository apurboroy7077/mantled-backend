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
    throw new Error('User does not exist');
  }

  const myData = await getDataFromFormOfRequest(req);
  const { fields, files } = myData;

  // Ensure ownerId and assetName are provided
  const ownerId = userData.id;
  const assetName = fields.assetName ? fields.assetName[0] : null;
  if (!assetName) {
    throw new Error('Asset name is required');
  }

  // Set optional fields with default values if not present
  const assetType = fields.assetType ? fields.assetType[0].toLowerCase() : '';
  const collaboratorEmail = fields.collaboratorEmail
    ? fields.collaboratorEmail[0]
    : '';
  const assetDetails = fields.assetDetails ? fields.assetDetails[0] : '';
  const beneficiaryName = fields.beneficiaryName
    ? fields.beneficiaryName[0]
    : '';
  const beneficiaryDateOfBirth = fields.beneficiaryDateOfBirth
    ? fields.beneficiaryDateOfBirth[0]
    : '';
  const relationWithBeneficiary = fields.relationWithBeneficiary
    ? fields.relationWithBeneficiary[0]
    : '';

  let assetDocumentUrl = '';
  let beneficiaryDocumentUrl = '';

  // Handle file uploads
  if (files.assetDocument && files.assetDocument[0]) {
    assetDocumentUrl = await saveAndGiveRefinedUrl(
      files.assetDocument[0],
      './public/images/documents/'
    );
  }

  if (files.beneficiaryDocument && files.beneficiaryDocument[0]) {
    beneficiaryDocumentUrl = await saveAndGiveRefinedUrl(
      files.beneficiaryDocument[0],
      './public/images/documents/'
    );
  }

  let assetDateAfterSaved;

  if (assetType === 'real estate') {
    const assetCountry = fields.assetCountry ? fields.assetCountry[0] : '';
    const assetState = fields.assetState ? fields.assetState[0] : '';
    const assetAddress = fields.assetAddress ? fields.assetAddress[0] : '';

    assetDateAfterSaved = await assetModel.create({
      ownerId,
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
    const accountNumber = fields.accountNumber ? fields.accountNumber[0] : '';
    const accountName = fields.accountName ? fields.accountName[0] : '';

    assetDateAfterSaved = await assetModel.create({
      ownerId,
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
      ownerId,
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

  // Handle collaborator email if provided
  if (collaboratorEmail) {
    const collaboratorData = await userModelOfMantled.findOne({
      email: collaboratorEmail,
    });
    if (collaboratorData) {
      if (collaboratorData.role === 'collaborator') {
        await invitationModelOfMantled.create({
          inviterId: userData.id,
          inviteeId: collaboratorData.id,
          assetId: assetDateAfterSaved?.id,
        });
      } else {
        throw new Error(
          `The invited person is a ${collaboratorData.role}, not a collaborator`
        );
      }
    } else {
      await sendEmailToSignUpAndJoinAsCollaborator(
        collaboratorEmail,
        assetName
      );
    }
  }

  sendResponse(res, {
    code: StatusCodes.OK,
    message: 'Asset Created Successfully',
    data: {},
  });
});
