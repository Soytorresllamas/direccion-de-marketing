# Contexto para Claude Code — Dirección de Marketing · SM México

> Pega este archivo (o su ruta) al inicio de la sesión de Claude Code.
> Contiene el contexto, la arquitectura, los pasos de build y las trampas ya descubiertas.

---

## 1. Qué es esto

Herramienta interna de la **Dirección de Marketing de Ediciones SM México** (director: Marcelo Torres) para mapear y sustentar el trabajo del área. Objetivo de fondo: **acreditar el trabajo y el impacto del área** ante la Dirección General (Óscar Gómez, DG desde junio 2026).

Cuatro pestañas:

| Pestaña | Qué hace |
|---|---|
| **Organigrama** | Árbol editable, drag & drop para reasignar reportes, "dupla" con línea punteada, zoom, contador de funciones por persona |
| **Roles** | Por persona: misión, funciones, alcance/líneas (multiselector con color por línea de negocio), KPIs, coordinación editable, y lista automática de funciones a cargo |
| **Funcionamiento** | Frentes → funciones, cada una con responsable(s), horas/mes e impacto (alto/medio/bajo). Gráficas de horas por impacto y carga por persona (barras segmentadas por impacto + coordinación, contra referencia de 160 h). Filtros por impacto y por persona. Traspasos entre áreas |
| **Presupuesto** | Placeholder "Próximamente" |

## 2. Dónde vive

- **Repo (privado):** `github.com/Soytorresllamas/direccion-de-marketing`, rama `main`
- **Sitio publicado:** https://soytorresllamas.github.io/direccion-de-marketing/ (GitHub Pages sirve `docs/`, cifrado con StatiCrypt)
- **Base de datos:** Supabase, proyecto `direccion-marketing-sm`
- **Copias locales:** carpeta OneDrive `Marketing - Posicionamiento/Generales/` (`Organigrama Marketing (OFICIAL).html` sin cifrar, `(CIFRADO).html` con contraseña)

## 3. Stack

React 18 + TypeScript + Tailwind + shadcn/ui (scaffold Vite), empaquetado con **Parcel + html-inline** a un **HTML autocontenido** (`bundle.html`). Sin backend propio: habla directo a Supabase por PostgREST con `fetch`.

Archivos que importan:

```
src/App.tsx      # TODO el UI: vistas, sync a Supabase, login, migraciones
src/data.ts      # tipos, DEFAULT_PEOPLE / DEFAULT_FRAMEWORK, helpers puros
src/logo.ts      # logo oficial SM como data URI (SVG base64)
src/index.css    # tailwind + CSS del árbol del organigrama + marca
index.html       # título + favicon (SIN fuentes externas, ver trampa 5.1)
docs/index.html  # el bundle CIFRADO que sirve GitHub Pages
public/logo-sm.svg
```

## 4. Modelo de datos

```ts
AppState = { people: Person[]; framework: Framework; v?: number }

Person = { id, name, title, parent: string|null, mission, notes,
           scope, lines: string[], kpis, coordOverride?: number|null }

Framework = { intro: string; blocks: FuncBlock[]; handoffs: Handoff[] }
FuncBlock = { id, title, items: FuncItem[] }
FuncItem  = { id, text, owners: string[], hours: number,
              impact: ""|"alto"|"medio"|"bajo" }
Handoff   = { id, from, to, desc }
```

Constantes clave (`data.ts`): `CAPACITY_HOURS = 160` (jornada completa/mes), `COORD_PER_REPORT = 8` (h/mes de coordinación por reporte directo, sobreescribible por persona), `EXT_OWNERS` (responsables externos, hoy `ext-comercial`), `DOTTED` (duplas no jerárquicas, hoy `francisco`↔`carla`), `LINE_OPTIONS` + `LINE_COLORS` (FSM morado, Vivo azul, Texto rojo, Dayton mostaza, Escuela Católica verde, Otros gris).

**Reglas de cálculo:** las horas de una función compartida se **dividen en partes iguales** entre sus responsables. La carga de una persona = horas de funciones + coordinación. Al aplicar filtros, la coordinación se excluye de las gráficas.

## 5. Build y despliegue — LAS TRAMPAS

```bash
pnpm install
node_modules/.bin/parcel build index.html --dist-dir dist --no-source-maps
node_modules/.bin/html-inline dist/index.html > bundle_mod.html
node scripts/postprocess-bundle.mjs   # post-proceso (trampas 5.1 y 5.2) -> bundle.html
```

