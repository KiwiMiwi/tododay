import { RequestHandler } from "express";
import tasklist from "../models/tasklist";

export const getTasklists: RequestHandler = async (req, res, next) => {
    // try catch syntax might be unnecessary in the future due to an express update to 5.x 
    try {
        const tasklists = await tasklist.find().exec();
        res.status(200).json(tasklists); 
    } catch (error) {
        next(error);
    } 
}

export const createTasklist: RequestHandler = async (req, res, next) => {
    const date = req.body.date;

    try {
        const newTasklist = await tasklist.create({
            date: date
        })

        res.status(201).json(newTasklist);
    } catch (error) {
        next(error);
    } 
}