import mongoose, { Schema, Document } from 'mongoose';

export interface ISubscription extends Document {
  orgId: mongoose.Types.ObjectId;
  plan: 'Free' | 'Pro' | 'Enterprise';
  status: 'Active' | 'Cancelled' | 'Past_due';
  stripeSubscriptionId?: string;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const SubscriptionSchema: Schema = new Schema({
  orgId: { type: Schema.Types.ObjectId, ref: 'Org', required: true },
  plan: { type: String, enum: ['Free', 'Pro', 'Enterprise'], default: 'Free', required: true },
  status: { type: String, enum: ['Active', 'Cancelled', 'Past_due'], default: 'Active', required: true },
  stripeSubscriptionId: { type: String },
  expiresAt: { type: Date },
}, { timestamps: true });

export default mongoose.models.Subscription || mongoose.model<ISubscription>('Subscription', SubscriptionSchema);
