import React from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';

const TaskModal = ({ task, completeTask, postponeTask, onClose }) => {
  return (
    <div className="task-modal">
      <div className="modal-content">
        <h2>Tarea Pendiente</h2>
        <p>{task.description}</p>
        <div className="modal-actions">
          <button onClick={() => completeTask(task.id)}>
            <FaCheck /> Completar
          </button>
          <button onClick={() => postponeTask(task.id)}>
            <FaTimes /> Posponer
          </button>
          <button onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
