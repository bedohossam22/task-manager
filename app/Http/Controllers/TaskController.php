<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller // <- Missing { was here
{
    public function index()
    {
        return response()->json(Task::all());
    }

    /**
     * Store a newly created task.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:pending,in_progress,completed',
            'priority' => 'required|in:low,medium,high',
            'due_date' => 'nullable|date'
        ]);

        $task = Task::create($validated);
        
        return response()->json($task, 201); // 201 = Created
    }


    /**
     * Display a specific task.
     */
    public function show(Task $task)
    {
        return response()->json($task);
    }

    /**
     * Update an existing task.
     */
    public function update(Request $request, Task $task)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'status' => 'sometimes|in:pending,in_progress,completed',
            'priority' => 'sometimes|in:low,medium,high',
            'due_date' => 'nullable|date'
        ]);

        $task->update($validated);
        
        return response()->json($task);
    }

    /**
     * Delete a task.
     */
    public function destroy(Task $task)
    {
        $task->delete();
        
        return response()->json(null, 204); // 204 = No Content
    }

    // Remove these if not using Blade views
    public function create()
    {
        abort(404); // Not needed for API-only
    }

    public function edit(Task $task)
    {
        abort(404); // Not needed for API-only
    }
}