# L&B General Service — Sitio estático (HTML/CSS/JS)

Este paquete contiene un sitio publicitario responsive y moderno (sin frameworks) con:
- Navegación fija + menú móvil (hamburger)
- Smooth scroll entre secciones
- Toggle de idioma ES/EN
- Servicios (8) con modal + galería (5 imágenes)
- Proyectos (16) con modal + galería (6–8 imágenes)
- Formulario de contacto que genera mensaje para WhatsApp
- Botón flotante de WhatsApp
- SEO básico + accesibilidad (ARIA/skip-link)

## Estructura
- `index.html`
- `styles.css`
- `script.js`
- `assets/`
  - `logo.png` (tu logo actual)
  - `services/` (imágenes demo para servicios)
  - `projects/` (imágenes demo para proyectos)
  - `icons/` (SVGs simples)

---

## Personalización rápida (IMPORTANTE)

### 1) Cambiar el logo
Reemplaza:
- `assets/logo.png`
por tu archivo real (mismo nombre), o edita en `index.html`:
```html
<img class="brand-logo" src="assets/logo.png" ... />
```

### 2) Cambiar imágenes de servicios y proyectos
- Servicios (thumbnails): `assets/services/service-1.jpg` ... `service-8.jpg`
- Galería servicios: `assets/services/gallery-1.jpg` ... `gallery-5.jpg`
- Proyectos (thumbnails): `assets/projects/project-1.jpg` ... `project-16.jpg`
- Galería proyectos: `assets/projects/gallery-1.jpg` ... `gallery-8.jpg`

Si quieres usar URLs externas, edita las rutas en `script.js` dentro de `services[]` y `projects[]`.

### 3) Cambiar número de WhatsApp
En `script.js`, modifica:
```js
const WHATSAPP_NUMBER = "1XXXXXXXXXX";
```
Formato: código de país + número, **sin** `+`, **sin** espacios. Ejemplo: `14075550123`.

### 4) Editar textos (ES/EN)
- Textos estáticos: `index.html` con atributos `data-i18n`.
- Diccionario de idioma: `script.js` (objeto `i18n`).
- Textos de servicios/proyectos: `script.js` en `services[]` y `projects[]`.

### 5) Email/teléfono/dirección
Edita en `index.html` (sección **Contacto**).

---

## Cómo ejecutar
Solo abre `index.html` en tu navegador o usa Live Server en VS Code.

> Nota: el formulario no envía datos a un servidor (sitio estático). Abre WhatsApp con el mensaje prellenado.



---

## Mejoras v2 (Íconos + Zoom en galerías)
- Íconos SVG lineales, coherentes con la tipografía (Montserrat/Roboto): `assets/icons/`.
- En **Servicios** y **Proyectos**, las imágenes de la galería ahora se pueden abrir en **pantalla completa**:
  - Clic en imagen → abre visor (lightbox)
  - Rueda/trackpad → zoom
  - Arrastrar → mover (cuando el zoom > 1)
  - Botones → zoom in / zoom out / cerrar
