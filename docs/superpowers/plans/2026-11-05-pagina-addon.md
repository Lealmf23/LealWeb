# Página del addon (CS2 Asset Builder) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Agregar la página `/cs2-asset-builder` con presentación, registro de avances traducible (ES/EN/PT) y comentarios con votos vía Giscus.

**Architecture:** Página React nueva que lee su contenido de `src/data/addon.json`. La lógica de idioma es una función pura (`src/lib/addonLang.ts`) con pruebas en `node --test`; la interfaz fija usa un diccionario local en la página. Los comentarios son un componente que inserta el script de giscus.app, con mensaje de respaldo. El prerenderizado de SEO se extiende en `scripts/seo.mjs` leyendo el mismo JSON.

**Tech Stack:** React 19, react-router-dom 7, Tailwind 4, Vite 8, Node 24 (`node --test` con TypeScript nativo), Giscus.

**Spec:** `docs/superpowers/specs/2026-11-05-pagina-addon-design.md`

## Global Constraints

- Solo esta página se traduce (`es` por defecto, `en`, `pt`); el resto del sitio sigue en español.
- Nombre del addon: "CS2 Asset Builder", definido una sola vez en `addon.json` (campo `name`).
- La página se llama como el addon: ruta `/cs2-asset-builder`, entrada de menú con texto "CS2 Asset Builder" (el nombre sale de `ADDON_NAME`, pero en `site.ts` y `seo.json` va escrito literal porque `seo.mjs` los lee con regex y como JSON), y el `eyebrow` del `PageHeader` es `ADDON_NAME`.
- Giscus: repo `Lealmf23/LealWeb`, categoría `Addon`, `mapping="specific"`, `term="addon"`, `reactions-enabled="1"`, `input-position="top"`, `theme="transparent_dark"`, un único hilo para todos los idiomas.
- Sin librerías nuevas. Sin framework de pruebas (solo `node --test`, ya incluido en Node).
- `tsconfig.app.json` tiene `erasableSyntaxOnly`, `noUnusedLocals` y `verbatimModuleSyntax`: nada de `enum`, y los tipos se importan con `import type`.
- Rutas de archivos de `public/` sin `/` inicial y siempre con `asset()` de `@/lib/utils`.
- Todo acceso a `localStorage` va dentro de `try/catch`.
- Estilo de código y textos como el resto del repo: español, componentes con las variables CSS existentes (`--surface`, `--border`, `--accent`, `--text-secondary`).
- No hacer commit ni push sin que el autor lo pida (la Task 6 lo deja como último paso explícito).

## Review Focus

1. `?lang=` con un valor inválido (`?lang=fr`): se ignora y se usa el idioma guardado o el del navegador. (Task 1)
2. Idiomas del navegador con región o varios (`pt-BR`, `es-AR`, `['fr-FR','pt-PT']`): se elige el primero soportado, en el orden de preferencia. (Task 1)
3. Entrada sin traducción, o con el texto vacío en `en`/`pt`: se muestra el español. (Task 1)
4. `localStorage` no disponible o Giscus bloqueado/sin ids: la página y el registro se ven igual y aparece el mensaje de respaldo. (Tasks 3 y 4)
5. Entrada sin imágenes, sin enlace o sin versión, y registro sin entradas: no quedan bloques vacíos y se muestra un texto de "pronto". (Task 4)

---

### Task 1: Lógica de idioma (función pura, con pruebas)

**Files:**
- Create: `src/lib/addonLang.ts`
- Create: `scripts/tests/addonLang.test.ts`
- Modify: `package.json` (script `test`)

**Interfaces:**
- Produces:
  - `type Lang = 'es' | 'en' | 'pt'`
  - `const LANGS: readonly Lang[]` (`['es', 'en', 'pt']`)
  - `type Localized = { es: string; en?: string; pt?: string }`
  - `resolveLang(input: { query?: string | null; stored?: string | null; browser?: readonly string[] }): Lang`
  - `pick(text: Localized, lang: Lang): string`
- El archivo no importa nada (ni `@/…`), para poder correrlo con `node --test`.

