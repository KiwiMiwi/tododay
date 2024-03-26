import { RequestHandler } from "express";
import tasklist from "../models/tasklist";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import task from "../models/task";

interface TasklistBody {
    date?: string,
}

interface TasklistParams {
    tasklistId?: string,
}

export const createTasklist: RequestHandler<unknown, unknown, TasklistBody, unknown> = async (req, res, next) => {
    const date = req.body.date;

    try {

        if (!date) {
            throw createHttpError(400, "date is missing");
        }

        const newTasklist = await tasklist.create({
            date: date
        })

        res.status(201).json(newTasklist);
    } catch (error) {
        next(error);
    }
}

export const getAllTasklists: RequestHandler = async (req, res, next) => {
    // try catch syntax might be unnecessary in the future due to an express update to 5.x 
    try {
        const tasklists = await tasklist.find().exec();
        res.status(200).json(tasklists);
    } catch (error) {
        next(error);
    }
}



export const getTasklistById: RequestHandler<TasklistParams, unknown, unknown, unknown> = async (req, res, next) => {
    const tasklistId = req.params.tasklistId;

    try {

        if(!mongoose.isValidObjectId(tasklistId)){
            throw createHttpError(400, "invalid tasklist id");
        }

        const result = await tasklist.findById(tasklistId).exec();

        if(!result){
            throw createHttpError(400, "tasklist not found");
        }

        res.status(200).json(result)

    } catch (error) {
        next(error);
    }
}

export const getAllTasksByTasklistId: RequestHandler<TasklistParams, unknown, unknown, unknown> = async (req, res, next) => {
    const tasklistId = req.params.tasklistId;
    // try catch syntax might be unnecessary in the future due to an express update to 5.x 
    try {

        if(!mongoose.isValidObjectId(tasklistId)){
            throw createHttpError(400, "invalid tasklist id");
        }
 
        const result = await task.find({tasklist: tasklistId});

        if(!result){
            throw createHttpError(400, "0 tasks found");
        }

        res.status(200).json(result)

    } catch (error) {
        next(error);
    } 
}

export const updateTasklist: RequestHandler<TasklistParams, unknown, TasklistBody, unknown> = async (req, res, next) => {
    const tasklistId = req.params.tasklistId;
    const date = req.body.date;

    try {

        if(!mongoose.isValidObjectId(tasklistId)){
            throw createHttpError(400, "invalid tasklist id");
        }

        if (!date) {
            throw createHttpError(400, "date is missing");
        }

        const result = await tasklist.findById(tasklistId).exec();

        if(!result){
            throw createHttpError(400, "tasklist not found");
        }

        result.date = date

        const updatedResult = result.save();

        res.status(200).json(updatedResult)

    } catch (error) {
        next(error);
    }
}

export const deleteTasklist: RequestHandler<TasklistParams, unknown, unknown, unknown> = async (req, res, next) => {
    const tasklistId = req.params.tasklistId;

    try {

        if(!mongoose.isValidObjectId(tasklistId)){
            throw createHttpError(400, "invalid tasklist id");
        }

        await tasklist.findByIdAndDelete(tasklistId).exec();


        res.sendStatus(204);

    } catch (error) {
        next(error);
    }
}