import express from 'express';
import { AdminRoutes } from '../app/modules/admin/admin.routes';
import { AuthRoutes } from '../app/modules/Auth/auth.route';
import { ContactRoutes } from '../app/modules/contact/contact.routes';
import { SettingsRoutes } from '../app/modules/settings/settings.routes';
import { UserRoutes } from '../app/modules/user/user.route';
import { JobRoutes } from '../app/modules/job/job.routes';
import { BidJobRoutes } from '../app/modules/bidJob/bidJob.routes';
import { NotificationRoutes } from '../app/modules/notification/notification.routes';
const router = express.Router();

const apiRoutes = [
  {
    path: '/admin',
    route: AdminRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/user',
    route: UserRoutes,
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
];

apiRoutes.forEach(route => router.use(route.path, route.route));

export default router;
