# Página del addon de Blender (CS2 Builder Asset) — diseño

Fecha: 2026-11-05 · Estado: pendiente de revisión

## Objetivo

Una página exclusiva en lealmafor.com sobre el addon de Blender con el que se crean assets para Cities: Skylines 2.
Sirve para dos cosas:

1. Llevar un **registro de avances** (devlog) que el autor actualiza.
2. Que los visitantes dejen **comentarios y sugerencias**, y puedan votarlos.

La página puede verse en **español, inglés y portugués**. Solo esta página: el resto del sitio sigue en español.

## Decisiones ya tomadas

| Tema | Decisión |
|---|---|
| Comentarios | Giscus (GitHub Discussions) en el repo `Lealmf23/LealWeb`. Quien comenta necesita cuenta de GitHub. |
| Votos | Las reacciones de GitHub (👍) de Giscus, en cada comentario. No hay ranking ni lista propia. |
| Idiomas | ES / EN / PT, **solo en esta página**, con selector. Idioma inicial según el del navegador. |
| Devlog | Entradas en un JSON dentro del repo. Publicar = agregar una entrada + commit (se despliega solo). Sin panel de administración. |
| Nombre | "CS2 Asset Builder" (confirmado por el autor). Vive en una sola constante para cambiarlo fácil. |
| Ruta y nombre | La página se llama como el addon: ruta `/cs2-asset-builder`, entrada "CS2 Asset Builder" en el menú y como migas de pan de la cabecera ("Leal / CS2 Asset Builder"). |

## Fuera de alcance

- Lista de sugerencias propia con ranking y estados (pedía base de datos externa).
- Traducir el resto del sitio, rutas `/en` y `/pt`, o detección por país.
- Traducir los comentarios de la gente (quedan en el idioma en que se escribieron).
- Panel de administración, notificaciones.

## Estructura de la página

De arriba hacia abajo, con el `PageHeader`, `Backdrop`, `Section` y estilos que ya usan las demás páginas:

1. **Cabecera:** título con el nombre del addon y el selector de idioma (ES / EN / PT).
2. **Presentación:** qué es, para qué sirve, estado actual (ej. "En desarrollo") y, opcionalmente, un video de YouTube. Los enlaces (descarga o más información) van por entrada del registro, no en la presentación.
3. **Registro de avances:** entradas de la más nueva a la más vieja. Cada una muestra fecha, etiqueta (Novedad / Mejora / Arreglo), título, texto y, si tiene, versión, imágenes y un enlace.
4. **Comentarios y sugerencias:** el bloque de Giscus con una línea que explica que los 👍 sirven para votar.

## Datos

### `src/data/addon.json`

Contiene todo lo que el autor edita. Cada texto traducible es un objeto `{ es, en, pt }`.

```json
{
  "status": { "es": "En desarrollo", "en": "In development", "pt": "Em desenvolvimento" },
  "intro": { "es": "...", "en": "...", "pt": "..." },
  "videoId": "xX6geY401Kg",
  "entries": [
    {
      "id": "2026-11-05-primera-version",
      "date": "2026-11-05",
      "tag": "novedad",
      "version": "0.1",
      "title": { "es": "...", "en": "...", "pt": "..." },
      "text":  { "es": "...", "en": "...", "pt": "..." },
      "images": ["0-1.jpg"],
      "link": "https://..."
    }
  ]
}
```

- Si falta un idioma en una entrada, se muestra el español. Así se puede publicar una entrada solo en español y traducirla después.
- `tag` es uno de `novedad`, `mejora`, `arreglo`.
- Las imágenes van en `public/addon/` y en el JSON se escribe solo el nombre del archivo (`"0-1.jpg"`): la página antepone `addon/` y usa el helper `asset()`. Su texto alternativo es el título de la entrada.

### `src/data/addon.ts`

Tipos, la constante del nombre (`ADDON_NAME`), la configuración de Giscus y las entradas ordenadas por fecha descendente.

## Idiomas

