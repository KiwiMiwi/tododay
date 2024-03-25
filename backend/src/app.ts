import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import tasksRoutes from "./routes/tasks";
import tasklistsRoutes from "./routes/tasklists";
import morgan from "morgan"
import createHttpError, { isHttpError } from "http-errors";

const app = express();

// middleware: 

// console error output
app.use(morgan("dev"));

// for incoming requests
app.use(express.json()); 

app.use("/api/tasks", tasksRoutes)

app.use("/api/tasklists", tasklistsRoutes)

// error message for unknown endpoints
app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found"));
})

// error handler for all endpoints
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    let errorMessage = "unknown error"
    let statusCode = 500;
    if(isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message
    }
    res.status(statusCode).json({error: errorMessage})
});

export default app;