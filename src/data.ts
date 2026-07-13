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
    mission: "Liderar la Dirección de Marketing de SM México, su posicionamiento y la entrega de valor a la venta.",
    notes: "Dirección del área y de sus dos frentes (Marketing y Servicios Pedagógicos)\nEstrategia de marketing y posicionamiento\nPR, vocerías y relación con medios\nAlineación con la Dirección General y con la casa matriz (España)\nGestión del presupuesto de marketing\nDecisiones de estructura, prioridades y asignación de recursos",
    scope: "", lines: [...ALL_LINES],
    kpis: "Cumplimiento de objetivos de venta apoyados por marketing, posicionamiento de marca, ejecución del plan de comunicaciones, desempeño global del área." },
  { id: "carla", name: "Carla Catherine Medina", title: "Especialista de comunicación digital", parent: "m",
    mission: "Dueña del marketing digital de SM México en todas las líneas.",
    notes: "Community management\nEmail marketing\nNurturing / marketing automation\nCRM y gobierno de la base de datos (LFPDPPP)\nPauta digital\nSEO y contenido orgánico\nSitios web y landing pages / conversión\nAnalítica y reportería digital (KPIs y atribución por línea)\nWhatsApp / mensajería\nEventos digitales (transmisiones, webinars)\nCoordinación de agencias digitales",
    scope: "", lines: [...ALL_LINES],
    kpis: "Leads digitales por línea, conversión, costo por lead, desempeño de pauta, tráfico y posicionamiento del sitio." },
  { id: "francisco", name: "Francisco Daniel Márquez Hernández", title: "Coordinador de diseño", parent: "m",
    mission: "Asegurar la producción y la calidad del diseño gráfico de la dirección para todas las líneas.",
    notes: "Diseño de materiales promocionales (merchandising, flyers, hojas de producto, video explicativo)\nAplicación de lineamientos visuales y consistencia de marca\nSoporte de diseño a la red comercial\nDupla con Cath (comunicación digital) para piezas digitales",
    scope: "", lines: [...ALL_LINES],
    kpis: "Tiempo de entrega de piezas, volumen y calidad de materiales producidos, consistencia visual entre líneas." },
  { id: "talavera", name: "Mariana Talavera Camargo", title: "Coordinador de marca", parent: "m",
    mission: "Custodiar la marca SM y habilitar a la red comercial con argumentos y materiales de venta.",
    notes: "Gestión de marca y lineamientos (identidad, consistencia entre líneas)\nPosicionamiento y narrativa institucional (incluye comunicación de la Dirección General)\nSales enablement (kits, argumentarios, comparativos, capacitación de producto)\nInteligencia de mercado e investigación\nCoordinación de Experiencia de marca (Vargas)",
    scope: "", lines: [...ALL_LINES],
    kpis: "Consistencia de marca, adopción de materiales por la red comercial, calidad de la inteligencia de mercado, efectividad del posicionamiento." },
  { id: "vargas", name: "Mariana Vargas", title: "Especialista de experiencia de marca", parent: "talavera",
    mission: "Diseñar y ejecutar la experiencia de marca en eventos y puntos de contacto.",
    notes: "Organización de eventos (SIEI, convenciones, FIL, ferias)\nExperiencia de marca en puntos de contacto\nApoyo a sales enablement y activaciones",
    scope: "", lines: [...ALL_LINES],
    kpis: "Ejecución y asistencia a eventos, satisfacción de asistentes, cobertura y leads generados en eventos." },
  { id: "jorge", name: "Jorge Abraham Valverde Sánchez", title: "Coordinador de Servicios Pedagógicos", parent: "m",
    mission: "Dirigir el acompañamiento pedagógico que sostiene la retención y el crecimiento de colegios usuarios.",
    notes: "Acompañamiento pedagógico a colegios usuarios\nMedición de uso y adopción de productos/plataformas\nRetención y renovación (compartida con Comercial)\nDetección de oportunidades de crecimiento en cuentas\nVoz del usuario hacia el área editorial\nCoordinación de Liliana y Eliasib",
    scope: "", lines: [...PED_LINES],
    kpis: "Renovación/retención de colegios, uso y adopción de plataformas, NPS de colegios, oportunidades de crecimiento detectadas." },
  { id: "liliana", name: "Liliana Arellano Pérez", title: "Especialista en Servicios Pedagógicos", parent: "jorge",
    mission: "Ejecutar la formación y el soporte que aseguran la adopción y la satisfacción de los colegios.",
    notes: "Formación a través de @Play (colegios usuarios y de conquista)\nOnboarding e implementación al inicio de ciclo\nSoporte pedagógico y técnico (mesa de ayuda)\nComunidad de docentes / embajadores\nApoyo en acompañamiento pedagógico",
    scope: "", lines: [...PED_LINES],
    kpis: "Colegios formados, adopción tras onboarding, tiempo de resolución de soporte, tamaño y actividad de la comunidad docente." },
  { id: "eliasib", name: "Eliasib Abner Flores López", title: "Analista de producción de video", parent: "jorge",
    mission: "Producir los materiales audiovisuales de formación, difusión y capacitación de la dirección.",
    notes: "Generación de materiales audiovisuales de formación, difusión y capacitación\nApoyo a Marketing en la cobertura audiovisual de eventos\nEdición y postproducción",
    scope: "", lines: [...ALL_LINES],
    kpis: "Volumen y tiempo de entrega de piezas de video, uso de los materiales, calidad de producción." },
];

