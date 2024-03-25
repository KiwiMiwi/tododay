import { RequestHandler } from "express";
import task from "../models/task";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getTasks: RequestHandler = async (req, res, next) => {
    // try catch syntax might be unnecessary in the future due to an express update to 5.x 
    try {
        const tasks = await task.find().exec();
        res.status(200).json(tasks); 
    } catch (error) {
        next(error);
    } 
}

interface CreateTaskBody {
    description?: string,
    done?: string,
    tasklist?: string
}

export const createTask: RequestHandler<unknown, unknown, CreateTaskBody, unknown> = async (req, res, next) => {
    const description = req.body.description;
    const done = req.body.done;
    const tasklistId = req.body.tasklist;

    try {

        if (!description) {
            throw createHttpError(400, "description is missing");
        }

        if (!done) {
            throw createHttpError(400, "done is missing");
        }

        if (!tasklistId) {
            throw createHttpError(400, "tasklist is missing");
        }  

        if (!mongoose.isValidObjectId(tasklistId)) {
            throw createHttpError(400, "tasklist is not valid");
        }  

        const newTask = await task.create({
            description: description,
            done: done,
            tasklist: tasklistId
        })

        res.status(201).json(newTask);
    } catch (error) {
        next(error);
    } 
}