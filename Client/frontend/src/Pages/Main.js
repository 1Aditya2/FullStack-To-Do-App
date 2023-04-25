import React, { useEffect } from "react";
import "./Main.scss";
import CreateTodo from "../Components/CreateTodo";
import TodoList from "../Components/TodoList";
import { useDispatch, useSelector } from "react-redux";
import { getAllTodos, setDeleteAll, setLoading } from "../Redux/Slices/todoSlice";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
function Main() {
  const allTasks=useSelector(state=>state.todoReducer.allTodos)
  const itemsLeft=useSelector(state=>state.todoReducer.itemsLeft)
  const dispatch=useDispatch()
  // console.log(allTasks);
  const navigate=useNavigate()
  const path=window.location.pathname
  useEffect(() => {
    dispatch(getAllTodos())
    console.log(path);
  }, [])
  
  async function clearAll(){
    try {
      dispatch(setLoading(true))
      const response=await axios.delete('http://localhost:4000/todo/deleteAll')
      dispatch(setDeleteAll(response.data.statusCode))
    } catch (e) {
      console.log(e);
    }
    finally{
      dispatch(setLoading(false))
    }
  }
  return (
    <div className="container">
      <div className="top">
        <h1>TODO</h1>
        <CreateTodo />
        <br />
        
        <div className="todoList">
          {path==='/'?allTasks?.map(task=><TodoList todo={task} key={task._id}/>):<Outlet/>}
          
          
        </div>
     
      </div>
      <div className="bottom">
        <div className="bt-navig">
          <p >{itemsLeft} tasks left</p>
          <div className="typeTodo ">
            <p className="hover" onClick={()=>{navigate('/')}}>All</p>
            <p className="hover" onClick={()=>{navigate('/active')}}>Active</p>
            <p className="hover" onClick={()=>{navigate('/completed')}}>Completed</p>
          </div>
          <p className="hover" onClick={clearAll}>Clear All</p>
        </div>
      </div>
    </div>
  );
}

export default Main;
