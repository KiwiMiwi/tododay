import express from "express";
import * as TaskListsController from "../controllers/tasklists"

const router = express.Router();

router.get("/", TaskListsController.getTasklists);

router.post("/", TaskListsController.createTasklist);

export default router;