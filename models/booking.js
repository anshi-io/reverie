const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const bookingSchema = new Schema({

    listing:{
        type:Schema.Types.ObjectId,
        ref:"Listing",
        required:true
    },

    guest:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    checkIn:{
        type:Date,
        required:true
    },

    checkOut:{
        type:Date,
        required:true
    },

    guests:{
        type:Number,
        required:true,
        min:1
    },

    totalPrice:{
        type:Number,
        required:true
    },
    
    status:{
    type:String,
    enum:[
        "confirmed",
        "cancel-requested",
        "cancelled",
        "modify-requested",
        "modified"
    ],
    default:"confirmed"
    },


modificationRequest:{

    newCheckIn:{
        type:Date
    },

    newCheckOut:{
        type:Date
    },

    newGuests:{
        type:Number
    },

    reason:{
        type:String
    }

   },
   cancelReason:{
    type:String
},


hostResponse:{

    type:String,

    enum:[
        "pending",
        "approved",
        "rejected",
        null
    ],

    default:null,
}
},
{
    timestamps:true
});


module.exports = mongoose.model("Booking",bookingSchema);