export const DEFAULT_FRAMEWORK: Framework = {
  intro: "La Dirección de Marketing opera en dos frentes complementarios. Servicios Pedagógicos genera la evidencia (uso, adopción, casos y testimonios) que alimenta el posicionamiento y los argumentos de venta de Marketing; Marketing genera la demanda y las herramientas que abren y sostienen las cuentas que Servicios Pedagógicos acompaña.",
  blocks: [
    { id: "mkt", title: "1) Marketing", items: [
      fi("Presencia de marca en canales digitales (community, contenido, pauta).", ["carla"], 55, "medio"),
      fi("Mantenimiento y actualización de la presencia web.", ["carla"], 20, "medio"),
      fi("Organización de eventos (SIEI, convenciones, FIL, ferias).", ["vargas"], 75, "alto"),
      fi("Sales enablement - herramientas de venta para la red comercial: kits y presentaciones por línea/campaña, argumentarios y manejo de objeciones, hojas de producto y comparativos vs. competencia, demos, catálogos/muestrarios, plantillas de propuesta, casos de éxito, capacitación de producto.", ["talavera"], 35, "alto"),
      fi("Diseño de materiales promocionales (merchandising, flyers, hojas de producto, video explicativo).", ["francisco"], 110, "medio"),
      fi("Posicionamiento y narrativa institucional (incluye comunicación de la Dirección General).", ["talavera"], 25, "medio"),
      fi("PR, vocerías y relación con medios.", ["m"], 20, "medio"),
      fi("Gestión de marca y lineamientos (identidad, consistencia entre líneas).", ["talavera"], 20, "bajo"),
      fi("Generación y nutrición de demanda/leads, con entrega ordenada a comercial (CRM).", ["carla"], 45, "alto"),
      fi("Inteligencia de mercado e investigación (competencia, segmentos, mercado público).", ["talavera"], 25, "medio"),
      fi("Medición y reportería de marketing (KPIs, desempeño de campañas, presupuesto).", ["carla"], 30, "medio"),
      fi("Estrategia, plan anual y presupuesto de marketing.", ["m"], 45, "alto"),
      fi("Reporting ejecutivo y relación con la Dirección General y la casa matriz (España).", ["m"], 33, "alto"),
      fi("Desarrollo del equipo, gestión del desempeño y alineación con Comercial y Editorial.", ["m"], 30, "medio"),
      fi("Optimización de conversión y experimentación (A/B testing) en web y campañas.", ["carla"], 12, "alto"),
      fi("Producción integral de experiencias de marca (punto de venta, colegios, activaciones).", ["vargas"], 40, "alto"),
      fi("Logística y coordinación de proveedores de eventos (montaje, stands).", ["vargas"], 25, "medio"),
      fi("Medición post-evento: leads, testimonios y aprendizajes.", ["vargas"], 20, "alto"),
      fi("Custodia del manual de marca y capacitación de marca a la red y a colegios.", ["talavera"], 27, "medio"),
      fi("Estudios de marca (awareness y percepción) y su lectura estratégica.", ["talavera"], 20, "medio"),
      fi("Dirección de arte y coherencia visual entre líneas.", ["francisco"], 20, "alto"),
      fi("Diseño editorial de materiales pedagógicos de apoyo.", ["francisco"], 18, "medio"),
      fi("Banco de assets y plantillas para eficiencia de producción.", ["francisco"], 12, "medio"),
    ]},
    { id: "ped", title: "2) Servicios Pedagógicos", items: [
      fi("Acompañamiento pedagógico a colegios usuarios (clave para la estrategia 2026-2027).", ["jorge", "liliana"], 50, "alto"),
      fi("Formación a través de @Play (colegios usuarios y colegios de conquista).", ["liliana"], 40, "alto"),
      fi("Generación de materiales audiovisuales de formación, difusión y capacitación; apoyo a Marketing en cobertura de eventos.", ["eliasib"], 110, "medio"),
      fi("Onboarding e implementación al inicio de ciclo con colegios nuevos.", ["liliana"], 25, "alto"),
      fi("Medición de uso y adopción de productos/plataformas.", ["jorge"], 20, "medio"),
      fi("Retención y renovación de colegios usuarios (ingreso recurrente).", ["jorge", "ext-comercial"], 30, "alto"),
      fi("Soporte pedagógico y técnico (mesa de ayuda).", ["liliana"], 30, "medio"),
      fi("Detección de oportunidades de crecimiento en cuentas.", ["jorge", "ext-comercial"], 20, "alto"),
      fi("Voz del usuario: feedback del aula hacia el área editorial / de producto.", ["jorge"], 15, "medio"),
      fi("Comunidad de docentes / embajadores.", ["liliana"], 20, "medio"),
      fi("Modelo de acompañamiento y ruta de éxito del colegio.", ["jorge"], 22, "alto"),
      fi("Análisis de salud de cuentas y alerta temprana de bajas (churn).", ["jorge"], 20, "alto"),
      fi("Gestión de colegios estratégicos (cuentas clave).", ["jorge"], 17, "alto"),
      fi("Elaboración de contenidos y guías de formación docente.", ["liliana"], 20, "medio"),
      fi("Producción de testimoniales y casos de éxito en video.", ["eliasib"], 22, "alto"),
      fi("Motion graphics y piezas para redes y pauta.", ["eliasib"], 16, "medio"),
      fi("Biblioteca audiovisual y versionado por línea.", ["eliasib"], 12, "medio"),
    ]},
  ],
  handoffs: [
    { id: "h1", from: "Marketing digital (Carla)", to: "Comercial", desc: "Entrega de leads calificados con contexto y seguimiento en CRM. Riesgo: leads sin criterio de calificación o sin retroalimentación de cierre." },
    { id: "h2", from: "Servicios Pedagógicos", to: "Marketing", desc: "Evidencia de uso, casos de éxito y testimonios que alimentan posicionamiento y argumentos de venta. Riesgo: la evidencia no se captura ni llega de forma sistemática." },
    { id: "h3", from: "Servicios Pedagógicos + Comercial", to: "Dirección", desc: "Renovación: cuentas en riesgo y oportunidades de crecimiento. Riesgo: responsabilidad compartida sin un dueño del número de renovación." },
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
