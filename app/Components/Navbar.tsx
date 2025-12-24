import Link from "next/link";

export default function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Task Management System</h1>
      <p className="home-subtitle">
        Manage projects, assign tasks, and track progress efficiently
      </p>

      <div className="home-buttons">
        <Link href="/User/Login">
          <button className="login-btn">Login</button>
        </Link>

        <Link href="/User/Register">
          <button className="register-btn">Register</button>
        </Link>
      </div>
    </div>
  );
}
