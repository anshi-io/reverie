const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync");

const adminController = require("../controllers/admin");

const {
    isLoggedIn,
    isSuperAdmin
} = require("../middleware");

// Dashboard
router.get(
    "/",
    isLoggedIn,
    isSuperAdmin,
    wrapAsync(adminController.dashboard)
);

// Categories
router.get(
    "/categories",
    isLoggedIn,
    isSuperAdmin,
    wrapAsync(adminController.categories)
);
router.get(
    "/categories/:id",
    isLoggedIn,
    isSuperAdmin,
    wrapAsync(adminController.categoryListings)
);
router.post(
    "/categories/:id/reorder",
    isLoggedIn,
    isSuperAdmin,
    wrapAsync(adminController.reorderCategory)
);
module.exports = router;