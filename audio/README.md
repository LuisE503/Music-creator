Carpeta para archivos de audio del proyecto BeatForge AI

Instrucciones y convenciones (solo HTML/JS):

- Estructura recomendada para facilitar la detección automática desde el navegador:
  - audio/
    - <album-id>/
      - 01.mp3
      - 02.mp3
      - track-title.mp3

- Usa el campo `id` del álbum en `js/data.js` como nombre de la carpeta, por ejemplo `lofi-dreams`.
- Nombra las pistas con índices `01.mp3`, `02.mp3` (dos dígitos) para mantener el orden.
- Alternativa aceptada: `audio/albumid-01.mp3` en la raíz `audio/`.
- Evita espacios; usa guiones (`-`) o guion_bajo (`_`).
- Extensiones soportadas: `.mp3`, `.wav`, `.ogg`.

Cómo funciona la detección (sin Node):

- La página `album.html` intentará resolver automáticamente la ruta de cada pista probando varios patrones comunes, por ejemplo:
  - `audio/<album-id>/01.mp3`  (recomendado)
  - `audio/<album-id>/1.mp3`
  - `audio/<album-id>/<sanitized-track-title>.mp3`
  - `audio/<album-id>-01.mp3`
  - `audio/<sanitized-track-title>.mp3`

- Si colocas tus archivos siguiendo la convención anterior, no necesitarás nada adicional: la página encontrará y reproducirá las pistas desde el navegador.

Qué puedo hacer por ti:
- Puedo ajustar más patrones si tienes una convención distinta.
- Puedo añadir una pequeña UI para validar las rutas detectadas antes del despliegue.

Ejemplo mínimo:

```
audio/
  lofi-dreams/
    01.mp3
    02.mp3
  neon-highway-1984/
    01.mp3
    02.mp3
```

Con esto `album.html` detectará las pistas automáticamente en el navegador sin usar Node.
