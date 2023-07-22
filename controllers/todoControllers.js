
const Todo = require("../model/todoSchema");
const User = require("../model/userSchema");



exports.home = (req, res)=>{
    res.send('Hello home isss working');
}

exports.createTodo = async (req, res) => {

    try{
        const {title, tasks, userId} = req.body;
        

        if(!userId){
            throw new Error("Please Enter User ID")
        }

        

        if(!title){
            throw new Error("Please enter todo title");
        }

        const titleExists = await Todo.findOne({title});
        const todos = await Todo.find({})
        console.log(todos);

        if(titleExists){
            throw new Error("This title already exist");
        }

        const todoCreate = await Todo.create({title, tasks, userId});

        const user = await User.find({userId})
        console.log(user[0]);

        // const userid = await Todo.create({userId});

        
        if(!user){
            throw new Error("User not found in DB")
        }



        if(!user[0].todoId){
            user[0].todoId = [todoCreate.id];
            
        }

        
         else {
            user[0].todoId.push(todoCreate.id);
            todos.push(todoCreate);
           
            console.log(user[0]);
        }


        // const pushh = {$push : todoCreate}
        // console.log(pushh._id);
        // // user[0].todoId.push(todoCreate)
        user[0].save();
        todoCreate.save()
        

        res.status(202).json({
            success: true,
            message: "title created successfully",
            todoCreate,
        })
    }

    catch(e){
        console.log(e)
        res.status(404).json({
            success: false,
            message: e.message
        })
    }
}

exports.getTodo = async (req, res) =>{

    try{
        const todo = await Todo.find();
        res.status(200).json({
            success: true,
            todo,
        })
    }

    catch(err){
        console.log(err);
        res.status(404).json({
            success: false,
            message: err.message
        })
    }
}

exports.editTodo = async (req, res) => {


    try{

        // collecting todoId and userId from params

        // const {title, tasks} = req.body;
        const {userId, todoId} = req.params;
    

        // if(!title || !tasks){
        //     throw new Error("todo title and tasks are required")
        // }

        

        // const user = await Todo.find({userId});
        // // console.log(user[0]);

        // // const todo = await Todo.findById(todoId)
        // if(!user[0]){
        //     throw new Error("User not found in db")
        // }

        // if(title){
        //     todo.title = title;


        // }

        // if(tasks){
        //     todo.tasks = tasks
        // }

            // const todoup = await User.findOneAndUpdate(todoId, {new: true})
            // const todos =  await User.findOneAndUpdate(user[0] ,{$set: {'todoId[5].{title, tasks}': String}})
            // console.log(todos + "todos");

        //    await todos[0].save()
        // } 
        // console.log(todoup);

        // if(tasks){
        //     todo.tasks = tasks;
        // }

        // await todos.save()

        const editedtodo = await Todo.findByIdAndUpdate(todoId, req.body)
        console.log(editedtodo);
        // const user = await User.find({todoId}).replaceOne(todo);
        // await user[0].todoId.findByIdAndUpdate(todo)

        // user[0].todoId.push(editedtodo)

        // await user[0].findAndModify(todoId);

        // const todo = await Todo.findByIdAndUpdate(todoId, userId)
        // console.log(todo);

        res.status(200).json({
            success: true,
            message: "Title edited and updated successfully",
            editedtodo
        })
    }

    catch(err){
        console.log(err);
        res.status(404).json({
            success: false,
            message: err.message
        })
    }
}

// Controller for deleting the whole todo

exports.deleteTodo = async (req,res) => {
    try{

        const {userId, todoId} = req.params;
        // const {tasks} = req.body.tasks;
        // const todo = await Todo.findByIdAndDelete(req.params.id, req.body, {tasks});

        // Deleting the todo using todo ID from request body

        const todo = await Todo.findByIdAndDelete(todoId, req.body);
        // const deleteTask = await Todo.Delete(req.body.tasks);

        res.status(404).json({
            success: true, 
            message: "Title deleted successfully",
            todo,
            // deleteTask
        })
    }

    catch(err){
        console.log(err);
        res.status(404).json({
            success: false,
            message: err.message
        })
    }
}

// To search and display the data according to user request

exports.searchTodos = async (req, res) => {
    try{
        const {search} = req.body;
        

        if(!search){
            throw new Error("Search field is empty")
        }

        // if(!id){
        //     throw new Error("Please provide the ID")
        // }

        // const searchTodos = await Todo.index({'$**': search});
        
        const searchTodos = await Todo.find({ $or: [{title: new RegExp(search, 'i')}, {tasks: new RegExp(search, 'i')}] })
        console.log(searchTodos + "search result");

        const display = searchTodos.filter(Todo);
        console.log(display + "display result");

        

        res.status(200).json({
            success: true,
            message: "search done",
            display
            // unfilteredTodos.filter((todo)=>todo.user.equals(user[0]._id))
        })

    }

    catch(err){
        console.log(err);
        res.status(404).json({
            success: false,
            message: err.message
        })
    }

}

// Controller for sorting the data by date

exports.sortTodo = async (req, res) => {


    try{

        // const {title, tasks} = req.body;
        // Sorting the data in ascending order assumption: first entered will need to be completed first

        const todoSort = await Todo.find().sort({datefield: -1});
        
        res.status(200).json({
            success: true,
            message: "Todo sorted according to date",
            todoSort
        })
    }

    catch(err){
        console.log(err);
        res.status(404).json({
            success: true,
            message: err.message,
        })
    }
}

// module.exports = Title;
// db.getCollection('').find({}).sort({_id:-1})