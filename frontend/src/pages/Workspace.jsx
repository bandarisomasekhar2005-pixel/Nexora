import { useEffect, useState } from "react";
import { Plus, Trash2, Pencil, Search } from "lucide-react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import api from "../services/api";

const configs = {
  tasks: { title:"Tasks", subtitle:"Turn intentions into concrete next actions.", fields:["title","description","priority","status","dueDate"] },
  projects: { title:"Projects", subtitle:"Keep larger outcomes grouped and visible.", fields:["name","description","status","dueDate"] },
  goals: { title:"Goals", subtitle:"Track outcomes instead of just activity.", fields:["title","description","progress","targetDate"] },
  notes: { title:"Notes", subtitle:"Capture useful context without losing it.", fields:["title","content"] },
  decisions: { title:"Decision journal", subtitle:"Record the thinking behind important choices.", fields:["title","context","choice","reasoning","outcome","status"] }
};

const initial = { title:"", name:"", description:"", content:"", priority:"medium", status:"todo", progress:0, dueDate:"", targetDate:"", context:"", choice:"", reasoning:"", outcome:"" };

export default function Workspace() {
  const { resource } = useParams();
  const cfg = configs[resource] || configs.tasks;
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(initial);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [query, setQuery] = useState("");

  async function load() { const res = await api.get(`/${resource}`); setItems(res.data); }
  useEffect(() => { load(); setOpen(false); setEditing(null); }, [resource]);

  async function submit(e) {
    e.preventDefault();
    const payload = {...form};
    Object.keys(payload).forEach(k => { if (payload[k] === "") delete payload[k]; });
    if (editing) await api.put(`/${resource}/${editing}`, payload);
    else await api.post(`/${resource}`, payload);
    setForm(initial); setEditing(null); setOpen(false); load();
  }

  async function remove(id) { if (confirm("Delete this item?")) { await api.delete(`/${resource}/${id}`); load(); } }
  function edit(item) { setEditing(item._id); setForm({...initial, ...item}); setOpen(true); }

  const filtered = items.filter(x => JSON.stringify(x).toLowerCase().includes(query.toLowerCase()));

  return <Layout>
    <header className="topbar workspace-head">
      <div><div className="eyebrow">Workspace</div><h1>{cfg.title}</h1><p className="muted">{cfg.subtitle}</p></div>
      <button className="primary" onClick={() => {setForm(initial);setEditing(null);setOpen(true)}}><Plus size={17}/> New</button>
    </header>

    <div className="toolbar"><div className="search"><Search size={17}/><input placeholder={`Search ${cfg.title.toLowerCase()}…`} value={query} onChange={e=>setQuery(e.target.value)}/></div><span className="muted">{filtered.length} item{filtered.length === 1 ? "" : "s"}</span></div>

    {open && <form className="editor panel" onSubmit={submit}>
      <div className="panel-head"><h3>{editing ? "Edit item" : "Create item"}</h3><button type="button" className="ghost" onClick={()=>setOpen(false)}>Close</button></div>
      <div className="form-grid">
        {cfg.fields.map(field => <Field key={field} name={field} value={form[field] ?? ""} setForm={setForm} resource={resource}/>)}
      </div>
      <button className="primary">{editing ? "Save changes" : "Create"}</button>
    </form>}

    <div className="card-list">
      {filtered.map(item => <article className="item-card" key={item._id}>
        <div className="item-main">
          <div className="item-title"><h3>{item.title || item.name}</h3>{item.priority && <span className={`pill ${item.priority}`}>{item.priority}</span>}</div>
          <p>{item.description || item.content || item.context || item.choice || "No description added."}</p>
          <div className="item-meta">
            {item.status && <span>{item.status}</span>}
            {item.progress !== undefined && <span>Progress {item.progress}%</span>}
            {item.dueDate && <span>Due {new Date(item.dueDate).toLocaleDateString()}</span>}
          </div>
        </div>
        <div className="item-actions"><button className="icon-button" onClick={()=>edit(item)} title="Edit"><Pencil size={16}/></button><button className="icon-button danger" onClick={()=>remove(item._id)} title="Delete"><Trash2 size={16}/></button></div>
      </article>)}
      {!filtered.length && <div className="empty panel">Nothing here yet. Click <strong>New</strong> to create your first item.</div>}
    </div>
  </Layout>
}

function Field({name,value,setForm,resource}) {
  const label = name.replace(/([A-Z])/g," $1").replace(/^./,s=>s.toUpperCase());
  const update = v => setForm(f=>({...f,[name]:v}));
  if (["description","content","context","choice","reasoning","outcome"].includes(name)) return <label className="wide">{label}<textarea value={value} onChange={e=>update(e.target.value)} rows="3"/></label>;
  if (name === "priority") return <label>{label}<select value={value} onChange={e=>update(e.target.value)}><option>low</option><option>medium</option><option>high</option><option>urgent</option></select></label>;
  if (name === "status") {
    const options = resource==="tasks" ? ["todo","in-progress","done"] : resource==="projects" ? ["planning","active","completed","archived"] : resource==="decisions" ? ["open","resolved"] : [];
    if (!options.length) return null;
    return <label>{label}<select value={value} onChange={e=>update(e.target.value)}>{options.map(o=><option key={o}>{o}</option>)}</select></label>;
  }
  if (name === "progress") return <label>{label}<input type="number" min="0" max="100" value={value} onChange={e=>update(Number(e.target.value))}/></label>;
  if (name.toLowerCase().includes("date")) return <label>{label}<input type="date" value={value ? String(value).slice(0,10) : ""} onChange={e=>update(e.target.value)}/></label>;
  return <label>{label}<input value={value} onChange={e=>update(e.target.value)} required={name==="title" || name==="name"}/></label>;
}
