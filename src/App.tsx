import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import {
  type AppState, type Person, type Framework, type FuncItem, type Impact, type Handoff,
  LINE_OPTIONS, DEFAULT_PEOPLE, DEFAULT_FRAMEWORK, EXT_OWNERS, DOTTED, STORE_KEY, uid, SEED_VERSION, CAPACITY_HOURS, COORD_PER_REPORT,
  childrenOf, rootId, orderedIds, descendants, autoCoordHours, coordHoursFor, ownerName, isExt, functionsOwnedBy, hasRole,
} from "./data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Users, Plus, Download, RotateCcw, Trash2, X, AlertTriangle, UserPlus, Megaphone, GraduationCap, Layers, Clock, ArrowRight, Minus, Wallet, LogOut } from "lucide-react";

function clone<T>(x: T): T { return JSON.parse(JSON.stringify(x)) as T; }
function defaultHoursOrNull(text: string): number | null {
  for (const b of DEFAULT_FRAMEWORK.blocks) for (const i of b.items) if (i.text === text) return i.hours;
  return null;
}
function defaultItemHours(text: string): number { const h = defaultHoursOrNull(text); return h === null ? 0 : h; }
function defaultImpact(text: string): Impact {
  for (const b of DEFAULT_FRAMEWORK.blocks) for (const i of b.items) if (i.text === text) return i.impact;
  return "";
}
function assignByText(fw: Framework, re: RegExp, oid: string) {
  fw.blocks.forEach((b) => b.items.forEach((i) => { if (re.test(i.text.trim()) && !i.owners.includes(oid)) i.owners.push(oid); }));
}
function migrate(st: AppState): AppState {
  if (!st.framework.handoffs) st.framework.handoffs = clone(DEFAULT_FRAMEWORK.handoffs);
  st.framework.blocks.forEach((b) => b.items.forEach((i) => {
    if (typeof i.hours !== "number") i.hours = defaultItemHours(i.text);
    if (i.impact === undefined) i.impact = defaultImpact(i.text);
  }));
  st.people.forEach((p) => { const d = DEFAULT_PEOPLE.find((x) => x.id === p.id); if (!Array.isArray(p.lines)) p.lines = d ? [...d.lines] : []; });
  const v = st.v || 1;
  if (v < 2) {
    assignByText(st.framework, /^organizacion de eventos/i, "vargas");
    assignByText(st.framework, /^pr, vocerias/i, "m");
    assignByText(st.framework, /^inteligencia de mercado/i, "talavera");
  }
  if (v < 3) {
    st.framework.blocks.forEach((b) => b.items.forEach((i) => { const h = defaultHoursOrNull(i.text); if (h !== null) i.hours = h; }));
  }
  if (v < 5) {
    st.people.forEach((p) => {
      const d = DEFAULT_PEOPLE.find((x) => x.id === p.id); if (!d) return;
      if (!p.mission || !p.mission.trim()) p.mission = d.mission;
      if (!p.notes || !p.notes.trim()) p.notes = d.notes;
      if (!p.kpis || !p.kpis.trim()) p.kpis = d.kpis;
      if (!Array.isArray(p.lines) || p.lines.length === 0) p.lines = [...d.lines];
    });
  }
  st.v = SEED_VERSION;
  return st;
}
function loadState(): AppState {
  let st: AppState | null = null;
  try { const raw = localStorage.getItem(STORE_KEY); if (raw) st = JSON.parse(raw) as AppState; } catch { /* ignore */ }
  if (!st) st = { people: clone(DEFAULT_PEOPLE), framework: clone(DEFAULT_FRAMEWORK), v: SEED_VERSION };
  return migrate(st);
}

const AUTH_USER = "Marcelo";
const AUTH_PASS = "SM2026_";
const AUTH_KEY = "sm_org_auth";

