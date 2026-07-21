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

export const SEED_VERSION = 6;

export const EXT_OWNERS: { id: string; name: string }[] = [{ id: "ext-comercial", name: "Comercial" }];
export const DOTTED: [string, string][] = [["francisco", "carla"]];
export const STORE_KEY = "sm_org_react_v1";
export const CAPACITY_HOURS = 160;
export const COORD_PER_REPORT = 8;

export function uid(prefix = "n"): string { return prefix + Math.random().toString(36).slice(2, 8); }

// ===== SEMILLA GENERADA — INICIO =====
// Generada desde el estado vivo en Supabase (app_state id=1). NO editar a mano:
// regenerar con  node scripts/sync-seed.mjs
// Última sincronización: 2026-07-21 · 8 personas · 154 funciones · 1974 h/mes · 3 traspasos
export const DEFAULT_PEOPLE: Person[] = [
  {
    "id": "m",
    "name": "Marcelo Torres",
    "title": "Director de Marketing",
    "parent": null,
    "mission": "Liderar la Dirección de Marketing de SM México, su posicionamiento y la entrega de valor a la venta.",
    "notes": "Dirección del área y de sus dos frentes (Marketing y Customer Success)\nEstrategia de marketing y posicionamiento\nPR, vocerías y relación con medios\nAlineación con la Dirección General y con la casa matriz (España)\nGestión del presupuesto de marketing\nDecisiones de estructura, prioridades y asignación de recursos",
    "scope": "",
    "lines": [
      "FSM",
      "Vivo",
      "Texto",
      "Dayton",
      "Escuela Católica",
      "Otros"
    ],
    "kpis": "Cumplimiento de objetivos de venta apoyados por marketing, posicionamiento de marca, ejecución del plan de comunicaciones, desempeño global del área."
  },
  {
    "id": "carla",
    "name": "Carla Catherine Medina Rodríguez",
    "title": "Especialista de comunicación digital",
    "parent": "m",
    "mission": "Dueña del email marketing y la automatización (nurturing / flujos) de SM México en todas las líneas.",
    "notes": "Campañas de email (CS nurturing, @Play, Dayton, FSM, EC, LIJ)\nFlujos automatizados (Mailchimp + CRM) para VIVO, Base Cero y onboarding\nSeguimiento de KPIs (OPR, CTOR, CTR) y reportería digital\nGestión de comunidad y bases de datos\nDiseño básico de piezas para mailing\nProyectos especiales (embajadores, comunidades, mesa de marketing global, proyecto colegio)",
    "scope": "",
    "lines": [
      "FSM",
      "Vivo",
      "Texto",
      "Dayton",
      "Escuela Católica",
      "Otros"
    ],
    "kpis": "Desempeño de campañas de email (OPR, CTOR, CTR), efectividad de flujos automatizados, salud y crecimiento de la base de datos."
  },
  {
    "id": "francisco",
    "name": "Francisco Márquez",
    "title": "Coordinador de Diseño de Marketing",
    "parent": "m",
    "mission": "Asegurar la producción y la calidad del diseño gráfico de la dirección para todas las líneas.",
    "notes": "Planeación y coordinación de proyectos de diseño\nSupervisión de identidad de las marcas de SM México\nDesarrollo creativo de campañas y de conceptos para eventos\nBrand books y manuales de identidad\nRevisión y autorización de artes finales\nGestión de proveedores externos (agencias)",
    "scope": "",
    "lines": [
      "FSM",
      "Vivo",
      "Texto",
      "Dayton",
      "Escuela Católica",
      "Otros"
    ],
    "kpis": "Tiempo de entrega de piezas, volumen y calidad de materiales producidos, consistencia visual entre líneas."
  },
  {
    "id": "talavera",
    "name": "Mariana Talavera Camargo",
    "title": "Coordinadora de Marca",
    "parent": "m",
    "mission": "Custodiar la marca SM y habilitar a la red comercial con argumentos y materiales de venta.",
    "notes": "Gestión y planeación entre líneas de negocio (EC, FSM, Personas, Vivo)\nComunicación y organización con áreas internas (Dirección Gral, Comercial, Compras, Legal)\nDesarrollo de contenidos para campañas\nCoordinación con diseño y con experiencia de marca\nNewsletter global Hilo Rojo\nSeguimiento de Vivo SM y eventos (SIEI, FIL)",
    "scope": "",
    "lines": [
      "FSM",
      "Vivo",
      "Texto",
      "Dayton",
      "Escuela Católica",
      "Otros"
    ],
    "kpis": "Consistencia de marca, adopción de materiales por la red comercial, cumplimiento de proyectos entre líneas."
  },
  {
    "id": "vargas",
    "name": "Mariana Vargas Briseño",
    "title": "Especialista de experiencias de marca",
    "parent": "talavera",
    "mission": "Diseñar y ejecutar la experiencia de marca en eventos y puntos de contacto.",
    "notes": "Estrategia, concepto y planeación de eventos\nAlcance, cronograma, presupuesto y recursos por proyecto\nMontaje, operación y desmontaje\nNegociación y seguimiento de proveedores\nPresupuestos, control de gastos y reportes de cierre\nComunicación, invitaciones, registro y acreditación\nReservaciones para servicios pedagógicos y eventos",
    "scope": "",
    "lines": [
      "FSM",
      "Vivo",
      "Texto",
      "Dayton",
      "Escuela Católica",
      "Otros"
    ],
    "kpis": "Ejecución y asistencia a eventos, satisfacción de asistentes, uso eficiente del presupuesto por evento."
  },
  {
    "id": "eliasib",
    "name": "Eliasib Flores",
    "title": "Especialista en Producción Audiovisual y Postproducción",
    "parent": "jorge",
    "mission": "Producir los materiales audiovisuales de formación, difusión y capacitación de la dirección.",
    "notes": "Gestión y priorización de proyectos audiovisuales\nGrabación de entrevistas, eventos, cursos y campañas\nEdición, postproducción y motion graphics\nTestimoniales y casos de éxito\nMódulos de capacitación y contenido para eventos (FIL, SIEI, FEC)\nBiblioteca audiovisual y versionado por línea",
    "scope": "",
    "lines": [
      "FSM",
      "Vivo",
      "Texto",
      "Dayton",
      "Escuela Católica",
      "Otros"
    ],
    "kpis": "Volumen y tiempo de entrega de piezas de video, uso de los materiales, calidad de producción."
  },
  {
    "id": "jorge",
    "name": "Jorge Abraham Valverde Sánchez",
    "title": "Coordinador de Customer Success",
    "parent": "m",
    "mission": "Dirigir el acompañamiento y la operación de Customer Success que sostienen la retención y el crecimiento de colegios usuarios.",
    "notes": "SSAA / operaciones del equipo de asesoras (igualas, ROI, confirmaciones)\nReingeniería de Thinkific y actualización de cursos @Play\nParrilla docente y Voces que Inspiran\nNurturing y webinars 2026\nAdmin, reportes y coordinación del equipo\nFormación de verano y planeación 2027",
    "scope": "",
    "lines": [
      "Vivo",
      "Texto",
      "Dayton",
      "Escuela Católica"
    ],
    "kpis": "Renovación/retención de colegios, uso y adopción de plataformas, satisfacción del equipo de asesoras, ROI de la operación."
  },
  {
    "id": "liliana",
    "name": "Liliana Arellano Pérez",
    "title": "Especialista en Customer Success",
    "parent": "jorge",
    "mission": "Ejecutar la operación de servicios académicos y el soporte que aseguran la adopción y la satisfacción de los colegios.",
    "notes": "Gestión de servicios académicos (solicitudes, asignaciones, viajes, confirmaciones)\nCoordinación de prestadores de servicios profesionales independientes\n@Play (cupones, incidencias)\nWebinars y artículos para el blog\nComunidad de WhatsApp\nReuniones de coordinación y atención a clientes",
    "scope": "",
    "lines": [
      "Vivo",
      "Texto",
      "Dayton",
      "Escuela Católica"
    ],
    "kpis": "Servicios académicos ejecutados a tiempo, satisfacción de colegios y red comercial, actividad de la comunidad docente."
  }
];

