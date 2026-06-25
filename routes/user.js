const express = require("express");
const router = express.Router();
const user= require("../models/user.js");
const wrapAsync=require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl, isLoggedIn } = require("../middleware.js");
const userController = require("../controllers/user.js");

router.get("/", (req,res)=>{
    res.redirect("/listings");
});
router.route("/signup")
.get(userController.renderSignup)
.post(wrapAsync(userController.signup));

router.route("/login")
.get(userController.renderLogin)
.post(saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true
    }),userController.login,
);

router.get("/logout",userController.renderlogout);

router.post(
"/become-host",
isLoggedIn,
wrapAsync(userController.becomeHost)
);

module.exports = router;
