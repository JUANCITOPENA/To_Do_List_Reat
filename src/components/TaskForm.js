import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

const TaskForm = ({ addTask }) => {
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const newTask = {
      description,
      startDate,
      endDate,
      status: 'incomplete'
    };
    addTask(newTask);
    setDescription('');
    setStartDate('');
    setEndDate('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Descripción"
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
      />
      <input
        type="date"
        value={startDate}
        onChange={e => setStartDate(e.target.value)}
        required
      />
      <input
        type="date"
        value={endDate}
        onChange={e => setEndDate(e.target.value)}
        required
      />
      <button type="submit">
        <FaPlus /> Crear
      </button>
    </form>
  );
};

export default TaskForm;
