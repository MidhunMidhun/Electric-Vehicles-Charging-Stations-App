const mongoose=require("mongoose");

const PinSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            min: 3,
        },
        city: {
            type: String,
            required: true,
            min: 3,
        },
        lat: {
            type: Number,
            required: true,
        },
        
        long: {
            type: Number,
            required: true,
        },
        charger_type: {
            type: String,
            required: true,
            min: 3,
        },
        ports: {
            type: Number,
            required: true,
            min: 1,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        rating: {
            type: Number,
            required: true,
            min: 0,
            max: 5,
        }        
    },
    {timestamps:true}
);

module.exports = mongoose.model("Pin", PinSchema);