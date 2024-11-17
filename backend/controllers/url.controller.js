import Url from "../models/Url.model.js";
import { nanoid } from "nanoid";
import User from "../models/User.model.js";

export const addUrl = async (req, res) => {
    try {
        const { name, originalUrl } = req.body;
        const userId = req.user._id.toString();

        if (!name || !originalUrl) {
            res.status(400).json({ error: "No name or originalUrl"});
        }

        const shortUrl = nanoid(4);

        const url = new Url({ name, originalUrl, shortUrl, userId: userId });
        await url.save();

        res.status(200).json({
            userId: userId,
            name: name,
            originalUrl: originalUrl,
            shortUrl: shortUrl,
            date: url.date
        });
    } catch (error) {
        console.log("Error in addUrl controller", error.message);
        //res.status(500).send({ error: "Internal Server Error" });
    }
}

export const deleteUrl = async (req, res) => {
    try {
        const url = await Url.findById(req.params.id);
        if (!url) {
            return res.status(404).json({ error: "Url not found" });
        }

        if (url.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: "You are not authorized to delete this Url" });
        }

        await Url.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Url deleted successfully" });
    } catch (error) {
        console.log("Error in deleteUrl controller", error.message);
        //res.status(500).send({ error: "Internal Server Error" });
    }
}

export const redirect = async (req, res) => {
    try {
        const url = await Url.findOne({ shortUrl: req.params.shortUrl });
        if (url) {
            // Update click count and save analytics
            url.clickCount++;
            url.analytics.push({
                referrer: req.get("Referrer") || "Direct",
                userAgent: req.get("User-Agent"),
                ip: req.ip,
            });
            await url.save();

            // Redirect to original URL
            return res.redirect(url.originalUrl);
        } else {
            res.status(404).json("URL not found");
        }
    } catch (error) {
        console.log("Error in redirect controller", error.message);
        res.status(500).send({ error: "Internal Server Error" });
    }
}

export const getAllUrls = async (req, res) => {
    try {
        const userId = req.user._id.toString();

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const urls = await Url.find({ "userId": userId });

        if (urls.length === 0) {
            return res.status(200).json([]);
        }

        res.status(200).json(urls);
    } catch (error) {
        console.log("Error in getAllUrls controller: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
}