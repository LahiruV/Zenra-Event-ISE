const connectDB = require("../models/db");
const { v4: uuidv4 } = require("uuid");

exports.getFeedbacks = async (req, res) => {
    try {
        const db = await connectDB();
        const feedbacks = await db.collection("feedback").find().sort({ createdAt: -1 }).toArray();
        res.json({ feedbacks, total: feedbacks.length });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createFeedback = async (req, res) => {
    const { name, email, message, type } = req.body;
    const id = uuidv4();
    const now = new Date().toISOString();

    try {
        const db = await connectDB();
        const feedback = {
            id,
            name,
            email,
            message,
            type,
            createdAt: now,
            updatedAt: now
        };
        await db.collection("feedback").insertOne(feedback);
        res.status(201).json(feedback);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateFeedback = async (req, res) => {
    const { id } = req.params;
    const { name, email, message, type } = req.body;
    const now = new Date().toISOString();

    try {
        const db = await connectDB();
        const result = await db.collection("feedback").findOneAndUpdate(
            { id },
            { $set: { name, email, message, type, updatedAt: now } },
            { returnDocument: "after" }
        );

        if (!result.value) return res.status(404).json({ error: "Feedback not found" });
        res.json(result.value);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteFeedback = async (req, res) => {
    const { id } = req.params;
    try {
        const db = await connectDB();
        const result = await db.collection("feedback").deleteOne({ id });

        if (result.deletedCount === 0) return res.status(404).json({ error: "Feedback not found" });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
