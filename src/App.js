import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Home from "./components/common/Home";
import TodoDetail from "./components/todo-detail/TodoDetail";
import TodoList from "./components/common/TodoList";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lists" element={<TodoList />} />
        <Route path="/todo/:id" element={<TodoDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
