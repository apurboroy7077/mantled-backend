import refineUrlAr7 from './refineUrlAr7';
import { saveFileToFolder } from './uploadFilesToFolder';

export const saveAndGiveRefinedUrl = (myFile: any, directoryPath: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!myFile) {
        throw new Error('File does not exists');
      }
      const myUrl = await saveFileToFolder(myFile, directoryPath);
      const refinedUrl = refineUrlAr7(myUrl);
      resolve(refinedUrl);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
