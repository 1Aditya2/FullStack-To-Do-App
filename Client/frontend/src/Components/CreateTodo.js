import React, { useState } from 'react'
import './CreateTodo.scss'
import {useDispatch} from 'react-redux'
import { createNewTodo } from '../Redux/Slices/todoSlice'
function CreateTodo() {
  
  const dispatch=useDispatch()
  const [task,setTask]=useState('')
  function handleChange(e){
    // console.log(e.target.value);
    setTask(e.target.value)
  }

  function handleSubmit(e){
    e.preventDefault()
    console.log(task);
    dispatch(createNewTodo({
      task
    }))
    setTask('')
  }
  return (
    <div className='creator'>
      <div className='checkbox'>
        <div className='empty'></div>
      </div>
      <form action="onsubmit" className='formTodo' onSubmit={handleSubmit}>
        <input type="text" className='inputTodo' placeholder='Create a new todo...' onChange={handleChange} value={task}/>
      </form>
        
    </div>
  )
}

export default CreateTodo