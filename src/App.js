import "./App.css";
import { useState } from "react";
import NameInput from "./components/name-input/NameInput";
import ListPlaceHolder from "./components/list-placeholder/ListPlaceHolder";
import ListCompleted from "./components/list-completed/LIstCompleted";

function App() {
  const [data, setData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editValue, setEditValue] = useState({});

  const onDelete = (id) => {
    let newData = data.filter((item) => item.id !== id);
    setData(newData);
  };

  const onCompleted = (id) => {
    let completedData = data.filter((item) => item.id === id)[0];
    completedData.completed = true;
    let newData = data.filter((item) => item.id !== id);
    setData([...newData, completedData]);
  };

  const onEdit = (id) => {
    setIsEdit(true);
    let editVal = data.filter((item) => item.id === id)[0];
    setEditValue(editVal);
  };

  const onEditChange = (event) => {
    setEditValue({ ...editValue, title: event.target.value });
  };

  const onEditSave = (event) => {
    event.preventDefault();

    let newData = data.filter((item) => item.id !== editValue.id);
    let saveData = [...newData, editValue].sort(
      (prev, next) => prev.id - next.id
    );
    setIsEdit(false);
    setData(saveData);
  };

  const saveHandler = (input) => {
    setData([...data, { id: data.length + 1, title: input, completed: false }]);
  };

  return (
    <div className="App">
      <h1 className="text-5xl font-bold mb-4 py-5 text-center">To do list</h1>
      <header className="App-header">
        <div className="create-container flex flex-row justify-center">
          <NameInput saveHandler={saveHandler} />
        </div>

        <div className="list-container flex flex-col py-2 px-4">
          <div className="uncompleted-container mr-52 py-3">
            <h1 style={{ color: "red" }}>1. Uncompleted tasks:</h1>

            <div className="edit-container">
              {isEdit && (
                <div>
                  <input
                    type="text"
                    className="edit-box"
                    value={editValue.title}
                    onChange={onEditChange}
                  />
                  <button onClick={onEditSave}>Save</button>
                </div>
              )}
            </div>

            <ListPlaceHolder
              data={data.filter((item) => item.completed === false)}
              onDelete={onDelete}
              listType="uncompleted"
              onComplete={onCompleted}
              onEdit={onEdit}
            />
          </div>

          <div className="completed-container mr-52 py-4">
            <h1 style={{ color: "green" }}>2. Completed tasks:</h1>

            <ListPlaceHolder
              data={data.filter((item) => item.completed === true)}
              onDelete={onDelete}
              listType="completed"
              onComplete={onCompleted}
              onEdit={onEdit}
            />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
