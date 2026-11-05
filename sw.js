/* Service worker de KBD: permite abrir la aplicación sin conexión.
   Estrategia "red primero": siempre intenta traer la versión más reciente (así la base
   del equipo se actualiza sola) y solo usa la copia guardada cuando no hay conexión. */

const CACHE = 'kbd-v1';
const ASSETS = ['./', './index.html', './styles.css', './app.js', './data/registros.js', './icon.svg', './manifest.webmanifest'];

self.addEventListener('install', ev => {
  ev.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', ev => {
  ev.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('kbd-') && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', ev => {
  const req = ev.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  const fonts = /^https:\/\/fonts\.(googleapis|gstatic)\.com$/.test(url.origin);
  if (!sameOrigin && !fonts) return;

  ev.respondWith(
    fetch(req)
      .then(res => {
        if (res.ok || res.type === 'opaque') {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
        }
        return res;
      })
      .catch(() => caches.match(req, { ignoreSearch: true })
        .then(hit => hit || (req.mode === 'navigate' ? caches.match('./index.html') : Response.error())))
  );
});
