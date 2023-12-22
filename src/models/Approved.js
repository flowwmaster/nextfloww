import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const ApprovedSchema = new Schema(
  {
    name: String,
    companyName: String,
    number: String,
    email: String,
    verified: Boolean,
    ebita: Number,
  },
  {
    timestamps: true,
  }
);

const Approved =
  mongoose.models.Approved || mongoose.model("Approved", ApprovedSchema);

export default Approved;
