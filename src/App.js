import React, { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [orderedTasks, setOrderedTasks] = useState([]);

  const handleTaskAdded = (task) => {
    setTasks((prevTasks) => [...prevTasks, { id: Date.now(), name: task }]);
  };

  const handleTaskDeleted = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    if (selectedTask && selectedTask.id === taskId) {
      setSelectedTask(null);
    }
    setOrderedTasks((prevOrderedTasks) =>
      prevOrderedTasks.filter((task) => task.id !== taskId)
    );
  };

  const handleTaskEdited = (taskId, newName) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, name: newName } : task
      )
    );
  };

  const handlePickTask = () => {
    if (tasks.length > 0) {
      const randomIndex = Math.floor(Math.random() * tasks.length);
      setSelectedTask(tasks[randomIndex]);
    }
  };

  const handleOrderTasks = () => {
    const shuffled = [...tasks];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setOrderedTasks(shuffled);
  };

  // Update selectedTask and orderedTasks when tasks change
  useEffect(() => {
    if (selectedTask) {
      setSelectedTask(
        tasks.find((task) => task.id === selectedTask.id) || null
      );
    }
    setOrderedTasks((prevOrderedTasks) =>
      prevOrderedTasks.map(
        (task) => tasks.find((t) => t.id === task.id) || task
      )
    );
  }, [tasks]);

  return (
    <div className="App">
      <h1>Scared of Making Decisions?</h1>
      <p>
        Since you can't make a decision on your own,
        <br /> let me handle it for you!
      </p>
      <br />
      <TaskInput onTaskAdded={handleTaskAdded} />
      <TaskList
        tasks={tasks}
        onTaskDeleted={handleTaskDeleted}
        onTaskEdited={handleTaskEdited}
      />
      <br />
      <button onClick={handlePickTask}>Pick</button>
      <button onClick={handleOrderTasks}>Order</button>
      {selectedTask && (
        <div className="selected-task">Selected Task: {selectedTask.name}</div>
      )}
      {orderedTasks.length > 0 && (
        <div className="ordered-tasks">
          <h2>Ordered Tasks:</h2>
          <ul>
            {orderedTasks.map((task) => (
              <li key={task.id}>{task.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