- Idiomas: `es` (por defecto), `en`, `pt`.
- **Elección inicial**, en este orden: parámetro `?lang=` de la URL → idioma guardado en `localStorage` → idioma del navegador (`navigator.language`: `pt*` → pt, `en*` → en) → `es`.
- Al cambiar con el selector se guarda en `localStorage` y se actualiza `?lang=` para que el enlace compartido conserve el idioma.
- Los textos fijos de la interfaz de la página (títulos de sección, etiquetas, mensajes) viven en un diccionario `ES/EN/PT` dentro de `AddonPage`, sin librerías nuevas. El resto del sitio no usa este diccionario.
- El idioma se aplica con `lang` en el contenedor de la página, para lectores de pantalla.
- El idioma de la interfaz de Giscus se pasa con su opción `lang`. Todos los idiomas comparten **un único hilo** de comentarios.
- Si `localStorage` no está disponible, se usa el idioma del navegador sin recordarlo (todo dentro de `try/catch`).

## Comentarios y votos (Giscus)

- Componente `GiscusComments`: inserta el script de `https://giscus.app/client.js` con `repo`, `repo-id`, `category`, `category-id`, `mapping="specific"`, `term="addon"`, `reactions-enabled="1"`, `input-position="top"`, `theme="transparent_dark"`, `lang` según el idioma elegido, y carga diferida.
- Se vuelve a montar cuando cambia el idioma, para que Giscus cambie su interfaz.
- **Votos:** el 👍 en cada comentario es el voto. No hay ordenamiento por votos propio, pero Giscus permite ordenar los comentarios por "Más votados" desde su selector.
- **Si Giscus no carga** (bloqueador, sin red, o faltan los ids): se muestra un mensaje con un enlace directo a la discusión en GitHub. El devlog funciona igual, porque no depende de Giscus.

### Pasos manuales del autor (una sola vez)

1. En GitHub, repo `Lealmf23/LealWeb` → Settings → activar **Discussions**.
2. Crear una categoría "Addon" de tipo **Announcement** (solo el autor crea discusiones; los demás comentan) — así nadie puede abrir hilos nuevos sueltos.
3. Instalar la app [giscus](https://github.com/apps/giscus) en el repo.
4. En giscus.app, pegar el repo y elegir la categoría; copiar `repo-id` y `category-id` y pasarlos para ponerlos en `addon.ts`.

Hasta que existan esos ids, la página muestra en lugar del bloque de comentarios un aviso ("los comentarios se habilitan pronto") con enlace al Discord, porque la página de Discussions todavía no existe y daría 404. Una vez configurado Giscus, el respaldo (si el script está bloqueado) enlaza a las Discussions del repo.

## Archivos

| Archivo | Cambio |
|---|---|
| `src/pages/AddonPage.tsx` | Nuevo: la página y el selector de idioma. |
| `src/components/layout/GiscusComments.tsx` | Nuevo: el bloque de comentarios con su respaldo. |
| `src/data/addon.json`, `src/data/addon.ts` | Nuevos: contenido, tipos, nombre y configuración de Giscus. |
| `src/App.tsx` | Ruta `/cs2-asset-builder`. |
| `src/data/site.ts` | Entrada "CS2 Asset Builder" en el menú (respetando el formato que `seo.mjs` lee con regex). |
| `src/data/seo.json`, `scripts/seo.mjs` | Metaetiquetas, sitemap, `llms-full.txt` y `<noscript>` de `/cs2-asset-builder`, en español. |
| `public/addon/` | Imágenes del registro. |

## SEO

- La página se agrega al prerenderizado como las demás: título, descripción, datos estructurados y el contenido en español dentro de `<noscript>`.
- **Limitación conocida:** como el idioma se cambia en el navegador (sin rutas `/en` ni `/pt`), buscadores y vistas previas de Discord/WhatsApp solo ven el español. Si más adelante importa, se pasa a rutas por idioma.

## Verificación

- `tsc` y `npm run build` sin errores; el paso de SEO genera `/cs2-asset-builder`.
- Revisión visual en pantalla grande y en móvil: selector de idioma, entradas con y sin imágenes, y el bloque de comentarios.
- Probar el respaldo: sin los ids de Giscus y con el script bloqueado.
- Probar el idioma: `?lang=pt`, idioma guardado, idioma del navegador y entrada con un idioma faltante (cae al español).
- El proyecto no tiene framework de pruebas; la lógica de idioma (función pura) se prueba con `node --test` (`npm test`), que ya viene con Node 24. La interfaz se verifica a mano. El deploy no corre las pruebas.

## Preguntas abiertas

- **Contenido inicial:** el texto de presentación y la primera entrada del registro los redacta el autor (o los redacto yo como borrador a partir de lo que cuente).
- **Traducciones:** las escribo yo al inglés y al portugués; conviene que alguien que hable portugués las revise antes de publicar.
