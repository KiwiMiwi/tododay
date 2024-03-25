import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import tasksRoutes from "./routes/tasks";
import tasklistsRoutes from "./routes/tasklists";

const app = express();

// middleware: 

// for incoming requests
app.use(express.json()); 

app.use("/api/tasks", tasksRoutes)

app.use("/api/tasklists", tasklistsRoutes)

// error message for unknown endpoints
app.use((req, res, next) => {
    next(Error("Endpoint not found"));
})

// error handler for all endpoints
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    let errorMessage = "unknown error"
    if(error instanceof Error) errorMessage = error.message
    res.status(500).json({error: errorMessage})
});

export default app;