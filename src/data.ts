export type Impact = "" | "alto" | "medio" | "bajo";

export const LINE_OPTIONS: string[] = ["FSM", "Vivo", "Texto", "Dayton", "Escuela Católica", "Otros"];

export interface Person {
  id: string;
  name: string;
  title: string;
  parent: string | null;
  mission: string;
  notes: string;
  scope: string;
  lines: string[];
  kpis: string;
  coordOverride?: number | null;
}

export interface FuncItem { id: string; text: string; owners: string[]; hours: number; impact: Impact; }
export interface FuncBlock { id: string; title: string; items: FuncItem[]; }
export interface Handoff { id: string; from: string; to: string; desc: string; }
export interface Framework { intro: string; blocks: FuncBlock[]; handoffs: Handoff[]; }
export interface AppState { people: Person[]; framework: Framework; v?: number; }

export const SEED_VERSION = 5;

export const EXT_OWNERS: { id: string; name: string }[] = [{ id: "ext-comercial", name: "Comercial" }];
export const DOTTED: [string, string][] = [["francisco", "carla"]];
export const STORE_KEY = "sm_org_react_v1";
export const CAPACITY_HOURS = 160;
export const COORD_PER_REPORT = 8;

export function uid(prefix = "n"): string { return prefix + Math.random().toString(36).slice(2, 8); }

const ALL_LINES = [...LINE_OPTIONS];
const PED_LINES = ["Vivo", "Texto", "Dayton", "Escuela Católica"];

let _i = 0;
function fi(text: string, owners: string[], hours: number, impact: Impact): FuncItem {
  _i += 1; return { id: "i" + _i, text, owners, hours, impact };
}

export const DEFAULT_PEOPLE: Person[] = [
  { id: "m", name: "Marcelo Torres", title: "Director de Marketing", parent: null,
    mission: "Liderar la Direccion de Marketing de SM Mexico, su posicionamiento y la entrega de valor a la venta.",
    notes: "Direccion del area y de sus dos frentes (Marketing y Servicios Pedagogicos)\nEstrategia de marketing y posicionamiento\nPR, vocerias y relacion con medios\nAlineacion con la Direccion General y con la casa matriz (Espana)\nGestion del presupuesto de marketing\nDecisiones de estructura, prioridades y asignacion de recursos",
    scope: "", lines: [...ALL_LINES],
    kpis: "Cumplimiento de objetivos de venta apoyados por marketing, posicionamiento de marca, ejecucion del plan de comunicaciones, desempeno global del area." },
  { id: "carla", name: "Carla Catherine Medina", title: "Especialista de comunicacion digital", parent: "m",
    mission: "Duena del marketing digital de SM Mexico en todas las lineas.",
    notes: "Community management\nEmail marketing\nNurturing / marketing automation\nCRM y gobierno de la base de datos (LFPDPPP)\nPauta digital\nSEO y contenido organico\nSitios web y landing pages / conversion\nAnalitica y reporteria digital (KPIs y atribucion por linea)\nWhatsApp / mensajeria\nEventos digitales (transmisiones, webinars)\nCoordinacion de agencias digitales",
    scope: "", lines: [...ALL_LINES],
    kpis: "Leads digitales por linea, conversion, costo por lead, desempeno de pauta, trafico y posicionamiento del sitio." },
  { id: "francisco", name: "Francisco Daniel Marquez Hernandez", title: "Coordinador de diseno", parent: "m",
    mission: "Asegurar la produccion y la calidad del diseno grafico de la direccion para todas las lineas.",
    notes: "Diseno de materiales promocionales (merchandising, flyers, hojas de producto, video explicativo)\nAplicacion de lineamientos visuales y consistencia de marca\nSoporte de diseno a la red comercial\nDupla con Cath (comunicacion digital) para piezas digitales",
    scope: "", lines: [...ALL_LINES],
    kpis: "Tiempo de entrega de piezas, volumen y calidad de materiales producidos, consistencia visual entre lineas." },
  { id: "talavera", name: "Mariana Talavera Camargo", title: "Coordinador de marca", parent: "m",
    mission: "Custodiar la marca SM y habilitar a la red comercial con argumentos y materiales de venta.",
    notes: "Gestion de marca y lineamientos (identidad, consistencia entre lineas)\nPosicionamiento y narrativa institucional (incluye comunicacion de la Direccion General)\nSales enablement (kits, argumentarios, comparativos, capacitacion de producto)\nInteligencia de mercado e investigacion\nCoordinacion de Experiencia de marca (Vargas)",
    scope: "", lines: [...ALL_LINES],
    kpis: "Consistencia de marca, adopcion de materiales por la red comercial, calidad de la inteligencia de mercado, efectividad del posicionamiento." },
  { id: "vargas", name: "Mariana Vargas", title: "Especialista de experiencia de marca", parent: "talavera",
    mission: "Disenar y ejecutar la experiencia de marca en eventos y puntos de contacto.",
    notes: "Organizacion de eventos (SIEI, convenciones, FIL, ferias)\nExperiencia de marca en puntos de contacto\nApoyo a sales enablement y activaciones",
    scope: "", lines: [...ALL_LINES],
    kpis: "Ejecucion y asistencia a eventos, satisfaccion de asistentes, cobertura y leads generados en eventos." },
  { id: "jorge", name: "Jorge Abraham Valverde Sanchez", title: "Coordinador de Servicios Pedagogicos", parent: "m",
    mission: "Dirigir el acompanamiento pedagogico que sostiene la retencion y el crecimiento de colegios usuarios.",
    notes: "Acompanamiento pedagogico a colegios usuarios\nMedicion de uso y adopcion de productos/plataformas\nRetencion y renovacion (compartida con Comercial)\nDeteccion de oportunidades de crecimiento en cuentas\nVoz del usuario hacia el area editorial\nCoordinacion de Liliana y Eliasib",
    scope: "", lines: [...PED_LINES],
    kpis: "Renovacion/retencion de colegios, uso y adopcion de plataformas, NPS de colegios, oportunidades de crecimiento detectadas." },
  { id: "liliana", name: "Liliana Arellano Perez", title: "Especialista en Servicios Pedagogicos", parent: "jorge",
    mission: "Ejecutar la formacion y el soporte que aseguran la adopcion y la satisfaccion de los colegios.",
    notes: "Formacion a traves de @Play (colegios usuarios y de conquista)\nOnboarding e implementacion al inicio de ciclo\nSoporte pedagogico y tecnico (mesa de ayuda)\nComunidad de docentes / embajadores\nApoyo en acompanamiento pedagogico",
    scope: "", lines: [...PED_LINES],
    kpis: "Colegios formados, adopcion tras onboarding, tiempo de resolucion de soporte, tamano y actividad de la comunidad docente." },
  { id: "eliasib", name: "Eliasib Abner Flores Lopez", title: "Analista de produccion de video", parent: "jorge",
    mission: "Producir los materiales audiovisuales de formacion, difusion y capacitacion de la direccion.",
    notes: "Generacion de materiales audiovisuales de formacion, difusion y capacitacion\nApoyo a Marketing en la cobertura audiovisual de eventos\nEdicion y postproduccion",
    scope: "", lines: [...ALL_LINES],
    kpis: "Volumen y tiempo de entrega de piezas de video, uso de los materiales, calidad de produccion." },
];

