const User = require("../../model/userSchema");
const Todo = require("../../model/todoSchema");
const { getTodo } = require("../todoControllers");
const { updateOne } = require("../../model/userSchema");

exports.userTodos = async (req, res) => {
     try{
        const {userId} = req.query;

        if(!userId){
            throw new Error("ID is required")
        }

        
        const user = await User.find({ userId}).populate("todoId")

        res.status(200).json({
            success: true,
            message: "Todos Fetched successfully",
            user
        })
     }

     catch(err){
        console.log(err);

        res.status(400).json({
            success: false,
            message: err.message
        })
     }
}

exports.editUserTodos = async (req, res) => {

    try{
        const {title, tasks} = req.body;

        if(!title || !tasks){
            throw new Error("Title name and task name is required")
        }

        const {userId, todoId} = req.query;

        if(!userId || !todoId){
            throw new Error("Please pass User ID and todo ID");
        }

        const user = await User.find({}) 

        const todoid = await User.find({todoId})
        console.log(todoid + "todoid");

        const todo = await Todo.find({title, tasks});


        if(!todoid){
            throw new Error("Todo not found")
        }

        const userid = await Todo.findOne({userId});

        if(!userid){
            throw new Error("User not found in DataBase")
        }

        if(title){
            todo.title = title;
        }

        if(tasks){
            todo.tasks = tasks;
        }

        console.log({todo});


        // const user1 = await User.updateMany({todoId}, {title: title}, {tasks: tasks})
        await todo[0].save()
        // console.log(user1);
        // const editedtodo = await Todo.findByIdAndUpdate(req.params.id, req.body);

      

        
        // console.log(user);
        // user.todoId.push(editedtodo)

        res.status(200).json({
            success: true,
            message: "Todo edited and updated successfully",
            todo
        })


        }

        catch(err){
            console.log(err);
            res.status(400).json({
                success: false,
                message: err.message
            })
        }
}
