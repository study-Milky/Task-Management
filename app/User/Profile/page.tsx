"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  name: string;
  email: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
  });

  useEffect(() => {
    if (!localStorage.getItem("isLoggedIn")) {
      router.push("/User/Login");
      return;
    }

    const loggedUser = JSON.parse(
      localStorage.getItem("loggedInUser") || "null"
    );
    setUser(loggedUser);

    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setStats({
      total: tasks.length,
      completed: tasks.filter((t: any) => t.status === "completed").length,
    });
  }, []);

  if (!user) return null;

  return (
    <div className="profile-page">
      <h1>Profile</h1>

      {/* User Card */}
      <div className="profile-card">
        <div className="avatar">
          {user.name?.charAt(0).toUpperCase() || "U"}
        </div>

        <div className="info">
          <h2>{user.name || "User"}</h2>
          <p>{user.email}</p>
          <span className="role">User</span>
        </div>
      </div>

      {/* Stats */}
      <div className="profile-stats">
        <div className="stat">
          <h3>Total Tasks</h3>
          <p>{stats.total}</p>
        </div>

        <div className="stat">
          <h3>Completed</h3>
          <p>{stats.completed}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="profile-actions">
        <button
  className="edit"
  onClick={() => router.push("/User/Edit")}
>
  Edit Profile
</button>
        <button
          className="logout"
          onClick={() => {
            localStorage.clear();
            router.push("/User/Login");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