- [ ] **Step 1: Write the failing tests** en `scripts/tests/addonLang.test.ts` (`node:test` + `node:assert/strict`, importando `../../src/lib/addonLang.ts`). Nombres y aserciones:
  - `query tiene prioridad`: `resolveLang({ query: 'pt', stored: 'en', browser: ['es'] })` → `'pt'`.
  - `query inválida se ignora`: `resolveLang({ query: 'fr', stored: 'en' })` → `'en'`; y `resolveLang({ query: 'fr' })` → `'es'`.
  - `guardado antes que navegador`: `resolveLang({ stored: 'en', browser: ['pt-BR'] })` → `'en'`.
  - `guardado inválido se ignora`: `resolveLang({ stored: 'xx', browser: ['pt-BR'] })` → `'pt'`.
  - `navegador con región`: `['pt-BR']` → `'pt'`, `['en-US']` → `'en'`, `['es-AR']` → `'es'`.
  - `navegador: primer idioma soportado, en orden`: `['fr-FR', 'pt-PT', 'en']` → `'pt'`.
  - `sin datos o sin idiomas soportados`: `resolveLang({})` → `'es'` y `resolveLang({ browser: ['fr', 'de'] })` → `'es'`.
  - `pick`: `pick({ es: 'Hola', en: 'Hi' }, 'en')` → `'Hi'`; `pick({ es: 'Hola' }, 'pt')` → `'Hola'`; `pick({ es: 'Hola', pt: '' }, 'pt')` → `'Hola'`.

- [ ] **Step 2: Agregar el script** `"test": "node --test scripts/tests/"` en `package.json`. Run: `npm test`. Expected: FAIL (el módulo `addonLang.ts` no existe).

- [ ] **Step 3: Implement** `addonLang.ts` con las firmas de Interfaces. `resolveLang`: normaliza a minúsculas, toma los 2 primeros caracteres del idioma del navegador (`'pt-BR'` → `'pt'`), y valida contra `LANGS`; orden de prioridad `query` → `stored` → `browser` (primero soportado) → `'es'`. `pick`: devuelve `text[lang]` si es un string no vacío, si no `text.es`.

- [ ] **Step 4: Run** `npm test`. Expected: todas las pruebas PASS.

---

### Task 2: Contenido y tipos del addon

**Files:**
- Create: `src/data/addon.json`
- Create: `src/data/addon.ts`

**Interfaces:**
- Consumes: `Localized` de `@/lib/addonLang`.
- Produces (desde `src/data/addon.ts`):
  - `type EntryTag = 'novedad' | 'mejora' | 'arreglo'`
  - `interface AddonEntry { id: string; date: string; tag: EntryTag; version?: string; title: Localized; text: Localized; images?: string[]; link?: string }`
  - `const ADDON_NAME: string` (viene de `addon.json`, campo `name`)
  - `const addon: { name: string; status: Localized; intro: Localized; videoId?: string; entries: AddonEntry[] }` con `entries` ordenadas por `date` descendente (en empate, por `id` descendente)
  - `const giscus: { repo: string; repoId: string; category: string; categoryId: string; term: string }` con `repo: 'Lealmf23/LealWeb'`, `category: 'Addon'`, `term: 'addon'` y `repoId`/`categoryId` en `''` (el autor los completa tras configurar Giscus)
  - `const discussionsUrl = 'https://github.com/Lealmf23/LealWeb/discussions'`

- [ ] **Step 1: Crear `addon.json`** con los campos `name` (`"CS2 Asset Builder"`), `status`, `intro`, `videoId` (`"xX6geY401Kg"`, el video del addon que ya enlazan las descripciones de los assets) y `entries`. Contenido **borrador**, escrito solo con hechos ya conocidos y marcado para que el autor lo reemplace: `intro` (addon de Blender para crear edificios personalizados para Cities: Skylines 2, usado para Altura Nova Residences) en `es`, `en` y `pt`; `status` "En desarrollo" en los tres idiomas; una primera entrada `id: "2026-11-05-nace-la-pagina"`, `date: "2026-11-05"`, `tag: "novedad"` que anuncia la página del registro, con `title` y `text` en los tres idiomas. Sin `images`, `link` ni `version`.

- [ ] **Step 2: Implementar `addon.ts`** con las firmas de Interfaces; importa el JSON con `import raw from './addon.json'` y lo tipa con `as`. Ordena una copia de `entries` (no muta el JSON).

- [ ] **Step 3: Verify.** Run: `npx tsc -b`. Expected: sin errores.

---

### Task 3: Componente de comentarios (Giscus)

**Files:**
- Create: `src/components/layout/GiscusComments.tsx`

**Interfaces:**
- Consumes: `Lang` de `@/lib/addonLang`; `giscus`, `discussionsUrl` de `@/data/addon`.
- Produces: `GiscusComments({ lang, fallbackText, fallbackLinkLabel }: { lang: Lang; fallbackText: string; fallbackLinkLabel: string }): JSX.Element`. Los dos textos de respaldo llegan ya traducidos desde la página.

