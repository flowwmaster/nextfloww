import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    verified: {
      type: Boolean,
      required: false,
    },
    role: {
      type: String,
      required: false,
    },
    resetToken: {
      type: String,
      required: false,
    },
    resetTokenExpiry: {
      type: Date,
      required: false,
    },
    verificationToken: {
      type: String,
      required: false,
    },
    verificationTokenExpiry: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
