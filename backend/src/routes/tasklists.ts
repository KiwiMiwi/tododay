import express from "express";
import * as TaskListsController from "../controllers/tasklists"

const router = express.Router();

router.post("/", TaskListsController.createTasklist);

router.get("/", TaskListsController.getAllTasklists);

router.get("/:tasklistId", TaskListsController.getTasklistById);

router.get("/tasks/:tasklistId", TaskListsController.getAllTasksByTasklistId);

router.patch("/:tasklistId", TaskListsController.updateTasklist);

router.delete("/:tasklistId", TaskListsController.deleteTasklist);



export default router;