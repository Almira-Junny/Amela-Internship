const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { promisify } = require("util");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const signToken = (id) =>
  jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);

  // const cookieOptions = {
  //   expires: new Date(
  //     Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
  //   ),
  //   //For https
  //   secure: true,
  //   //Prevent browser access or modify cookie
  //   httpOnly: true,
  // };

  // res.cookie("jwt", token, cookieOptions);

  //Not send encrypted pass for user
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Vui lòng nhập email và mật khẩu", 400));
  }

  //Check if user exist and password is correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password))) {
    return next(new AppError("Email hoặc mật khẩu không chính xác", 401));
  }

  //If ok, return success
  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  //Getting token and check if it's here
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(new AppError("Vui lòng đăng nhập trước", 401));
  }

  //Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //Check if user still exists
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(
      new AppError(
        "Tài khoản không còn tồn tại. Vui lòng tạo tài khoản mới",
        401
      )
    );
  }

  //Grant access
  req.user = user;
  next();
});
