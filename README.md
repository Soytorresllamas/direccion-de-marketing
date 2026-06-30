# Dirección de Marketing · SM México

Herramienta interna para mapear la Dirección de Marketing de Ediciones SM México:
organigrama editable, roles por persona, funcionamiento del área (funciones con
responsable, horas/mes e impacto en negocio) y carga por persona.

## Pestañas
- **Organigrama**: árbol editable con drag-and-drop, dupla (línea punteada) y zoom.
- **Roles**: misión, funciones, alcance/líneas (multiselector) y KPIs por persona.
- **Funcionamiento**: frentes Marketing y Servicios Pedagógicos; cada función con
  responsable(s), horas/mes e impacto; carga por persona contra capacidad; traspasos entre áreas.
- **Presupuesto**: próximamente.

Incluye una ventana de acceso simple (no es seguridad real; el control es solo disuasorio).

## Stack
React 18 + TypeScript + Vite + Tailwind + shadcn/ui. Empaquetado con Parcel a un
HTML autocontenido (`bundle.html`).

## Desarrollo
```bash
pnpm install
pnpm dev
```

## Build a HTML único
```bash
bash scripts/bundle-artifact.sh   # genera bundle.html
```

El archivo `bundle.html` es la versión lista para usar (se abre en cualquier navegador).
