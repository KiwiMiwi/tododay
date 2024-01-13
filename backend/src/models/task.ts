import { InferSchemaType, Schema, model } from "mongoose";

const taskSchema = new Schema({
    description: { type: String, required: true },
    done: { type: Boolean, required: true }
}, {timestamps: true});

type Task = InferSchemaType<typeof taskSchema>;

export default model<Task>("Task", taskSchema);