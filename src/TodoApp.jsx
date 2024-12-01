import { useState, useRef } from "react";

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const inputRef = useRef(null);

  const addTask = () => {
    if (taskText.trim()) {
      setTasks([...tasks, { id: Date.now(), text: taskText, editing: false }]);
      setTaskText(""); 
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const enableEditing = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, editing: true } : task
      )
    );
  };

  const updateTask = (id, newText) => {
    if (newText.trim()) {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, text: newText, editing: false } : task
        )
      );
    }
  };

  return (
    <div className="todo-app">
      <h1>To-Do List</h1>

      <div className="input-container">
        <input
          type="text"
          ref={inputRef}
          placeholder="Enter a new task..."
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <div className="task-list">
        {tasks.map((task) => (
          <div key={task.id} className="task-card">
            {task.editing ? (
              <input
                type="text"
                defaultValue={task.text}
                onChange={(e) => (task.text = e.target.value)}
                autoFocus
              />
            ) : (
              <p>{task.text}</p>
            )}

            <div className="actions">
              {task.editing ? (
                <button
                  onClick={() => updateTask(task.id, task.text)}
                  className="update-button"
                >
                  Update
                </button>
              ) : (
                <button
                  onClick={() => enableEditing(task.id)}
                  className="edit-button"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => deleteTask(task.id)}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoApp;
