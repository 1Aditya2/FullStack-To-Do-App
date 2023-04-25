import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCompletedTodos } from '../Redux/Slices/todoSlice'
import './Completed.scss'
import TodoList from '../Components/TodoList'
function Completed() {
    const completedTasks=useSelector(state=>state.todoReducer.completed)
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(getCompletedTodos())
    },[])
  return (
    <div className='complete'>
        {completedTasks?.map(task=><TodoList todo={task} key={task._id}/>)}   
    </div>
  )
}

export default Completed