### 5.1 No metas `<link>` externos en `index.html`
`html-inline` intenta leer la URL de Google Fonts **como archivo local**, crashea y produce un bundle incompleto (~56 KB, sin el JS). Las fuentes (Newsreader + Hanken Grotesk) se **inyectan después** de `html-inline`, en el `bundle.html`.

### 5.2 Convierte el script de módulo a clásico — o la página sale EN BLANCO
```python
re.sub(r'<script\s+type=(?:"module"|module)\s*>', '<script>', s)
```
Ojo: **`html-inline` emite la forma CON comillas** aunque Parcel use sin comillas. Un `sed` que solo cubra una forma no sirve. Con `type=module` la página queda en blanco al abrir por `file://` y después de que StatiCrypt reinyecta el HTML. El bundle es un IIFE autocontenido sin imports reales, así que el script clásico es seguro.

### 5.3 Invoca los binarios directo, no con `pnpm exec`
`pnpm exec` dispara una verificación de dependencias que falla por `ERR_PNPM_IGNORED_BUILDS` (parcel/swc/lmdb). Usa `node_modules/.bin/<bin>`.

### 5.4 Compilar `data.ts` suelto (para generar el JSON semilla)
Ya casi nunca hace falta: la semilla se regenera **desde la nube** con `node scripts/sync-seed.mjs`
(reescribe la sección marcada de `src/data.ts`). El comando de abajo queda por referencia.
```bash
node_modules/.bin/tsc src/data.ts --ignoreConfig --ignoreDeprecations 6.0 \
  --outDir /tmp/seed --module commonjs --target es2020 \
  --moduleResolution node --skipLibCheck --esModuleInterop
```

### 5.5 Cifrado y publicación
```bash
npx staticrypt@3.5.4 bundle.html -p 'SM2026_' --short \
  --template-title "Dirección de Marketing · SM México" \
  --template-instructions "Acceso protegido. Ingresa la contraseña para ver el desarrollo." \
  --template-button "Entrar" --template-placeholder "Contraseña" \
  --template-error "Contraseña incorrecta" \
  --template-remember "Recordarme en este equipo" --remember 30 -d out
cp out/bundle.html docs/index.html   # esto es lo que sirve Pages
```
GitHub Pages: Settings → Pages → branch `main`, carpeta `/docs`.

### 5.6 `tsc`: `calendar.tsx` y `resizable.tsx` están excluidos
Esos dos componentes shadcn del scaffold no se importan en ningún lado y sus tipos no
compilan contra las librerías instaladas; están en `exclude` de `tsconfig.app.json`.

## 6. Supabase

- **Proyecto:** `direccion-marketing-sm` · ref `zrooipzscpkagjdpyxic`
- **URL:** `https://zrooipzscpkagjdpyxic.supabase.co`
- **Llave publishable** (pública por diseño, embebida en el bundle): `sb_publishable__6P7PyqfzqJ0ZN9YVYidpg_8BccM_1V`
- **Tabla:** `public.app_state` — una sola fila (`id = 1`), columna `data jsonb`, `updated_at`. RLS activo con políticas `anon` de select/insert/update restringidas a `id = 1`.
- **Respaldos:** `public.app_state_backup (id, nota, data, created_at)` — RLS activo **sin políticas**, así que no es accesible con la llave pública (solo por administración/MCP).

Sincronización en el cliente: al abrir hace `cloudGet()`; si hay fila, **la nube gana** sobre localStorage. Cada cambio dispara `cloudPut()` con debounce de 800 ms (upsert vía `Prefer: resolution=merge-duplicates`). Si no hay red, cae a localStorage y el badge del encabezado muestra el estado (En la nube / Guardando / Sin conexión / Local). Concurrencia: **gana la última escritura**.

Leer o escribir desde CLI:
```bash
curl -s "$SB_URL/rest/v1/app_state?id=eq.1&select=data" \
  -H "apikey: $SB_KEY" -H "Authorization: Bearer $SB_KEY"
```

## 7. Estado actual de los datos (21 jul 2026)

La base tiene cargado un **escenario simulado**: la salida de Ulises Frías, Miriam Sánchez y Pamela Álvarez, con las funciones clave de Miriam reasignadas a Carla.