export default function App() {
  const [authed, setAuthed] = useState<boolean>(() => { try { return localStorage.getItem(AUTH_KEY) === "1"; } catch { return false; } });
  function logout() { try { localStorage.removeItem(AUTH_KEY); } catch { /* ignore */ } setAuthed(false); }
  const [state, setState] = useState<AppState>(loadState);
  const { people, framework } = state;
  useEffect(() => { try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch { /* ignore */ } }, [state]);

  const setPeople = (fn: (p: Person[]) => Person[]) => setState((s) => ({ ...s, people: fn(s.people) }));
  const setFramework = (fn: (f: Framework) => Framework) => setState((s) => ({ ...s, framework: fn(s.framework) }));
  function countOwned(pid: string) { return functionsOwnedBy(framework, pid).length; }

  function exportAll() {
    let txt = "DIRECCION DE MARKETING - SM MEXICO\nRoles, estructura y funcionamiento\n\n";
    const walk = (id: string, depth: number) => {
      const n = people.find((p) => p.id === id); if (!n) return;
      const pad = "   ".repeat(depth);
      txt += pad + "* " + n.name + (n.title ? " - " + n.title : "") + "\n";
      if (n.mission.trim()) txt += pad + "   Mision: " + n.mission.trim() + "\n";
      if (n.lines && n.lines.length) txt += pad + "   Lineas: " + n.lines.join(", ") + "\n";
      if (n.notes.trim()) { txt += pad + "   Funciones:\n"; n.notes.split("\n").forEach((l) => { if (l.trim()) txt += pad + "     - " + l.trim() + "\n"; }); }
      if (n.kpis.trim()) txt += pad + "   KPIs: " + n.kpis.trim() + "\n";
      txt += "\n";
      childrenOf(people, id).forEach((c) => walk(c.id, depth + 1));
    };
    walk(rootId(people), 0);
    txt += "\n=====================\nCOMO FUNCIONA LA DIRECCION\n\n" + framework.intro.trim() + "\n\n";
    framework.blocks.forEach((b) => {
      txt += b.title + "\n";
      b.items.forEach((i) => {
        const who = i.owners.map((o) => ownerName(people, o)).join(", ");
        const tag = i.impact ? " (impacto " + i.impact + ")" : "";
        txt += "   - " + i.text + "  [" + (who || "sin responsable") + "]  ~" + i.hours + " h/mes" + tag + "\n";
      });
      txt += "\n";
    });
    if (framework.handoffs && framework.handoffs.length) {
      txt += "TRASPASOS ENTRE AREAS\n";
      framework.handoffs.forEach((h) => { txt += "   - " + h.from + " -> " + h.to + ": " + h.desc + "\n"; });
      txt += "\n";
    }
    navigator.clipboard.writeText(txt).then(() => alert("Copiado al portapapeles."), () => window.prompt("Copia el texto:", txt));
  }
  function resetAll() {
    if (!window.confirm("Restaurar la base? Se pierden los cambios.")) return;
    setState({ people: clone(DEFAULT_PEOPLE), framework: clone(DEFAULT_FRAMEWORK), v: SEED_VERSION });
  }

  if (!authed) return <LoginScreen onSuccess={() => { try { localStorage.setItem(AUTH_KEY, "1"); } catch { /* ignore */ } setAuthed(true); }} />;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-20 flex flex-wrap items-center gap-3 border-b border-slate-200 bg-white px-5 py-3">
        <div className="flex items-center gap-2 font-bold tracking-tight"><Users className="h-4 w-4 text-blue-600" />Direccion de Marketing · SM Mexico</div>
        <span className="text-xs font-medium text-slate-500">{people.length} personas</span>
        <div className="ml-auto flex gap-2">
          <Button variant="outline" size="sm" onClick={exportAll}><Download className="mr-1 h-3.5 w-3.5" />Exportar</Button>
          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700" onClick={resetAll}><RotateCcw className="mr-1 h-3.5 w-3.5" />Restaurar</Button>
          <Button variant="ghost" size="sm" onClick={logout} title="Cerrar sesion"><LogOut className="h-3.5 w-3.5" /></Button>
        </div>
      </header>

      <Tabs defaultValue="org" className="w-full">
        <div className="border-b border-slate-200 bg-white px-4">
          <TabsList className="h-11 bg-transparent p-0">
            <TabsTrigger value="org" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600">Organigrama</TabsTrigger>
            <TabsTrigger value="roles" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600">Roles</TabsTrigger>
            <TabsTrigger value="func" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600">Funcionamiento</TabsTrigger>
            <TabsTrigger value="presupuesto" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600">Presupuesto</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="org" className="mt-0"><OrgView people={people} setPeople={setPeople} countOwned={countOwned} /></TabsContent>
        <TabsContent value="roles" className="mt-0"><RolesView people={people} setPeople={setPeople} framework={framework} /></TabsContent>
        <TabsContent value="func" className="mt-0"><FuncView people={people} framework={framework} setFramework={setFramework} /></TabsContent>
        <TabsContent value="presupuesto" className="mt-0"><BudgetView /></TabsContent>
      </Tabs>
    </div>
  );
}