- [ ] **Step 1: Implement `GiscusComments`.**
  - Si `giscus.repoId` o `giscus.categoryId` están vacíos, no inserta el script: renderiza el respaldo (un panel con `fallbackText` y un enlace a `discussionsUrl` con `fallbackLinkLabel`, `target="_blank"` y `rel="noopener noreferrer"`).
  - Si tienen valor, en un `useEffect` inserta `<script src="https://giscus.app/client.js" async crossorigin="anonymous">` dentro de un `div` (ref) con los atributos `data-repo`, `data-repo-id`, `data-category`, `data-category-id`, `data-mapping="specific"`, `data-term`, `data-reactions-enabled="1"`, `data-emit-metadata="0"`, `data-input-position="top"`, `data-theme="transparent_dark"`, `data-lang={lang}`, `data-loading="lazy"`.
  - El efecto depende de `lang` y limpia el contenedor al desmontar o recargar, de modo que cambiar el idioma recrea el bloque con la interfaz de Giscus en ese idioma.
  - Si el script dispara `onerror` (bloqueador o sin red), cambia a mostrar el respaldo.
  - Estilo del panel de respaldo: `rounded-[var(--radius-surface)] border border-[var(--border)] bg-[var(--surface)] p-6`.

- [ ] **Step 2: Verify.** Run: `npx tsc -b`. Expected: sin errores. (La prueba visual del respaldo se hace en la Task 5.)

---

### Task 4: La página, la ruta y el menú

**Files:**
- Create: `src/pages/AddonPage.tsx`
- Modify: `src/App.tsx` (ruta `/cs2-asset-builder` junto a las demás, `import { AddonPage }`)
- Modify: `src/data/site.ts` (agregar `{ to: '/cs2-asset-builder', label: 'CS2 Asset Builder' }` a `nav`, entre `/recursos` y `/setup`, con el mismo formato exacto de las demás líneas porque `scripts/seo.mjs` las lee con una expresión regular)

**Interfaces:**
- Consumes: `resolveLang`, `pick`, `LANGS`, `type Lang` de `@/lib/addonLang`; `addon`, `ADDON_NAME`, `type EntryTag` de `@/data/addon`; `PageHeader`, `Section`, `ButtonLink` (props `to`/`href`, `variant`) de `@/components/layout/*`; `GiscusComments`; `asset` de `@/lib/utils`.
- Produces: `AddonPage(): JSX.Element` (exportada con nombre).

- [ ] **Step 1: Diccionario de la interfaz.** Dentro de `AddonPage.tsx`, un `const ui: Record<Lang, {...}>` con las claves: `description`, `statusLabel` ("Estado"), `videoTitle`, `logTitle` ("Registro de avances"), `logEmpty` ("Pronto habrá novedades."), `tag: Record<EntryTag, string>` (Novedad / Mejora / Arreglo), `versionLabel`, `commentsTitle` ("Comentarios y sugerencias"), `voteHint` (explica que el 👍 en un comentario sirve para votar la sugerencia), `fallbackText`, `fallbackLink` ("Ver la discusión en GitHub"), `langLabel` ("Idioma"). Escribir los valores en `es`, `en` y `pt`.

- [ ] **Step 2: Estado de idioma.** Inicial: `resolveLang({ query: searchParams.get('lang'), stored: leerGuardado(), browser: navigator.languages })`, donde `leerGuardado()` lee `localStorage.getItem('addon-lang')` dentro de `try/catch` (devuelve `null` si falla). Al elegir un idioma: actualiza el estado, guarda en `localStorage` (con `try/catch`) y llama a `setSearchParams({ lang }, { replace: true })` de `react-router-dom`. El contenedor raíz lleva `lang={lang}`.

- [ ] **Step 3: Estructura.**
  - `PageHeader` (`eyebrow={ADDON_NAME}`, `title={ADDON_NAME}`, `description`) con, dentro (children), el selector de idioma: un grupo de 3 botones con `aria-pressed` y `aria-label={ui[lang].langLabel}`; el activo con `border-[var(--accent)]`.
  - Presentación: `intro` (con `pick`), estado, y el video de YouTube si hay `videoId` (iframe `https://www.youtube-nocookie.com/embed/{videoId}` con `loading="lazy"`, `title`, proporción 16:9 y `allowFullScreen`).
  - `Section id="registro"` con las entradas: fecha formateada con `Intl.DateTimeFormat(lang, { day: 'numeric', month: 'long', year: 'numeric' })`, etiqueta, versión (solo si existe), título, texto, imágenes (solo si hay, con `asset()`, `loading="lazy"` y `alt=""`) y enlace (solo si hay). Si no hay entradas, muestra `logEmpty`.
  - `Section id="comentarios"` con `voteHint` y `<GiscusComments lang={lang} fallbackText=… fallbackLinkLabel=… />`.

