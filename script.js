/* =========================================================
   L&B General Service — script.js
   - Smooth scroll with fixed header offset
   - Language toggle ES/EN (dynamic text swapping)
   - Render services and projects from data arrays
   - Shared modal for services/projects
   - Basic form validation + WhatsApp message URL
   - Responsive hamburger menu
========================================================= */

(() => {
  "use strict";

  /* =========================
     CONFIG (personalize here)
  ========================= */
  const WHATSAPP_NUMBER = "1XXXXXXXXXX"; // <-- Replace with real number (country code + number, no +, no spaces)
  const DEFAULT_LANG = "es"; // "es" or "en"

  /* =========================
     DOM
  ========================= */
  const docEl = document.documentElement;
  const header = document.querySelector(".site-header");
  const nav = document.getElementById("primaryNav");
  const navToggle = document.getElementById("navToggle");

  const langToggle = document.getElementById("langToggle");
  const langPill = document.getElementById("langPill");

  const servicesGrid = document.getElementById("servicesGrid");
  const projectsGrid = document.getElementById("projectsGrid");

  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("modalBody");
  const modalClose = document.getElementById("modalClose");

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCanvas = document.getElementById("lightboxCanvas");
  const lightboxTitle = document.getElementById("lightboxTitle");
  const lightboxHint = document.getElementById("lightboxHint");
  const lightboxClose = document.getElementById("lightboxClose");
  const zoomInBtn = document.getElementById("zoomInBtn");
  const zoomOutBtn = document.getElementById("zoomOutBtn");


  const yearEl = document.getElementById("year");

  const form = document.getElementById("quoteForm");
  const copyBtn = document.getElementById("copyMessageBtn");
  const toast = document.getElementById("toast");
  const serviceSelect = document.getElementById("service");

  const fabWhatsapp = document.getElementById("fabWhatsapp");
  const directWhatsapp = document.getElementById("whatsAppDirect");

  /* =========================
     Data
  ========================= */
  const serviceGallery = [
    "assets/services/gallery-1.jpg",
    "assets/services/gallery-2.jpg",
    "assets/services/gallery-3.jpg",
    "assets/services/gallery-4.jpg",
    "assets/services/gallery-5.jpg",
  ];

  const projectGallery = [
    "assets/projects/gallery-1.jpg",
    "assets/projects/gallery-2.jpg",
    "assets/projects/gallery-3.jpg",
    "assets/projects/gallery-4.jpg",
    "assets/projects/gallery-5.jpg",
    "assets/projects/gallery-6.jpg",
    "assets/projects/gallery-7.jpg",
    "assets/projects/gallery-8.jpg",
  ];

  const services = [
    {
      id: "residential",
      icon: "assets/icons/icon-home.svg",
      img: "assets/services/service-1.jpg",
      title: { es: "Construcción residencial nueva", en: "New Residential Construction" },
      short: {
        es: "Planificación y construcción de viviendas nuevas con control de calidad, inspecciones y acabados premium. Coordinamos cronogramas, permisos (si aplica) y subcontratos para entregar en tiempo.",
        en: "End-to-end new home builds with quality control, inspections, and premium finishes. We coordinate schedules, permits (as needed), and trades to deliver on time."
      },
      long: {
        es: "Desde cimentación y estructura hasta interiores y entrega final. Priorizamos seguridad, orden en obra y comunicación constante. Ideal para propietarios e inversionistas que buscan una ejecución confiable y bien documentada.",
        en: "From foundation and framing to interiors and final handoff. We prioritize safety, jobsite cleanliness, and clear communication. Ideal for homeowners and investors looking for reliable, well-documented execution."
      },
      gallery: serviceGallery
    },
    {
      id: "kitchen-bath",
      icon: "assets/icons/icon-kitchen.svg",
      img: "assets/services/service-2.jpg",
      title: { es: "Remodelaciones (Kitchen & Bath)", en: "Kitchen & Bath Remodeling" },
      short: {
        es: "Renovación de cocinas y baños con diseño funcional, materiales durables y terminaciones precisas. Optimizamos distribución, iluminación, almacenamiento y estética.",
        en: "Kitchen and bathroom renovations focused on function, durable materials, and clean finishes. We optimize layout, lighting, storage, and overall aesthetics."
      },
      long: {
        es: "Trabajamos con una propuesta clara: demolición controlada, instalaciones, revestimientos, mobiliario y detalles. Entregamos un espacio moderno y práctico sin perder de vista el presupuesto.",
        en: "We follow a clear scope: controlled demo, rough-ins, tile/finishes, cabinetry, and final details. You get a modern, practical space while staying mindful of budget."
      },
      gallery: serviceGallery
    },
    {
      id: "additions",
      icon: "assets/icons/icon-expand.svg",
      img: "assets/services/service-3.jpg",
      title: { es: "Ampliaciones (Home Additions)", en: "Home Additions" },
      short: {
        es: "Nuevos ambientes: habitaciones, family rooms, garages o extensiones. Alineamos la ampliación con la estructura existente para un resultado natural y seguro.",
        en: "New rooms, family areas, garages, and extensions. We align the addition with the existing structure for a natural, safe result."
      },
      long: {
        es: "Definimos alcance, materiales y tiempos; protegemos áreas habitadas y ejecutamos por etapas. Ideal si necesitas más espacio sin mudarte.",
        en: "We define scope, materials, and timeline; we protect lived-in areas and build in phases. Perfect if you need more space without moving."
      },
      gallery: serviceGallery
    },
    {
      id: "repairs",
      icon: "assets/icons/icon-wrench.svg",
      img: "assets/services/service-4.jpg",
      title: { es: "Reparaciones generales (General Repairs)", en: "General Repairs" },
      short: {
        es: "Soluciones rápidas y seguras para problemas comunes: drywall, pintura, puertas, pisos, filtraciones menores y ajustes estructurales simples.",
        en: "Fast, safe fixes for common issues: drywall, painting, doors, flooring, minor leaks, and straightforward structural adjustments."
      },
      long: {
        es: "Diagnosticamos la causa, proponemos alternativas y dejamos todo limpio. Perfecto para mantenimiento preventivo y correcciones antes de una venta o renta.",
        en: "We diagnose the cause, propose options, and leave everything clean. Great for preventative maintenance and pre-sale or rental-ready fixes."
      },
      gallery: serviceGallery
    },
    {
      id: "plumbing",
      icon: "assets/icons/icon-plumbing.svg",
      img: "assets/services/service-5.jpg",
      title: { es: "Instalaciones sanitarias (Plumbing)", en: "Plumbing Installation" },
      short: {
        es: "Instalación y reemplazo de líneas, griferías, lavaderos, sanitarios y conexiones. Enfoque en seguridad, sellado y pruebas de funcionamiento.",
        en: "Installation and replacement of lines, fixtures, sinks, toilets, and connections. We focus on safety, sealing, and functional testing."
      },
      long: {
        es: "Coordinamos con el alcance del proyecto (remodelación o reparación) para evitar retrabajos. Documentamos cambios y dejamos recomendaciones de mantenimiento.",
        en: "We coordinate plumbing with the full scope (remodel or repair) to avoid rework. We document changes and provide maintenance recommendations."
      },
      gallery: serviceGallery
    },
    {
      id: "hvac",
      icon: "assets/icons/icon-hvac.svg",
      img: "assets/services/service-6.jpg",
      title: { es: "Sistemas HVAC", en: "HVAC Systems" },
      short: {
        es: "Soporte para instalación, reemplazo o adecuación de HVAC en coordinación con técnicos y ductería. Mejoramos confort y eficiencia.",
        en: "Support for HVAC install, replacement, or upgrades in coordination with technicians and ductwork. Improve comfort and efficiency."
      },
      long: {
        es: "Aseguramos una integración correcta con obra civil y acabados, cuidando ventilación, sellos y accesos para mantenimiento.",
        en: "We ensure proper integration with construction and finishes—ventilation, sealing, and service access included."
      },
      gallery: serviceGallery
    },
    {
      id: "masonry",
      icon: "assets/icons/icon-brick.svg",
      img: "assets/services/service-7.jpg",
      title: { es: "Trabajos de albañilería (Masonry)", en: "Masonry Work" },
      short: {
        es: "Muros, revestimientos, bases, reparaciones en ladrillo/bloque y detalles exteriores. Enfoque en alineación, plomo y terminación.",
        en: "Walls, veneers, foundations, brick/block repairs, and exterior details. Focused on alignment, plumb, and clean finish."
      },
      long: {
        es: "Aplicamos técnicas y materiales adecuados a clima y uso. Ideal para mejoras de fachada, refuerzos y restauraciones puntuales.",
        en: "We use methods and materials suited to climate and use. Great for facade upgrades, reinforcements, and targeted restorations."
      },
      gallery: serviceGallery
    },
    {
      id: "restoration",
      icon: "assets/icons/icon-water.svg",
      img: "assets/services/service-8.jpg",
      title: { es: "Saneamiento y restauración (Water Damage)", en: "Water Damage Restoration" },
      short: {
        es: "Mitigación y reparación tras filtraciones o daños por agua. Coordinamos secado, retiro de material afectado y reconstrucción.",
        en: "Mitigation and repair after leaks or water damage. We coordinate drying, removal of affected materials, and rebuild."
      },
      long: {
        es: "Priorizamos seguridad, control de humedad y recuperación estética. Proceso ordenado para que el espacio vuelva a estar operativo.",
        en: "We prioritize safety, humidity control, and a clean visual restore. An organized process to bring the space back to usable quickly."
      },
      gallery: serviceGallery
    },
  ];

  const projects = Array.from({ length: 16 }, (_, i) => {
    const n = i + 1;
    return {
      id: `p${n}`,
      img: `assets/projects/project-${n}.jpg`,
      title: {
        es: `Proyecto ${n}: Renovación residencial`,
        en: `Project ${n}: Residential Renovation`
      },
      desc: {
        es: "Proyecto demo: remodelación con mejoras de distribución, acabados y eficiencia. Incluye coordinación de rubros y control de calidad.",
        en: "Demo project: renovation with layout, finish, and efficiency upgrades. Includes trade coordination and quality control."
      },
      details: {
        es: { duration: "4–8 semanas", type: "Remodelación", location: "Orlando, FL (genérico)" },
        en: { duration: "4–8 weeks", type: "Remodel", location: "Orlando, FL (generic)" }
      },
      gallery: projectGallery.slice(0, 6 + (n % 3)) // 6–8 images
    };
  });

  /* =========================
     i18n dictionary
  ========================= */
  const i18n = {
    es: {
      skipToContent: "Saltar al contenido",
      brandSub: "GENERAL SERVICE",
      navHome: "Inicio",
      navAbout: "Nosotros",
      navServices: "Servicios",
      navProjects: "Proyectos",
      navProcess: "Proceso",
      navContact: "Contacto",
      langToggleCaption: "ES / EN",
      headerQuoteBtn: "Solicitar Cotización",

      heroKicker: "Constructora & Contratista General",
      heroTitle: "Construimos, remodelamos y entregamos con calidad profesional",
      heroSubtitle: "Soluciones integrales para hogares y negocios en EE. UU. — atención bilingüe, cronogramas claros y acabados premium.",
      heroCta: "Solicitar Cotización",
      heroSecondary: "Ver Servicios",
      statYears: "Años de experiencia",
      statProjects: "Proyectos completados",
      statRating: "Valoración promedio",

      aboutTitle: "Nosotros",
      aboutSubtitle: "Construcción responsable, comunicación clara y resultados que se notan.",
      aboutWhoTitle: "¿Quiénes somos?",
      aboutWhoText:
        "En L&B General Service ofrecemos servicios de construcción y contratación general para clientes residenciales y comerciales en Estados Unidos. Trabajamos con un enfoque práctico: escuchamos tu necesidad, proponemos soluciones realistas, y ejecutamos con estándares profesionales. Nuestro equipo combina planificación, seguridad y control de calidad para entregar obras durables y con excelente acabado. Somos bilingües (ES/EN) para que la comunicación sea simple y directa; además, cuidamos el presupuesto y el calendario con transparencia, evitando sorpresas. Nos gusta construir relaciones a largo plazo basadas en confianza, orden y resultados medibles.",
      aboutYears: "Años de experiencia",
      aboutBilingual: "Atención bilingüe",
      aboutQA: "Control de calidad",

      missionTitle: "Misión",
      missionText:
        "Entregar proyectos de construcción y remodelación con seguridad, precisión y un servicio al cliente excepcional, manteniendo una comunicación transparente de principio a fin.",
      valuesTitle: "Valores",
      value1: "Calidad verificable y acabados limpios",
      value2: "Responsabilidad y puntualidad",
      value3: "Comunicación clara (ES/EN)",
      value4: "Seguridad en obra y orden",
      value5: "Respeto por tu hogar y tu inversión",
      teamRole1: "Project Manager",
      teamDesc1: "Planificación, cronograma y coordinación",
      teamRole2: "Field Supervisor",
      teamDesc2: "Calidad, seguridad y ejecución",
      teamRole3: "Skilled Crew",
      teamDesc3: "Especialistas por rubro y acabado",

      servicesTitle: "Servicios",
      servicesSubtitle: "Selecciona un servicio para ver detalles y galería de imágenes.",

      projectsTitle: "Proyectos",
      projectsSubtitle: "16 ejemplos de proyectos (demo). Haz clic para abrir el detalle con galería.",

      processTitle: "Proceso",
      processSubtitle: "Un flujo claro para evitar sorpresas y asegurar entregas consistentes.",
      step1Title: "Consulta inicial",
      step1Text: "Entendemos tu necesidad, medimos y recopilamos requisitos técnicos.",
      step2Title: "Diseño y presupuesto",
      step2Text: "Propuesta detallada con alcance, materiales, tiempos y costos.",
      step3Title: "Aprobación y planificación",
      step3Text: "Definimos cronograma, permisos (si aplica) y fecha de inicio.",
      step4Title: "Construcción / ejecución",
      step4Text: "Trabajo por fases con supervisión, limpieza y control de calidad.",
      step5Title: "Entrega final",
      step5Text: "Revisión final, checklist y entrega con recomendaciones de mantenimiento.",

      contactTitle: "Contacto",
      contactSubtitle: "Cuéntanos tu proyecto y te respondemos rápido por email o WhatsApp.",
      formName: "Nombre completo",
      formEmail: "Email",
      formPhone: "Teléfono",
      formService: "Servicio solicitado",
      formMessage: "Mensaje / Descripción del proyecto",
      formSubmit: "Enviar por WhatsApp",
      formCopy: "Copiar mensaje",
      formHint: "El botón generará un mensaje prellenado para WhatsApp. No guardamos datos en servidores (sitio estático).",
      contactInfoTitle: "Información",
      contactAddressTitle: "Dirección",
      contactAddress: "1234 Main St, Suite 200, Orlando, FL 32801",
      contactPhoneTitle: "Teléfono",
      contactEmailTitle: "Email",
      contactWhatsappBtn: "Abrir WhatsApp",

      footerTagline: "Construcción y remodelación con estándares profesionales.",
      footerRights: "Todos los derechos reservados.",
      fabText: "WhatsApp",

      modalGalleryTitle: "Galería",
      modalDetailsTitle: "Detalles",
      viewDetails: "Ver detalles",
      morePhotos: "Más fotos",

      validationRequired: "Este campo es obligatorio.",
      validationEmail: "Ingresa un email válido.",
      validationPhone: "Ingresa un teléfono válido.",
      copied: "Mensaje copiado al portapapeles.",
      opening: "Abriendo WhatsApp…",
    },

    en: {
      skipToContent: "Skip to content",
      brandSub: "GENERAL SERVICE",
      navHome: "Home",
      navAbout: "About",
      navServices: "Services",
      navProjects: "Projects",
      navProcess: "Process",
      navContact: "Contact",
      langToggleCaption: "ES / EN",
      headerQuoteBtn: "Request a Quote",

      heroKicker: "Construction & General Contractor",
      heroTitle: "We build, remodel, and deliver with professional quality",
      heroSubtitle: "End‑to‑end solutions for homes and businesses in the U.S. — bilingual support, clear timelines, premium finishes.",
      heroCta: "Request a Quote",
      heroSecondary: "View Services",
      statYears: "Years of experience",
      statProjects: "Completed projects",
      statRating: "Average rating",

      aboutTitle: "About",
      aboutSubtitle: "Responsible construction, clear communication, and results you can see.",
      aboutWhoTitle: "Who we are",
      aboutWhoText:
        "At L&B General Service we provide construction and general contracting for residential and commercial clients across the United States. Our approach is practical: we listen, propose realistic solutions, and execute to professional standards. Our team combines planning, safety, and quality control to deliver durable work with excellent finishes. We operate bilingually (ES/EN) so communication stays simple and direct; we also protect your budget and schedule with transparency to avoid surprises. We value long‑term relationships built on trust, order, and measurable results.",
      aboutYears: "Years of experience",
      aboutBilingual: "Bilingual service",
      aboutQA: "Quality control",

      missionTitle: "Mission",
      missionText:
        "Deliver construction and remodeling projects with safety, precision, and exceptional customer service, maintaining transparent communication from start to finish.",
      valuesTitle: "Values",
      value1: "Verifiable quality and clean finishes",
      value2: "Accountability and on‑time delivery",
      value3: "Clear communication (ES/EN)",
      value4: "Jobsite safety and organization",
      value5: "Respect for your home and investment",
      teamRole1: "Project Manager",
      teamDesc1: "Planning, schedule, coordination",
      teamRole2: "Field Supervisor",
      teamDesc2: "Quality, safety, execution",
      teamRole3: "Skilled Crew",
      teamDesc3: "Trade specialists and finish work",

      servicesTitle: "Services",
      servicesSubtitle: "Select a service to view details and an image gallery.",

      projectsTitle: "Projects",
      projectsSubtitle: "16 sample projects (demo). Click to open details with gallery.",

      processTitle: "Process",
      processSubtitle: "A clear workflow to avoid surprises and ensure consistent delivery.",
      step1Title: "Initial consultation",
      step1Text: "We understand your goals, measure, and gather technical requirements.",
      step2Title: "Design & estimate",
      step2Text: "Detailed proposal: scope, materials, timeline, and cost.",
      step3Title: "Approval & planning",
      step3Text: "Schedule, permits (if needed), and start date.",
      step4Title: "Build / execution",
      step4Text: "Phased work with supervision, cleanliness, and quality checks.",
      step5Title: "Final handoff",
      step5Text: "Final walkthrough, checklist, and maintenance recommendations.",

      contactTitle: "Contact",
      contactSubtitle: "Tell us about your project—we’ll respond quickly via email or WhatsApp.",
      formName: "Full name",
      formEmail: "Email",
      formPhone: "Phone",
      formService: "Requested service",
      formMessage: "Message / Project details",
      formSubmit: "Send via WhatsApp",
      formCopy: "Copy message",
      formHint: "This button generates a prefilled WhatsApp message. We don't store data on servers (static site).",
      contactInfoTitle: "Info",
      contactAddressTitle: "Address",
      contactAddress: "1234 Main St, Suite 200, Orlando, FL 32801",
      contactPhoneTitle: "Phone",
      contactEmailTitle: "Email",
      contactWhatsappBtn: "Open WhatsApp",

      footerTagline: "Construction and remodeling to professional standards.",
      footerRights: "All rights reserved.",
      fabText: "WhatsApp",

      modalGalleryTitle: "Gallery",
      modalDetailsTitle: "Details",
      viewDetails: "View details",
      morePhotos: "More photos",

      validationRequired: "This field is required.",
      validationEmail: "Enter a valid email.",
      validationPhone: "Enter a valid phone number.",
      copied: "Message copied to clipboard.",
      opening: "Opening WhatsApp…",
    }
  };

  /* =========================
     State
  ========================= */
  const storageKey = "lb_lang";
  let lang = (localStorage.getItem(storageKey) || DEFAULT_LANG).toLowerCase();
  if (lang !== "es" && lang !== "en") lang = DEFAULT_LANG;

  /* =========================
     Helpers
  ========================= */
  const qs = (sel, root = document) => root.querySelector(sel);
  const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function setHtmlLang(code) {
    docEl.setAttribute("lang", code === "en" ? "en" : "es");
  }

  function t(key) {
    return (i18n[lang] && i18n[lang][key]) || (i18n.es[key] ?? "");
  }

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.style.display = "block";
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(() => {
      toast.style.display = "none";
    }, 2400);
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (m) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    }[m]));
  }

  /* =========================
     Language application
  ========================= */
  function applyLanguage() {
    setHtmlLang(lang);
    if (langPill) langPill.textContent = lang.toUpperCase();

    // Update static text nodes with data-i18n
    qsa("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const value = t(key);
      // Some nodes contain html entities; use textContent to stay safe.
      el.textContent = value;
    });

    // Re-render dynamic sections
    renderServices();
    renderProjects();
    populateServiceSelect();

    // Update direct WhatsApp links
    const defaultText = lang === "es"
      ? "Hola, me gustaría solicitar una cotización."
      : "Hi, I'd like to request a quote.";
    const url = buildWhatsappUrl(defaultText);
    if (fabWhatsapp) fabWhatsapp.href = url;
    if (directWhatsapp) directWhatsapp.href = url;
  }

  /* =========================
     Render Services
  ========================= */
  function renderServices() {
    if (!servicesGrid) return;
    servicesGrid.innerHTML = services.map((s, idx) => {
      const title = s.title[lang];
      const short = s.short[lang];
      const badge = lang === "es" ? "Servicio" : "Service";
      return `
        <article class="card" role="button" tabindex="0" aria-label="${escapeHtml(title)}" data-open="service" data-id="${s.id}">
          <div class="card-media">
            <img src="${s.img}" alt="${escapeHtml(title)}" loading="lazy" />
          </div>
          <div class="card-body">
            <div class="card-eyebrow">
              <span class="badge">${badge}</span>
              <span class="icon-chip" aria-hidden="true"><img class="icon" src="${s.icon}" alt="" /></span>
              <span>#${idx + 1}</span>
            </div>
            <h3 class="card-title-sm">${escapeHtml(title)}</h3>
            <p class="card-desc">${escapeHtml(short)}</p>
            <div class="card-cta">
              <span>${escapeHtml(t("viewDetails"))}</span>
              <span class="arrow" aria-hidden="true">→</span>
            </div>
          </div>
        </article>
      `;
    }).join("");
  }

  /* =========================
     Render Projects
  ========================= */
  function renderProjects() {
    if (!projectsGrid) return;
    projectsGrid.innerHTML = projects.map((p) => {
      const title = p.title[lang];
      return `
        <article class="card" role="button" tabindex="0" aria-label="${escapeHtml(title)}" data-open="project" data-id="${p.id}">
          <div class="card-media">
            <img src="${p.img}" alt="${escapeHtml(title)}" loading="lazy" />
          </div>
          <div class="card-body">
            <div class="card-eyebrow">
              <span class="badge">${lang === "es" ? "Proyecto" : "Project"}</span>
              <span class="icon-chip" aria-hidden="true"><img class="icon" src="assets/icons/icon-photo.svg" alt="" /></span>
              <span>${escapeHtml(t("morePhotos"))}</span>
            </div>
            <h3 class="card-title-sm">${escapeHtml(title)}</h3>
            <p class="card-desc">${escapeHtml(p.desc[lang])}</p>
            <div class="card-cta">
              <span>${escapeHtml(t("viewDetails"))}</span>
              <span class="arrow" aria-hidden="true">→</span>
            </div>
          </div>
        </article>
      `;
    }).join("");
  }

  /* =========================
     Modal
  ========================= */
  function openModal(html) {
    if (!modal) return;
    modalBody.innerHTML = html;
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    setTimeout(() => modalClose?.focus(), 50);
  }

  function closeModal() {
    if (!modal) return;
    modal.setAttribute("aria-hidden", "true");
    modalBody.innerHTML = "";
    const lbOpen = lightbox && lightbox.getAttribute("aria-hidden") === "false";
    if (!lbOpen) document.body.classList.remove("no-scroll");
  }

  function modalServiceTemplate(service) {
    const title = service.title[lang];
    const short = service.long[lang];
    const gallery = service.gallery.map((src) => `<img class="zoomable" src="${src}" data-zoom-src="${src}" alt="${escapeHtml(title)} photo" loading="lazy" />`).join("");
    return `
      <div class="modal-head">
        <img src="${service.img}" alt="${escapeHtml(title)}" />
        <div>
          <h2 class="modal-title">${escapeHtml(title)}</h2>
          <p class="modal-desc">${escapeHtml(short)}</p>
          <div class="modal-meta" aria-label="${escapeHtml(t("modalDetailsTitle"))}">
            <span class="pill">${escapeHtml(lang === "es" ? "Respuesta rápida" : "Fast response")}</span>
            <span class="pill">${escapeHtml(lang === "es" ? "Acabados premium" : "Premium finishes")}</span>
            <span class="pill">${escapeHtml(lang === "es" ? "ES/EN" : "ES/EN")}</span>
          </div>
        </div>
      </div>
      <h3 class="card-title" style="margin-top:16px;">${escapeHtml(t("modalGalleryTitle"))}</h3>
      <div class="gallery">${gallery}</div>
    `;
  }

  function modalProjectTemplate(project) {
    const title = project.title[lang];
    const desc = project.desc[lang];
    const d = project.details[lang];
    const gallery = project.gallery.map((src) => `<img class="zoomable" src="${src}" data-zoom-src="${src}" alt="${escapeHtml(title)} photo" loading="lazy" />`).join("");
    return `
      <div class="modal-head">
        <img src="${project.img}" alt="${escapeHtml(title)}" />
        <div>
          <h2 class="modal-title">${escapeHtml(title)}</h2>
          <p class="modal-desc">${escapeHtml(desc)}</p>
          <div class="modal-meta" aria-label="${escapeHtml(t("modalDetailsTitle"))}">
            <span class="pill">${escapeHtml(lang === "es" ? "Duración: " : "Duration: ")}${escapeHtml(d.duration)}</span>
            <span class="pill">${escapeHtml(lang === "es" ? "Tipo: " : "Type: ")}${escapeHtml(d.type)}</span>
            <span class="pill">${escapeHtml(lang === "es" ? "Ubicación: " : "Location: ")}${escapeHtml(d.location)}</span>
          </div>
        </div>
      </div>
      <h3 class="card-title" style="margin-top:16px;">${escapeHtml(t("modalGalleryTitle"))}</h3>
      <div class="gallery">${gallery}</div>
    `;
  }

  function handleCardActivate(target) {
    const type = target.getAttribute("data-open");
    const id = target.getAttribute("data-id");
    if (!type || !id) return;

    if (type === "service") {
      const s = services.find(x => x.id === id);
      if (!s) return;
      openModal(modalServiceTemplate(s));
    }

    if (type === "project") {
      const p = projects.find(x => x.id === id);
      if (!p) return;
      openModal(modalProjectTemplate(p));
    }
  }

  /* =========================
     Smooth scroll with offset
  ========================= */
  function scrollToHash(hash) {
    const id = (hash || "").replace("#", "");
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;

    const headerH = header ? header.getBoundingClientRect().height : 0;
    const y = el.getBoundingClientRect().top + window.pageYOffset - headerH - 10;

    window.scrollTo({ top: y, behavior: "smooth" });
  }

  function setActiveNav() {
    const links = qsa(".nav-link");
    const sections = ["home","about","services","projects","process","contact"]
      .map(id => document.getElementById(id))
      .filter(Boolean);

    const headerH = header ? header.getBoundingClientRect().height : 0;
    const y = window.scrollY + headerH + 24;

    let current = "home";
    for (const s of sections) {
      if (s.offsetTop <= y) current = s.id;
    }
    links.forEach(a => {
      const href = a.getAttribute("href") || "";
      a.classList.toggle("active", href === `#${current}`);
    });
  }

  /* =========================
     Mobile nav
  ========================= */
  function toggleNav(open) {
    const isOpen = typeof open === "boolean" ? open : !document.body.classList.contains("nav-open");
    document.body.classList.toggle("nav-open", isOpen);
    navToggle?.setAttribute("aria-expanded", String(isOpen));
  }

  /* =========================
     Form / WhatsApp
  ========================= */
  function populateServiceSelect() {
    if (!serviceSelect) return;
    const placeholder = lang === "es" ? "Selecciona un servicio…" : "Select a service…";
    serviceSelect.innerHTML = `
      <option value="" disabled selected>${escapeHtml(placeholder)}</option>
      ${services.map(s => `<option value="${escapeHtml(s.title[lang])}">${escapeHtml(s.title[lang])}</option>`).join("")}
    `;
  }

  function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function validatePhone(value) {
    // simple: digits, spaces, +, -, parentheses, min 7 digits
    const digits = String(value).replace(/\D/g, "");
    return digits.length >= 7;
  }

  function setError(fieldName, message) {
    const el = qs(`[data-error-for="${fieldName}"]`);
    if (el) el.textContent = message || "";
  }

  function clearErrors() {
    qsa(".error").forEach(e => e.textContent = "");
  }

  function buildMessage({ name, service, message, email, phone }) {
    if (lang === "es") {
      return `Hola, mi nombre es ${name}, estoy interesado en ${service}.\n\nDetalles: ${message}\n\nContacto: ${email} | ${phone}`;
    }
    return `Hi, my name is ${name}. I'm interested in ${service}.\n\nDetails: ${message}\n\nContact: ${email} | ${phone}`;
  }

  function buildWhatsappUrl(text) {
    const encoded = encodeURIComponent(text);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
  }

  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      showToast(t("copied"));
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      showToast(t("copied"));
    }
  }


  /* =========================
     Lightbox (zoom + pan)
  ========================= */
  let lbScale = 1;
  let lbTx = 0;
  let lbTy = 0;
  let lbDragging = false;
  let lbStartX = 0;
  let lbStartY = 0;

  function applyLightboxTransform() {
    if (!lightboxImg) return;
    lightboxImg.style.transform = `translate(-50%, -50%) translate(${lbTx}px, ${lbTy}px) scale(${lbScale})`;
  }

  function setScale(next) {
    lbScale = Math.min(4, Math.max(1, next));
    if (lbScale === 1) { lbTx = 0; lbTy = 0; }
    applyLightboxTransform();
  }

  function openLightbox(src, title) {
    if (!lightbox || !lightboxImg) return;
    lbScale = 1; lbTx = 0; lbTy = 0;
    lightboxImg.classList.remove("grabbing");
    lightboxImg.src = src;
    lightboxImg.alt = title || "Image";
    if (lightboxTitle) lightboxTitle.textContent = title || "Image";
    if (lightboxHint) {
      lightboxHint.textContent = (lang === "es")
        ? "Usa rueda/trackpad para zoom. Arrastra para mover."
        : "Wheel/trackpad to zoom. Drag to pan.";
    }
    applyLightboxTransform();
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    setTimeout(() => lightboxClose?.focus(), 30);
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.setAttribute("aria-hidden", "true");
    if (lightboxImg) lightboxImg.src = "";
    const modalOpen = modal && modal.getAttribute("aria-hidden") === "false";
    if (!modalOpen) document.body.classList.remove("no-scroll");
  }

  function zoomBy(delta) { setScale(lbScale + delta); }

  /* =========================
     Events
  ========================= */
  function onScroll() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 10);
    setActiveNav();
  }

  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (a) {
      const hash = a.getAttribute("href");
      const isNavLink = a.classList.contains("nav-link") || a.closest(".footer-links");
      if (hash && hash.startsWith("#") && hash.length > 1) {
        e.preventDefault();
        scrollToHash(hash);
        if (document.body.classList.contains("nav-open") && isNavLink) toggleNav(false);
      }
    }

    // Cards open
    const card = e.target.closest("[data-open]");
    if (card) {
      handleCardActivate(card);
    }

    // Modal close via backdrop
    if (e.target && e.target.getAttribute && e.target.getAttribute("data-close-modal") === "true") {
      closeModal();
    }
    // Zoomable images (open lightbox)
    const zoomImg = e.target.closest && e.target.closest("img.zoomable");
    if (zoomImg && zoomImg.getAttribute("data-zoom-src")) {
      const src = zoomImg.getAttribute("data-zoom-src");
      const title = zoomImg.getAttribute("alt") || "Image";
      openLightbox(src, title);
      return;
    }

    // Lightbox close via backdrop
    if (e.target && e.target.getAttribute && e.target.getAttribute("data-close-lightbox") === "true") {
      closeLightbox();
      return;
    }

  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal?.getAttribute("aria-hidden") === "false") {
      closeModal();
    }
    // Keyboard activation for cards
    if ((e.key === "Enter" || e.key === " ") && document.activeElement?.matches?.("[data-open]")) {
      e.preventDefault();
      handleCardActivate(document.activeElement);
    }
  });

  modalClose?.addEventListener("click", closeModal);

  lightboxClose?.addEventListener("click", closeLightbox);
  zoomInBtn?.addEventListener("click", () => zoomBy(0.25));
  zoomOutBtn?.addEventListener("click", () => zoomBy(-0.25));

  // Lightbox interactions: wheel zoom + drag pan
  lightboxCanvas?.addEventListener("wheel", (e) => {
    if (lightbox?.getAttribute("aria-hidden") !== "false") return;
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.18 : 0.18;
    setScale(lbScale + delta);
  }, { passive: false });

  lightboxCanvas?.addEventListener("pointerdown", (e) => {
    if (lightbox?.getAttribute("aria-hidden") !== "false") return;
    if (lbScale <= 1) return;
    lbDragging = true;
    lbStartX = e.clientX;
    lbStartY = e.clientY;
    lightboxImg?.classList.add("grabbing");
    lightboxCanvas.setPointerCapture(e.pointerId);
  });

  lightboxCanvas?.addEventListener("pointermove", (e) => {
    if (!lbDragging) return;
    const dx = e.clientX - lbStartX;
    const dy = e.clientY - lbStartY;
    lbStartX = e.clientX;
    lbStartY = e.clientY;
    lbTx += dx;
    lbTy += dy;
    applyLightboxTransform();
  });

  lightboxCanvas?.addEventListener("pointerup", () => {
    lbDragging = false;
    lightboxImg?.classList.remove("grabbing");
  });

  lightboxCanvas?.addEventListener("pointercancel", () => {
    lbDragging = false;
    lightboxImg?.classList.remove("grabbing");
  });

  navToggle?.addEventListener("click", () => toggleNav());

  // Close mobile nav if resizing to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 980) toggleNav(false);
  });

  // Language toggle
  langToggle?.addEventListener("click", () => {
    lang = (lang === "es") ? "en" : "es";
    localStorage.setItem(storageKey, lang);
    applyLanguage();
  });

  // Form submit => open WhatsApp
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrors();

    const name = qs("#fullName")?.value.trim() || "";
    const email = qs("#email")?.value.trim() || "";
    const phone = qs("#phone")?.value.trim() || "";
    const service = qs("#service")?.value || "";
    const message = qs("#message")?.value.trim() || "";

    let ok = true;
    if (!name) { setError("fullName", t("validationRequired")); ok = false; }
    if (!email) { setError("email", t("validationRequired")); ok = false; }
    else if (!validateEmail(email)) { setError("email", t("validationEmail")); ok = false; }

    if (!phone) { setError("phone", t("validationRequired")); ok = false; }
    else if (!validatePhone(phone)) { setError("phone", t("validationPhone")); ok = false; }

    if (!service) { setError("service", t("validationRequired")); ok = false; }
    if (!message) { setError("message", t("validationRequired")); ok = false; }

    if (!ok) return;

    const msg = buildMessage({ name, service, message, email, phone });
    const url = buildWhatsappUrl(msg);

    showToast(t("opening"));
    window.open(url, "_blank", "noopener,noreferrer");
  });

  copyBtn?.addEventListener("click", () => {
    clearErrors();

    const name = qs("#fullName")?.value.trim() || "";
    const email = qs("#email")?.value.trim() || "";
    const phone = qs("#phone")?.value.trim() || "";
    const service = qs("#service")?.value || "";
    const message = qs("#message")?.value.trim() || "";

    // allow partial copy; but guide the user
    const msg = buildMessage({
      name: name || (lang === "es" ? "NOMBRE" : "NAME"),
      service: service || (lang === "es" ? "SERVICIO" : "SERVICE"),
      message: message || (lang === "es" ? "MENSAJE" : "MESSAGE"),
      email: email || "email@example.com",
      phone: phone || "000-000-0000"
    });
    copyToClipboard(msg);
  });

  /* =========================
     Init
  ========================= */
  function init() {
    yearEl && (yearEl.textContent = String(new Date().getFullYear()));
    applyLanguage();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // If loaded with hash, do offset scroll
    if (location.hash && location.hash.length > 1) {
      setTimeout(() => scrollToHash(location.hash), 60);
    }
  }

  init();
})();
