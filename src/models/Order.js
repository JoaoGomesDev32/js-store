import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],
  total: { type: Number, required: true },
  address: { type: String, required: true },
  status: { type: String, default: "pending" }
}, { timestamps: true });

export default mongoose.model("Order", OrderSchema);