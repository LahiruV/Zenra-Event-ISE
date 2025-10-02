const express = require("express");
const router = express.Router();
const controller = require("../controllers/bookingController");
const isAuthenticated = require("../middleware/auth");

router.post("/", isAuthenticated, controller.createBooking);
router.get("/user/:id", isAuthenticated, controller.getUserBookings);
router.get("/", isAuthenticated, controller.getAllBookings);
router.put("/:id", isAuthenticated, controller.updateBooking);
router.patch("/:id/status", isAuthenticated, controller.updateBookingStatus);
router.delete("/:id", isAuthenticated, controller.deleteBooking);

module.exports = router;