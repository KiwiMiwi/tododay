import { InferSchemaType, Schema, model } from "mongoose";

const taskListSchema = new Schema({
    date: { type: String, required: true },
    task: { type: Schema.Types.ObjectId, required: true, ref: "task" }
}, {timestamps: true});

type TaskList = InferSchemaType<typeof taskListSchema>;

export default model<TaskList>("TaskList", taskListSchema);