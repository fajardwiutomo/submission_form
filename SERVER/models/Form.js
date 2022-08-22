import mongoose from "mongoose";

const FormSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    agencyName: {
      type: String,
    },
    feedback: {
      type: String,
      required: true,
    },
    status: { 
      type: String, 
      default: "" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Form", FormSchema);
