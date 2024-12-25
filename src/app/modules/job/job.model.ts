import mongoose, { Schema } from 'mongoose';
import { IJob, IJobModal } from './job.interface';
import paginate from '../plugins/paginate';

const jobSchema = new Schema<IJob>(
  {
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Creator ID is required'],
    },
    jobLocation: {
      type: String,
      required: [true, 'Job location is required'],
    },
    jobRegistration: {
      type: String,
      required: [true, 'Job registration is required'],
    },
    vinGenerated: {
      type: String,
      required: [true, 'VIN generated is required'],
    },
    lotNo: {
      type: String,
      required: [true, 'Lot number is required'],
    },
    make: {
      type: String,
      required: [true, 'Make is required'],
    },
    model: {
      type: String,
      required: [true, 'Model is required'],
    },
    jobType: {
      type: String,
      required: [true, 'Job type is required'],
    },
    keyType: {
      type: String,
      required: [true, 'Key type is required'],
    },
    jobDescription: {
      type: String,
      required: [true, 'Job description is required'],
    },
    jobDeadline: {
      type: Date,
      required: [true, 'Job deadline is required'],
    },
    bidTechnician: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [false, 'Bid technician is required'],
      },
    ],
    assignedTechnician: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [false, 'Assigned technician is required'],
    },
    completedWorkVideo: {
      type: String,
      required: [false, 'Completed work video is required'],
    },
    jobStatus: {
      type: String,
      enum: ['Pending', 'Approved', 'Archived', 'Rejected'],
      default: 'Pending',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
jobSchema.plugin(paginate);
export const Job = mongoose.model<IJob, IJobModal>('Job', jobSchema);
