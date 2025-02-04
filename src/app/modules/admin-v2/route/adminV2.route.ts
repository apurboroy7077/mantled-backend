import express from 'express';
import { getAdminDashboardDataController } from '../controller/getDashboardData.controller';
import { getUserDataController } from '../controller/getUsersData.controller';
import { banUserController } from '../controller/banUser.controller';
import { getReviewsDataForAdminController } from '../controller/getReviewsData.controller';
import { adminSignInController } from '../controller/signIn.controller';
import { adminForgotPasswordController } from '../controller/forgotPassword.controller';
import { verifyForgotPasswordOtpController } from '../controller/verifyForgotPasswordOtp.controller';
import { changeAdminPasswordController } from '../controller/changePasswordOfAdmin.controller';
import { removeProductController } from '../controller/removeProduct.controller';
import { changePasswordController2 } from '../controller/changePassword2.controller';
import { getTotalNumberOfUserController } from '../controller/getTotalNumberOfUser.controller';
import { getTotalAmountOfEarningsController } from '../controller/getTotalAmountOfEarnings.controller';
import { getIncomeOfDifferentMonthsController } from '../controller/getIncomeOfDifferentTime.controller';
import { getUserRatioOfDifferentMonthsController } from '../controller/getUserRatioOfDifferentMonths.controller';
import { getRecentUsersController } from '../controller/getRecentUsers.controller';
import { getNotificationsForAdminController } from '../controller/getNotificationsForAdmin.controller';
import { getSingleUserDataController } from '../controller/getSingleUserData.controller';
import { unbanUserController } from '../controller/unbanUser.controller';
import { addCategoryController } from '../controller/addCategories.controller';
import { updateCategoryController } from '../controller/updateCategories.controller';
import { getCollaboratorsDataController } from '../controller/getCollaboratorsData.controller';
import { addSubscriptionPackagesController } from '../controller/addSubscriptionPackages.controller';
import { editSubscriptionPackagesController } from '../controller/editSubscriptionPackages.controller';
import { getTransactionDataController } from '../controller/getTransactionData.controller';
import { getSingleTransactionDataController } from '../controller/getSingleTransactionData.controller';
import { updateProfileController } from '../../auth_v2/controller/updateProfile.controller';
import { updateGeneralInfoController } from '../controller/updateGeneralInfo.controller';

const adminRouterV2 = express.Router();

adminRouterV2.post('/sign-in', adminSignInController);
adminRouterV2.get('/get-dashboard-data', getAdminDashboardDataController);
adminRouterV2.get('/get-user-data', getUserDataController);
adminRouterV2.get('/get-collaborator-data', getCollaboratorsDataController);
adminRouterV2.get('/get-single-user-data', getSingleUserDataController);
adminRouterV2.post('/ban-user', banUserController);
adminRouterV2.post('/unban-user', unbanUserController);
adminRouterV2.get('/get-reviews-data', getReviewsDataForAdminController);
adminRouterV2.post('/remove-reviews-data', getReviewsDataForAdminController);
adminRouterV2.post('/forgot-password', adminForgotPasswordController);
adminRouterV2.post(
  '/verify-forgot-password-otp',
  verifyForgotPasswordOtpController
);
adminRouterV2.post('/change-admin-password', changeAdminPasswordController);
adminRouterV2.post('/change-admin-password-2', changePasswordController2);
adminRouterV2.post('/update-profile', updateProfileController);
adminRouterV2.post('/remove-product', removeProductController);
adminRouterV2.get('/total-number-of-user', getTotalNumberOfUserController);
adminRouterV2.get(
  '/total-amount-of-earnings',
  getTotalAmountOfEarningsController
);
adminRouterV2.get(
  '/earnings-in-different-time',
  getIncomeOfDifferentMonthsController
);
adminRouterV2.get(
  '/user-ratio-of-different-month',
  getUserRatioOfDifferentMonthsController
);
adminRouterV2.get('/recent-users', getRecentUsersController);
adminRouterV2.get('/notifications', getNotificationsForAdminController);
adminRouterV2.get('/single-user', getSingleUserDataController);
adminRouterV2.post('/categories/add', addCategoryController);
adminRouterV2.post('/categories/update', updateCategoryController);
adminRouterV2.post('/subscription/add', addSubscriptionPackagesController);
adminRouterV2.post('/subscription/edit', editSubscriptionPackagesController);
adminRouterV2.get('/payment', getTransactionDataController);
adminRouterV2.get('/payment/:id', getSingleTransactionDataController);
adminRouterV2.post('/general-info/update/:name', updateGeneralInfoController);
export { adminRouterV2 };
