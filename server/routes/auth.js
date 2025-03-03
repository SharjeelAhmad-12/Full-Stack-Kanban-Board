const express = require("express");
const {
  login,
  signup,
  forgetPassword,
  resetPassword,
  changePassword,
} = require("../controllers/authController"); 
const { authMiddleware } = require("../middleware/authMiddleware"); 

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/forgot", forgetPassword);
router.post("/reset", resetPassword);
router.post("/change-password", authMiddleware, changePassword); 

module.exports = router;
