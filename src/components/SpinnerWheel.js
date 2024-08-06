import React, { useRef, useState } from "react";
import "./SpinnerWheel.css";

function SpinnerWheel({ tasks }) {
  const wheelRef = useRef(null);
  const [selectedTask, setSelectedTask] = useState(null);

  const spinWheel = () => {
    const randomIndex = Math.floor(Math.random() * tasks.length);
    setSelectedTask(tasks[randomIndex]);
    const degree = 360 / tasks.length;
    const rotateDegrees = 3600 + randomIndex * degree;

    wheelRef.current.style.transition = "transform 5s ease-out";
    wheelRef.current.style.transform = `rotate(${rotateDegrees}deg)`;
  };

  return (
    <div>
      <div className="wheel-container">
        <ul className="wheel" ref={wheelRef}>
          {tasks.map((task, index) => (
            <li
              key={task.id}
              style={{
                transform: `rotate(${index * (360 / tasks.length)}deg)`,
              }}
            >
              {task.name}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={spinWheel}>Spin</button>
      {selectedTask && <div>Selected Task: {selectedTask.name}</div>}
    </div>
  );
}

export default SpinnerWheel;
