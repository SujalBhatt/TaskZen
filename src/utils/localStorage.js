const TASKS_KEY = 'taskTracker_tasks';

export const loadTasks = () => {
  try {
    const tasks = localStorage.getItem(TASKS_KEY);
    return tasks ? JSON.parse(tasks) : [];
  } catch (error) {
    console.error('Error loading tasks from localStorage:', error);
    return [];
  }
};

export const saveTasks = (tasks) => {
  try {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks to localStorage:', error);
  }
};

export const addTask = (task) => {
  const tasks = loadTasks();
  const newTask = {
    ...task,
    id: Date.now(),
    createdAt: new Date().toISOString(),
    completed: false
  };
  const updatedTasks = [...tasks, newTask];
  saveTasks(updatedTasks);
  return updatedTasks;
};

export const updateTask = (taskId, updates) => {
  const tasks = loadTasks();
  const updatedTasks = tasks.map(task => 
    task.id === taskId ? { ...task, ...updates } : task
  );
  saveTasks(updatedTasks);
  return updatedTasks;
};

export const deleteTask = (taskId) => {
  const tasks = loadTasks();
  const updatedTasks = tasks.filter(task => task.id !== taskId);
  saveTasks(updatedTasks);
  return updatedTasks;
};

export const toggleTaskComplete = (taskId) => {
  const tasks = loadTasks();
  const updatedTasks = tasks.map(task => 
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );
  saveTasks(updatedTasks);
  return updatedTasks;
}; 