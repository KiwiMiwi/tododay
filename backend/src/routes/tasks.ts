import express from "express";
import * as TasksController from "../controllers/tasks";

const router = express.Router();

router.post("/", TasksController.createTask);

router.get("/", TasksController.getAllTasks);

router.get("/:taskId", TasksController.getTaskById);

router.patch("/:taskId", TasksController.updateTask);

router.delete("/:taskId", TasksController.deleteTask);

export default router;