export const DEFAULT_FRAMEWORK: Framework = {
  intro: "La Direccion de Marketing opera en dos frentes complementarios. Servicios Pedagogicos genera la evidencia (uso, adopcion, casos y testimonios) que alimenta el posicionamiento y los argumentos de venta de Marketing; Marketing genera la demanda y las herramientas que abren y sostienen las cuentas que Servicios Pedagogicos acompana.",
  blocks: [
    { id: "mkt", title: "1) Marketing", items: [
      fi("Presencia de marca en canales digitales (community, contenido, pauta).", ["carla"], 55, "medio"),
      fi("Mantenimiento y actualizacion de la presencia web.", ["carla"], 20, "medio"),
      fi("Organizacion de eventos (SIEI, convenciones, FIL, ferias).", ["vargas"], 75, "alto"),
      fi("Sales enablement - herramientas de venta para la red comercial: kits y presentaciones por linea/campana, argumentarios y manejo de objeciones, hojas de producto y comparativos vs. competencia, demos, catalogos/muestrarios, plantillas de propuesta, casos de exito, capacitacion de producto.", ["talavera"], 35, "alto"),
      fi("Diseno de materiales promocionales (merchandising, flyers, hojas de producto, video explicativo).", ["francisco"], 110, "medio"),
      fi("Posicionamiento y narrativa institucional (incluye comunicacion de la Direccion General).", ["talavera"], 25, "medio"),
      fi("PR, vocerias y relacion con medios.", ["m"], 20, "medio"),
      fi("Gestion de marca y lineamientos (identidad, consistencia entre lineas).", ["talavera"], 20, "bajo"),
      fi("Generacion y nutricion de demanda/leads, con entrega ordenada a comercial (CRM).", ["carla"], 45, "alto"),
      fi("Inteligencia de mercado e investigacion (competencia, segmentos, mercado publico).", ["talavera"], 25, "medio"),
      fi("Medicion y reporteria de marketing (KPIs, desempeno de campanas, presupuesto).", ["carla"], 30, "medio"),
    ]},
    { id: "ped", title: "2) Servicios Pedagogicos", items: [
      fi("Acompanamiento pedagogico a colegios usuarios (clave para la estrategia 2026-2027).", ["jorge", "liliana"], 50, "alto"),
      fi("Formacion a traves de @Play (colegios usuarios y colegios de conquista).", ["liliana"], 40, "alto"),
      fi("Generacion de materiales audiovisuales de formacion, difusion y capacitacion; apoyo a Marketing en cobertura de eventos.", ["eliasib"], 110, "medio"),
      fi("Onboarding e implementacion al inicio de ciclo con colegios nuevos.", ["liliana"], 25, "alto"),
      fi("Medicion de uso y adopcion de productos/plataformas.", ["jorge"], 20, "medio"),
      fi("Retencion y renovacion de colegios usuarios (ingreso recurrente).", ["jorge", "ext-comercial"], 30, "alto"),
      fi("Soporte pedagogico y tecnico (mesa de ayuda).", ["liliana"], 30, "medio"),
      fi("Deteccion de oportunidades de crecimiento en cuentas.", ["jorge", "ext-comercial"], 20, "alto"),
      fi("Voz del usuario: feedback del aula hacia el area editorial / de producto.", ["jorge"], 15, "medio"),
      fi("Comunidad de docentes / embajadores.", ["liliana"], 20, "medio"),
    ]},
  ],
  handoffs: [
    { id: "h1", from: "Marketing digital (Carla)", to: "Comercial", desc: "Entrega de leads calificados con contexto y seguimiento en CRM. Riesgo: leads sin criterio de calificacion o sin retroalimentacion de cierre." },
    { id: "h2", from: "Servicios Pedagogicos", to: "Marketing", desc: "Evidencia de uso, casos de exito y testimonios que alimentan posicionamiento y argumentos de venta. Riesgo: la evidencia no se captura ni llega de forma sistematica." },
    { id: "h3", from: "Servicios Pedagogicos + Comercial", to: "Direccion", desc: "Renovacion: cuentas en riesgo y oportunidades de crecimiento. Riesgo: responsabilidad compartida sin un dueno del numero de renovacion." },
  ],
};

