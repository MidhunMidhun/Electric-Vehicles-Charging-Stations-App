const mongoose=require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            min: 3,
        },
        password: {
            type: String,
            required: true,
            min: 3,
        },
    }
);
module.exports = mongoose.model("Users", UserSchema);