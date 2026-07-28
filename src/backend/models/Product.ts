import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  title: string;
  description: string;
  price: number;
  stockCount: number;
  category: string;
  imageUrl: string;
  featured: boolean;
  assetId: string;
  specifications: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  stockCount: { type: Number, required: true, min: 0 },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  featured: { type: Boolean, default: false },
  assetId: { type: String, required: true, unique: true },
  specifications: { type: [String], default: [] },
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Compound Text Index on title and category for ultra-fast search queries
ProductSchema.index({ title: 'text', category: 'text' });

// Pre-validate hook to auto-generate assetId (SKU) if not provided
ProductSchema.pre<IProduct>('validate', function() {
  if (!this.assetId) {
    const randomHex = Math.random().toString(36).substring(2, 8).toUpperCase();
    this.assetId = `ETG-SKU-${randomHex}`;
  }
});

ProductSchema.virtual('isLowStock').get(function() {
  return (this as any).stockCount < 5;
});

ProductSchema.virtual('formattedPrice').get(function() {
  return `$${this.price.toLocaleString()}`;
});

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
