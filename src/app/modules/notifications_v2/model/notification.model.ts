import mongoose from 'mongoose';
import { ar7id } from '../../../../helpers/ar7Id';

const notificationSchema = new mongoose.Schema({
  id: { type: 'String', required: true, unique: true, default: () => ar7id() },
  userEmail: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['info', 'warning', 'success', 'error'],
    default: 'info',
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const NotificationModel = mongoose.model(
  'Notification_v2',
  notificationSchema
);
