const router = require("express").Router();
const userCtrl = require("../controllers/userCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router.post("/register", userCtrl.register);

router.post("/activation", userCtrl.activationEmail);

router.post("/login", userCtrl.login);

router.post("/refresh_token", userCtrl.getAccessToken);

router.post("/forgot", userCtrl.forgotPassword);

router.post("/reset", auth, userCtrl.resetPassword);

router.get("/infor", auth, userCtrl.getUserInfor);

router.get("/all_infor/", auth, authAdmin, userCtrl.getAllUserInfor);

router.get("/logout", userCtrl.logout);

router.patch("/update", auth, userCtrl.updateUser);

router.delete("/delete/:id", auth, authAdmin, userCtrl.deleteUser);

router.post("/google_login", userCtrl.googleLogin);

module.exports = router;
