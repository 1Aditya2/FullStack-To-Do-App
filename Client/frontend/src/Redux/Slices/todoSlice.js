import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const createNewTodo = createAsyncThunk(
  "todo/createNewTodo",
  async (body, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      console.log(body);
      const response = await axios.post(
        "http://localhost:4000/todo/createTodo",
        body
      );
      console.log("response at frontend", response);
      return response.data.result;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      thunkAPI.dispatch(setLoading(false));
      console.log("Final block");
    }
  }
);
export const getAllTodos = createAsyncThunk(
  "todo/getAllTodos",
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const response = await axios.get(
        "http://localhost:4000/todo/readTodo/all"
        
      );
      console.log("response at frontend", response);
      return response.data.result.tasks;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      thunkAPI.dispatch(setLoading(false));
      console.log("Final block");
    }
  }
);
export const getActiveTodos = createAsyncThunk(
  "todo/getActiveTodos",
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const response = await axios.get(
        "http://localhost:4000/todo/readTodo/active"
      );
      console.log("response at frontend", response);
      return response.data.result.tasksActive;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      thunkAPI.dispatch(setLoading(false));
      console.log("Final block");
    }
  }
);
export const getCompletedTodos = createAsyncThunk(
  "todo/getCompletedTodos",
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const response = await axios.get(
        "http://localhost:4000/todo/readTodo/completed"
      );
      console.log("response at frontend", response);
      return response.data.result.tasksCompleted;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      thunkAPI.dispatch(setLoading(false));
      console.log("Final block");
    }
  }
);

const todoSlice = createSlice({
  name: "todoSlice",
  initialState: {
    itemsLeft:0,
    isLoading: false,
    allTodos: [],
    active: [],
    completed: [],
    
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setCompleted: (state, action) => {
      const todo = action.payload;
      const index = state.allTodos?.findIndex(
        (todos) => todos._id === todo._id
      );
      if(todo.completed===true){
        state.itemsLeft--
      }
      else{
        state.itemsLeft++
      }
      state.allTodos[index].completed = todo.completed;
    },
    setUpdate: (state, action) => {
      const todo = action.payload;
      const index = state.allTodos?.findIndex(
        (todos) => todos._id === todo._id
      );
      state.allTodos[index].task = todo.task;
      if(state.active!==[]){
        const index=state.active?.findIndex((todos)=>todos._id===todo._id)
        if(index!==-1){
            state.active[index].task=todo.task
        }
      }
    },
    setDelete: (state, action) => {
      const todo = action.payload;
      const index = state.allTodos?.findIndex(
        (todos) => todos._id === todo._id
      );
      state.allTodos.splice(index, 1);
      if(todo.completed===false){
        state.itemsLeft--
      }
      if(state.active!==[]){
        const index=state.active?.findIndex((todos)=>todos._id===todo._id)
        if(index!==-1){
            state.active.splice(index,1)
        }
      }
      if(state.completed!==[]){
        const index=state.completed?.findIndex((todos=>todos._id===todo._id))
        if(index!==-1){
            state.completed.splice(index,1)
        }
      }
    },
    setDeleteAll: (state, action) => {
      const statusCode = action.payload;
      if (statusCode === 200) {
        state.allTodos = [];
        state.completed=[]
        state.active=[]
        state.itemsLeft=0
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewTodo.fulfilled, (state, action) => {
        console.log("data at payload", action.payload);
        if (action.payload !== undefined) {
          state.allTodos.push(action.payload);
          state.active.push(action.payload)
          state.itemsLeft++;
        }
      })
      .addCase(getAllTodos.fulfilled, (state, action) => {
        state.allTodos = action.payload;
        state.allTodos.map((todo)=>{
            if(todo.completed===false){
                state.itemsLeft++;
            }
        })
      })
      .addCase(getActiveTodos.fulfilled, (state, action) => {
        state.active = action.payload;
      })
      .addCase(getCompletedTodos.fulfilled,(state,action)=>{
        state.completed=action.payload
      })
  },
});

export default todoSlice.reducer;

export const { setCompleted, setUpdate, setDelete, setLoading, setDeleteAll } =
  todoSlice.actions;
