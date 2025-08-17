import { Router } from "express";
import { summarize, getSummary, share } from "../controllers/summaryController.js";

const router = Router();

router.post("/summarize", summarize);
router.get("/summary/:id", getSummary);
router.post("/share", share);

export default router;
