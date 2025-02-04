import mongoose from 'mongoose';
import { ar7id } from '../../../../helpers/ar7Id';

const paymentSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      default: () => ar7id(),
    },
    userId: { type: String, required: true },
    packageId: { type: String, required: true },
    transactionId: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    cardBrand: { type: String },
    last4: { type: String },
    receiptUrl: { type: String },
    status: {
      type: String,
      enum: ['succeeded', 'pending', 'failed'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const PaymentModel = mongoose.model('Payment_v2', paymentSchema);
