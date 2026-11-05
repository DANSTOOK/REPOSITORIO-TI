# KBD · Knowledge Base Desk

Base de conocimiento para soporte de TI: soluciones de incidencias y checklists operativos, en una aplicación web que funciona sin instalar nada.

**Probar en línea:** https://danstook.github.io/REPOSITORIO-TI/

## Qué hace

- **Soluciones e incidencias:** cada registro guarda folio, categoría, grupo de asignación, la solución y el contexto original.
- **Base compartida:** todos abren la misma información, publicada en el repositorio.
- **Checklists con bitácora:** los pasos se marcan con casillas y cada ejecución queda registrada con fecha, responsable, tienda y notas.
- **Búsqueda por relevancia:** ignora acentos, acepta varias palabras y resalta las coincidencias, incluso dentro de la solución.
- **Filtros:** por categoría y por estado (documentada, informativa o pendiente).
- **Copiar para ServiceNow:** arma un texto con folio, categoría, solución y pasos marcados, listo para pegar en las notas de trabajo.
- **Abrir en ServiceNow:** con la URL de tu instancia configurada, abre el folio directamente.
- **Imágenes de referencia:** se pegan con `Ctrl+V`, se arrastran o se eligen; se comprimen antes de guardarse.
- **Respaldos:** exporta e importa todo en un archivo JSON, combinando o reemplazando lo que ya tienes.
- **Local o del equipo:** cada registro indica si viene de la base del equipo, si lo editaste en tu navegador (✎) o si solo existe en tu navegador (●). Una versión local se puede descartar con *Volver a la versión del equipo*.
- **Relacionados:** el detalle sugiere registros con la misma categoría, grupo o palabras en común.
- **Enlaces clicables** dentro de la solución y los comentarios.
- **Sin conexión e instalable:** después de la primera visita abre sin internet y se puede instalar como aplicación desde el navegador.
- **Tema claro y oscuro**, y diseño adaptado a teléfono.

## Cómo usarla

Ábrela en https://danstook.github.io/REPOSITORIO-TI/ o descarga el repositorio y abre `index.html` con doble clic. No necesita servidor, instalación ni conexión después de la primera carga.

### Atajos de teclado

| Tecla | Acción |
| --- | --- |
| `/` o `Ctrl+K` | Buscar |
| `N` | Nueva entrada |
| `↑` `↓` | Moverse entre resultados |
| `E` | Editar el registro abierto |
| `P` | Fijar o quitar de fijados |
| `Esc` | Cerrar el detalle o limpiar la búsqueda |
| `Ctrl+Enter` | Guardar el formulario |

Para abrir un registro directamente: `index.html#INC4093079`.

## La base compartida del equipo

`data/registros.js` es la información que todos ven al abrir la aplicación. Es el único archivo que hay que tocar para actualizar el conocimiento del equipo:

1. Documenta o corrige lo que haga falta dentro de la aplicación, como siempre.
2. Entra a **Ajustes → Base compartida → Generar archivo**. Se descarga un `registros.js` con la base más todo lo que agregaste.
3. Reemplaza `data/registros.js` con ese archivo y súbelo al repositorio.

En unos minutos el sitio se actualiza y el resto del equipo ve los cambios la próxima vez que abra la aplicación.

Los ids de cada registro se conservan, así que fijados, bitácoras y ediciones locales siguen funcionando después de una actualización. Cuando la base publicada ya incluye exactamente tus cambios, la aplicación quita sola la copia local para que vuelvas a recibir las actualizaciones del equipo. Si tu versión local difiere de la publicada, el registro muestra ✎ y puedes usar *Volver a la versión del equipo*. *Ajustes → Base compartida* muestra cuántos cambios locales tienes sin publicar.

## Bitácora de checklists

Al marcar el primer paso de un checklist se abre una ejecución. Cuando terminas, **Finalizar ejecución** la guarda con la fecha, el responsable, la tienda y las notas, y queda en la bitácora del registro. El botón *Copiar para ServiceNow* incluye la última ejecución.

La bitácora es local de cada persona, igual que el resto de los datos del navegador, y viaja en los respaldos.

## Dónde se guardan los datos

La base del equipo viene del repositorio; lo que cada persona agrega o edita se guarda solo en el `localStorage` de su navegador. **No hay servidor ni base de datos en vivo**, así que esos cambios personales no se sincronizan solos: para compartirlos con el equipo se publica la base (ver arriba), y para pasarlos a otra computadora se usan *Exportar respaldo* e *Importar respaldo*.

De la URL de ServiceNow solo se guarda la dirección de la instancia. La aplicación nunca pide ni almacena credenciales.

Los registros que trae la aplicación de fábrica son ejemplos de referencia. Si eliminas uno, puedes recuperarlo desde *Ajustes → Restaurar*.

## Estructura

| Archivo | Contenido |
| --- | --- |
| `index.html` | Estructura de la página y los diálogos |
| `styles.css` | Estilos, variables de color y diseño adaptable |
| `app.js` | Búsqueda, almacenamiento, bitácora y toda la lógica |
| `data/registros.js` | La base compartida del equipo |
| `sw.js` | Service worker: uso sin conexión (siempre intenta primero la versión en línea) |
| `manifest.webmanifest`, `icon.svg` | Instalación como aplicación e ícono |

No usa dependencias ni proceso de compilación. Solo carga las tipografías Manrope y DM Mono desde Google Fonts; sin conexión usa las del sistema.

## Publicar los cambios

El sitio se publica solo con GitHub Pages cada vez que se sube algo a la rama `main`.
