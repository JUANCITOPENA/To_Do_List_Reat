import React from 'react';

const TaskSummary = ({ tasks }) => {
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const incompleteTasks = tasks.filter(task => task.status === 'incomplete').length;
  const inProgressTasks = tasks.length - completedTasks - incompleteTasks;

  return (
    <div className="task-summary">
      <h2>Resumen de Tareas</h2>
      <p>Completas: {completedTasks}</p>
      <p>Incompletas: {incompleteTasks}</p>
      <p>En Proceso: {inProgressTasks}</p>
    </div>
  );
};

export default TaskSummary;
