import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: new Date()
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("note", noteSchema);