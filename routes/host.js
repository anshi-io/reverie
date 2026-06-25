const express = require("express");
const router = express.Router();

const Booking = require("../models/booking");
const wrapAsync = require("../utils/wrapAsync");
const {
isLoggedIn,
isHost
}=require("../middleware");


router.get(
"/dashboard",
isLoggedIn,
isHost,
wrapAsync(async(req,res)=>{


const bookings = await Booking.find({

status:{
$in:[
"cancel-requested",
"modify-requested"
]
}

})
.populate("listing")
.populate("guest");



res.render(
"host/dashboard",
{
bookings
}
);


})
);
router.post(
"/booking/:id/approve",
isLoggedIn,
isHost,
wrapAsync(async(req,res)=>{


const booking =
await Booking.findById(req.params.id);



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
module.exports = router;