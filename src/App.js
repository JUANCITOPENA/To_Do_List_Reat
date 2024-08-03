import React, { useState, useCallback, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskSummary from './components/TaskSummary';
import TaskModal from './components/TaskModal';
import './styles.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [nextId, setNextId] = useState(1); // Track the next available ID

  const checkTaskDeadlines = useCallback(() => {
    const now = new Date();
    tasks.forEach(task => {
      if (new Date(task.endDate) <= now && task.status !== 'completed') {
        setSelectedTask(task);
      }
    });
  }, [tasks]);

  useEffect(() => {
    const interval = setInterval(() => {
      checkTaskDeadlines();
    }, 5000); // Verifica cada 5 minutos

    return () => clearInterval(interval);
  }, [checkTaskDeadlines]);

  const addTask = task => {
    const newTask = {
      ...task,
      id: nextId, // Assign the next available ID
      code: `TASK${nextId}` // Automatically generate code
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
    setNextId(prevId => prevId + 1); // Increment the next available ID
  };

  const updateTask = updatedTask => {
    setTasks(prevTasks =>
      prevTasks.map(task => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const deleteTask = id => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const completeTask = id => {
    updateTask({ ...tasks.find(task => task.id === id), status: 'completed' });
    setSelectedTask(null);
  };

  const postponeTask = id => {
    const newEndDate = new Date();
    newEndDate.setDate(newEndDate.getDate() + 1);
    updateTask({ ...tasks.find(task => task.id === id), endDate: newEndDate.toISOString().split('T')[0] });
    setSelectedTask(null);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
  };

  return (
    <div className="app-container">
      <h1>To-Do List</h1>
      <TaskForm
        addTask={addTask}
        taskToEdit={selectedTask}
        updateTask={updateTask}
      />
      <TaskSummary tasks={tasks} />
      <TaskList
        tasks={tasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
        setSelectedTask={setSelectedTask}
      />
      {selectedTask && (
        <TaskModal
          task={selectedTask}
          completeTask={completeTask}
          postponeTask={postponeTask}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default App;