export const DEFAULT_FRAMEWORK: Framework = {
  "intro": "La Dirección de Marketing opera en frentes complementarios que van de la generación de demanda (comunicación digital, diseño, marca y experiencias, audiovisual) al acompañamiento que sostiene y hace crecer las cuentas (Customer Success). Marketing genera la demanda y las herramientas que abren cuentas; Customer Success acompaña su adopción y retención, y devuelve evidencia (uso, casos y testimonios) que alimenta el posicionamiento y los argumentos de venta.",
  "blocks": [
    {
      "id": "com",
      "title": "1) Comunicación y medios digitales",
      "items": [
        {
          "id": "i1",
          "text": "Planeación estratégica de contenidos para redes sociales",
          "owners": [
            "carla"
          ],
          "hours": 25,
          "impact": "alto"
        },
        {
          "id": "i2",
          "text": "Administración estratégica de redes sociales (LIJ, Texto y Dayton)",
          "owners": [
            "carla"
          ],
          "hours": 20,
          "impact": "medio"
        },
        {
          "id": "i3",
          "text": "Desarrollo y gestión de comunidades lectoras",
          "owners": [
            "carla"
          ],
          "hours": 20,
          "impact": "alto"
        },
        {
          "id": "i4",
          "text": "Optimización de la operación de Amazon",
          "owners": [
            "carla"
          ],
          "hours": 20,
          "impact": "alto"
        },
        {
          "id": "i5",
          "text": "Coordinación transversal de proyectos",
          "owners": [],
          "hours": 10,
          "impact": "alto"
        },
        {
          "id": "i6",
          "text": "Gestión de alianzas con creadores de contenido",
          "owners": [],
          "hours": 10,
          "impact": "alto"
        },
        {
          "id": "i7",
          "text": "Análisis de desempeño de redes sociales",
          "owners": [
            "carla"
          ],
          "hours": 10,
          "impact": "alto"
        },
        {
          "id": "i8",
          "text": "Desarrollo del Programa de Embajadores VIVO",
          "owners": [],
          "hours": 10,
          "impact": "alto"
        },
        {
          "id": "i9",
          "text": "Participación en proyectos estratégicos emergentes",
          "owners": [],
          "hours": 10,
          "impact": "alto"
        },
        {
          "id": "i10",
          "text": "Innovación e inteligencia digital",
          "owners": [],
          "hours": 10,
          "impact": "medio"
        },
        {
          "id": "i11",
          "text": "Gestión de activos digitales (sitios web y landing pages)",
          "owners": [
            "carla"
          ],
          "hours": 10,
          "impact": "alto"
        },
        {
          "id": "i12",
          "text": "Estrategia de contenidos para el Blog",
          "owners": [],
          "hours": 4,
          "impact": "bajo"
        },
        {
          "id": "i13",
          "text": "Producción de contenido para TikTok",
          "owners": [],
          "hours": 4,
          "impact": "bajo"
        },
        {
          "id": "i14",
          "text": "Programación, ejecución y monitoreo de campañas de email de CS nurturing y arroba play, Dayton, FSM, EC y LIJ",
          "owners": [
            "carla"
          ],
          "hours": 40,
          "impact": "alto"
        },
        {
          "id": "i16",
          "text": "Desarrollo, ejecución y optimización de flujos automatizados para VIVO y Customer Success Base Cero",
          "owners": [
            "carla"
          ],
          "hours": 32,
          "impact": "alto"
        },
        {
          "id": "i17",
          "text": "Desarrollo, ejecución y optimización de flujos automatizados onboarding arroba play",
          "owners": [
            "carla"
          ],
          "hours": 24,
          "impact": "alto"
        },
        {
          "id": "i18",
          "text": "Seguimiento de KPIs (OPR, CTOR, CTR), análisis de comportamiento, perfilamiento inicial de intereses, análisis FODA, propuesta mejoras en temas de próximos contenidos, reportes ejecutivos y recomendaciones para optimizar la comunicación digital.",
          "owners": [
            "carla"
          ],
          "hours": 10,
          "impact": "alto"
        },
        {
          "id": "i19",
          "text": "Gestión de comunidad y estrategia para aumento de seguidores",
          "owners": [
            "carla"
          ],
          "hours": 4,
          "impact": "medio"
        },
        {
          "id": "i20",
          "text": "Coordinación con interáreas y gestión de proyectos",
          "owners": [
            "carla"
          ],
          "hours": 6,
          "impact": "alto"
        },
        {
          "id": "i21",
          "text": "Administración de bases de datos, etiquetas, formularios, Typeforms, calendario de google con webinars mensuales, configuración y/o actualización de herramientas (meta business, typeform, y bitly) y organización documental de facturas",
          "owners": [
            "carla"
          ],
          "hours": 8,
          "impact": "medio"
        },
        {
          "id": "i22",
          "text": "Investigación de tendencias, benchmarking, inteligencia artificial aplicada, evaluación de herramientas y desarrollo de propuestas de innovación para fortalecer la comunicación digital y optimizar procesos.",
          "owners": [
            "carla"
          ],
          "hours": 8,
          "impact": "medio"
        },
        {
          "id": "i23",
          "text": "Realización de diseños básicos para campaña de mailing (banners, campaña de adviento EC con descargables, botones de CTA y otros gráficos que se ajusten a la comunicación-contenido de mail.",
          "owners": [
            "carla"
          ],
          "hours": 5,
          "impact": "medio"
        },
        {
          "id": "i24",
          "text": "Coordinación y seguimiento de iniciativas transversales, proyecto comunidades digitales para CS, LIJ, DAYTON, EC,",
          "owners": [
            "carla"
          ],
          "hours": 10,
          "impact": "medio"
        },
        {
          "id": "i25",
          "text": "Participación en proyectos especiales: Desarrollo de programa de embajadores VIVO",
          "owners": [
            "carla"
          ],
          "hours": 10,
          "impact": "alto"
        },
        {
          "id": "i27",
          "text": "Participación en proyectos especiales: Transferencia de aprendizajes y buenas prácticas de mailing en la Mesa de Marketing Global",
          "owners": [
            "carla"
          ],
          "hours": 16,
          "impact": "alto"
        },
        {
          "id": "i28",
          "text": "Participación en proyectos especiales: Proyecto colegio. Planeación y diseño del modelo operativo dirigido a la salud en retención de colegios. Trabajo transversal con áreas de eventos, customer success y BI",
          "owners": [
            "carla"
          ],
          "hours": 5,
          "impact": "medio"
        }
      ]
    },
    {
      "id": "dis",
      "title": "2) Diseño",
      "items": [
        {
          "id": "i29",
          "text": "Planeación y priorización de proyectos de diseño",
          "owners": [
            "francisco"
          ],
          "hours": 8,
          "impact": "alto"
        },
        {
          "id": "i30",
          "text": "Coordinación de diseño",
          "owners": [
            "francisco"
          ],
          "hours": 14,
          "impact": "alto"
        },
        {
          "id": "i31",
          "text": "Supervisión de identidad de marcas de SM México",
          "owners": [
            "francisco"
          ],
          "hours": 12,
          "impact": "alto"
        },
        {
          "id": "i32",
          "text": "Desarrollo creativo de campañas de marketing",
          "owners": [
            "francisco"
          ],
          "hours": 18,
          "impact": "alto"
        },
        {
          "id": "i33",
          "text": "Desarrollo de Brand Books y manuales de identidad",
          "owners": [
            "francisco"
          ],
          "hours": 6,
          "impact": "alto"
        },
        {
          "id": "i34",
          "text": "Coordinación con Editorial, Comercial, Marketing y otras áreas",
          "owners": [
            "francisco"
          ],
          "hours": 14,
          "impact": "alto"
        },
        {
          "id": "i35",
          "text": "Gestión de proveedores externos (agencias)",
          "owners": [
            "francisco"
          ],
          "hours": 8,
          "impact": "alto"
        },
        {
          "id": "i36",
          "text": "Desarrollo de conceptos para eventos, ferias y activaciones",
          "owners": [
            "francisco"
          ],
          "hours": 18,
          "impact": "alto"
        },
        {
          "id": "i37",
          "text": "Diseño y supervisión de materiales de comunicación comercial",
          "owners": [
            "francisco"
          ],
          "hours": 18,
          "impact": "alto"
        },
        {
          "id": "i38",
          "text": "Revisión y autorización de artes finales",
          "owners": [
            "francisco"
          ],
          "hours": 14,
          "impact": "alto"
        },
        {
          "id": "i39",
          "text": "Supervisión de impresión y control de calidad de materiales físicos",
          "owners": [
            "francisco"
          ],
          "hours": 5,
          "impact": "alto"
        },
        {
          "id": "i40",
          "text": "Diseño de materiales editoriales (catálogos, agendas, folletos, reconocimientos)",
          "owners": [
            "francisco"
          ],
          "hours": 16,
          "impact": "alto"
        },
        {
          "id": "i41",
          "text": "Desarrollo de materiales para redes sociales y comunicación digital",
          "owners": [
            "francisco"
          ],
          "hours": 14,
          "impact": "alto"
        },
        {
          "id": "i42",
          "text": "Diseño de presentaciones ejecutivas para Comercial",
          "owners": [
            "francisco"
          ],
          "hours": 6,
          "impact": "medio"
        },
        {
          "id": "i43",
          "text": "Desarrollo de promocionales para colegios",
          "owners": [
            "francisco"
          ],
          "hours": 7,
          "impact": "medio"
        },
        {
          "id": "i44",
          "text": "Atención a solicitudes institucionales urgentes",
          "owners": [
            "francisco"
          ],
          "hours": 8,
          "impact": "medio"
        },
        {
          "id": "i45",
          "text": "Gestión documental y respaldo de materiales gráficos",
          "owners": [
            "francisco"
          ],
          "hours": 4,
          "impact": "bajo"
        },
        {
          "id": "i46",
          "text": "Imagenes gráficas",
          "owners": [],
          "hours": 20,
          "impact": "alto"
        },
        {
          "id": "i47",
          "text": "Proyectos de diseños",
          "owners": [],
          "hours": 10,
          "impact": "alto"
        },
        {
          "id": "i48",
          "text": "Campañas de marketing",
          "owners": [],
          "hours": 18,
          "impact": "alto"
        },
        {
          "id": "i49",
          "text": "Brand Books y manuales de identidad",
          "owners": [],
          "hours": 10,
          "impact": "alto"
        },
        {
          "id": "i50",
          "text": "Líneas de negocio",
          "owners": [],
          "hours": 14,
          "impact": "alto"
        },
        {
          "id": "i51",
          "text": "Eventos",
          "owners": [],
          "hours": 18,
          "impact": "alto"
        },
        {
          "id": "i52",
          "text": "Comunicación comercial",
          "owners": [],
          "hours": 18,
          "impact": "alto"
        },
        {
          "id": "i53",
          "text": "Materiales editoriales (agendas, folletos, reconocimientos)",
          "owners": [],
          "hours": 16,
          "impact": "alto"
        },
        {
          "id": "i54",
          "text": "Materiales para redes sociales y comunicación digital",
          "owners": [],
          "hours": 18,
          "impact": "alto"
        },
        {
          "id": "i55",
          "text": "Solicitudes urgentes",
          "owners": [],
          "hours": 10,
          "impact": "alto"
        },
        {
          "id": "i56",
          "text": "Presentaciones",
          "owners": [],
          "hours": 8,
          "impact": "medio"
        },
        {
          "id": "i57",
          "text": "Promocionales",
          "owners": [],
          "hours": 7,
          "impact": "medio"
        },
        {
          "id": "i58",
          "text": "Audiovisual",
          "owners": [],
          "hours": 6,
          "impact": "medio"
        },
        {
          "id": "i59",
          "text": "Materiales físicos",
          "owners": [],
          "hours": 5,
          "impact": "medio"
        }
      ]
    },
    {
      "id": "marca",
      "title": "3) Marca y experiencias",
      "items": [
        {
          "id": "i60",
          "text": "Gestión de comunicación y planeación entre líneas de negocio con MKT",
          "owners": [
            "talavera"
          ],
          "hours": 22,
          "impact": "alto"
        },
        {
          "id": "i61",
          "text": "Gestión de comunicación y organización con diversas áreas de SM",
          "owners": [
            "talavera"
          ],
          "hours": 22,
          "impact": "alto"
        },
        {
          "id": "i62",
          "text": "Desarrollo de contenidos para campañas en líneas de negocio o tareas asignadas",
          "owners": [
            "talavera"
          ],
          "hours": 22,
          "impact": "alto"
        },
        {
          "id": "i63",
          "text": "Coordinación con diseñador y especialista de experiencia de marca",
          "owners": [
            "talavera"
          ],
          "hours": 22,
          "impact": "alto"
        },
        {
          "id": "i64",
          "text": "Participación en Newsletter global: Hilo Rojo",
          "owners": [
            "talavera"
          ],
          "hours": 6,
          "impact": "alto"
        },
        {
          "id": "i65",
          "text": "Presentación de acciones y seguimientos de Vivo SM",
          "owners": [
            "talavera"
          ],
          "hours": 8,
          "impact": "alto"
        },
        {
          "id": "i66",
          "text": "Supervisión y 1a revisión de gráficos de diseño y archivos de especialista de experiencia de marca",
          "owners": [
            "talavera"
          ],
          "hours": 22,
          "impact": "alto"
        },
        {
          "id": "i67",
          "text": "Gestión de comunicación y organización en SIEI y FIL",
          "owners": [
            "talavera"
          ],
          "hours": 6,
          "impact": "alto"
        },
        {
          "id": "i68",
          "text": "Contacto inicial con externos",
          "owners": [
            "talavera"
          ],
          "hours": 6,
          "impact": "medio"
        },
        {
          "id": "i69",
          "text": "Coordinación con especialista de producción",
          "owners": [
            "talavera"
          ],
          "hours": 16,
          "impact": "medio"
        },
        {
          "id": "i70",
          "text": "Gestión de eventos corporativos /Comerciales",
          "owners": [
            "talavera"
          ],
          "hours": 14,
          "impact": "medio"
        },
        {
          "id": "i71",
          "text": "Respuesta a solicitudes urgentes",
          "owners": [
            "talavera"
          ],
          "hours": 4,
          "impact": "medio"
        },
        {
          "id": "i72",
          "text": "Apoyo en gestión de temas administrativos del área",
          "owners": [
            "talavera"
          ],
          "hours": 3,
          "impact": "medio"
        },
        {
          "id": "i73",
          "text": "Grabación de voz en off para proyectos audiovisuales",
          "owners": [
            "talavera"
          ],
          "hours": 2,
          "impact": "bajo"
        },
        {
          "id": "i74",
          "text": "Compras o solicitudes del área para proyecto o evento",
          "owners": [
            "talavera"
          ],
          "hours": 2,
          "impact": "bajo"
        },
        {
          "id": "i75",
          "text": "Traslado a sedes externas",
          "owners": [
            "talavera"
          ],
          "hours": 4,
          "impact": "bajo"
        },
        {
          "id": "i76",
          "text": "Diseñar la estrategia y concepto de eventos alineados con los objetivos comerciales y de posicionamiento de la marca",
          "owners": [
            "vargas"
          ],
          "hours": 12,
          "impact": "alto"
        },
        {
          "id": "i77",
          "text": "Definir el alcance, cronograma, presupuesto y recursos necesarios para cada proyecto",
          "owners": [
            "vargas"
          ],
          "hours": 10,
          "impact": "alto"
        },
        {
          "id": "i78",
          "text": "Elaborar planes de trabajo y dar seguimiento a cada etapa de la organización",
          "owners": [
            "vargas"
          ],
          "hours": 15,
          "impact": "alto"
        },
        {
          "id": "i79",
          "text": "Supervisar el montaje, operación y desmontaje de los eventos.",
          "owners": [
            "vargas"
          ],
          "hours": 10,
          "impact": "medio"
        },
        {
          "id": "i80",
          "text": "Garantizar que la experiencia de los asistentes sea satisfactoria",
          "owners": [
            "vargas"
          ],
          "hours": 4,
          "impact": "alto"
        },
        {
          "id": "i81",
          "text": "Resolver incidencias durante la ejecución de los eventos para asegurar su correcto desarrollo",
          "owners": [
            "vargas"
          ],
          "hours": 12,
          "impact": "medio"
        },
        {
          "id": "i82",
          "text": "Buscar, evaluar y negociar con proveedores de sedes, mobiliario, catering, producción audiovisual y otros servicios.",
          "owners": [
            "vargas"
          ],
          "hours": 12,
          "impact": "alto"
        },
        {
          "id": "i83",
          "text": "Dar seguimiento a contratos, entregables y pagos.",
          "owners": [
            "vargas"
          ],
          "hours": 3,
          "impact": "medio"
        },
        {
          "id": "i84",
          "text": "Elaborar presupuestos por evento.",
          "owners": [
            "vargas"
          ],
          "hours": 10,
          "impact": "alto"
        },
        {
          "id": "i85",
          "text": "Controlar gastos y asegurar el uso eficiente de los recursos",
          "owners": [
            "vargas"
          ],
          "hours": 20,
          "impact": "alto"
        },
        {
          "id": "i86",
          "text": "Elaborar reportes financieros y de cierre de cada proyecto",
          "owners": [
            "vargas"
          ],
          "hours": 5,
          "impact": "bajo"
        },
        {
          "id": "i87",
          "text": "Coordinar reuniones de seguimiento y asegurar el cumplimiento de acuerdos",
          "owners": [
            "vargas"
          ],
          "hours": 10,
          "impact": "alto"
        },
        {
          "id": "i88",
          "text": "Diseñar la estrategia de comunicación antes, durante y después de cada evento",
          "owners": [
            "vargas"
          ],
          "hours": 8,
          "impact": "medio"
        },
        {
          "id": "i89",
          "text": "Elaborar invitaciones, mensajes, recordatorios, materiales de bienvenida y agradecimientos",
          "owners": [
            "vargas"
          ],
          "hours": 15,
          "impact": "medio"
        },
        {
          "id": "i90",
          "text": "Dar seguimiento a confirmaciones de asistencia y atención a clientes e invitados especiales",
          "owners": [
            "vargas"
          ],
          "hours": 20,
          "impact": "alto"
        },
        {
          "id": "i91",
          "text": "Administrar plataformas de registro para asistentes",
          "owners": [
            "vargas"
          ],
          "hours": 8,
          "impact": "bajo"
        },
        {
          "id": "i93",
          "text": "Supervisar pruebas técnicas, presentaciones y materiales audiovisuales",
          "owners": [
            "vargas"
          ],
          "hours": 10,
          "impact": "alto"
        },
        {
          "id": "i94",
          "text": "Diseñar experiencias memorables para los asistentes en cada evento",
          "owners": [
            "vargas"
          ],
          "hours": 8,
          "impact": "medio"
        },
        {
          "id": "i95",
          "text": "Desarrollar presentaciones, agendas, guiones, cronogramas y documentos operativos.",
          "owners": [
            "vargas"
          ],
          "hours": 8,
          "impact": "alto"
        },
        {
          "id": "i96",
          "text": "Gestionar articulos de promoción para cada evento",
          "owners": [
            "vargas"
          ],
          "hours": 8,
          "impact": "medio"
        },
        {
          "id": "i97",
          "text": "Gestionar reservaciones para servicios pedogógicos y eventos",
          "owners": [
            "vargas"
          ],
          "hours": 8,
          "impact": "bajo"
        },
        {
          "id": "i98",
          "text": "Desarrollo mensual del contenido de la parrilla de Dayton",
          "owners": [],
          "hours": 40,
          "impact": "alto"
        },
        {
          "id": "i99",
          "text": "Desarrollo mensual del contenido de los emailings",
          "owners": [],
          "hours": 4,
          "impact": "medio"
        },
        {
          "id": "i100",
          "text": "Desarrollo mensual del Blog",
          "owners": [],
          "hours": 3,
          "impact": "medio"
        },
        {
          "id": "i101",
          "text": "Actualización de la web",
          "owners": [],
          "hours": 4,
          "impact": "medio"
        },
        {
          "id": "i102",
          "text": "Estratrategias de marketing",
          "owners": [],
          "hours": 7,
          "impact": "alto"
        },
        {
          "id": "i103",
          "text": "Casos de éxito Dayton (difusión y visita al colegio)",
          "owners": [],
          "hours": 22,
          "impact": "alto"
        },
        {
          "id": "i104",
          "text": "Difusión de webinars de Dayton",
          "owners": [],
          "hours": 2,
          "impact": "medio"
        },
        {
          "id": "i105",
          "text": "Seguimiento con leads campañas, bases de datos",
          "owners": [],
          "hours": 5,
          "impact": "alto"
        },
        {
          "id": "i107",
          "text": "Materiales digitales de producto de Bachillerato",
          "owners": [],
          "hours": 30,
          "impact": "alto"
        },
        {
          "id": "i108",
          "text": "Desarrollo del contenido de la parrilla de bachillerato",
          "owners": [],
          "hours": 10,
          "impact": "alto"
        },
        {
          "id": "i109",
          "text": "Promocionales",
          "owners": [],
          "hours": 10,
          "impact": "alto"
        },
        {
          "id": "i110",
          "text": "Eventos",
          "owners": [],
          "hours": 25,
          "impact": "alto"
        },
        {
          "id": "i111",
          "text": "Reportes marketing",
          "owners": [],
          "hours": 10,
          "impact": "alto"
        },
        {
          "id": "i112",
          "text": "Comunicación interna con respecto a las líneas de negocio",
          "owners": [],
          "hours": 4,
          "impact": "medio"
        }
      ]
    },
    {
      "id": "av",
      "title": "4) Audiovisual",
      "items": [
        {
          "id": "i113",
          "text": "Recepción de solicitudes, análisis de necesidades, priorización de proyectos y coordinación de entregables para las diferentes unidades de negocio de SM México.",
          "owners": [
            "eliasib"
          ],
          "hours": 8,
          "impact": "alto"
        },
        {
          "id": "i115",
          "text": "Desarrollo de estructuras narrativas para testimoniales, cursos, campañas, eventos y contenidos digitales.",
          "owners": [
            "eliasib"
          ],
          "hours": 5,
          "impact": "medio"
        },
        {
          "id": "i117",
          "text": "Grabación de entrevistas, eventos, cursos, campañas institucionales y contenido para redes sociales, garantizando calidad técnica y narrativa.",
          "owners": [
            "eliasib"
          ],
          "hours": 20,
          "impact": "alto"
        },
        {
          "id": "i118",
          "text": "Dirección de voceros, autores, docentes, colaboradores y participantes para obtener mensajes claros y alineados a los objetivos de comunicación.",
          "owners": [
            "eliasib"
          ],
          "hours": 5,
          "impact": "alto"
        },
        {
          "id": "i119",
          "text": "Cobertura fotográfica de eventos, retratos corporativos y fotografías para materiales de comunicación.",
          "owners": [
            "eliasib"
          ],
          "hours": 12,
          "impact": "medio"
        },
        {
          "id": "i120",
          "text": "Edición narrativa, sincronización, selección de tomas y construcción de piezas audiovisuales de alto impacto para todas las líneas de negocio.",
          "owners": [
            "eliasib"
          ],
          "hours": 40,
          "impact": "alto"
        },
        {
          "id": "i122",
          "text": "Desarrollo de gráficos animados, cortinillas, títulos y recursos visuales que fortalecen la comunicación institucional.",
          "owners": [
            "eliasib"
          ],
          "hours": 5,
          "impact": "medio"
        },
        {
          "id": "i123",
          "text": "Limpieza, mezcla y musicalización de piezas audiovisuales para mejorar la experiencia del usuario.",
          "owners": [
            "eliasib"
          ],
          "hours": 8,
          "impact": "medio"
        },
        {
          "id": "i125",
          "text": "Producción integral de módulos de capacitación para las diferentes líneas de negocio, garantizando calidad técnica y continuidad visual.",
          "owners": [
            "eliasib"
          ],
          "hours": 20,
          "impact": "alto"
        },
        {
          "id": "i126",
          "text": "Desarrollo de contenido audiovisual que fortalece la credibilidad de productos y servicios mediante experiencias reales de clientes e instituciones.",
          "owners": [
            "eliasib"
          ],
          "hours": 25,
          "impact": "alto"
        },
        {
          "id": "i127",
          "text": "Desarrollo de materiales audiovisuales para fortalecer la comunicación organizacional y la cultura interna.",
          "owners": [
            "eliasib"
          ],
          "hours": 10,
          "impact": "medio"
        },
        {
          "id": "i128",
          "text": "Producción de contenido para eventos como FIL, SIEI, FEC, FILCO, FILIAZ, Kick Off, presentaciones de libros y actividades institucionales.",
          "owners": [
            "eliasib"
          ],
          "hours": 15,
          "impact": "alto"
        },
        {
          "id": "i129",
          "text": "Atención de retroalimentación, ajustes y seguimiento de entregables para asegurar la satisfacción de las áreas solicitantes.",
          "owners": [
            "eliasib"
          ],
          "hours": 10,
          "impact": "medio"
        },
        {
          "id": "i130",
          "text": "Asignación de proyectos, revisión de calidad, retroalimentación, seguimiento y validación de entregables para mantener estándares de producción.",
          "owners": [
            "eliasib"
          ],
          "hours": 5,
          "impact": "alto"
        },
        {
          "id": "i131",
          "text": "Clasificación, respaldo y administración del material audiovisual para facilitar su reutilización y resguardo.",
          "owners": [
            "eliasib"
          ],
          "hours": 6,
          "impact": "bajo"
        },
        {
          "id": "i132",
          "text": "Gestión del equipo de grabación, mantenimiento preventivo y preparación de cámaras, lentes, audio e iluminación para las producciones.",
          "owners": [
            "eliasib"
          ],
          "hours": 5,
          "impact": "medio"
        },
        {
          "id": "i133",
          "text": "Evaluación e incorporación de herramientas de IA para optimizar tiempos de producción y mejorar la calidad de los contenidos.",
          "owners": [
            "eliasib"
          ],
          "hours": 10,
          "impact": "alto"
        },
        {
          "id": "i134",
          "text": "Atención simultánea a Fundación SM, LIJ, Dayton, PPC, Escuela Católica, @Play, Recursos Humanos y SM México, adaptando cada proyecto a sus objetivos específicos.",
          "owners": [
            "eliasib"
          ],
          "hours": 7,
          "impact": "alto"
        }
      ]
    },
    {
      "id": "cs",
      "title": "5) Customer Success",
      "items": [
        {
          "id": "i135",
          "text": "SSAA Operaciones",
          "owners": [
            "jorge"
          ],
          "hours": 20,
          "impact": "alto"
        },
        {
          "id": "i136",
          "text": "Reingeniería Thinkific",
          "owners": [
            "jorge"
          ],
          "hours": 10,
          "impact": "alto"
        },
        {
          "id": "i137",
          "text": "Actualización Cursos @play",
          "owners": [
            "jorge"
          ],
          "hours": 14,
          "impact": "alto"
        },
        {
          "id": "i138",
          "text": "Parrilla Docentes",
          "owners": [
            "jorge"
          ],
          "hours": 12,
          "impact": "alto"
        },
        {
          "id": "i139",
          "text": "Voces que Inspiran",
          "owners": [
            "jorge"
          ],
          "hours": 12,
          "impact": "alto"
        },
        {
          "id": "i140",
          "text": "Nurturing",
          "owners": [
            "jorge"
          ],
          "hours": 12,
          "impact": "alto"
        },
        {
          "id": "i141",
          "text": "Webinars 2026",
          "owners": [
            "jorge"
          ],
          "hours": 10,
          "impact": "medio"
        },
        {
          "id": "i142",
          "text": "Reuniones / Coordinación",
          "owners": [
            "jorge"
          ],
          "hours": 14,
          "impact": "medio"
        },
        {
          "id": "i143",
          "text": "Admin / Reportes",
          "owners": [
            "jorge"
          ],
          "hours": 26,
          "impact": "alto"
        },
        {
          "id": "i144",
          "text": "Formación de Verano",
          "owners": [
            "jorge"
          ],
          "hours": 16,
          "impact": "alto"
        },
        {
          "id": "i145",
          "text": "Planeación 2027",
          "owners": [
            "jorge"
          ],
          "hours": 14,
          "impact": "alto"
        },
        {
          "id": "i146",
          "text": "Gestión de servicios acdémicos",
          "owners": [
            "liliana"
          ],
          "hours": 80,
          "impact": "alto"
        },
        {
          "id": "i147",
          "text": "Coordinación de Prestadores de Servicios Profesionales Independientes",
          "owners": [
            "liliana"
          ],
          "hours": 8,
          "impact": "medio"
        },
        {
          "id": "i148",
          "text": "Arroba Play",
          "owners": [
            "liliana"
          ],
          "hours": 20,
          "impact": "alto"
        },
        {
          "id": "i149",
          "text": "Webinars y artículos para el blog",
          "owners": [
            "liliana"
          ],
          "hours": 16,
          "impact": "alto"
        },
        {
          "id": "i150",
          "text": "Comunidad de WhatsApp",
          "owners": [
            "liliana"
          ],
          "hours": 20,
          "impact": "medio"
        },
        {
          "id": "i151",
          "text": "Reuniones (Coordinación CS, Agencia de MKT, Asesores académicos, Diseño)",
          "owners": [
            "liliana"
          ],
          "hours": 12,
          "impact": "alto"
        },
        {
          "id": "i152",
          "text": "Atención a clientes",
          "owners": [
            "liliana"
          ],
          "hours": 20,
          "impact": "alto"
        }
      ]
    },
    {
      "id": "dir",
      "title": "6) Dirección",
      "items": [
        {
          "id": "mdir1",
          "text": "Estrategia y plan anual de marketing por línea de negocio: definición de prioridades y ruta estratégica.",
          "owners": [
            "m"
          ],
          "hours": 24,
          "impact": "alto"
        },
        {
          "id": "mdir2",
          "text": "Gestión del presupuesto del área: planeación, ejercicio, control y órdenes de compra.",
          "owners": [
            "m"
          ],
          "hours": 18,
          "impact": "alto"
        },
        {
          "id": "mdir3",
          "text": "Reporting ejecutivo a la Dirección General y alineación con la casa matriz (España).",
          "owners": [
            "m"
          ],
          "hours": 16,
          "impact": "alto"
        },
        {
          "id": "mdir4",
          "text": "Comités y alineación con Comercial y Editorial: prioridades de campaña y calendario de lanzamientos.",
          "owners": [
            "m"
          ],
          "hours": 16,
          "impact": "alto"
        },
        {
          "id": "mdir5",
          "text": "Dirección del lanzamiento de En Frecuencia (Bachillerato): gobierno del proyecto y decisiones de posicionamiento.",
          "owners": [
            "m"
          ],
          "hours": 14,
          "impact": "alto"
        },
        {
          "id": "mdir6",
          "text": "Desarrollo del equipo: 1:1, objetivos, evaluación de desempeño y plan de crecimiento.",
          "owners": [
            "m"
          ],
          "hours": 14,
          "impact": "medio"
        },
        {
          "id": "mdir7",
          "text": "PR, vocerías institucionales y relación con medios.",
          "owners": [
            "m"
          ],
          "hours": 12,
          "impact": "medio"
        },
        {
          "id": "mdir8",
          "text": "Relación con agencias y proveedores estratégicos: negociación, briefing y evaluación.",
          "owners": [
            "m"
          ],
          "hours": 10,
          "impact": "medio"
        },
        {
          "id": "mdir9",
          "text": "Inteligencia competitiva y lectura de mercado para decisiones de portafolio y posicionamiento.",
          "owners": [
            "m"
          ],
          "hours": 10,
          "impact": "medio"
        },
        {
          "id": "mdir10",
          "text": "Gobierno de métricas del área: definición de KPIs, revisión de resultados y rendición de cuentas.",
          "owners": [
            "m"
          ],
          "hours": 6,
          "impact": "medio"
        }
      ]
    }
  ],
  "handoffs": [
    {
      "id": "h1",
      "from": "Comunicación digital (Catherine)",
      "to": "Comercial",
      "desc": "Entrega de leads calificados con contexto y seguimiento en CRM. Riesgo: leads sin criterio de calificación o sin retroalimentación de cierre."
    },
    {
      "id": "h2",
      "from": "Customer Success",
      "to": "Marketing",
      "desc": "Evidencia de uso, casos de éxito y testimonios que alimentan posicionamiento y argumentos de venta. Riesgo: la evidencia no se captura ni llega de forma sistemática."
    },
    {
      "id": "h3",
      "from": "Customer Success + Comercial",
      "to": "Dirección",
      "desc": "Renovación: cuentas en riesgo y oportunidades de crecimiento. Riesgo: responsabilidad compartida sin un dueño del número de renovación."
    }
  ]
};
// ===== SEMILLA GENERADA — FIN =====

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
