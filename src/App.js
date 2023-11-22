import "./App.css";
import { useState } from "react";
import NameInput from "./components/name-input/NameInput";
import ListPlaceHolder from "./components/list-placeholder/LIstPlaceHolder";
import ListCompleted from "./components/list-completed/LIstCompleted";

function App() {
  const [data, setData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editValue, setEditValue] = useState({});

  const onDelete = (id) => {
    console.log("delete", id);
    let newData = data.filter((item) => item.id !== id);
    setData(newData);
  };

  const onCompleted = (id) => {
    console.log("completed", id);
    let completedData = data.filter((item) => item.id === id)[0];
    completedData.completed = true;
    let newData = data.filter((item) => item.id !== id);
    setData([...newData, completedData]);
  };

  const onEdit = (id) => {
    setIsEdit(true);
    let editVal = data.filter((item) => item.id === id)[0];
    setEditValue(editVal);
    console.log(editVal);
  };

  const onEditChange = (event) => {
    setEditValue({ ...editValue, title: event.target.value });
  };

  const onEditSave = (event) => {
    event.preventDefault();
    console.log(editValue);
    let newData = data.filter((item) => item.id !== editValue.id);
    setIsEdit(false);
    setData([...newData, editValue]);
  };

  const saveHandler = (input) => {
    setData([...data, { id: data.length + 1, title: input, completed: false }]);
  };

  return (
    <div className="App">
      <h1>My App</h1>
      <header className="App-header">
        {isEdit && (
          <div>
            <label>Edit:</label>
            <input
              type="text"
              className="edit-box"
              value={editValue.title}
              onChange={onEditChange}
            />
            <button onClick={onEditSave}>Save</button>
          </div>
        )}
        <h1 style={{ color: "green" }}>Completed tasks:</h1>
        <ListCompleted data={data.filter((item) => item.completed === true)} />

        <h1 style={{ color: "red" }}>Uncompleted tasks:</h1>

        <ListPlaceHolder
          data={data.filter((item) => item.completed === false)}
          onDelete={onDelete}
          onComplete={onCompleted}
          onEdit={onEdit}
        />
        <NameInput saveHandler={saveHandler} />
      </header>
    </div>
  );
}

export default App;
