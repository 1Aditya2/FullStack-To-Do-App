const router=require('express').Router()
const todoController=require('../Controllers/todoController')

router.post('/createTodo',todoController.createTodo)

router.get('/readTodo/active',todoController.readActive)

router.get('/readTodo/completed',todoController.readCompleted)

router.get('/readTodo/all',todoController.readAll)

router.put('/updateTodo',todoController.updateTodo)


router.post('/deleteTodo',todoController.deleteTodo)

router.delete('/deleteAll',todoController.deleteAll)

router.post('/taskCompleted',todoController.taskCompleted)


module.exports=router