const express = require("express");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRoute");
const todoRouter = require("./routes/todoRoute");

const app = express();

//Serving Static File
app.use(express.static(`${__dirname}/public`));

//Parse data from req.body
app.use(
  express.json({
    limit: "10mb",
  })
);

//Parse data from cookie
app.use(cookieParser());

//Router
app.use("/api/v1/users", userRouter);
app.use("/api/v1/todos", todoRouter);

module.exports = app;
