import { useEffect, useState } from "react";
import { ArrowUpRight, CheckCircle2, CircleAlert, FolderKanban, Target, BrainCircuit } from "lucide-react";
import Layout from "../components/Layout";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [tasks, setTasks] = useState([]);

  async function load() {
    const [dash, taskRes] = await Promise.all([api.get("/dashboard"), api.get("/tasks")]);
    setData(dash.data);
    setTasks(taskRes.data.slice(0, 5));
  }

  useEffect(() => { load(); }, []);

  async function complete(id) {
    await api.put(`/tasks/${id}`, { status: "done" });
    load();
  }

  return <Layout>
    <header className="topbar">
      <div><div className="eyebrow">Personal command center</div><h1>Good to see you, {user?.name?.split(" ")[0]}.</h1><p className="muted">Here’s what deserves your attention.</p></div>
    </header>

    {!data ? <div className="loading">Loading dashboard…</div> : <>
      <section className="stat-grid">
        <Stat icon={FolderKanban} label="Projects" value={data.counts.projects}/>
        <Stat icon={CheckCircle2} label="Open tasks" value={data.tasks.open}/>
        <Stat icon={Target} label="Goals" value={data.counts.goals}/>
        <Stat icon={BrainCircuit} label="Decisions" value={data.counts.decisions}/>
      </section>

      <section className="dashboard-grid">
        <div className="panel">
          <div className="panel-head"><div><h3>Priority queue</h3><p className="muted">Your five most recent tasks.</p></div><a href="/workspace/tasks">View all <ArrowUpRight size={15}/></a></div>
          {tasks.length ? tasks.map(task => (
            <div className="task-row" key={task._id}>
              <button className={`check ${task.status === "done" ? "checked" : ""}`} onClick={() => complete(task._id)}><CheckCircle2 size={18}/></button>
              <div className="task-copy"><strong>{task.title}</strong><span>{task.project?.name || "No project"}</span></div>
              <span className={`pill ${task.priority}`}>{task.priority}</span>
            </div>
          )) : <div className="empty">No tasks yet. Create your first one.</div>}
        </div>

        <div className="panel insight">
          <div className="insight-icon"><CircleAlert size={21}/></div>
          <div><div className="eyebrow">Focus signal</div><h3>{data.tasks.urgent} urgent task{data.tasks.urgent === 1 ? "" : "s"} need attention.</h3><p className="muted">Use Nexora to move high-impact work forward before adding more commitments.</p></div>
        </div>
      </section>

      <section className="panel">
        <div className="panel-head"><div><h3>Recent activity</h3><p className="muted">A lightweight audit trail of your workspace.</p></div></div>
        {data.recentActivity.length ? data.recentActivity.map(item => <div className="activity" key={item._id}><span>{item.action}</span><time>{new Date(item.createdAt).toLocaleString()}</time></div>) : <div className="empty">Activity will appear here as you work.</div>}
      </section>
    </>}
  </Layout>
}

function Stat({icon: Icon, label, value}) {
  return <div className="stat-card"><div className="stat-icon"><Icon size={19}/></div><div><span>{label}</span><strong>{value}</strong></div></div>
}
