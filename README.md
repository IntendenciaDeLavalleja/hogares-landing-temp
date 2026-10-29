# Hogares Estudiantiles · Intendencia de Lavalleja

Landing informativa de los Hogares Estudiantiles de la Intendencia de
Lavalleja (Minas, Montevideo y Mariscala).

Sitio construido con **React + Vite**, estilizado con **Tailwind CSS 4** y
**daisyUI 5**. La instalación sigue la guía oficial de daisyUI para Vite:
<https://daisyui.com/docs/install/vite/>.

## Desarrollo

```bash
npm install
npm run dev
```

Otros comandos:

```bash
npm run build    # build de producción en /dist
npm run preview  # servir el build
npm run lint     # oxlint
```

## Estructura

```
public/
  favicon.ico            # favicon oficial
  Logo.webp              # escudo de la Intendencia
  img/                   # fotografías del folleto oficial (optimizadas)
src/
  components/
    layout/              # TopBar, Navbar y Footer
    sections/            # Hero y MarqueeBand
    ui/                  # Logo y Marquee
  data/content.js        # contenido editable del sitio
  hooks/                 # sección activa del navbar
  index.css              # Tailwind + tema daisyUI + estilos
Dockerfile               # build multi-stage Node + Nginx
nginx.conf               # servidor en 8080, SPA, caché y health check
```

La información del programa, las frases de las marquesinas y los datos de
contacto se editan en `src/data/content.js`.

## Tema y estilos

`src/index.css` importa Tailwind y declara el tema propio de daisyUI
(`lavalleja`) con `@plugin "daisyui/theme"`, tal como indica la documentación
oficial. La paleta parte de la identidad del folleto (ciruela, rojo y verde de
la bandera) y suma el ocre del diseño de referencia.

Tipografías: Archivo (títulos y texto), Instrument Serif (acentos poéticos) e
IBM Plex Mono (etiquetas y datos).

## Docker

La imagen compila el sitio con Node y lo sirve con Nginx en el puerto **8080**.

```bash
docker build -t hogares-landing .
docker run --rm -p 8080:8080 hogares-landing
```

Verificación:

```bash
curl http://127.0.0.1:8080/healthz   # responde ok
curl -I http://127.0.0.1:8080/
```

`nginx.conf` incluye:

- escucha en `8080`;
- fallback de SPA hacia `index.html`;
- compresión gzip;
- caché larga para assets y sin caché para el HTML;
- cabeceras de seguridad y CSP compatible con Google Fonts;
- endpoint de salud `GET /healthz`.

## Coolify

Configurar el recurso con:

- **Build pack:** Dockerfile.
- **Puerto expuesto:** `8080`.
- **Health check path:** `/healthz`.
- **Health check port:** `8080`.

El `HEALTHCHECK` también está declarado en el Dockerfile, así que Docker y
Coolify pueden monitorear el contenedor sin configuración adicional.

## Datos de contacto

- Dirección de Servicios Sociales — Edificio Central, Planta Alta, Minas.
- Teléfono: 4442 2752, interno 202.
- Horario: lunes a viernes, de 8:30 a 17 h.

El PDF original del folleto queda fuera del repositorio y de la imagen porque
no es necesario para el sitio publicado.
