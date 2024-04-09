const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const routerAuthor = require("./routes/author");
const routerStory = require("./routes/story");
const routerTap = require("./routes/tap");
const routerUser = require("./routes/user");
const routerComment = require("./routes/comment");
const app = express();      
dotenv.config();                                                                                                                               
const url = process.env.MONGODB_URL;
/// Kết nối đến MongoDB Atlas bằng mongoose
mongoose.connect(url)
.then(() => {
    console.log("Successfully connected to Atlas");
})

app.use(bodyParser.json({limit: "50mb"}));
app.use(cors());
app.use(morgan("common"));
app.use('/uploads', express.static('uploads/'));
app.use("/v1/author",routerAuthor);
app.use("/v1/story",routerStory);
app.use("/v1/tap",routerTap);
app.use("/v1/user",routerUser);
app.use("/v1/comments",routerComment);
app.listen(8000,()=>{
    console.log("serser is running...");
})