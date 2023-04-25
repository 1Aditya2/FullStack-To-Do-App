import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getActiveTodos } from '../Redux/Slices/todoSlice'
import TodoList from '../Components/TodoList'
import './Active.scss'
function Active() {
    const activeTasks=useSelector(state=>state.todoReducer.active)
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(getActiveTodos())
    },[])
  return (
    <div className='active'>
    {activeTasks?.map(task=><TodoList todo={task} key={task._id}/>)}   
    </div>
  )
}

export default Active