/* ---------------- ORG VIEW ---------------- */
function OrgView(props: { people: Person[]; setPeople: (fn: (p: Person[]) => Person[]) => void; countOwned: (id: string) => number; }) {
  const { people, setPeople, countOwned } = props;
  const [editId, setEditId] = useState<string | null>(null);
  const [dragId, setDragId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  function canDrop(targetId: string): boolean {
    if (!dragId || targetId === dragId) return false;
    if (descendants(people, dragId).includes(targetId)) return false;
    const dn = people.find((p) => p.id === dragId);
    if (dn && dn.parent === targetId) return false;
    return true;
  }
  function doReparent(child: string, parent: string) { setPeople((arr) => arr.map((p) => (p.id === child ? { ...p, parent } : p))); }
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [lines, setLines] = useState<{ x1: number; x2: number; y: number }[]>([]);

  function compute() {
    const cont = containerRef.current; if (!cont) return;
    const cr = cont.getBoundingClientRect();
    const out: { x1: number; x2: number; y: number }[] = [];
    DOTTED.forEach(([a, b]) => {
      const ea = cardRefs.current[a]; const eb = cardRefs.current[b];
      if (!ea || !eb) return;
      const ra = ea.getBoundingClientRect(); const rb = eb.getBoundingClientRect();
      const left = ra.left <= rb.left ? ra : rb; const right = ra.left <= rb.left ? rb : ra;
      const x1 = left.right - cr.left + cont.scrollLeft;
      const x2 = right.left - cr.left + cont.scrollLeft;
      const y = (Math.min(ra.top, rb.top) + Math.max(ra.bottom, rb.bottom)) / 2 - cr.top + cont.scrollTop;
      out.push({ x1, x2, y });
    });
    setLines(out);
  }
  useLayoutEffect(() => { compute(); /* eslint-disable-next-line */ }, [people, zoom]);
  useEffect(() => {
    const h = () => compute(); window.addEventListener("resize", h); const t = setTimeout(h, 60);
    return () => { window.removeEventListener("resize", h); clearTimeout(t); };
    /* eslint-disable-next-line */
  }, [people, zoom]);

  function renderNode(id: string): ReactNode {
    const n = people.find((p) => p.id === id); if (!n) return null;
    const kids = childrenOf(people, id);
    const isRoot = n.parent === null; const cnt = countOwned(id);
    const dragging = dragId === id;
    const dropOk = overId === id && canDrop(id);
    return (
      <li key={id}>
        <div ref={(el) => { cardRefs.current[id] = el; }}
          draggable={!isRoot}
          onDragStart={(e) => { e.dataTransfer.effectAllowed = "move"; setDragId(id); }}
          onDragEnd={() => { setDragId(null); setOverId(null); }}
          onDragOver={(e) => { if (canDrop(id)) { e.preventDefault(); setOverId(id); } }}
          onDragLeave={() => setOverId((o) => (o === id ? null : o))}
          onDrop={(e) => { e.preventDefault(); if (dragId && canDrop(id)) doReparent(dragId, id); setDragId(null); setOverId(null); }}
          onClick={() => setEditId(id)}
          className={"relative w-[210px] cursor-pointer rounded-xl border p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md " + (isRoot ? "border-slate-900 bg-slate-900 text-white " : "border-slate-200 bg-white ") + (dragging ? "opacity-40 " : "") + (dropOk ? "ring-2 ring-blue-500 border-blue-400 " : "")}>
          <div className="text-[13.5px] font-bold leading-tight tracking-tight">{n.name || "(sin nombre)"}</div>
          <div className={"mt-0.5 text-xs " + (isRoot ? "text-slate-300" : "text-slate-500")}>{n.title}</div>
          {cnt > 0 && <div className="mt-2"><span className={"rounded-md border px-1.5 py-px text-[10.5px] font-bold " + (isRoot ? "border-white/25 bg-white/10 text-slate-200" : "border-blue-200 bg-blue-50 text-blue-700")}>{cnt} func.</span></div>}
          {hasRole(n) && <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-emerald-500" title="Rol documentado" />}
        </div>
        {kids.length > 0 && <ul>{kids.map((k) => renderNode(k.id))}</ul>}
      </li>
    );
  }

  return (
    <div ref={containerRef} className="relative overflow-x-auto px-5 pb-20 pt-8">
      <svg className="pointer-events-none absolute left-0 top-0 overflow-visible" width="100%" height="100%">
        {lines.map((l, idx) => {
          const mx = (l.x1 + l.x2) / 2; const dip = 16;
          return (
            <g key={idx}>
              <path d={`M ${l.x1} ${l.y} Q ${mx} ${l.y + dip} ${l.x2} ${l.y}`} fill="none" stroke="#f79009" strokeWidth={2} strokeDasharray="5 4" />
              <rect x={mx - 23} y={l.y + dip / 2 - 6} width={46} height={16} rx={8} fill="#fff7ed" stroke="#fdb022" />
              <text x={mx} y={l.y + dip / 2 + 5} textAnchor="middle" fontSize={10} fontWeight={700} fill="#b54708">dupla</text>
            </g>
          );
        })}
      </svg>
      <ul className="tree" style={{ zoom }}>{renderNode(rootId(people))}</ul>
      <div className="mt-7 flex items-center gap-2 text-[11.5px] text-slate-400">
        <span className="inline-block h-0 w-6 border-t-2 border-dashed border-amber-500" /> Linea punteada = dupla / colaboracion directa (no jerarquica)
      </div>
      <div className="mt-1.5 text-[11.5px] text-slate-400">Arrastra una tarjeta sobre otra para cambiar a quien reporta.</div>
      <StructureDialog people={people} setPeople={setPeople} editId={editId} onClose={() => setEditId(null)} />
      <div className="fixed bottom-6 right-6 z-30 flex items-center gap-0.5 rounded-full border border-slate-200 bg-white px-1.5 py-1 shadow-lg">
        <button onClick={() => setZoom((z) => Math.max(0.5, Math.round((z - 0.1) * 10) / 10))} className="flex h-8 w-8 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100" title="Alejar"><Minus className="h-4 w-4" /></button>
        <button onClick={() => setZoom(1)} className="w-12 text-center text-xs font-bold tabular-nums text-slate-700 hover:text-blue-600" title="Restablecer zoom">{Math.round(zoom * 100)}%</button>
        <button onClick={() => setZoom((z) => Math.min(1.8, Math.round((z + 0.1) * 10) / 10))} className="flex h-8 w-8 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100" title="Acercar"><Plus className="h-4 w-4" /></button>
      </div>
    </div>
  );
}

function StructureDialog(props: { people: Person[]; setPeople: (fn: (p: Person[]) => Person[]) => void; editId: string | null; onClose: () => void; }) {
  const { people, setPeople, editId, onClose } = props;
  const n = editId ? people.find((p) => p.id === editId) : null;
  if (!n) return null;
  const blocked = new Set([n.id, ...descendants(people, n.id)]);
  const options = people.filter((p) => !blocked.has(p.id));
  const patch = (k: keyof Person, v: string) => setPeople((arr) => arr.map((p) => (p.id === n.id ? { ...p, [k]: v } : p)));
  function setParent(v: string) { setPeople((arr) => arr.map((p) => (p.id === n!.id ? { ...p, parent: v === "__root__" ? null : v } : p))); }
  function del() {
    if (n!.parent === null) return;
    if (!window.confirm("Eliminar a " + n!.name + "? Sus reportes pasan a su jefe.")) return;
    setPeople((arr) => arr.filter((p) => p.id !== n!.id).map((p) => (p.parent === n!.id ? { ...p, parent: n!.parent } : p)));
    onClose();
  }
  return (
    <Dialog open={!!editId} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader><DialogTitle>Estructura</DialogTitle></DialogHeader>
        <div className="space-y-3">
          <Field label="Nombre"><Input value={n.name} onChange={(e) => patch("name", e.target.value)} /></Field>
          <Field label="Titulo / Puesto"><Input value={n.title} onChange={(e) => patch("title", e.target.value)} /></Field>
          <Field label="Reporta a">
            <select className="h-9 w-full rounded-md border border-slate-300 bg-white px-2 text-sm" value={n.parent === null ? "__root__" : n.parent} onChange={(e) => setParent(e.target.value)}>
              <option value="__root__">— Nadie (raiz) —</option>
              {options.map((o) => <option key={o.id} value={o.id}>{o.name}{o.title ? " · " + o.title : ""}</option>)}
            </select>
          </Field>
          <p className="text-[11.5px] text-slate-400">El detalle del rol se edita en la pestana Roles.</p>
        </div>
        <DialogFooter className="gap-2 sm:justify-between">
          {n.parent !== null ? <Button variant="outline" className="text-red-600" onClick={del}><Trash2 className="mr-1 h-3.5 w-3.5" />Eliminar</Button> : <span />}
          <Button onClick={onClose}>Cerrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ---------------- ROLES VIEW ---------------- */
function RolesView(props: { people: Person[]; setPeople: (fn: (p: Person[]) => Person[]) => void; framework: Framework; }) {
  const { people, setPeople, framework } = props;
  const ids = orderedIds(people);
  const [sel, setSel] = useState<string>(ids[0]);
  const n = people.find((p) => p.id === sel) || people[0];
  const patch = (k: keyof Person, v: string) => setPeople((arr) => arr.map((p) => (p.id === n.id ? { ...p, [k]: v } : p)));
  const toggleLine = (line: string) => setPeople((arr) => arr.map((p) => (p.id === n.id ? { ...p, lines: p.lines.includes(line) ? p.lines.filter((l) => l !== line) : [...p.lines, line] } : p)));
  const boss = n.parent ? people.find((p) => p.id === n.parent) : null;
  const owned = functionsOwnedBy(framework, n.id);
  const reports = childrenOf(people, n.id).length;
  const autoCoord = autoCoordHours(people, n.id);
  const coordVal = n.coordOverride != null ? n.coordOverride : autoCoord;
  const isManualCoord = n.coordOverride != null;
  const setCoord = (v: number) => setPeople((arr) => arr.map((p) => (p.id === n.id ? { ...p, coordOverride: Math.max(0, v) } : p)));
  const resetCoord = () => setPeople((arr) => arr.map((p) => (p.id === n.id ? { ...p, coordOverride: null } : p)));

  function addPerson() {
    const id = uid();
    setPeople((arr) => [...arr, { id, name: "Nueva persona", title: "", parent: rootId(arr), mission: "", notes: "", scope: "", lines: [], kpis: "" }]);
    setSel(id);
  }

  return (
    <div className="flex min-h-[calc(100vh-110px)]">
      <aside className="w-[280px] shrink-0 overflow-y-auto border-r border-slate-200 bg-white p-2.5">
        {ids.map((id) => {
          const p = people.find((x) => x.id === id)!; const active = id === sel;
          return (
            <button key={id} onClick={() => setSel(id)} className={"mb-0.5 block w-full rounded-lg border px-3 py-2.5 text-left " + (active ? "border-indigo-200 bg-indigo-50" : "border-transparent hover:bg-slate-100")}>
              <div className="text-[13px] font-bold">{p.parent === null && <span className="text-blue-600">▸ </span>}{p.name || "(sin nombre)"}</div>
              <div className="mt-px text-[11.5px] text-slate-500">{p.title}</div>
            </button>
          );
        })}
        <Button variant="outline" size="sm" className="mt-2 w-full" onClick={addPerson}><Plus className="mr-1 h-3.5 w-3.5" />Agregar persona</Button>
      </aside>

      <section className="max-w-[760px] flex-1 overflow-y-auto px-8 pb-24 pt-6">
        <Input value={n.name} onChange={(e) => patch("name", e.target.value)} className="border-0 border-b border-dashed border-transparent px-0 text-[19px] font-extrabold tracking-tight focus-visible:border-blue-500 focus-visible:ring-0" />
        <Input value={n.title} onChange={(e) => patch("title", e.target.value)} placeholder="Titulo / Puesto" className="mt-1 max-w-[420px]" />
        <div className="mb-5 mt-2 text-xs text-slate-500">{boss ? <>Reporta a <b className="text-slate-700">{boss.name}</b>{boss.title ? " · " + boss.title : ""}</> : "Cabeza del organigrama"}</div>

        <RoleField label="Mision del puesto" value={n.mission} onChange={(v) => patch("mission", v)} small />
        <RoleField label="Funciones y responsabilidades" value={n.notes} onChange={(v) => patch("notes", v)} />
        <div className="mt-4">
          <div className="mb-1.5 text-[11.5px] font-bold uppercase tracking-wide text-slate-500">Alcance / lineas</div>
          <LinesMultiSelect selected={n.lines} onToggle={toggleLine} />
        </div>
        <RoleField label="KPIs / resultados de los que es dueno" value={n.kpis} onChange={(v) => patch("kpis", v)} />

        {reports > 0 && (
          <div className="mt-4">
            <div className="mb-1.5 text-[11.5px] font-bold uppercase tracking-wide text-slate-500">Coordinacion de equipo (h/mes)</div>
            <div className="flex items-center gap-2">
              <input type="number" min={0} value={coordVal} onChange={(e) => setCoord(Number(e.target.value) || 0)} className="w-24 rounded-md border border-slate-300 px-2.5 py-1.5 text-sm outline-none focus:border-blue-500" />
              {isManualCoord && <button onClick={resetCoord} className="rounded-md border border-slate-300 px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50">Usar automatico</button>}
            </div>
            <div className="mt-1.5 text-[11.5px] text-slate-400">Automatico: {reports} reporte{reports !== 1 ? "s" : ""} x {COORD_PER_REPORT} = {autoCoord} h/mes. {isManualCoord ? "Estas usando un valor manual; se refleja en la carga de Funcionamiento." : "Usando el calculo automatico. Editalo para ajustar."}</div>
          </div>
        )}

        <div className="mt-6 border-t border-slate-200 pt-4">
          <div className="mb-1 text-[11.5px] font-bold uppercase tracking-wide text-slate-500">Responsable de (funciones del area) · {owned.length}</div>
          {owned.length === 0
            ? <div className="py-1 text-[12.5px] text-slate-400">Sin funciones asignadas todavia. Se asignan en la pestana Funcionamiento.</div>
            : owned.map((o, i) => (
              <div key={i} className="flex items-baseline gap-2 border-b border-dashed border-slate-100 py-1.5 text-[12.5px]">
                <span className="min-w-[84px] shrink-0 text-[10.5px] font-bold uppercase tracking-wide text-slate-400">{o.area}</span>
                <span className="flex-1 text-slate-700">{o.text}</span>
                {o.shared && <span className="shrink-0 rounded border border-amber-300 bg-amber-50 px-1.5 text-[10px] font-bold text-amber-700">compartida</span>}
              </div>
            ))}
          <div className="mt-1.5 text-[11.5px] text-slate-400">Esta lista se construye sola con lo que asignes en Funcionamiento.</div>
        </div>
      </section>
    </div>
  );
}

function LinesMultiSelect(props: { selected: string[]; onToggle: (line: string) => void }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {LINE_OPTIONS.map((line) => {
        const on = props.selected.includes(line);
        return (
          <button key={line} onClick={() => props.onToggle(line)} className={"rounded-full border px-3 py-1 text-xs font-semibold transition " + (on ? "border-blue-300 bg-blue-50 text-blue-700" : "border-slate-200 bg-white text-slate-500 hover:border-slate-300")}>
            {on ? "✓ " : ""}{line}
          </button>
        );
      })}
    </div>
  );
}

/* ---------------- FUNC VIEW ---------------- */
interface Accent { bar: string; chipBorder: string; chipBg: string; text: string; Icon: typeof Megaphone; }
const BLOCK_ACCENT: Record<string, Accent> = {
  mkt: { bar: "bg-blue-500", chipBorder: "border-blue-200", chipBg: "bg-blue-50", text: "text-blue-700", Icon: Megaphone },
  ped: { bar: "bg-emerald-500", chipBorder: "border-emerald-200", chipBg: "bg-emerald-50", text: "text-emerald-700", Icon: GraduationCap },
};
function accentFor(id: string): Accent {
  return BLOCK_ACCENT[id] || { bar: "bg-slate-400", chipBorder: "border-slate-200", chipBg: "bg-slate-100", text: "text-slate-600", Icon: Layers };
}
function impactCls(im: Impact): string {
  return im === "alto" ? "border-rose-300 bg-rose-50 text-rose-700"
    : im === "medio" ? "border-amber-300 bg-amber-50 text-amber-700"
    : im === "bajo" ? "border-slate-300 bg-slate-100 text-slate-500"
    : "border-dashed border-slate-300 bg-white text-slate-400";
}
const IMPACT_BAR: Record<string, string> = { alto: "bg-rose-500", medio: "bg-amber-400", bajo: "bg-slate-300", "": "bg-slate-200" };

function AutoTextarea(props: { value: string; onChange: (v: string) => void; placeholder?: string; className?: string }) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const resize = () => { const el = ref.current; if (!el) return; el.style.height = "auto"; el.style.height = el.scrollHeight + "px"; };
  useLayoutEffect(() => { resize(); }, [props.value]);
  return <textarea ref={ref} rows={1} value={props.value} placeholder={props.placeholder} onChange={(e) => props.onChange(e.target.value)} className={"w-full resize-none overflow-hidden bg-transparent outline-none " + (props.className || "")} />;
}

function FuncView(props: { people: Person[]; framework: Framework; setFramework: (fn: (f: Framework) => Framework) => void; }) {
  const { people, framework, setFramework } = props;
  const [onlyGaps, setOnlyGaps] = useState(false);
  const [filterImpact, setFilterImpact] = useState<string>("");
  const [filterOwner, setFilterOwner] = useState<string>("");
  const filtersActive = onlyGaps || filterImpact !== "" || filterOwner !== "";
  function matchItem(i: FuncItem): boolean {
    if (onlyGaps && i.owners.length !== 0) return false;
    if (filterImpact) { if (filterImpact === "none") { if (i.impact !== "") return false; } else if (i.impact !== filterImpact) return false; }
    if (filterOwner && !i.owners.includes(filterOwner)) return false;
    return true;
  }

  const setIntro = (v: string) => setFramework((f) => ({ ...f, intro: v }));
  const setBlockTitle = (bid: string, v: string) => setFramework((f) => ({ ...f, blocks: f.blocks.map((b) => (b.id === bid ? { ...b, title: v } : b)) }));
  const setItemText = (bid: string, iid: string, v: string) => setFramework((f) => ({ ...f, blocks: f.blocks.map((b) => (b.id === bid ? { ...b, items: b.items.map((i) => (i.id === iid ? { ...i, text: v } : i)) } : b)) }));
  const setItemHours = (bid: string, iid: string, v: number) => setFramework((f) => ({ ...f, blocks: f.blocks.map((b) => (b.id === bid ? { ...b, items: b.items.map((i) => (i.id === iid ? { ...i, hours: v } : i)) } : b)) }));
  const setItemImpact = (bid: string, iid: string, v: Impact) => setFramework((f) => ({ ...f, blocks: f.blocks.map((b) => (b.id === bid ? { ...b, items: b.items.map((i) => (i.id === iid ? { ...i, impact: v } : i)) } : b)) }));
  const addOwner = (bid: string, iid: string, oid: string) => setFramework((f) => ({ ...f, blocks: f.blocks.map((b) => (b.id === bid ? { ...b, items: b.items.map((i) => (i.id === iid && !i.owners.includes(oid) ? { ...i, owners: [...i.owners, oid] } : i)) } : b)) }));
  const removeOwner = (bid: string, iid: string, oid: string) => setFramework((f) => ({ ...f, blocks: f.blocks.map((b) => (b.id === bid ? { ...b, items: b.items.map((i) => (i.id === iid ? { ...i, owners: i.owners.filter((o) => o !== oid) } : i)) } : b)) }));
  const addItem = (bid: string) => setFramework((f) => ({ ...f, blocks: f.blocks.map((b) => (b.id === bid ? { ...b, items: [...b.items, { id: uid("i"), text: "Nueva funcion", owners: [], hours: 0, impact: "" }] } : b)) }));
  const delItem = (bid: string, iid: string) => { if (!window.confirm("Eliminar esta funcion?")) return; setFramework((f) => ({ ...f, blocks: f.blocks.map((b) => (b.id === bid ? { ...b, items: b.items.filter((i) => i.id !== iid) } : b)) })); };
  const addBlock = () => setFramework((f) => ({ ...f, blocks: [...f.blocks, { id: uid("b"), title: "Nuevo frente", items: [] }] }));
  const setHandoff = (id: string, k: keyof Handoff, v: string) => setFramework((f) => ({ ...f, handoffs: f.handoffs.map((h) => (h.id === id ? { ...h, [k]: v } : h)) }));
  const addHandoff = () => setFramework((f) => ({ ...f, handoffs: [...f.handoffs, { id: uid("h"), from: "", to: "", desc: "" }] }));
  const delHandoff = (id: string) => setFramework((f) => ({ ...f, handoffs: f.handoffs.filter((h) => h.id !== id) }));

  const allItems = framework.blocks.flatMap((b) => b.items);
  const filteredItems = allItems.filter(matchItem);
  const total = allItems.length;
  const unassigned = allItems.filter((i) => i.owners.length === 0).length;
  const totalHours = allItems.reduce((a, i) => a + (i.hours || 0), 0);

  // Las graficas responden a los filtros activos.
  const ibh: Record<string, number> = { alto: 0, medio: 0, bajo: 0, "": 0 };
  filteredItems.forEach((i) => { ibh[i.impact || ""] += i.hours || 0; });
  const impactTotal = Math.max(1, ibh.alto + ibh.medio + ibh.bajo + ibh[""]);

  const fnHours = (pid: string) => { let h = 0; filteredItems.forEach((i) => { if (i.owners.includes(pid) && i.owners.length > 0) h += (i.hours || 0) / i.owners.length; }); return h; };
  const loadRows = orderedIds(people)
    .map((id) => { const fh = fnHours(id); const ch = filtersActive ? 0 : coordHoursFor(people, id); return { id, name: ownerName(people, id), fh, ch, hours: fh + ch, ext: false }; })
    .concat(EXT_OWNERS.map((e) => { const fh = fnHours(e.id); return { id: e.id, name: e.name, fh, ch: 0, hours: fh, ext: true }; }))
    .filter((x) => x.hours > 0).sort((a, b) => b.hours - a.hours);
  const maxHours = Math.max(CAPACITY_HOURS, ...loadRows.map((x) => x.hours));
  function barColor(hours: number, ext: boolean): string {
    if (ext) return "bg-slate-400";
    const r = hours / CAPACITY_HOURS;
    if (r > 1) return "bg-red-500"; if (r > 0.85) return "bg-amber-500"; return "bg-emerald-500";
  }

  return (
    <div className="mx-auto max-w-[920px] px-6 pb-24 pt-7">
      <h2 className="text-lg font-extrabold tracking-tight text-slate-900">Como funciona la Direccion de Marketing</h2>
      <p className="mt-0.5 text-[13px] text-slate-500">Cada funcion tiene responsables, horas/mes e impacto en negocio. Lo que asignes aqui se refleja en Organigrama y Roles.</p>

      <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
        <AutoTextarea value={framework.intro} onChange={setIntro} placeholder="Resumen de la logica del area..." className="text-[13px] leading-relaxed text-slate-600" />
      </div>

      <div className="mt-5 rounded-2xl border-2 border-slate-200 bg-slate-50/60 p-4">
        <ModuleLabel hint="Métricas y carga del área. Responde a los filtros.">Resumen y carga</ModuleLabel>
      <div className="flex flex-wrap items-center gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3">
        <Stat label="Funciones" value={total} />
        <div className="h-8 w-px bg-slate-200" />
        <Stat label="Sin responsable" value={unassigned} warn={unassigned > 0} />
        <div className="h-8 w-px bg-slate-200" />
        <Stat label="Horas/mes" value={totalHours} />
        <div className="ml-auto flex items-center gap-2"><span className="text-xs font-medium text-slate-500">Solo sin responsable</span><Switch checked={onlyGaps} onCheckedChange={setOnlyGaps} /></div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5">
        <span className="text-[11px] font-bold uppercase tracking-wide text-slate-400">Filtrar</span>
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-slate-500">Impacto:</span>
          {([["", "Todos"], ["alto", "Alto"], ["medio", "Medio"], ["bajo", "Bajo"], ["none", "Sin clasificar"]] as [string, string][]).map(([v, l]) => (
            <button key={v || "all"} onClick={() => setFilterImpact(v)} className={"rounded-full border px-2.5 py-0.5 text-xs font-semibold transition " + (filterImpact === v ? "border-blue-300 bg-blue-50 text-blue-700" : "border-slate-200 bg-white text-slate-500 hover:border-slate-300")}>{l}</button>
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-slate-500">Persona:</span>
          <select value={filterOwner} onChange={(e) => setFilterOwner(e.target.value)} className="rounded-md border border-slate-300 px-2 py-1 text-xs outline-none focus:border-blue-500">
            <option value="">Todas</option>
            {orderedIds(people).map((id) => { const p = people.find((x) => x.id === id)!; return <option key={id} value={id}>{p.name}</option>; })}
            {EXT_OWNERS.map((e) => <option key={e.id} value={e.id}>{e.name} (externo)</option>)}
          </select>
        </div>
        {filtersActive && <button onClick={() => { setOnlyGaps(false); setFilterImpact(""); setFilterOwner(""); }} className="text-xs font-semibold text-slate-500 underline hover:text-slate-700">Limpiar filtros</button>}
      </div>

      <div className="mt-3 rounded-xl border border-slate-200 bg-white px-4 py-3.5">
        <div className="mb-2 text-[11px] font-bold uppercase tracking-wide text-slate-400">Horas por impacto en negocio{filtersActive && <span className="ml-2 normal-case text-blue-600">· filtrado</span>}</div>
        <div className="flex h-3 overflow-hidden rounded-full">
          {(["alto", "medio", "bajo", ""] as Impact[]).map((im) => { const w = (ibh[im] / impactTotal) * 100; if (w <= 0) return null; return <div key={im || "none"} className={IMPACT_BAR[im]} style={{ width: w + "%" }} title={(im || "sin clasificar") + ": " + ibh[im] + " h"} />; })}
        </div>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11.5px] text-slate-600">
          <Legend color="bg-rose-500" label={"Alto " + ibh.alto + " h"} />
          <Legend color="bg-amber-400" label={"Medio " + ibh.medio + " h"} />
          <Legend color="bg-slate-300" label={"Bajo " + ibh.bajo + " h"} />
          {ibh[""] > 0 && <Legend color="bg-slate-200" label={"Sin clasificar " + ibh[""] + " h"} />}
        </div>
      </div>

      {loadRows.length > 0 && (
        <div className="mt-3 rounded-xl border border-slate-200 bg-white px-4 py-3.5">
          <div className="mb-2.5 flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wide text-slate-400">Carga por persona ({filtersActive ? "filtrado, sin coordinacion" : "h/mes, incl. coordinacion"})</span>
            <span className="text-[11px] text-slate-400">Referencia: {CAPACITY_HOURS} h/mes = tiempo completo</span>
          </div>
          <div className="space-y-1.5">
            {loadRows.map((x) => {
              const fhPct = (x.fh / maxHours) * 100; const chPct = (x.ch / maxHours) * 100; const capPct = (CAPACITY_HOURS / maxHours) * 100;
              const over = !x.ext && x.hours > CAPACITY_HOURS;
              return (
                <div key={x.id} className="flex items-center gap-3">
                  <span className="w-36 shrink-0 truncate text-[12.5px] font-medium text-slate-700">{x.name}{x.ext && <span className="ml-1 text-[10px] text-slate-400">ext</span>}</span>
                  <div className="relative h-2.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                    <div className={"absolute left-0 top-0 h-full " + barColor(x.hours, x.ext)} style={{ width: fhPct + "%" }} />
                    {x.ch > 0 && <div className="absolute top-0 h-full bg-slate-400/70" style={{ left: fhPct + "%", width: chPct + "%" }} title={"Coordinacion " + x.ch + " h"} />}
                    <div className="absolute top-0 h-full w-px bg-slate-500/60" style={{ left: capPct + "%" }} title="Tiempo completo" />
                  </div>
                  <span className={"w-24 shrink-0 text-right text-[12.5px] font-bold tabular-nums " + (over ? "text-red-600" : "text-slate-700")}>{Math.round(x.hours)} h{x.ch > 0 && <span className="ml-1 text-[10px] font-normal text-slate-400">+{x.ch} coord</span>}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
      </div>

      <div className="mt-6">
        <ModuleLabel hint="Las áreas y sus funciones: responsable, horas e impacto.">Frentes del área</ModuleLabel>
      {framework.blocks.map((b) => {
        const acc = accentFor(b.id);
        const bUn = b.items.filter((i) => i.owners.length === 0).length;
        const bHours = b.items.reduce((a, i) => a + (i.hours || 0), 0);
        const items = b.items.filter(matchItem);
        const AccIcon = acc.Icon;
        return (
          <section key={b.id} className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3">
              <span className={"flex h-8 w-8 items-center justify-center rounded-lg " + acc.chipBg}><AccIcon className={"h-4 w-4 " + acc.text} /></span>
              <input value={b.title} onChange={(e) => setBlockTitle(b.id, e.target.value)} className="min-w-0 flex-1 bg-transparent text-[15px] font-extrabold tracking-tight text-slate-900 outline-none" />
              <span className="shrink-0 text-[11px] font-medium text-slate-400">{bHours} h/mes</span>
              <span className={"shrink-0 rounded-md border px-2 py-0.5 text-[11px] font-semibold " + acc.chipBorder + " " + acc.chipBg + " " + acc.text}>{b.items.length} func.</span>
              {bUn > 0 && <span className="shrink-0 rounded-md border border-amber-300 bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700">{bUn} sin responsable</span>}
            </div>
            <div className="space-y-2 p-3">
              {items.length === 0
                ? <div className="px-2 py-6 text-center text-[13px] text-slate-400">{filtersActive ? "Ningun resultado con los filtros actuales." : "Sin funciones todavia."}</div>
                : items.map((item) => (
                  <FwItemRow key={item.id} people={people} item={item}
                    onText={(v) => setItemText(b.id, item.id, v)} onHours={(v) => setItemHours(b.id, item.id, v)} onImpact={(v) => setItemImpact(b.id, item.id, v)}
                    onAdd={(oid) => addOwner(b.id, item.id, oid)} onRemove={(oid) => removeOwner(b.id, item.id, oid)} onDelete={() => delItem(b.id, item.id)} />
                ))}
              {!onlyGaps && <button onClick={() => addItem(b.id)} className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-slate-300 py-2 text-xs font-semibold text-slate-500 hover:border-slate-400 hover:bg-slate-50"><Plus className="h-3.5 w-3.5" />Agregar funcion</button>}
            </div>
          </section>
        );
      })}
        <div className="mt-4"><Button variant="outline" size="sm" onClick={addBlock}><Plus className="mr-1 h-3.5 w-3.5" />Agregar frente</Button></div>
      </div>

      <div className="mt-6">
        <ModuleLabel hint="Las interfaces donde el valor pasa de un área a otra. Aquí es donde se cae la pelota.">Traspasos entre áreas</ModuleLabel>
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="space-y-2 p-3">
          {framework.handoffs.map((h) => (
            <div key={h.id} className="group rounded-lg border border-slate-200 bg-white px-3 py-2.5 hover:border-slate-300">
              <div className="flex items-center gap-2">
                <input value={h.from} onChange={(e) => setHandoff(h.id, "from", e.target.value)} placeholder="De..." className="min-w-0 flex-1 rounded-md bg-slate-50 px-2 py-1 text-[12.5px] font-semibold text-slate-700 outline-none focus:bg-slate-100" />
                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                <input value={h.to} onChange={(e) => setHandoff(h.id, "to", e.target.value)} placeholder="A..." className="min-w-0 flex-1 rounded-md bg-slate-50 px-2 py-1 text-[12.5px] font-semibold text-slate-700 outline-none focus:bg-slate-100" />
                <button onClick={() => delHandoff(h.id)} className="p-1 text-slate-300 opacity-0 transition hover:text-red-600 group-hover:opacity-100"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
              <AutoTextarea value={h.desc} onChange={(v) => setHandoff(h.id, "desc", v)} placeholder="Que se traspasa y cual es el riesgo si falla..." className="mt-1.5 text-[12.5px] leading-snug text-slate-600" />
            </div>
          ))}
          <button onClick={addHandoff} className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-slate-300 py-2 text-xs font-semibold text-slate-500 hover:border-slate-400 hover:bg-slate-50"><Plus className="h-3.5 w-3.5" />Agregar traspaso</button>
        </div>
      </section>
      </div>
    </div>
  );
}

function Legend(props: { color: string; label: string }) {
  return <span className="inline-flex items-center gap-1.5"><span className={"h-2.5 w-2.5 rounded-sm " + props.color} />{props.label}</span>;
}
function ModuleLabel(props: { children: ReactNode; hint?: string }) {
  return (
    <div className="mb-3 flex items-center gap-3">
      <h3 className="shrink-0 text-[12px] font-extrabold uppercase tracking-wider text-slate-600">{props.children}</h3>
      {props.hint && <span className="hidden min-w-0 shrink truncate text-[11px] text-slate-400 md:inline">{props.hint}</span>}
      <div className="h-px flex-1 bg-slate-200" />
    </div>
  );
}
function Stat(props: { label: string; value: number; warn?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span className={"text-2xl font-extrabold tabular-nums " + (props.warn ? "text-amber-600" : "text-slate-900")}>{props.value}</span>
      <span className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">{props.warn && <AlertTriangle className="h-3 w-3 text-amber-500" />}{props.label}</span>
    </div>
  );
}

function FwItemRow(props: {
  people: Person[]; item: FuncItem;
  onText: (v: string) => void; onHours: (v: number) => void; onImpact: (v: Impact) => void; onAdd: (oid: string) => void; onRemove: (oid: string) => void; onDelete: () => void;
}) {
  const { people, item, onText, onHours, onImpact, onAdd, onRemove, onDelete } = props;
  const shared = item.owners.length > 1;
  const none = item.owners.length === 0;
  const available = orderedIds(people).filter((id) => !item.owners.includes(id));
  const extAvail = EXT_OWNERS.filter((e) => !item.owners.includes(e.id));
  return (
    <div className={"group relative rounded-lg border px-3 py-2.5 transition " + (none ? "border-slate-200 border-l-[3px] border-l-amber-400 bg-amber-50/40" : "border-slate-200 bg-white hover:border-slate-300")}>
      <AutoTextarea value={item.text} onChange={onText} className="text-[13px] font-medium leading-snug text-slate-800" />
      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        {item.owners.map((oid) => {
          const ext = isExt(oid);
          const cls = ext ? "border-slate-300 bg-slate-100 text-slate-600" : shared ? "border-amber-300 bg-amber-50 text-amber-700" : "border-indigo-200 bg-indigo-50 text-indigo-700";
          return (
            <span key={oid} className={"inline-flex items-center gap-1 rounded-full border py-0.5 pl-2.5 pr-1 text-xs font-semibold " + cls}>
              {ownerName(people, oid)}{shared && <span className="text-[10px] font-normal opacity-70">/{item.owners.length}</span>}
              <button onClick={() => onRemove(oid)} className="opacity-60 hover:opacity-100"><X className="h-3 w-3" /></button>
            </span>
          );
        })}
        {none && <span className="inline-flex items-center gap-1 rounded-full border border-amber-300 bg-amber-100/60 px-2 py-0.5 text-[11px] font-bold text-amber-700"><AlertTriangle className="h-3 w-3" />Sin responsable</span>}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="inline-flex items-center gap-1 rounded-full border border-dashed border-slate-300 px-2.5 py-1 text-xs font-semibold text-slate-500 hover:border-slate-400 hover:bg-slate-50"><UserPlus className="h-3.5 w-3.5" />Responsable</button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="max-h-72 overflow-y-auto">
            <DropdownMenuLabel>Asignar a</DropdownMenuLabel>
            {available.map((id) => { const p = people.find((x) => x.id === id)!; return <DropdownMenuItem key={id} onSelect={() => onAdd(id)}>{p.name}</DropdownMenuItem>; })}
            {extAvail.length > 0 && <DropdownMenuSeparator />}
            {extAvail.map((e) => <DropdownMenuItem key={e.id} onSelect={() => onAdd(e.id)}>{e.name} <span className="ml-1 text-[10px] text-slate-400">externo</span></DropdownMenuItem>)}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="ml-auto flex items-center gap-1.5">
          <select value={item.impact} onChange={(e) => onImpact(e.target.value as Impact)} title="Impacto en negocio" className={"rounded-full border px-2 py-0.5 text-[11px] font-semibold outline-none " + impactCls(item.impact)}>
            <option value="">Impacto?</option><option value="alto">Alto</option><option value="medio">Medio</option><option value="bajo">Bajo</option>
          </select>
          <label className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-0.5 text-xs text-slate-600" title="Horas estimadas por mes">
            <Clock className="h-3 w-3 text-slate-400" />
            <input type="number" min={0} value={item.hours} onChange={(e) => onHours(Math.max(0, Number(e.target.value) || 0))} className="w-9 bg-transparent text-right outline-none" />
            <span className="text-slate-400">h/mes</span>
          </label>
          <button onClick={onDelete} className="p-1 text-slate-300 opacity-0 transition hover:text-red-600 group-hover:opacity-100"><Trash2 className="h-3.5 w-3.5" /></button>
        </div>
      </div>
      {shared && <div className="mt-1 text-[10.5px] text-slate-400">Horas divididas en partes iguales entre {item.owners.length} responsables.</div>}
    </div>
  );
}

/* ---------------- LOGIN ---------------- */
function LoginScreen(props: { onSuccess: () => void }) {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState(false);
  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (u.trim() === AUTH_USER && p === AUTH_PASS) { setErr(false); props.onSuccess(); } else { setErr(true); }
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <form onSubmit={submit} className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-900 text-sm font-extrabold tracking-tight text-white">SM</div>
          <h1 className="mt-3 text-lg font-extrabold tracking-tight text-slate-900">Direccion de Marketing</h1>
          <p className="text-xs text-slate-500">SM Mexico</p>
        </div>
        <label className="mb-1.5 block text-[11.5px] font-bold uppercase tracking-wide text-slate-500">Usuario</label>
        <Input value={u} onChange={(e) => setU(e.target.value)} placeholder="Usuario" autoFocus />
        <label className="mb-1.5 mt-4 block text-[11.5px] font-bold uppercase tracking-wide text-slate-500">Contrasena</label>
        <Input type="password" value={p} onChange={(e) => setP(e.target.value)} placeholder="Contrasena" />
        {err && <p className="mt-3 text-[12.5px] font-medium text-red-600">Usuario o contrasena incorrectos.</p>}
        <Button type="submit" className="mt-5 w-full">Entrar</Button>
      </form>
    </div>
  );
}

/* ---------------- BUDGET VIEW ---------------- */
function BudgetView() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100"><Wallet className="h-8 w-8 text-slate-400" /></div>
      <h2 className="mt-4 text-xl font-extrabold tracking-tight text-slate-800">Presupuesto</h2>
      <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-amber-700">Proximamente</span>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-500">Aqui vivira el presupuesto del area y su cruce con resultados: impacto por peso. En construccion.</p>
    </div>
  );
}

/* ---------------- small helpers ---------------- */
function Field(props: { label: string; children: ReactNode }) {
  return <div><div className="mb-1.5 text-[11.5px] font-bold uppercase tracking-wide text-slate-500">{props.label}</div>{props.children}</div>;
}
function RoleField(props: { label: string; value: string; onChange: (v: string) => void; small?: boolean }) {
  return (
    <div className="mt-4">
      <div className="mb-1.5 text-[11.5px] font-bold uppercase tracking-wide text-slate-500">{props.label}</div>
      <Textarea value={props.value} onChange={(e) => props.onChange(e.target.value)} className={props.small ? "min-h-[54px]" : "min-h-[110px]"} />
    </div>
  );
}
