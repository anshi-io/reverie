const Category = require("../models/category");

module.exports.dashboard = async (req, res) => {

    const categories = await Category.find({});

    res.render("admin/dashboard", {
        categories
    });

};