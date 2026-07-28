import mongoose, { Schema, Document } from 'mongoose';

export interface ILog extends Document {
  userId?: mongoose.Types.ObjectId;
  action: string;
  details: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}

const LogSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  action: { type: String, required: true },
  details: { type: String, required: true },
  ipAddress: { type: String },
  userAgent: { type: String },
}, { timestamps: { createdAt: true, updatedAt: false } });

export default mongoose.models.Log || mongoose.model<ILog>('Log', LogSchema);
