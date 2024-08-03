import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const TaskItem = ({ task, updateTask, deleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedDescription, setUpdatedDescription] = useState(task.description);
  const [updatedEndDate, setUpdatedEndDate] = useState(task.endDate);

  const handleUpdate = () => {
    updateTask({ ...task, description: updatedDescription, endDate: updatedEndDate });
    setIsEditing(false);
  };

  return (
    <div className="task-item">
      {isEditing ? (
        <>
          <input
            type="text"
            value={updatedDescription}
            onChange={e => setUpdatedDescription(e.target.value)}
          />
          <input
            type="date"
            value={updatedEndDate}
            onChange={e => setUpdatedEndDate(e.target.value)}
          />
          <button onClick={handleUpdate}>Guardar</button>
        </>
      ) : (
        <>
          <span>{task.code}</span>
          <span>{task.description}</span>
          <span>{task.startDate}</span>
          <span>{task.endDate}</span>
          <span>{task.status}</span>
          <button onClick={() => setIsEditing(true)}>
            <FaEdit /> Editar
          </button>
          <button onClick={() => deleteTask(task.id)}>
            <FaTrash /> Eliminar
          </button>
        </>
      )}
    </div>
  );
};

export default TaskItem;
