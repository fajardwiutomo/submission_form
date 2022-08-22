import express from "express";
import { allForm, checkStatus, createform, updateStatus } from "../controllers/form.js";

const router = express.Router();

//Create
router.post("/", createform);

//GET FORM
router.get("/", allForm)

//CHECK STATUS
router.get("/status", checkStatus);

//UPDATE STATUS
router.put("/:id", updateStatus);

//checkFeedback
// router.get("/check", )


export default router;
