const Booking = require("../models/booking");
const Listing = require("../models/listing");


module.exports.checkAvailability = async(req,res)=>{


const listing =
await Listing.findById(req.params.id);



const {
checkIn,
checkOut
}=req.body;



const start =
new Date(checkIn);


const end =
new Date(checkOut);



const alreadyBooked =
await Booking.findOne({

listing:listing._id,


checkOut:{
$gte:start
},


checkIn:{
$lte:end
}

});



if(alreadyBooked){


req.flash(
"error",
"Sorry, these dates are already booked"
);


return res.redirect(
`/listings/${listing._id}`
);


}




res.redirect(
`/bookings/checkout/${listing._id}?checkIn=${checkIn}&checkOut=${checkOut}&guests=${req.body.guests}`
);



};
// checkout page
module.exports.renderCheckout = async(req,res)=>{


const listing = await Listing.findById(req.params.id);


if(!listing){

req.flash(
"error",
"Listing not found"
);

return res.redirect("/listings");

}



const {
checkIn,
checkOut,
guests
}=req.query;



res.render(
"bookings/checkout",
{

listing,

checkIn,

checkOut,

guests

}

);


};






// create booking

module.exports.createBooking = async(req,res)=>{


    const listing =
    await Listing.findById(req.params.id);



    const {
        checkIn,
        checkOut,
        guests
    } = req.body;
      
    if(!checkIn || !checkOut){

req.flash(
"error",
"Please select dates"
);

return res.redirect(
`/listings/${req.params.id}`
);

}


    const start =
    new Date(checkIn);


    const end =
    new Date(checkOut);



    // availability check

    const alreadyBooked =
    await Booking.findOne({

        listing:listing._id,

        checkOut:{
            $gte:start
        },

        checkIn:{
            $lte:end
        }

    });



    if(alreadyBooked){

        req.flash(
            "error",
            "These dates are already booked"
        );

        return res.redirect(
            `/listings/${listing._id}`
        );

    }




    const nights =
    Math.ceil(
        (end-start)/(1000*60*60*24)
    );



    const totalPrice =
    listing.price * nights;



    const booking =
    new Booking({

        listing:listing._id,

        guest:req.user._id,

        checkIn:start,

        checkOut:end,

        guests,

        totalPrice

    });



    await booking.save();



    listing.bookings.push(
        booking._id
    );


    await listing.save();



    req.flash(
        "success",
        "Booking confirmed!"
    );


    res.redirect(
        "/bookings"
    );


};






// show my bookings

module.exports.myBookings = async(req,res)=>{


    const bookings =
    await Booking.find({

        guest:req.user._id

    })
    .populate("listing");


    res.render(
        "bookings/index",
        {
            bookings
        }
    );


};