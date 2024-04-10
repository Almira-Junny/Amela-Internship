const express = require("express");
const {
  getAllTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");
const { protect } = require("../controllers/authController");

const router = express.Router();

router.use(protect);

router.route("/").get(getAllTodo).post(createTodo);

router.route("/:id").patch(updateTodo).delete(deleteTodo);

module.exports = router;
