const express = require("express");
// const Title = require("../model/todoSchema");
const {home, createTodo, getTodo, editTodo, deleteTodo, searchTodos, sortTodo} = require("../controllers/todoControllers");

const router = express.Router();

router.get("/", home);
router.post("/createTodo/:userId", createTodo);
router.get("/getTodo/:userId", getTodo);
router.put("/editTodo/:userId/:todoId", editTodo);
router.delete("/deleteTodo/:userId/:todoId", deleteTodo);

router.get("/searchTodos/:userId/:todoId", searchTodos);
router.put("/sortTodo", sortTodo)

module.exports = router;