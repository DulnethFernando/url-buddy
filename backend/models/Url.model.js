import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: { type: String, required: true },
  originalUrl: { type: String, required: true },
  shortUrl: String,
  date: { type: Date, default: Date.now },
  clickCount: { type: Number, default: 0 },
  analytics: [
    {
      timestamp: { type: Date, default: Date.now },
      referrer: String,
      userAgent: String,
      ip: String,
    },
  ],
});

const Url = mongoose.model("Url", UrlSchema);
export default Url;