import React, { useRef } from "react";
import "./CreateTodo.scss";
import { useDispatch } from "react-redux";
import {
  setCompleted,
  setDelete,
  setLoading,
  setUpdate,
} from "../Redux/Slices/todoSlice";
import axios from "axios";
function TodoList({ todo }) {
  const updateTodo = useRef();
  const dispatch = useDispatch();

  async function handleSubmit(e) {
    try {
      dispatch(setLoading(true));
      e.preventDefault();
      const response = await axios.put(
        "http://localhost:4000/todo/updateTodo",
        {
          todoId: todo._id,
          newTask: updateTodo.current.value,
        }
      );
      dispatch(setUpdate(response.data.result));
      console.log("update todo response", response);
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleCompleted() {
    try {
      dispatch(setLoading(true));
      const response = await axios.post(
        "http://localhost:4000/todo/taskCompleted",
        {
          todoId: todo._id,
        }
      );

      dispatch(setCompleted(response.data.result));
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setLoading(false));
    }
  }
  async function deleteHandle() {
    try {
      dispatch(setLoading(true));
      console.log(todo._id);
      const response = await axios.post(
        "http://localhost:4000/todo/deleteTodo",
        {
          todoId: todo._id,
        }
      );
      console.log(response);
      dispatch(setDelete(response.data.result));
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setLoading(false));
    }
  }
  return (
    <div className="creator">
      <div className="checkbox" onClick={handleCompleted}>
        {todo?.completed ? (
          <i className="fa-solid fa-circle-check check"></i>
        ) : (
          <div className="empty"></div>
        )}
      </div>
      <form action="onsubmit" className="formTodo" onSubmit={handleSubmit}>
        {todo?.completed ? (
          <input
            type="text"
            className="inputTodo completed"
            defaultValue={todo.task}
            readOnly={true}
          />
        ) : (
          <input
            type="text"
            className="inputTodo"
            defaultValue={todo.task}
            ref={updateTodo}
          />
        )}
        <i className="fa-solid fa-trash trash" onClick={deleteHandle}></i>
      </form>
    </div>
  );
}

export default TodoList;
