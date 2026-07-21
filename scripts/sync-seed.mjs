#!/usr/bin/env node
// Sincroniza la semilla DEFAULT_* de src/data.ts con el estado vivo en Supabase.
// Uso:  node scripts/sync-seed.mjs            (lee el estado vivo de la nube)
//       node scripts/sync-seed.mjs ruta.json  (usa un respaldo local: fila de PostgREST o el objeto data)
// Correr cada vez que la nube evolucione y se quiera que "Restaurar" y el arranque
// sin red reflejen el estado real (pendiente #1 del contexto).

import { readFileSync, writeFileSync } from "node:fs";

const SB_URL = "https://zrooipzscpkagjdpyxic.supabase.co";
const SB_KEY = "sb_publishable__6P7PyqfzqJ0ZN9YVYidpg_8BccM_1V";

async function loadState() {
  const arg = process.argv[2];
  if (arg) {
    const j = JSON.parse(readFileSync(arg, "utf8"));
    if (Array.isArray(j)) return j[0].data;
    return j.data ?? j;
  }
  const r = await fetch(`${SB_URL}/rest/v1/app_state?id=eq.1&select=data,updated_at`, {
    headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` },
  });
  if (!r.ok) throw new Error(`Supabase respondió ${r.status}`);
  const rows = await r.json();
  if (!rows.length) throw new Error("No hay fila id=1 en app_state");
  console.log(`Estado de la nube con updated_at = ${rows[0].updated_at}`);
  return rows[0].data;
}

const st = await loadState();
if (!Array.isArray(st.people) || st.people.length === 0) throw new Error("people vacío: no sobreescribo la semilla");
if (!st.framework || !Array.isArray(st.framework.blocks) || st.framework.blocks.length === 0)
  throw new Error("framework vacío: no sobreescribo la semilla");

// Normaliza al contrato de src/data.ts (solo campos conocidos, con defaults seguros).
const people = st.people.map((p) => ({
  id: p.id, name: p.name ?? "", title: p.title ?? "", parent: p.parent ?? null,
  mission: p.mission ?? "", notes: p.notes ?? "", scope: p.scope ?? "",
  lines: Array.isArray(p.lines) ? p.lines : [], kpis: p.kpis ?? "",
  ...(p.coordOverride !== undefined ? { coordOverride: p.coordOverride } : {}),
}));
const framework = {
  intro: st.framework.intro ?? "",
  blocks: st.framework.blocks.map((b) => ({
    id: b.id, title: b.title ?? "",
    items: (b.items ?? []).map((i) => ({
      id: i.id, text: i.text ?? "", owners: Array.isArray(i.owners) ? i.owners : [],
      hours: typeof i.hours === "number" ? i.hours : 0, impact: i.impact ?? "",
    })),
  })),
  handoffs: (st.framework.handoffs ?? []).map((h) => ({
    id: h.id, from: h.from ?? "", to: h.to ?? "", desc: h.desc ?? "",
  })),
};

const nFn = framework.blocks.reduce((n, b) => n + b.items.length, 0);
const nHoras = framework.blocks.reduce((n, b) => n + b.items.reduce((m, i) => m + (i.hours || 0), 0), 0);
const fecha = new Date().toISOString().slice(0, 10);

const START = "// ===== SEMILLA GENERADA — INICIO =====";
const END = "// ===== SEMILLA GENERADA — FIN =====";
const gen = [
  START,
  "// Generada desde el estado vivo en Supabase (app_state id=1). NO editar a mano:",
  "// regenerar con  node scripts/sync-seed.mjs",
  `// Última sincronización: ${fecha} · ${people.length} personas · ${nFn} funciones · ${nHoras} h/mes · ${framework.handoffs.length} traspasos`,
  `export const DEFAULT_PEOPLE: Person[] = ${JSON.stringify(people, null, 2)};`,
  "",
  `export const DEFAULT_FRAMEWORK: Framework = ${JSON.stringify(framework, null, 2)};`,
  END,
].join("\n");

const file = new URL("../src/data.ts", import.meta.url);
const src = readFileSync(file, "utf8");
const i = src.indexOf(START);
const j = src.indexOf(END);
if (i < 0 || j < 0) throw new Error("No encontré los marcadores de semilla en src/data.ts");
writeFileSync(file, src.slice(0, i) + gen + src.slice(j + END.length));
console.log(`Semilla sincronizada: ${people.length} personas, ${nFn} funciones, ${nHoras} h/mes (${fecha}).`);
