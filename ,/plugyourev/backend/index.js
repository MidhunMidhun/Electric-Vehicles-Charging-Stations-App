const express = require("express");
const mongoose = require("mongoose");
const app = express();
const pinRoute = require("./routes/pins");


app.use(express.json());

mongoose.connect('mongodb+srv://midhun:midhun@cluster0.7uvtxj5.mongodb.net/pin?retryWrites=true&w=majority')
.then(() => {
    console.log("MongoDB connected!")
}).catch(err => console.log(err));

app.use("/api/pins", pinRoute);

app.listen(8800, () => {
    console.log("Backend server is running! mwonee");
  });