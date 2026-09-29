import { NavLink, useNavigate } from "react-router-dom";
import { BarChart3, CheckSquare, FolderKanban, Flag, FileText, BrainCircuit, LogOut, Search, Sparkles } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const links = [
  ["tasks", "Tasks", CheckSquare],
  ["projects", "Projects", FolderKanban],
  ["goals", "Goals", Flag],
  ["notes", "Notes", FileText],
  ["decisions", "Decisions", BrainCircuit]
];

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="logo"><span className="brand-mark"><Sparkles size={18}/></span> Nexora</div>
        <nav>
          <NavLink end to="/" className="nav-item"><BarChart3 size={18}/> Overview</NavLink>
          {links.map(([path, label, Icon]) => <NavLink key={path} to={`/workspace/${path}`} className="nav-item"><Icon size={18}/> {label}</NavLink>)}
        </nav>
        <div className="sidebar-bottom">
          <div className="user-mini"><div className="avatar">{user?.name?.[0]?.toUpperCase()}</div><div><strong>{user?.name}</strong><span>{user?.email}</span></div></div>
          <button className="logout" onClick={() => { logout(); navigate("/login"); }}><LogOut size={17}/> Sign out</button>
        </div>
      </aside>
      <main className="main">{children}</main>
    </div>
  );
}
