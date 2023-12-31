import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
    },
    profileId: {
      type: String,
      required: false,
    },
    profileType: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    intrestedIndustries: [
      {
        type: String,
      },
    ],
    youAre: {
      type: String,
    },
    locations: [
      {
        type: String,
      },
    ],
    investRange: {
      type: String,
    },
    investRangeTo: {
      from: { type: String },
      to: { type: String },
    },
    currentLocation: {
      type: String,
    },
    factors: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
