import { Router } from "express";
import { renderIndex,forWsp } from "../controllers/index.controller.js";

const router = Router();

router.get("/", renderIndex);

router.post("/", forWsp);

export default router;
