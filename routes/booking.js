const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn} = require("../middleware.js");

const bookingController = require("../controllers/bookings.js");

router.post(
    "/check/:id",
    isLoggedIn,
    wrapAsync(bookingController.checkAvailability)
);

// checkout page

router.get(
    "/checkout/:id",
    isLoggedIn,
    wrapAsync(bookingController.renderCheckout)
);



// create booking

router.post(
    "/:id",
    isLoggedIn,
    wrapAsync(bookingController.createBooking)
);



// my bookings

router.get(
    "/",
    isLoggedIn,
    wrapAsync(bookingController.myBookings)
);

// cancel request

router.post(
    "/:id/cancel",
    isLoggedIn,
    wrapAsync(bookingController.requestCancel)
);


// modify request

router.post(
    "/:id/modify",
    isLoggedIn,
    wrapAsync(bookingController.requestModify)
);


module.exports = router;