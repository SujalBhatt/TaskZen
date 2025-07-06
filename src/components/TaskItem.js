import React, { useState } from 'react';


const TaskItem = ({ task, onUpdate, onDelete, onToggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);

  const handleToggleComplete = () => {
    onToggleComplete(task.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdate(task.id, {
        title: editTitle.trim(),
        description: editDescription.trim()
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (isEditing) {
    return (
      <div className={`task-item editing ${task.completed ? 'completed' : ''}`}>
        <div className="task-edit-form">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="edit-title-input"
            placeholder="Task title"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="edit-description-input"
            placeholder="Task description"
            rows="2"
          />
          <div className="edit-actions">
            <button onClick={handleSave} className="save-button">
              💾 Save
            </button>
            <button onClick={handleCancel} className="cancel-button">
              ❌ Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <div className="task-header">
          <div className="task-checkbox">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={handleToggleComplete}
              className="task-checkbox-input"
            />
          </div>
          <div className="task-info">
            <h3 className="task-title">{task.title}</h3>
            {task.description && (
              <p className="task-description">{task.description}</p>
            )}
            <p className="task-date">📅 Created: {formatDate(task.createdAt)}</p>
          </div>
        </div>
        
        <div className="task-actions">
          <button onClick={handleEdit} className="edit-button">
            ✏️ Edit
          </button>
          <button onClick={handleDelete} className="delete-button">
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem; 