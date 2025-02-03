import express from 'express';
import { AdminRoutes } from '../app/modules/admin/admin.routes';
import { AuthRoutes } from '../app/modules/Auth/auth.route';
import { ContactRoutes } from '../app/modules/contact/contact.routes';
import { SettingsRoutes } from '../app/modules/settings/settings.routes';
import { UserRoutes } from '../app/modules/user/user.route';
import { JobRoutes } from '../app/modules/job/job.routes';
import { BidJobRoutes } from '../app/modules/bidJob/bidJob.routes';
import { NotificationRoutes } from '../app/modules/notification/notification.routes';
import { reviewRouter } from '../app/modules/review/route/review.route';
import { adminRouterV2 } from '../app/modules/admin-v2/route/adminV2.route';
import { authV2Router } from '../app/modules/auth_v2/route/authV2.route';
import { assetRoutes } from '../app/modules/asset/route/asset.route';
import { notificationRouterV2 } from '../app/modules/notifications_v2/route/notification.route';
import { collaborationRouter } from '../app/modules/collaboration/route/collaborator.route';
import { homeRouter } from '../app/modules/home/route/home.route';
import { invitationRouter } from '../app/modules/invitation/route/invitation.route';
import { vaultRouter } from '../app/modules/vault/route/vault.route';
import { userRouterV2 } from '../app/modules/user_v2/route/userV2.route';
import { generalInfoRouter } from '../app/modules/general_info/route/generalInfo.model';
import { categoriesRouter } from '../app/modules/categories/routes/categories.route';
import { subscriptionPackagesRouter } from '../app/modules/subscription_packages/route/subscriptionPackages.route';

const router = express.Router();

const apiRoutes = [
  {
    path: '/admin',
    route: AdminRoutes,
  },
  {
    path: '/admin/v2',
    route: adminRouterV2,
  },
  {
    path: '/auth',
    route: authV2Router,
  },
  {
    path: '/jobs',
    route: JobRoutes,
  },
  {
    path: '/bid-jobs',
    route: BidJobRoutes,
  },
  {
    path: '/settings',
    route: SettingsRoutes,
  },
  {
    path: '/notifications',
    route: NotificationRoutes,
  },
  {
    path: '/contact',
    route: ContactRoutes,
  },
  { path: '/review', route: reviewRouter },
  { path: '/asset', route: assetRoutes },
  { path: '/notification/v2', route: notificationRouterV2 },
  { path: '/collaboration', route: collaborationRouter },
  { path: '/home', route: homeRouter },
  { path: '/invite', route: invitationRouter },
  { path: '/vault', route: vaultRouter },
  { path: '/user/v2', route: userRouterV2 },
  { path: '/general-info', route: generalInfoRouter },
  { path: '/categories', route: categoriesRouter },
  { path: '/packages', route: subscriptionPackagesRouter },
];

apiRoutes.forEach(route => router.use(route.path, route.route));

export default router;
