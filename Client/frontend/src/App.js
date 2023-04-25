import { useEffect, useRef } from "react";
import "./App.css";
import Main from "./Pages/Main";
import LoadingBar from "react-top-loading-bar";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Active from "./Pages/Active";
import Completed from "./Pages/Completed";
function App() {
  const loadRef = useRef();
  const isLoading = useSelector((state) => state.todoReducer.isLoading);
  useEffect(() => {
    if (isLoading) {
      loadRef.current?.continuousStart();
    } else {
      loadRef.current?.complete();
    }
  }, [isLoading]);

  return (
    <div className="App">
      <LoadingBar ref={loadRef} color="whitesmoke" height={3} />
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="/active" element={<Active/>}/>
          <Route path="/completed" element={<Completed/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
