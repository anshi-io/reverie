const hostController = require("../controllers/host");
const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Booking = require("../models/booking");
const {
isLoggedIn,
isHost
}=require("../middleware");

router.get(
    "/dashboard",
    isLoggedIn,
    isHost,
    wrapAsync(hostController.dashboard)
);
router.post(
"/booking/:id/approve",
isLoggedIn,
isHost,
wrapAsync(async(req,res)=>{


const booking =
await Booking.findById(req.params.id)
.populate("listing");
if(
booking.status==="cancel-requested"
){


booking.status="cancelled";


}



if(
booking.status==="modify-requested"
){


booking.checkIn =
booking.modificationRequest.newCheckIn;


booking.checkOut =
booking.modificationRequest.newCheckOut;


booking.guests =
booking.modificationRequest.newGuests;


const nights = Math.ceil(
(
booking.modificationRequest.newCheckOut -
booking.modificationRequest.newCheckIn
)
/(1000*60*60*24)
);


booking.totalPrice =
booking.listing.price * nights;


booking.status="modified";

}



booking.hostResponse="approved";


await booking.save();


req.flash(
"success",
"Request approved"
);


res.redirect("/host/dashboard");


})
);

router.post(
"/booking/:id/reject",
isLoggedIn,
isHost,
wrapAsync(async(req,res)=>{


const booking =
await Booking.findById(req.params.id);



booking.hostResponse="rejected";


if(
booking.status==="cancel-requested"
||
booking.status==="modify-requested"
){


booking.status="confirmed";


}



await booking.save();



req.flash(
"success",
"Request rejected"
);



res.redirect("/host/dashboard");


})
);
router.post(
"/reorder",
isLoggedIn,
isHost,
wrapAsync(hostController.reorderListings)
);
module.exports = router;