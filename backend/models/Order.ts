import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  customerName: string;
  customerEmail: string;
  items: Array<{
    productId: mongoose.Types.ObjectId;
    title: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Paid';
  paymentIntentId: string;
  createdAt: Date;
}

const OrderSchema: Schema = new Schema({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  items: [{
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    title: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  }],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Shipped', 'Delivered', 'Paid'], default: 'Pending' },
  paymentIntentId: { type: String },
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
