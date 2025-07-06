import React, { useState } from 'react';
import { addTask } from '../utils/localStorage';

const TaskForm = ({ onAddTask, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      const updatedTasks = addTask({
        title: title.trim(),
        description: description.trim()
      });
      const newTask = updatedTasks[updatedTasks.length - 1]; // Get the last added task
      onAddTask(newTask);
      setTitle('');
      setDescription('');
    }
  };

  return (
    <div className="task-form-container">
      <form onSubmit={handleSubmit} className="task-form">
        <h3>✨ Add New Task</h3>
        
        <div className="form-group">
          <label htmlFor="title">📝 Title *</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">📄 Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description (optional)"
            rows="3"
            className="form-textarea"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-button">
            ✅ Add Task
          </button>
          <button 
            type="button" 
            onClick={onCancel}
            className="cancel-button"
          >
            ❌ Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm; 