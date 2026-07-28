import mongoose, { Schema, Document } from 'mongoose';

export interface IOrg extends Document {
  name: string;
  slug: string;
  ownerId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const OrgSchema: Schema = new Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export default mongoose.models.Org || mongoose.model<IOrg>('Org', OrgSchema);
