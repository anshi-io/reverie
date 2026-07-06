const Booking = require("../models/booking");
const Listing = require("../models/listing");

module.exports.dashboard = async (req, res) => {

    const modificationRequests = await Booking.find({
        status: "modify-requested"
    })
    .populate("listing")
    .populate("guest");

    const cancelledBookings = await Booking.find({
        status: "cancelled"
    })
    .populate("listing")
    .populate("guest");

    // NEW
    const hostListings = await Listing.find({
        owner: req.user._id
    }).sort({ displayOrder: 1 });

    res.render("host/dashboard", {
        bookings: modificationRequests,
        cancelledBookings,
        hostListings
    });

};