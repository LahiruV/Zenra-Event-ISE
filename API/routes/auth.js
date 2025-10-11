const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController");
const isAuthenticated = require("../middleware/auth");

router.post("/login", controller.login);
router.post("/register", controller.register);
router.post("/admin/login", controller.adminLogin);
router.post("/admin/register", controller.adminRegister);
router.get("/me", isAuthenticated, controller.getUserDetails);
router.get("/clients", isAuthenticated, controller.getAllClients);
router.get("/admins", isAuthenticated, controller.getAllAdmins);
router.delete("/users/:id", isAuthenticated, controller.deleteUser);
router.put("/users/:id", isAuthenticated, controller.updateUser);
router.post("/photographers/register", controller.createPhotographer);
router.get("/photographers", isAuthenticated, controller.getAllPhotographers);
router.put("/photographers/:id", isAuthenticated, controller.updatePhotographer);
router.delete("/photographers/:id", isAuthenticated, controller.deletePhotographer);

module.exports = router;