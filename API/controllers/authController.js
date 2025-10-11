const connectDB = require("../models/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (email === "admin@gmail.com" && password === "admin") {
        const token = jwt.sign({ email, isAdmin: true }, JWT_SECRET);
        return res.json({ token });
    }

    try {
        const db = await connectDB();
        const user = await db.collection("users").findOne({ email });

        if (!user) return res.status(401).json({ error: "Invalid credentials" });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).json({ error: "Invalid credentials" });

        const token = jwt.sign(
            { id: user._id, email: user.email, isAdmin: user.isAdmin },
            JWT_SECRET
        );

        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.register = async (req, res) => {
    const { name, email, password, phone, dob } = req.body;

    try {
        const db = await connectDB();
        const existingUser = await db.collection("users").findOne({ email });

        if (existingUser) return res.status(400).json({ error: "Email already registered" });

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.collection("users").insertOne({
            name,
            email,
            password: hashedPassword,
            phone,
            dob,
            isAdmin: false
        });
        const token = jwt.sign({ email, isAdmin: false }, JWT_SECRET);
        res.status(201).json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.adminLogin = async (req, res) => {
    const { email, password } = req.body;

    if (email === "admin@gmail.com" && password === "admin") {
        const token = jwt.sign({ email, isAdmin: true }, JWT_SECRET);
        return res.json({ token });
    }

    try {
        const db = await connectDB();
        const admin = await db.collection("users").findOne({ email, isAdmin: true });

        if (!admin) return res.status(401).json({ error: "Invalid admin credentials" });

        const validPassword = await bcrypt.compare(password, admin.password);
        if (!validPassword) return res.status(401).json({ error: "Invalid admin credentials" });

        const token = jwt.sign(
            { id: admin._id, email: admin.email, isAdmin: true },
            JWT_SECRET
        );

        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.adminRegister = async (req, res) => {
    const { name, email, password, adminCode } = req.body;

    if (adminCode === "DEAKIN2024") {
        const token = jwt.sign({ email, isAdmin: true }, JWT_SECRET);
        return res.json({ token });
    }

    try {
        const db = await connectDB();
        const existingAdmin = await db.collection("users").findOne({ email });

        if (existingAdmin) return res.status(400).json({ error: "Email already registered" });

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.collection("users").insertOne({
            name,
            email,
            password: hashedPassword,
            isAdmin: true
        });

        const token = jwt.sign({ email, isAdmin: true }, JWT_SECRET);
        res.status(201).json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUserDetails = async (req, res) => {
    try {
        const db = await connectDB();
        const user = await db
            .collection("users")
            .findOne({ _id: require("mongodb").ObjectId.createFromHexString(req.user.id) },
                { projection: { password: 0 } });

        if (!user) return res.status(404).json({ error: "User not found" });

        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllClients = async (req, res) => {
    try {
        const db = await connectDB();
        const users = await db
            .collection("users")
            .find({ isAdmin: false }, { projection: { password: 0 } })
            .toArray();

        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllAdmins = async (req, res) => {
    try {
        const db = await connectDB();
        const admins = await db
            .collection("users")
            .find({ isAdmin: true }, { projection: { password: 0 } })
            .toArray();

        res.json(admins);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const db = await connectDB();
        const result = await db
            .collection("users")
            .deleteOne({ _id: require("mongodb").ObjectId.createFromHexString(userId) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateUser = async (req, res) => {
    const userId = req.params.id;
    const { name, phone, dob } = req.body;
    try {
        const db = await connectDB();
        const result = await db.collection("users").updateOne(
            { _id: require("mongodb").ObjectId.createFromHexString(userId) },
            { $set: { name, phone, dob } }
        );
        if (result.matchedCount === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ message: "User updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createPhotographer = async (req, res) => {
    const { name, email, phone, portfolioLink } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required" });
    }

    try {
        const db = await connectDB();
        const existingPhotographer = await db.collection("photographers").findOne({ email });
        if (existingPhotographer) return res.status(400).json({ error: "Email already exists" });

        const result = await db.collection("photographers").insertOne({
            name,
            email,
            phone: phone || "",
            portfolioLink: portfolioLink || "",
            createdAt: new Date(),
            updatedAt: new Date()
        });

        res.status(201).json({ message: "Photographer created", id: result.insertedId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllPhotographers = async (req, res) => {
    try {
        const db = await connectDB();
        const photographers = await db.collection("photographers").find().toArray();
        res.json(photographers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updatePhotographer = async (req, res) => {
    const photographerId = req.params.id;
    const { name, email, phone, portfolioLink } = req.body;

    try {
        const db = await connectDB();
        const result = await db.collection("photographers").updateOne(
            { _id: require("mongodb").ObjectId.createFromHexString(photographerId) },
            {
                $set: {
                    name,
                    email,
                    phone,
                    portfolioLink,
                    updatedAt: new Date()
                }
            }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: "Photographer not found" });
        }

        res.json({ message: "Photographer updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deletePhotographer = async (req, res) => {
    const photographerId = req.params.id;
    try {
        const db = await connectDB();
        const result = await db
            .collection("photographers")
            .deleteOne({ _id: require("mongodb").ObjectId.createFromHexString(photographerId) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Photographer not found" });
        }

        res.json({ message: "Photographer deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};