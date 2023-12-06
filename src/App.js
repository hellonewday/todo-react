import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import TodoDetail from "./components/todo-detail/TodoDetail";
import TodoList from "./components/common/TodoList";
import { HistoryRouter } from "redux-first-history/rr6";
import { history } from "./redux/store";

function App() {
  return (
    <HistoryRouter history={history}>
      <Navbar />
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/todo/:id" element={<TodoDetail />} />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
