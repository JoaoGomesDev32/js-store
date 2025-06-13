import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0, // Ensure price is not negative
    },
    imageUrl: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    stockQuantity: {
      type: Number,
      default: 0, // Default to zero if not specified
    },
    rating: {
      type: Number,
      default: 0, // Default rating
      min: 0, // Minimum rating
      max: 5, // Maximum rating
    },
    numReviews: {
      type: Number,
      default: 0, // Default number of reviews
    },
    reviews: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", // Reference to User model
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
          min: 1, // Minimum rating
          max: 5, // Maximum rating
        },
        createdAt: {
          type: Date,
          default: Date.now, // Automatically set the date when review is created
        },
      },
    ],
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

export default mongoose.model("Product", ProductSchema);
