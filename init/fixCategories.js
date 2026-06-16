const mongoose = require("mongoose");
const Category = require("../models/category");

const MONGO_URL = "mongodb://127.0.0.1:27017/reverie";

async function main() {
    await mongoose.connect(MONGO_URL);

    console.log("connected");

    const db = mongoose.connection.db;

    const categories = await Category.find({});

    for (let category of categories) {

        const result = await db.collection("listings").updateMany(
            { category: category.name },
            {
                $set: {
                    category: category._id
                }
            }
        );

        console.log(
            `${category.name} => ${result.modifiedCount}`
        );
    }

    console.log("migration finished");
    process.exit();
}

main().catch(console.error);