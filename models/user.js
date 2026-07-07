const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose").default;


const userSchema = new Schema({

    email:{
        type:String,
        required:true
    },


    role:{
        type:String,

        enum:[
            "guest",
            "host",
            "super-admin"
        ],

        default:"guest"
    },


    wishlist:[
        {
            type:Schema.Types.ObjectId,
            ref:"Listing"
        }
    ],

    recentlyViewed:[
    {
    type:Schema.Types.ObjectId,
    ref:"Listing"
    }
    ]

});


userSchema.plugin(passportLocalMongoose);


module.exports = mongoose.model("User",userSchema);