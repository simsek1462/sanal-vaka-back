const User = require("../models/user");

exports.getUsers = async (req,res) => {
    try {
        const data = await User.findById("6659fbb98cec1786b8f74776");
        console.log(data);
        res.status(200).json({users:data});
    } catch (error) {
        res.error("İnvalid request");
    }
}