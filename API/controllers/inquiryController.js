const connectDB = require("../models/db");
const { v4: uuidv4 } = require("uuid");

exports.getInquiries = async (req, res) => {
    try {
        const db = await connectDB();
        const inquiries = await db.collection("inquiries").find().sort({ createdAt: -1 }).toArray();
        res.json({ inquiries, total: inquiries.length });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getInquiry = async (req, res) => {
    const { id } = req.params;
    try {
        const db = await connectDB();
        const inquiry = await db.collection("inquiries").findOne({ id });
        if (!inquiry) return res.status(404).json({ error: "Inquiry not found" });
        res.json(inquiry);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createInquiry = async (req, res) => {
    const { firstName, lastName, email, phone, program, startDate, priority, message, userId } = req.body;
    const id = uuidv4();
    const now = new Date().toISOString();

    try {
        const db = await connectDB();
        const inquiry = {
            id,
            firstName,
            lastName,
            email,
            phone,
            program,
            startDate,
            priority,
            message,
            status: "pending",
            createdAt: now,
            userId
        };

        await db.collection("inquiries").insertOne(inquiry);
        res.status(201).json(inquiry);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateInquiry = async (req, res) => {
    const { id } = req.params;
    const updates = { ...req.body };

    try {
        const db = await connectDB();
        const result = await db.collection("inquiries").findOneAndUpdate(
            { id },
            { $set: updates },
            { returnDocument: "after" }
        );

        if (!result.value) return res.status(404).json({ error: "Inquiry not found" });
        res.json(result.value);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteInquiry = async (req, res) => {
    const { id } = req.params;
    try {
        const db = await connectDB();
        const result = await db.collection("inquiries").deleteOne({ id });

        if (result.deletedCount === 0) return res.status(404).json({ error: "Inquiry not found" });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.completeInquiry = async (req, res) => {
    const { id } = req.params;
    const completedAt = new Date().toISOString();
    const completedBy = req.user.id;

    try {
        const db = await connectDB();
        const result = await db.collection("inquiries").findOneAndUpdate(
            { id },
            { $set: { status: "completed", completedAt, completedBy } },
            { returnDocument: "after" }
        );

        if (!result.value) return res.status(404).json({ error: "Inquiry not found" });
        res.json(result.value);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
