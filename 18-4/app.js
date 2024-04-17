const express = require("express");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRoute");
const todoRouter = require("./routes/todoRoute");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

const swaggerUiOptions = {
  customCss:
    '@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"); *,html,body{font-family: "Inter", sans-serif !important;}',
};

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
app.use(
  "/api/v1/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, swaggerUiOptions)
);

app.use((req, res, next) => {
  return res.redirect("/api/v1/api-docs");
});

//Global error handling
app.use(globalErrorHandler);

module.exports = app;
