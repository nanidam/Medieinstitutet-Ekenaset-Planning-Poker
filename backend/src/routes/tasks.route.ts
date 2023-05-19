import { Router } from "express";
import { postTasks } from "../controller/tasks.controller.js";

const router = Router();

router.post("/add", postTasks);

export default router;
