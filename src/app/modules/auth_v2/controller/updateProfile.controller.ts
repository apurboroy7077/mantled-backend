import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { getDataFromFormOfRequest } from '../../../../helpers/getDataFromFormAR7';
import { getAndParseJwtTokenFromHeader } from '../../../../helpers/getAndParseBearerTokenFromHeader';
import { jwtSecretKey } from '../../../../data/environmentVariables';
import { userModelOfMantled } from '../model/userModelOfMantled.model';
import { saveFileToFolder } from '../../../../helpers/uploadFilesToFolder';
import refineUrlAr7 from '../../../../helpers/refineUrlAr7';

export const updateProfileController = myControllerHandler(async (req, res) => {
  const authData = await getAndParseJwtTokenFromHeader(req, jwtSecretKey);
  const dataFromUser = await getDataFromFormOfRequest(req);
  const { email } = authData;
  const userData = await userModelOfMantled.findOne({ email });
  if (!userData) {
    throw new Error('User does not exists');
  }

  const updateFields: any = {};

  if (dataFromUser.fields.name) {
    updateFields.fullName = dataFromUser.fields.name[0];
  }
  if (dataFromUser.fields.occupation) {
    updateFields.occupation = dataFromUser.fields.occupation[0];
  }
  if (dataFromUser.fields.maritalStatus) {
    updateFields.maritalStatus = dataFromUser.fields.maritalStatus[0];
  }
  if (dataFromUser.fields.email) {
    updateFields.email = dataFromUser.fields.email[0];
  }
  if (dataFromUser.fields.phoneNumber) {
    updateFields.phoneNumber = dataFromUser.fields.phoneNumber[0];
  }
  if (dataFromUser.fields.dateOfBirth) {
    updateFields.dateOfBirth = dataFromUser.fields.dateOfBirth[0];
  }
  if (dataFromUser.fields.address) {
    updateFields.address = dataFromUser.fields.address[0];
  }

  const imageOfPassport = dataFromUser.files.imageOfPassport;
  const imageOfGovernmentId = dataFromUser.files.imageOfGovernmentId;
  const imageOfDrivingLicense = dataFromUser.files.imageOfDrivingLicense;
  const imageOfProfile = dataFromUser.files.imageOfProfile;

  if (Object.keys(updateFields).length > 0) {
    await userModelOfMantled.findOneAndUpdate(
      { id: userData.id },
      updateFields
    );
  }

  if (imageOfPassport) {
    const imageUrl = await saveFileToFolder(
      imageOfPassport[0],
      './public/images/documents/'
    );
    const refinedImageUrl = refineUrlAr7(imageUrl);
    await userModelOfMantled.findOneAndUpdate(
      { id: userData.id },
      { passportImageUrl: refinedImageUrl }
    );
  }
  if (imageOfGovernmentId) {
    const imageUrl = await saveFileToFolder(
      imageOfGovernmentId[0],
      './public/images/documents/'
    );
    const refinedImageUrl = refineUrlAr7(imageUrl);
    await userModelOfMantled.findOneAndUpdate(
      { id: userData.id },
      { idCardImageUrl: refinedImageUrl }
    );
  }
  if (imageOfDrivingLicense) {
    const imageUrl = await saveFileToFolder(
      imageOfDrivingLicense[0],
      './public/images/documents/'
    );
    const refinedImageUrl = refineUrlAr7(imageUrl);

    await userModelOfMantled.findOneAndUpdate(
      { id: userData.id },
      { drivingLicenseImageUrl: refinedImageUrl }
    );
  }
  if (imageOfProfile) {
    const imageUrl = await saveFileToFolder(
      imageOfProfile[0],
      './public/images/users/'
    );
    const refinedImageUrl = refineUrlAr7(imageUrl);

    await userModelOfMantled.findOneAndUpdate(
      { id: userData.id },
      { profileImageUrl: refinedImageUrl }
    );
  }

  res
    .status(StatusCodes.OK)
    .json({ message: 'Profile Updated Successfully', success: true, data: {} });
});
