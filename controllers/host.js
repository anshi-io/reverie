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

module.exports.reorderListings = async (req, res) => {

    const { order } = req.body;

    if (!Array.isArray(order)) {
        return res.status(400).json({
            success: false,
            message: "Invalid order data."
        });
    }

    for (let i = 0; i < order.length; i++) {

        await Listing.findOneAndUpdate(
            {
                _id: order[i],
                owner: req.user._id
            },
            {
                displayOrder: i
            }
        );

    }

    res.json({
        success: true
    });

};