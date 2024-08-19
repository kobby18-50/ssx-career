import mongoose from "mongoose";
import IPO from "../models/IPO.js";

const SubcriptionSchema = new mongoose.Schema(
  {
    industry: {
      type: mongoose.Types.ObjectId,
      ref: "Industry",
      required: [true, "Please provide an industry"],
    },

    ipo: {
      type: mongoose.Types.ObjectId,
      ref: "IPO",
      required: [true, "Please provide an ipo"],
    },

    subscribedShares: {
      type: Number,
      required: [true, "Please provide a number of shares"],
    },

    subscribedAt: {
      type: Date,
      default: Date.now,
    }
  },
  {
    timestamps: true,
  }
);

// deducting shares
SubcriptionSchema.pre('save', async function () {
  const ipo = await IPO.findById(this.ipo)
  ipo.totalAvailableShares = ipo.totalAvailableShares - this.subscribedShares
  await ipo.save()
})

export default mongoose.model('Subscription', SubcriptionSchema)
