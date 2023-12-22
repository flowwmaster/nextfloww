import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const BizSchema = new Schema(
  {
    name: String,
    companyName: String,
    number: String,
    email: String,
    verified: Boolean,
  },
  {
    timestamps: true,
  }
);

const BisList = mongoose.models.BizList || mongoose.model("BizList", BizSchema);

export default BisList;
