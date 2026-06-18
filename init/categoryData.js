require("dotenv").config();
const mongoose=require("mongoose");
const Category=require("../models/category");
const MONGO_URL=process.env.ATLASDB_URL;

main()
.then(()=>{
    console.log("connected");
})
.catch(err=>console.log(err));

async function main(){
    await mongoose.connect(MONGO_URL);
}

const categories=[
{
name:"Trending",
icon:"fa-fire"
},
{
name:"Rooms",
icon:"fa-bed"
},
{
name:"Iconic Cities",
icon:"fa-city"
},
{
name:"Mountains",
icon:"fa-mountain"
},
{
name:"Beach",
icon:"fa-umbrella-beach"
},
{
name:"Camping",
icon:"fa-campground"
},
{
name:"Castles",
icon:"fa-chess-rook"
},
{
name:"Arctic",
icon:"fa-snowflake"
},
{
name:"Forest",
icon:"fa-tree"
},
{
name:"Pools",
icon:"fa-person-swimming"
},
{
name:"Lakefront",
icon:"fa-water"
},
{
name:"Luxury",
icon:"fa-gem"
}
];

async function seedDB(){
await mongoose.connect(MONGO_URL);
await Category.deleteMany({});

await Category.insertMany(categories);

console.log("categories added");
mongoose.connection.close();
}


seedDB();