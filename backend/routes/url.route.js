import express from "express";

import { addUrl, deleteUrl, redirect, getAnalytics } from "../controllers/url.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/add", protectRoute, addUrl);
router.delete("/:id", protectRoute, deleteUrl);
router.get("/:shortUrl", redirect);
router.get("/analytics/:shortUrl", protectRoute, getAnalytics);

export default router;