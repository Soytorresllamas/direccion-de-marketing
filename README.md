# Dirección de Marketing · SM México

> **¿Vas a trabajar este proyecto con Claude Code o con otro agente?** Lee primero [`CONTEXTO-CLAUDE-CODE.md`](CONTEXTO-CLAUDE-CODE.md): arquitectura, pipeline de build, trampas conocidas y pendientes.


**Abrir en la nube:** https://soytorresllamas.github.io/direccion-de-marketing/

> Requiere activar GitHub Pages una vez (Settings → Pages → branch `main`, carpeta `/docs`). El sitio está cifrado: pide contraseña y luego el acceso de la app. Sincroniza con la base de datos en Supabase.

Herramienta interna para mapear la Dirección de Marketing de Ediciones SM México:
organigrama editable, roles por persona, funcionamiento del área (funciones con
responsable, horas/mes e impacto en negocio) y carga por persona.



## Sincronización en la nube (Supabase)

Los datos se guardan en una base de datos Supabase (proyecto `direccion-marketing-sm`), compartida entre dispositivos y personas. La app carga el estado desde la nube al abrir y escribe los cambios automáticamente (con un pequeño retardo). Si no hay conexión, sigue funcionando con una copia local (localStorage) y reintenta al volver la red.

- Indicador en el encabezado: **En la nube** / **Guardando** / **Sin conexión** / **Local**. Clic para forzar sincronización.
- Concurrencia: gana la última escritura (last-write-wins). Adecuado para edición no simultánea.
- Nota: dentro del panel de Cowork la red está restringida, así que ahí trabaja en modo local; la sincronización en la nube ocurre al abrir la app en un navegador o vía GitHub Pages.

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
