const TODO = require("../models/todoModel");
const APIFeatures = require("../utils/apiFeatures");

exports.getAllTodo = async (req, res, next) => {
  const features = new APIFeatures(TODO.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const data = await features.query;

  res.status(200).json({
    status: "success",
    length: data.length,
    data,
  });
};

exports.createTodo = async (req, res, next) => {
  const data = await TODO.create(req.body);

  res.status(201).json({
    status: "success",
    data,
  });
};

exports.updateTodo = async (req, res, next) => {
  const data = await TODO.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!data) {
    return res.status(404).json({
      status: "error",
      message: "Không có dữ liệu với id này",
    });
  }

  res.status(200).json({
    status: "success",
    data,
  });
};

exports.deleteTodo = async (req, res, next) => {
  const data = await TODO.findByIdAndDelete(req.params.id);

  if (!data) {
    return next(new AppError("Không có dữ liệu với id này", 404));
  }

  res.status(200).json({
    status: "success",
  });
};
