# Dirección de Marketing · SM México

Herramienta interna para mapear la Dirección de Marketing de Ediciones SM México:
organigrama editable, roles por persona, funcionamiento del área (funciones con
responsable, horas/mes e impacto en negocio) y carga por persona.


## Ver en el navegador

Publicable con **GitHub Pages**: https://soytorresllamas.github.io/direccion-de-marketing/

Para activarlo (una sola vez, desde la web de GitHub):
1. Repo → **Settings** → **Pages**.
2. **Build and deployment** → Source: *Deploy from a branch*.
3. Branch: **main**, carpeta **/docs** → **Save**.
4. En 1-2 minutos el enlace de arriba queda activo (sirve `docs/index.html`).

> Nota de privacidad: en un plan estándar, un sitio de GitHub Pages es accesible públicamente por su URL aunque el repo sea privado. La ventana de acceso de la app es solo disuasoria; no protege el contenido frente a quien tenga el enlace.


> El sitio publicado en `docs/index.html` está **cifrado con StatiCrypt 3.5.4** (AES-256). Al abrir el enlace se pide una contraseña y el contenido viaja cifrado; sin la contraseña no se puede leer. Esto sí protege el contenido aunque la URL de Pages sea pública.

Código del repo (navegador): https://github.com/Soytorresllamas/direccion-de-marketing

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
