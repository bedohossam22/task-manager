import React, { useState, useEffect } from 'react';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('medium');

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedPriority, setEditedPriority] = useState('medium');

  useEffect(() => {
    fetch('/api/tasks')
      .then(response => response.json())
      .then(data => {
        setTasks(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
        setLoading(false);
      });
  }, []);

  function handleMarkDone(id) {
    fetch(`/api/tasks/${id}/done`, { method: 'POST' })
      .then(() => {
        setTasks(prev =>
          prev.map(task =>
            task.id === id ? { ...task, status: 'completed' } : task
          )
        );
      });
  }

  function handleDelete(id) {
    fetch(`/api/tasks/${id}`, { method: 'DELETE' })
      .then(() => {
        setTasks(prev => prev.filter(task => task.id !== id));
      });
  }

  function handleAddTask(e) {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: newTaskTitle,
        description: newTaskDescription,
        status: 'pending',
        priority: newTaskPriority,
        due_date: null,
      }),
    })
      .then(response => {
        if (!response.ok) throw new Error('Failed to add task');
        return response.json();
      })
      .then(addedTask => {
        setTasks(prev => [...prev, addedTask]);
        setNewTaskTitle('');
        setNewTaskDescription('');
        setNewTaskPriority('medium');
      })
      .catch(error => console.error('Add task error:', error));
  }

  function handleEdit(task) {
    setEditingTaskId(task.id);
    setEditedTitle(task.title);
    setEditedDescription(task.description || '');
    setEditedPriority(task.priority || 'medium');
  }

  function handleSaveEdit(id) {
    fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: editedTitle,
        description: editedDescription,
        priority: editedPriority,
      }),
    })
      .then(response => {
        if (!response.ok) throw new Error('Edit failed');
        return response.json();
      })
      .then(updatedTask => {
        setTasks(prev =>
          prev.map(task =>
            task.id === id ? { ...task, ...updatedTask } : task
          )
        );
        setEditingTaskId(null);
        setEditedTitle('');
        setEditedDescription('');
        setEditedPriority('medium');
      })
      .catch(err => console.error('Edit error:', err));
  }

  if (loading) return <div>Loading tasks...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>

      {/* Add Task Form */}
      <form onSubmit={handleAddTask} className="mb-4 space-y-3">
        <input
          type="text"
          placeholder="New task title..."
          value={newTaskTitle}
          onChange={e => setNewTaskTitle(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />
        <textarea
          placeholder="Task description (optional)"
          value={newTaskDescription}
          onChange={e => setNewTaskDescription(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />
        <select
          value={newTaskPriority}
          onChange={e => setNewTaskPriority(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Task
        </button>
      </form>

      {/* Task List */}
      <ul className="space-y-2">
        {tasks.map(task => (
          <li
            key={task.id}
            className="border p-3 rounded flex justify-between items-start"
          >
            <div className="w-full">
              {editingTaskId === task.id ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={e => setEditedTitle(e.target.value)}
                    className="border p-1 rounded w-full"
                  />
                  <textarea
                    value={editedDescription}
                    onChange={e => setEditedDescription(e.target.value)}
                    className="border p-1 rounded w-full"
                    placeholder="Edit description..."
                  />
                  <select
                    value={editedPriority}
                    onChange={e => setEditedPriority(e.target.value)}
                    className="border p-1 rounded w-full"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                </div>
              ) : (
                <>
                  <h3 className="font-medium">{task.title}</h3>
                  <p className="text-sm text-gray-600">Status: {task.status}</p>
                  <p className="text-sm text-gray-500">Priority: {task.priority}</p>
                  {task.description && (
                    <p className="text-sm text-gray-500 mt-1 italic">
                      {task.description}
                    </p>
                  )}
                </>
              )}
            </div>
            <div className="flex gap-2 ml-4">
              {editingTaskId === task.id ? (
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  onClick={() => handleSaveEdit(task.id)}
                >
                  Save
                </button>
              ) : (
                <button
                  className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                  onClick={() => handleEdit(task)}
                >
                  Edit
                </button>
              )}
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                onClick={() => handleMarkDone(task.id)}
              >
                Done
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
