import { RequestHandler } from "express";
import task from "../models/task";
import createHttpError from "http-errors";
import mongoose from "mongoose";

interface TaskBody {
    description?: string,
    done?: boolean,
    tasklist?: string
}

interface TaskParams {
    taskId?: string
}

export const createTask: RequestHandler<unknown, unknown, TaskBody, unknown> = async (req, res, next) => {
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

export const getAllTasks: RequestHandler = async (req, res, next) => {
    // try catch syntax might be unnecessary in the future due to an express update to 5.x 
    try {
        const tasks = await task.find().exec();
        res.status(200).json(tasks); 
    } catch (error) {
        next(error);
    } 
}

export const getTaskById: RequestHandler<TaskParams, unknown, unknown, unknown> = async (req, res, next) => {
    const taskId = req.params.taskId;

    try {

        if(!mongoose.isValidObjectId(taskId)){
            throw createHttpError(400, "invalid tasklist id");
        }

        const result = await task.findById(taskId).exec();

        if(!result){
            throw createHttpError(400, "task not found");
        }

        res.status(200).json(result)

    } catch (error) {
        next(error);
    }
}

export const updateTask: RequestHandler<TaskParams, unknown, TaskBody, unknown> = async (req, res, next) => {
    const taskId = req.params.taskId;
    const description = req.body.description;
    const done = req.body.done;

    try {


        if(!mongoose.isValidObjectId(taskId)){
            throw createHttpError(400, "invalid tasklist id");
        }
        
        const result = await task.findById(taskId).exec();
        
        if(!result){
            throw createHttpError(400, "task not found");
        }

        if(description){
            result.description = description;
        }
        if(done){
            result.done = done;
        }        

        const updatedResult = result.save();

        res.status(200).json(updatedResult)


    } catch (error) {
        next(error);
    }
}

export const deleteTask: RequestHandler<TaskParams, unknown, unknown, unknown> = async (req, res, next) => {
    const taskId = req.params.taskId;

    try {

        if(!mongoose.isValidObjectId(taskId)){
            throw createHttpError(400, "invalid tasklist id");
        }

        await task.findByIdAndDelete(taskId).exec();

        res.sendStatus(204)

    } catch (error) {
        next(error);
    }    
}