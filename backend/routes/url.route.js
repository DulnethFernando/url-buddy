import express from "express";

import {addUrl, deleteUrl, redirect, getAllUrls} from "../controllers/url.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/add", protectRoute, addUrl);
router.delete("/delete/:id", protectRoute, deleteUrl);
router.get("/:shortUrl", redirect);
router.get("/urls/all", protectRoute, getAllUrls);

export default router;