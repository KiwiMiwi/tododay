import { InferSchemaType, Schema, model } from "mongoose";

const taskListSchema = new Schema({
    date: { type: String, required: true }
}, {timestamps: true});

type TaskList = InferSchemaType<typeof taskListSchema>;

export default model<TaskList>("TaskList", taskListSchema);