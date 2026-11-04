// Utilidades compartidas por los scripts que descargan datos antes del build.

/** fetch con reintentos y un user-agent de navegador (YouTube y Steam responden peor al de Node). */
export async function fetchRetry(url, options = {}, tries = 3) {
  let last
  for (let attempt = 1; attempt <= tries; attempt++) {
    try {
      const res = await fetch(url, {
        ...options,
        headers: { 'user-agent': 'Mozilla/5.0', 'accept-language': 'es-AR,es;q=0.9', ...options.headers },
      })
      if (res.ok) return res
      last = new Error(`HTTP ${res.status}`)
    } catch (err) {
      last = err
    }
    if (attempt < tries) await new Promise((r) => setTimeout(r, 1000 * Math.min(attempt, 4)))
  }
  throw last
}

/** Avisa de un fallo sin romper el build; en GitHub Actions queda como advertencia visible en la ejecución. */
export function warnBuild(tag, message) {
  console.warn(`[${tag}] ${message}`)
  if (process.env.GITHUB_ACTIONS) console.log(`::warning title=Datos desactualizados (${tag})::${message}`)
}