- **8 personas**, 154 funciones, **35 sin responsable (412 h/mes, 85% de impacto alto)**
- Carla Catherine quedó en **283 h/mes** (1.8 jornadas)
- El estado previo (**11 personas**, 0 funciones huérfanas) está respaldado en `app_state_backup`, nota *"Escenario ANTES de la salida..."*

Restaurar el escenario original:
```sql
update public.app_state a
set data = (select data from public.app_state_backup order by id limit 1),
    updated_at = now()
where a.id = 1;
```

**Actualización 21 jul (tarde):** la semilla `DEFAULT_*` del código quedó **sincronizada con el
estado vivo** (8 personas / 154 funciones, `SEED_VERSION 6`, sin migración destructiva).
`app_state_backup` tiene ahora 2 filas: id=1 (escenario de 11 personas) e id=2 (estado vivo
simulado, respaldo previo a la sincronización). Un borrador **no aplicado** de semilla v6 basada
en el Excel (11 personas / 5 frentes, con migración que reemplazaba todo al cargar) quedó
archivado en `Generales/Archivo/data.ts (borrador v6 Excel, 21 jul 2026, no aplicado).ts`.

## 8. Pendientes, en orden de importancia

1. ✅ **Resuelto y publicado (21 jul, tarde).** La semilla se regenera desde la nube (`node scripts/sync-seed.mjs`) y el botón «Restaurar» exige escribir la palabra RESTAURAR y avisa qué reemplaza y a quién afecta.
2. **Decidir el estado vivo:** dejar el escenario simulado o restaurar las 11 personas desde el backup.
3. **Pestaña Presupuesto:** convertirla en el cruce impacto ↔ peso. El presupuesto 2026 está en `Administración/Presupuesto/` de la carpeta OneDrive.
4. **Vista de Resultados con datos reales** (reportes digitales Q4-2025/Q1-2026, numeralia de FIL y SIEI). Es lo que convierte la herramienta de "mapa del área" a "instrumento que acredita impacto".
5. **Recalibrar el impacto:** ~78% de las horas están marcadas como "alto", lo que anula el poder de priorización de la etiqueta.
6. **Actualizar los traspasos** entre áreas: siguen redactados para la estructura vieja de 2 frentes; hoy hay 6.
7. **Tematizar la pantalla de StatiCrypt** (verde genérico → rojo de marca `#E40521`).
8. **Autenticación real** (Supabase Auth) si va a haber varios editores. Hoy el login interno es cosmético; la seguridad real la da el cifrado StatiCrypt.

## 9. Convenciones

- **Español correcto con acentos y ñ.** Ya se corrigió una vez todo el contenido; no reintroducir texto sin acentos. Cuidado al hacer reemplazos masivos: `area` es también un identificador en el código (`OwnedFn.area`), no lo acentúes a ciegas.
- **Marca:** rojo `#E40521`, tipografías Newsreader (serif, títulos) y Hanken Grotesk (cuerpo), logo oficial SM en `src/logo.ts`.
- **Las horas y los impactos son estimaciones**, no medición real. Cualquier conclusión debe ir etiquetada como tal.
- **Verificar antes de publicar:** `tsc --noEmit`, build, y una prueba de render (jsdom o navegador). Un bundle que compila puede aun así salir en blanco (ver 5.2).

## 10. Credenciales

- **Git:** usa tu autenticación local; ya estás autenticado en tu Mac. No hay token guardado en el repo ni en este documento.
- **Contraseña del sitio cifrado:** `SM2026_` (StatiCrypt). Login interno de la app: usuario `Marcelo`, misma contraseña — cosmético, va embebido en el bundle.
- **Llave de Supabase:** la publishable es pública por diseño y ya está en el bundle. La `service_role` **no** se usa ni debe embeberse en el cliente.

---

## Prompt sugerido para arrancar en Claude Code

```
Lee CONTEXTO-CLAUDE-CODE.md antes de tocar nada: describe la arquitectura,
el pipeline de build y varias trampas que ya costaron tiempo (html-inline con
links externos, el script type="module" que deja la página en blanco).

Contexto: herramienta interna de la Dirección de Marketing de SM México;
React + Tailwind empaquetado a un HTML único, cifrado con StatiCrypt y
publicado en GitHub Pages, con los datos en Supabase.

Tarea: <describe aquí lo que quieres>

Antes de publicar: corre tsc --noEmit, compila, aplica el post-proceso del
bundle (fuentes + script clásico), y verifica que renderiza. Al terminar,
resume qué cambiaste y qué quedó pendiente.
```
