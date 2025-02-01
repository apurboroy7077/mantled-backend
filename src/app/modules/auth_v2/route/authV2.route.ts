import express from 'express';

import { signUpController } from '../controller/signUp.controller';
import { verifyOtpController } from '../controller/verifyOtp.controller';
import { signInController } from '../controller/signIn.controller';
import { completeProfile1Controller } from '../controller/completeProfile1.controller';
import { completeProfile2Controller } from '../controller/completeProfile2.controller';
import { addVaultPasswordController } from '../controller/addVaultPassword.controller';
import { forgotPasswordController } from '../controller/forgotPassword.controller';
import { verifyOtpOfForgotPasswordController } from '../controller/verifyOtpOfForgotPassword.controller';
import { changePasswordController } from '../controller/changePassword.controller';
import { vaultSignInController } from '../controller/vaultSignIn.controller';
import { updateProfileController } from '../controller/updateProfile.controller';
import { updateVaultPasswordController } from '../controller/updateVaultPassword.controller';
import { changePasswordInSettingsController } from '../controller/changePasswordInSettings.controller';

const authV2Router = express.Router();

authV2Router.post('/sign-up', signUpController);
authV2Router.post('/verify-otp', verifyOtpController);
authV2Router.post('/sign-in', signInController);
authV2Router.post('/complete-profile-1', completeProfile1Controller);
authV2Router.post('/complete-profile-2', completeProfile2Controller);
authV2Router.post('/add-vault-password', addVaultPasswordController);
authV2Router.post('/forgot-password', forgotPasswordController);
authV2Router.post(
  '/verify-forgot-password-otp',
  verifyOtpOfForgotPasswordController
);
authV2Router.post('/change-password', changePasswordController);
authV2Router.post(
  '/change-password-in-settings',
  changePasswordInSettingsController
);
authV2Router.post('/vault/sign-in', vaultSignInController);
authV2Router.post('/update-profile', updateProfileController);
authV2Router.post('/update-vault-password', updateVaultPasswordController);

export { authV2Router };
