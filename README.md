# KBD · Knowledge Base Desk

Base de conocimiento para soporte de TI: soluciones de incidencias y checklists operativos, en una aplicación web que funciona sin instalar nada.

**Probar en línea:** https://danstook.github.io/REPOSITORIO-TI/

## Qué hace

- **Soluciones e incidencias:** cada registro guarda folio, categoría, grupo de asignación, la solución y el contexto original.
- **Checklists operativos:** los pasos se marcan con casillas y el avance se guarda en el navegador.
- **Búsqueda por relevancia:** ignora acentos, acepta varias palabras y resalta las coincidencias, incluso dentro de la solución.
- **Filtros:** por categoría y por estado (documentada, informativa o pendiente).
- **Copiar para ServiceNow:** arma un texto con folio, categoría, solución y pasos marcados, listo para pegar en las notas de trabajo.
- **Abrir en ServiceNow:** con la URL de tu instancia configurada, abre el folio directamente.
- **Imágenes de referencia:** se pegan con `Ctrl+V`, se arrastran o se eligen; se comprimen antes de guardarse.
- **Respaldos:** exporta e importa todo en un archivo JSON, combinando o reemplazando lo que ya tienes.
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

## Dónde se guardan los datos

Todo se guarda en el `localStorage` del navegador de cada persona. **No hay servidor ni base de datos compartida**, así que los registros no se sincronizan entre computadoras ni entre navegadores: para pasarlos a otro equipo usa *Exportar respaldo* e *Importar respaldo*.

De la URL de ServiceNow solo se guarda la dirección de la instancia. La aplicación nunca pide ni almacena credenciales.

Los registros que trae la aplicación de fábrica son ejemplos de referencia. Si eliminas uno, puedes recuperarlo desde *Ajustes → Restaurar*.

## Estructura

| Archivo | Contenido |
| --- | --- |
| `index.html` | Estructura de la página y los diálogos |
| `styles.css` | Estilos, variables de color y diseño adaptable |
| `app.js` | Datos de ejemplo, búsqueda, almacenamiento y toda la lógica |

No usa dependencias ni proceso de compilación. Solo carga las tipografías Manrope y DM Mono desde Google Fonts; sin conexión usa las del sistema.

## Publicar los cambios

El sitio se publica solo con GitHub Pages cada vez que se sube algo a la rama `main`.
