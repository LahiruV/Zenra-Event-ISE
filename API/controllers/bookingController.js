const { ObjectId } = require("mongodb");
const connectDB = require("../models/db");

exports.createBooking = async (req, res) => {
    try {
        const db = await connectDB();
        const bookingData = req.body;
        bookingData.userId = require("mongodb").ObjectId.createFromHexString(req.user.id);
        bookingData.createdAt = new Date();

        const result = await db.collection("bookings").insertOne(bookingData);
        res.status(201).json({ message: "Booking created", bookingId: result.insertedId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUserBookings = async (req, res) => {
    const userId = req.params.id;
    try {
        const db = await connectDB();
        const bookings = await db
            .collection("bookings")
            .find({ userId: require("mongodb").ObjectId.createFromHexString(userId) })
            .toArray();

        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllBookings = async (req, res) => {
    try {
        const db = await connectDB();
        const bookings = await db.collection("bookings").find().toArray();
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateBooking = async (req, res) => {
    const bookingId = req.params.id;
    const {
        userId,
        eventId,
        eventName,
        eventPrice,
        date,
        name,
        email,
        phone,
        specialNeed,
        isPending,
        createdAt,
    } = req.body;

    try {
        const db = await connectDB();

        const updateFields = {
            eventId,
            eventName,
            eventPrice,
            name,
            date,
            email,
            phone,
            specialNeed,
            isPending,
        };

        if (userId) updateFields.userId = new ObjectId(userId);
        if (createdAt) updateFields.createdAt = new Date(createdAt);

        const result = await db.collection("bookings").updateOne(
            { _id: new ObjectId(bookingId) },
            { $set: updateFields }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: "Booking not found" });
        }

        res.json({ message: "Booking updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



exports.updateBookingStatus = async (req, res) => {
    const bookingId = req.params.id;
    const { status } = req.body;
    try {
        const db = await connectDB();
        const result = await db
            .collection("bookings")
            .updateOne(
                { _id: require("mongodb").ObjectId.createFromHexString(bookingId) },
                { $set: { status } }
            );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: "Booking not found" });
        }

        res.json({ message: "Booking status updated" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteBooking = async (req, res) => {
    const bookingId = req.params.id;
    try {
        const db = await connectDB();
        const result = await db
            .collection("bookings")
            .deleteOne({ _id: require("mongodb").ObjectId.createFromHexString(bookingId) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Booking not found" });
        }

        res.json({ message: "Booking deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};