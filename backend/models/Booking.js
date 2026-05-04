import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
      default: "Aisha"
    },
    phone: {
      type: String,
      required: true,
      default: "55775252"
    },
    tentType: {
      type: String,
      enum: ["Small", "Large", "VIP"],
      required: true
    },
    bookingDate: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"],
      default: "Pending"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);