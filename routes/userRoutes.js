const express = require("express");
const { userTodos, editUserTodos } = require("../controllers/user/userTodos");
const{home, createUser, getUsers, editUser, deleteUser, userLogin} = require("../controllers/userControls");
const router = express.Router();

router.get("/", home);
router.post("/createUser", createUser);
router.get("/getUsers", getUsers)
router.put("/editUser/:id", editUser);
router.delete("/deleteUser/:id", deleteUser);
router.get("/userTodos/:id?", userTodos);
router.put("/editUserTodos/:id?/:todoId?", editUserTodos);
router.post("/userLogin", userLogin)

module.exports = router;