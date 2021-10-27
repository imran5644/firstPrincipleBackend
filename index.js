const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const testimonials = require("./routes/testimonials");


require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json())

app.use("/api/testimonials", testimonials);
app.use('/uploads', express.static('public/uploads'));

app.get("/", (req, res) => {
    res.send("Hello Baby ");
});

const connection_string = process.env.CONNECTION_STRING;
const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

mongoose.connect(connection_string, {
     useNewUrlParser: true,
     useCreateIndex: true,
     useUnifiedTopology: true,
     useFindAndModify: false
})
.then(() =>  console.log("MongoDB Connection established..."))
.catch((error) => console.error("Mongodb connection failed:", error.message ))