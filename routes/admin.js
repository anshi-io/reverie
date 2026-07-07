const express = require("express");

const router = express.Router();

const wrapAsync = require("../utils/wrapAsync");

const adminController = require("../controllers/admin");

const {
    isLoggedIn,
    isSuperAdmin
} = require("../middleware");

router.get(
    "/",
    isLoggedIn,
    isSuperAdmin,
    wrapAsync(adminController.dashboard)
);

module.exports = router;