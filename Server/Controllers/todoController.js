const { success, error } = require("../Utils/resWrapper");
const Task = require("../Models/Tasks");
const createTodo = async (req, res) => {
  try {
    const { task } = req.body;
    console.log('task found at backend',task);
    if (!task) {
      return res.send(error(400, "A task is required"));
    }
    

    const todo = await Task.create({
      task,
    });

    return res.send(success(200, todo));
  } catch (e) {
    // console.log(e);
    return res.send(error(500, e.message));
  }
};

const readAll = async (req, res) => {
  try {
    const tasks = await Task.find();

    return res.send(success(200, { tasks }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const readActive = async (req, res) => {
  try {
    const alltasks = await Task.find();

    const tasksActive = alltasks.filter((task) => {
        if (task.completed === false) {
          return task;
        }
      })

    
    return res.send(success(200, { tasksActive}));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const readCompleted = async (req, res) => {
  try {
    const alltasks = await Task.find();

    const tasksCompleted = alltasks.filter((task) => {
      if (task.completed === true) {
        return task;
      }
    })

    

    return res.send(success(200, { tasksCompleted }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const updateTodo = async (req, res) => {
  try {
    const { todoId, newTask} = req.body;

    console.log('todoId',todoId);
    console.log('newTask',newTask);
    if (!newTask) {
      res.send(error(400, "New task required!"));
    }

    const oldTodo = await Task.findById(todoId);

    if (!oldTodo) {
      return res.send(error(404, "Task not found!"));
    }
    oldTodo.task = newTask;
    await oldTodo.save();
    return res.send(success(200, oldTodo));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { todoId } = req.body;
    // console.log('todo id at backend',todoId);
    const todo = await Task.findById(todoId);
    if (!todo) {
      return res.send(error(404, "Task not found!"));
    }

    await todo.deleteOne();

    return res.send(success(200, todo));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const deleteAll=async(req,res)=>{
    try {
        const allTodo=await Task.find()
        if(!allTodo){
            return res.send(error(404,'Tasks not found for deletion!'))
        }
        await Task.deleteMany({})

        return res.send(success(200,'All tasks deleted successfully!'))
        
    } catch (e) {
        return res.send(error(500,e.message))
    }
}
const taskCompleted=async (req,res)=>{
    try {
        const {todoId}=req.body
        const todo=await Task.findById(todoId)
        if(!todo){
            return res.send(error(404,'Task not found!'))
        }
        if(todo.completed===true){
            todo.completed=false
        }
        else{
            todo.completed=true
        }
        await todo.save()
        return res.send(success(200,todo))
    } catch (e) {
        return res.send(error(500,e.message))
    }
}

module.exports = {
  createTodo,
  readActive,
  readCompleted,
  readAll,
  updateTodo,
  deleteTodo,
  deleteAll,
  taskCompleted
};
