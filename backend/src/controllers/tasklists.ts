import { RequestHandler } from "express";
import tasklist from "../models/tasklist";
import createHttpError from "http-errors";

export const getTasklists: RequestHandler = async (req, res, next) => {
    // try catch syntax might be unnecessary in the future due to an express update to 5.x 
    try {
        const tasklists = await tasklist.find().exec();
        res.status(200).json(tasklists);
    } catch (error) {
        next(error);
    }
}

interface CreateTasklistBody {
    date?: string,
}

export const createTasklist: RequestHandler<unknown, unknown, CreateTasklistBody, unknown> = async (req, res, next) => {
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