export function childrenOf(people: Person[], id: string): Person[] { return people.filter((p) => p.parent === id); }
export function rootId(people: Person[]): string { const r = people.find((p) => p.parent === null); return r ? r.id : people[0]?.id; }
export function orderedIds(people: Person[]): string[] {
  const out: string[] = [];
  const walk = (id: string) => { out.push(id); childrenOf(people, id).forEach((c) => walk(c.id)); };
  const r = rootId(people); if (r) walk(r); return out;
}
export function descendants(people: Person[], id: string): string[] {
  const out: string[] = []; const stack = [id];
  while (stack.length) { const cur = stack.pop() as string; childrenOf(people, cur).forEach((c) => { out.push(c.id); stack.push(c.id); }); }
  return out;
}
export function autoCoordHours(people: Person[], id: string): number { return childrenOf(people, id).length * COORD_PER_REPORT; }
export function coordHoursFor(people: Person[], id: string): number {
  const p = people.find((x) => x.id === id);
  if (p && p.coordOverride != null) return p.coordOverride;
  return autoCoordHours(people, id);
}
export function ownerName(people: Person[], id: string): string {
  const ext = EXT_OWNERS.find((e) => e.id === id); if (ext) return ext.name;
  const p = people.find((x) => x.id === id); if (!p) return "-";
  return p.name.split(" ").slice(0, 2).join(" ");
}
export function isExt(id: string): boolean { return EXT_OWNERS.some((e) => e.id === id); }
export interface OwnedFn { area: string; text: string; shared: boolean; hours: number; impact: Impact; }
export function functionsOwnedBy(fw: Framework, pid: string): OwnedFn[] {
  const out: OwnedFn[] = [];
  fw.blocks.forEach((b) => b.items.forEach((i) => {
    if (i.owners.includes(pid)) out.push({ area: b.title.replace(/^\d+\)\s*/, ""), text: i.text, shared: i.owners.length > 1, hours: i.hours, impact: i.impact });
  }));
  return out;
}
export function personHours(fw: Framework, pid: string): number {
  let h = 0;
  fw.blocks.forEach((b) => b.items.forEach((i) => { if (i.owners.includes(pid) && i.owners.length > 0) h += (i.hours || 0) / i.owners.length; }));
  return h;
}
export const IMPACTS: Impact[] = ["alto", "medio", "bajo"];
export function hoursByImpact(fw: Framework): Record<string, number> {
  const r: Record<string, number> = { alto: 0, medio: 0, bajo: 0, "": 0 };
  fw.blocks.forEach((b) => b.items.forEach((i) => { r[i.impact || ""] += i.hours || 0; }));
  return r;
}
export function hasRole(p: Person): boolean {
  return [p.mission, p.notes, p.kpis].some((v) => v && v.trim() !== "") || (Array.isArray(p.lines) && p.lines.length > 0);
}
