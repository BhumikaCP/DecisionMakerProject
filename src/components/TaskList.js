import React from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, onTaskDeleted, onTaskEdited }) {
  return (
    <center>
      <ol>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onTaskDeleted={onTaskDeleted}
            onTaskEdited={onTaskEdited}
          />
        ))}
      </ol>
    </center>
  );
}

export default TaskList;
