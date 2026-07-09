const Category = require("../models/category");
const Listing = require("../models/listing");
// Dashboard
module.exports.dashboard = async (req, res) => {

    res.render("admin/dashboard");

};

// Categories
module.exports.categories = async (req, res) => {

    const categories = await Category.find({});

    res.render("admin/categories", {

        categories

    });

};
module.exports.categoryListings = async (req, res) => {

    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
        req.flash("error", "Category not found.");
        return res.redirect("/admin/categories");
    }

    const listings = await Listing.find({
        categories: id
    })
    .populate("owner")
    .sort({
        displayOrder: 1,
        createdAt: -1
    });

    res.render("admin/categoryListings", {
        category,
        listings
    });

};
module.exports.reorderCategory = async (req, res) => {

    const { order } = req.body;

    if (!Array.isArray(order)) {

        return res.status(400).json({

            success: false

        });

    }

    for (let i = 0; i < order.length; i++) {

        await Listing.findByIdAndUpdate(

            order[i],

            {

                displayOrder: i

            }

        );

    }

    res.json({

        success: true

    });

};
