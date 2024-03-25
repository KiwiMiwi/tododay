import { RequestHandler } from "express";
import task from "../models/task";

export const getTasks: RequestHandler = async (req, res, next) => {
    // try catch syntax might be unnecessary in the future due to an express update to 5.x 
    try {
        const tasks = await task.find().exec();
        res.status(200).json(tasks); 
    } catch (error) {
        next(error);
    } 
}

export const createTask: RequestHandler = async (req, res, next) => {
    const description = req.body.description;
    const done = req.body.done;
    const tasklist = req.body.tasklist;

    try {
        const newTask = await task.create({
            description: description,
            done: done,
            tasklist: tasklist
        })

        res.status(201).json(newTask);
    } catch (error) {
        next(error);
    } 
}