import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import TaskFilter from './TaskFilter';
import { loadTasks, updateTask, deleteTask, toggleTaskComplete } from '../utils/localStorage';

const Dashboard = ({ username, onLogout }) => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    // Load tasks from localStorage on component mount
    const savedTasks = loadTasks();
    setTasks(savedTasks);
  }, []);

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'completed':
        return task.completed;
      case 'pending':
        return !task.completed;
      default:
        return true;
    }
  });

  const getTaskCounts = () => {
    return {
      all: tasks.length,
      completed: tasks.filter(task => task.completed).length,
      pending: tasks.filter(task => !task.completed).length
    };
  };

  const handleAddTask = (newTask) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
    setShowAddForm(false);
  };

  const handleUpdateTask = (taskId, updates) => {
    const updatedTasks = updateTask(taskId, updates);
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = deleteTask(taskId);
    setTasks(updatedTasks);
  };

  const handleToggleComplete = (taskId) => {
    const updatedTasks = toggleTaskComplete(taskId);
    setTasks(updatedTasks);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>📋 Personal Task Tracker</h1>
          <div className="user-info">
            <span>👋 Welcome, {username}!</span>
            <button onClick={onLogout} className="logout-button">
              🚪 Logout
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-controls">
          <button 
            onClick={() => setShowAddForm(!showAddForm)} 
            className="add-task-button"
          >
            {showAddForm ? '❌ Cancel' : '➕ Add New Task'}
          </button>
        </div>

        {showAddForm && (
          <TaskForm 
            onAddTask={handleAddTask} 
            onCancel={() => setShowAddForm(false)}
          />
        )}

        <TaskFilter 
          currentFilter={filter} 
          onFilterChange={setFilter}
          taskCounts={getTaskCounts()}
        />

        <TaskList 
          tasks={filteredTasks}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
          onToggleComplete={handleToggleComplete}
        />
      </main>
    </div>
  );
};

export default Dashboard; 