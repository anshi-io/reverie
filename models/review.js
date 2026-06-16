const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({

    comment:{
        type:String,
        required:true,
    },

    rating:{
        type:Number,
        min:1,
        max:5,
        default:5,
    },

    createdAt:{
        type:Date,
        default:Date.now,
    },

    author:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },

    // parent comment/reply
    parentReview:{
        type:Schema.Types.ObjectId,
        ref:"Review",
        default:null,
    },

    // who this reply targets
    replyTo:{
        type:Schema.Types.ObjectId,
        ref:"User",
        default:null,
    },

    // child replies
    replies:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        }
    ]

});

module.exports = mongoose.model("Review",reviewSchema);