- [ ] **Step 4: Ruta y menú.** Agregar la ruta y la entrada de `nav` indicadas arriba.

- [ ] **Step 5: Verify.** Run: `npx tsc -b`. Expected: sin errores.

---

### Task 5: SEO (prerenderizado, sitemap y llms-full.txt)

**Files:**
- Modify: `src/data/seo.json` (ruta `/cs2-asset-builder`)
- Modify: `scripts/seo.mjs` (contenido de `/cs2-asset-builder`)

**Interfaces:**
- Consumes: `src/data/addon.json` (`name`, `intro.es`, `entries[].title.es`, `entries[].text.es`, `entries[].date`).

- [ ] **Step 1: `seo.json`.** Agregar `"/cs2-asset-builder"` a `routes` (después de `/recursos`) con `title` ("CS2 Asset Builder: addon de Blender para crear assets de Cities: Skylines 2 | Leal"), `description` (una frase sobre el addon y su registro de avances, en español) y `keywords` (addon Blender, crear assets Cities Skylines 2, CS2 Asset Builder, modding Cities Skylines 2).

- [ ] **Step 2: `seo.mjs`.** Leer `addon.json` con el helper `json()` existente. Agregar a `content` la clave `'/cs2-asset-builder'`: `h1` = nombre del addon, `intro` = `intro.es`, y dos secciones: "Registro de avances" (con `text` o `items` por entrada: `"{fecha} · {título}: {texto}"`, usando `fmtDate`, en orden descendente por fecha) y "Comentarios y sugerencias" (con `text` que explique que se comenta con una cuenta de GitHub y un `link` a `https://github.com/Lealmf23/LealWeb/discussions`). Si no hay entradas, omitir la primera sección. Agregar `'/cs2-asset-builder'` a `lastmod` del sitemap con la fecha de la entrada más reciente.

- [ ] **Step 3: Verify del build.** Run: `npm run build`. Expected: termina sin errores, el resumen dice `6 páginas`, y existen `dist/cs2-asset-builder/index.html` (con el `<title>` nuevo y un `<noscript>` con el h1) y la entrada `/cs2-asset-builder/` en `dist/sitemap.xml`.

- [ ] **Step 4: Comprobar `public/llms.txt`.** Si lista las páginas del sitio, agregar `/cs2-asset-builder`; si no, no tocar.

---

### Task 6: Verificación visual y publicación

**Files:** ninguno (solo verificación). Imágenes de entradas, si el autor las quiere, van en `public/addon/`.

- [ ] **Step 1: Levantar el sitio.** Run: `npm run dev` y abrir `/cs2-asset-builder`. Revisar en pantalla ancha y en ancho móvil (~390 px): cabecera con selector de idioma, presentación, video, registro y comentarios; que el menú de escritorio con la entrada larga "CS2 Asset Builder" no se apriete ni salte de línea, y que el menú móvil siga entrando sin scroll (hay un commit reciente que lo compactó); y que el texto se lea sobre el fondo.

- [ ] **Step 2: Probar idioma.** `/cs2-asset-builder?lang=pt` abre en portugués; cambiar con el selector actualiza la URL y se recuerda al recargar; `?lang=fr` cae al idioma guardado o del navegador; una entrada con `pt` vacío se muestra en español.

- [ ] **Step 3: Probar respaldos.** Con `repoId`/`categoryId` vacíos aparece el mensaje con enlace a GitHub. Con bloqueo de `giscus.app` (DevTools → bloqueo de URL) tras cargar los ids, aparece también el respaldo. Bloquear `localStorage` (modo privado estricto) no rompe la página.

- [ ] **Step 4: Verificar todo.** Run: `npm test && npx tsc -b && npm run build`. Expected: todo en verde.

- [ ] **Step 5: Publicar (solo si el autor lo pide).** Commit de los archivos de este plan y push a `main`. Después, el autor configura Giscus (Discussions, categoría `Addon` tipo Announcement, app de giscus) y pasa `repo-id` y `category-id`, que se escriben en `giscus` de `src/data/addon.ts`, y se vuelve a publicar.
