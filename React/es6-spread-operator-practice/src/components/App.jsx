import React, { useState } from "react";

function App() {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);

  const handleTextChange = (event) => {
    const { value } = event.target;
    setTask(value);
  }

  const addTask = () => {
    setTaskList([...taskList, task]);
    setTask('');
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input type="text" value={task} onChange={handleTextChange} />
        <button onClick={addTask}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {taskList.map(item => <li key={item}>{item}</li>)}
        </ul>
      </div>
    </div>
  );
}

export default App;
