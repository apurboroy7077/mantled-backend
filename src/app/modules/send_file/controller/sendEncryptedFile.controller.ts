import { Request, Response, NextFunction } from 'express';
import { decryptFileAR7 } from '../../../../helpers_v2/encryption/decrypt.helper';

export const sendEncryptedFileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.url.includes('image')) {
    const myFileUrl = './public' + req.url;
    console.log('Requesting file:', myFileUrl);
    try {
      const decryptedFileBuffer = await decryptFileAR7(myFileUrl);
      res.send(decryptedFileBuffer);
    } catch (error) {
      console.error('Error while processing the file:', error);
      res.status(500).send('Error while processing the file');
    }
  } else {
    next();
  }
};
