import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import sendResponse from '../../../../shared/sendResponse';
import { getDataFromFormOfRequest } from '../../../../helpers/getDataFromFormAR7';
import { saveFileToFolder } from '../../../../helpers/uploadFilesToFolder';
import refineUrlAr7 from '../../../../helpers/refineUrlAr7';
import { userModelOfMantled } from '../model/userModelOfMantled.model';
import { getAndParseJwtTokenFromHeader } from '../../../../helpers/getAndParseBearerTokenFromHeader';
import { jwtSecretKey } from '../../../../data/environmentVariables';

export const completeProfile2Controller = myControllerHandler(
  async (req, res) => {
    const tokenData = await getAndParseJwtTokenFromHeader(req, jwtSecretKey);
    const formData = await getDataFromFormOfRequest(req);
    const { email } = tokenData;
    const { files } = formData;
    console.log('fields are', files);
    const passportImage = files.passportImage[0];
    const governmentIdImage = files.governmentIdImage[0];
    const drivingLicenseImage = files.drivingLicenseImage[0];

    // save image if image exists
    if (passportImage.size !== 0) {
      const imageUrl = await saveFileToFolder(
        passportImage,
        './public/images/user_images/'
      );
      const refinedImageUrl = refineUrlAr7(imageUrl);
      await userModelOfMantled.findOneAndUpdate(
        { email },
        { passportImageUrl: refinedImageUrl }
      );
    }
    if (governmentIdImage.size !== 0) {
      const imageUrl = await saveFileToFolder(
        governmentIdImage,
        './public/images/user_images/'
      );
      const refinedImageUrl = refineUrlAr7(imageUrl);
      await userModelOfMantled.findOneAndUpdate(
        { email },
        { idCardImageUrl: refinedImageUrl }
      );
    }
    if (drivingLicenseImage.size !== 0) {
      const imageUrl = await saveFileToFolder(
        drivingLicenseImage,
        './public/images/user_images/'
      );
      const refinedImageUrl = refineUrlAr7(imageUrl);
      await userModelOfMantled.findOneAndUpdate(
        { email },
        { drivingLicenseImageUrl: refinedImageUrl }
      );
    }
    sendResponse(res, {
      code: StatusCodes.OK,
      message: 'Profile Updated Successfully',
      data: {},
    });
  }
);
