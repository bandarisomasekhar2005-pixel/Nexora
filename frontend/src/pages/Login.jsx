import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ArrowRight, BrainCircuit, ShieldCheck, Sparkles } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { user, login, register } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  if (user) return <Navigate to="/" replace />;

  async function submit(e) {
    e.preventDefault();
    setError("");
    try {
      if (mode === "login") await login(form.email, form.password);
      else await register(form.name, form.email, form.password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-brand">
        <div className="brand-mark"><Sparkles size={22} /></div>
        <span>Nexora</span>
        <h1>Your work, goals and decisions — in one clear system.</h1>
        <p>Turn scattered commitments into a focused personal workflow.</p>
        <div className="feature-row"><BrainCircuit size={18} /> Decision journal</div>
        <div className="feature-row"><ShieldCheck size={18} /> Private by design</div>
      </section>

      <section className="auth-card">
        <div className="eyebrow">{mode === "login" ? "Welcome back" : "Start your workspace"}</div>
        <h2>{mode === "login" ? "Sign in to Nexora" : "Create your account"}</h2>
        <p className="muted">{mode === "login" ? "Continue where you left off." : "Build your personal command center."}</p>

        <form onSubmit={submit}>
          {mode === "register" && (
            <label>Name<input required value={form.name} onChange={e => setForm({...form, name:e.target.value})} placeholder="Your name" /></label>
          )}
          <label>Email<input required type="email" value={form.email} onChange={e => setForm({...form, email:e.target.value})} placeholder="you@example.com" /></label>
          <label>Password<input required minLength="6" type="password" value={form.password} onChange={e => setForm({...form, password:e.target.value})} placeholder="At least 6 characters" /></label>
          {error && <div className="error">{error}</div>}
          <button className="primary full">{mode === "login" ? "Sign in" : "Create workspace"} <ArrowRight size={17}/></button>
        </form>

        <button className="link-button" onClick={() => setMode(mode === "login" ? "register" : "login")}>
          {mode === "login" ? "New to Nexora? Create an account" : "Already have an account? Sign in"}
        </button>
      </section>
    </main>
  );
}
