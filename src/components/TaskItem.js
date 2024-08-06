// src/components/TaskItem.js
import React, { useState } from 'react';

function TaskItem({ task, onTaskDeleted, onTaskEdited }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(task.name);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onTaskEdited(task.id, newName);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewName(task.name);
  };

  return (
    <li>
      {isEditing ? (
        <>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <>
          <span>{task.name}</span>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={() => onTaskDeleted(task.id)}>Delete</button>
        </>
      )}
    </li>
  );
}

export default TaskItem;
