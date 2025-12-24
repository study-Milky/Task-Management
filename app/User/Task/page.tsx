"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Task = {
  id: number;
  title: string;
  status: "pending" | "in-progress" | "completed";
};

export default function TasksPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);

  // 🔐 Protect page + load tasks
  useEffect(() => {
    if (!localStorage.getItem("isLoggedIn")) {
      router.push("/User/Login");
      return;
    }

    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(savedTasks);
  }, [router]);

  // 🔁 UPDATE STATUS (Pending → In Progress → Completed)
  const updateStatus = (id: number, status: Task["status"]) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, status } : task
    );

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  // ❌ DELETE TASK
  const deleteTask = (id: number) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <div className="tasks-page">
      {/* Header */}
      <div className="tasks-header">
        <h1>Tasks</h1>
          
          
<div className="header-actions">
    <button
      className="dashboard-btn"
      onClick={() => router.push("/User/Dashboard")}
    >
      ← Dashboard
    </button>

    <button
      className="add-task-btn"
      onClick={() => router.push("/User/AddTask")}
    >
      + Add Task
    </button>
  </div>
</div>

      {/* Empty state */}
      {tasks.length === 0 && (
        <div className="empty-state">
          <p>No tasks yet</p>
        </div>
      )}

      {/* Task list */}
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className={task.status}>
            <span>
              {task.title}
              {task.status === "pending" && " ⏳"}
              {task.status === "in-progress" && " 🔄"}
              {task.status === "completed" && " ✅"}
            </span>

            {/* Pending → Start */}
            {task.status === "pending" && (
              <button
                onClick={() => updateStatus(task.id, "in-progress")}
                style={{ marginLeft: "10px", color: "blue" }}
              >
                Start
              </button>
            )}

            {/* In Progress → Complete */}
            {task.status === "in-progress" && (
              <button
                onClick={() => updateStatus(task.id, "completed")}
                style={{ marginLeft: "10px", color: "green" }}
              >
                Complete
              </button>
            )}

            {/* Delete */}
            <button
              onClick={() => deleteTask(task.id)}
              style={{ marginLeft: "10px", color: "red" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Profile */}
      <button onClick={() => router.push("/User/Profile")}>
        Profile
      </button>
    </div>
  );
}
