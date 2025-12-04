
document.addEventListener("DOMContentLoaded", () => {
  const langToggle = document.querySelector("[data-lang-toggle]");
  let currentLang = "es";

  const translations = {
    "nav.home": { es: "Inicio", en: "Home" },
    "nav.about": { es: "Nosotros", en: "About" },
    "nav.services": { es: "Servicios", en: "Services" },
    "nav.projects": { es: "Proyectos", en: "Projects" },
    "nav.process": { es: "Proceso", en: "Process" },
    "nav.contact": { es: "Contacto", en: "Contact" },

    "hero.badge": { es: "Construcción y remodelación en New York", en: "Construction & remodeling in New York" },
    "hero.title": { es: "L & B General Service", en: "L & B General Service" },
    "hero.subtitle": { es: "Construyendo y renovando hogares para la comunidad desde 2015.", en: "Building and remodeling homes for the community since 2015." },
    "hero.tagline": { es: "Especialistas en remodelaciones, adiciones y construcción residencial.", en: "Specialists in remodeling, additions and residential construction." },
    "hero.cta.primary": { es: "Ver proyectos", en: "View projects" },
    "hero.cta.secondary": { es: "Solicitar cotización", en: "Request a quote" },

    "about.title": { es: "Sobre L & B General Service", en: "About L & B General Service" },
    "about.p1": {
      es: "L & B General Service es una empresa de remodelación y construcción fundada en 2015 en New York. Nuestro enfoque está en hogares residenciales, desde pequeñas renovaciones hasta proyectos completos de vivienda.",
      en: "L & B General Service is a remodeling and construction company founded in 2015 in New York. We focus on residential homes, from small renovations to full-house projects."
    },
    "about.p2": {
      es: "Trabajamos principalmente con la comunidad hispana, ofreciendo atención en español e inglés, comunicación clara y acompañamiento en cada etapa del proyecto.",
      en: "We mainly work with the Hispanic community, offering service in Spanish and English, clear communication and support at every stage of the project."
    },
    "about.since": {
      es: "Desde 2015 · Más de 10 años de experiencia en construcción y remodelación residencial.",
      en: "Since 2015 · Over 10 years of experience in residential construction and remodeling."
    },

    "services.title": { es: "Servicios", en: "Services" },
    "services.badge": { es: "Todo en un solo equipo", en: "Everything in one crew" },

    "services.item1.title": { es: "Remodelaciones de casas", en: "Home remodeling" },
    "services.item1.desc": {
      es: "Cocinas, baños, salas y todos los espacios interiores del hogar.",
      en: "Kitchens, bathrooms, living rooms and all indoor spaces."
    },
    "services.item2.title": { es: "Construcción desde cero", en: "New construction" },
    "services.item2.desc": {
      es: "Viviendas nuevas, estructura y acabados listos para habitar.",
      en: "New homes, structure and finishes ready to move in."
    },
    "services.item3.title": { es: "Ampliaciones / adiciones", en: "Additions & extensions" },
    "services.item3.desc": {
      es: "Segundos pisos, cuartos adicionales y ampliación de áreas existentes.",
      en: "Second floors, extra rooms and enlargement of existing areas."
    },
    "services.item4.title": { es: "Framing / carpintería", en: "Framing & carpentry" },
    "services.item4.desc": {
      es: "Estructuras de madera, refuerzos y detalles de carpintería.",
      en: "Wood structures, reinforcements and carpentry details."
    },
    "services.item5.title": { es: "Drywall, pintura, pisos", en: "Drywall, painting, flooring" },
    "services.item5.desc": {
      es: "Acabados interiores limpios, modernos y duraderos.",
      en: "Clean, modern and durable interior finishes."
    },
    "services.item6.title": { es: "Instalaciones sanitarias", en: "Plumbing" },
    "services.item6.desc": {
      es: "Reubicación y renovación de líneas de agua y desagüe.",
      en: "Relocation and renovation of water and drain lines."
    },
    "services.item7.title": { es: "Electricidad", en: "Electrical" },
    "services.item7.desc": {
      es: "Actualización de cableado, tableros y puntos de luz.",
      en: "Update of wiring, panels and lighting points."
    },
    "services.item8.title": { es: "Roofing", en: "Roofing" },
    "services.item8.desc": {
      es: "Reparación y reemplazo de techos residenciales.",
      en: "Repair and replacement of residential roofs."
    },
    "services.item9.title": { es: "Concrete work", en: "Concrete work" },
    "services.item9.desc": {
      es: "Sidewalks, driveways, patios y losas.",
      en: "Sidewalks, driveways, patios and slabs."
    },
    "services.item10.title": { es: "Landscaping", en: "Landscaping" },
    "services.item10.desc": {
      es: "Terminaciones exteriores, áreas verdes y detalles de jardín.",
      en: "Outdoor finishes, green areas and garden details."
    },

    "badges.fast": { es: "Trabajo rápido", en: "Fast turnaround" },
    "badges.quality": { es: "Calidad certificada", en: "Certified quality" },
    "badges.warranty": { es: "Garantía en el servicio", en: "Service warranty" },

    "projects.badge": { es: "Portafolio real", en: "Real portfolio" },
    "projects.title": { es: "Proyectos", en: "Projects" },
    "projects.subtitle": {
      es: "Una selección de proyectos residenciales realizados para clientes en New York y alrededores.",
      en: "A selection of residential projects completed for clients in New York and surrounding areas."
    },

    "process.badge": { es: "Así trabajamos", en: "How we work" },
    "process.title": { es: "Nuestro proceso", en: "Our process" },
    "process.step1.title": { es: "1. Visita y evaluación", en: "1. Visit & evaluation" },
    "process.step1.desc": {
      es: "Revisamos el espacio, escuchamos tus ideas y tomamos medidas.",
      en: "We review the space, listen to your ideas and take measurements."
    },
    "process.step2.title": { es: "2. Propuesta clara", en: "2. Clear proposal" },
    "process.step2.desc": {
      es: "Presentamos un presupuesto detallado con tiempos, etapas y materiales.",
      en: "We present a detailed estimate with timeline, stages and materials."
    },
    "process.step3.title": { es: "3. Ejecución ordenada", en: "3. Ordered execution" },
    "process.step3.desc": {
      es: "Organizamos el trabajo por fases para reducir el impacto en tu hogar.",
      en: "We organize the work in phases to reduce impact on your home."
    },
    "process.step4.title": { es: "4. Entrega y seguimiento", en: "4. Delivery & follow-up" },
    "process.step4.desc": {
      es: "Entregamos limpio, revisamos juntos y dejamos la obra lista para disfrutar.",
      en: "We deliver clean, review together and leave everything ready to enjoy."
    },

    "contact.badge": { es: "Hablemos de tu proyecto", en: "Let’s talk about your project" },
    "contact.title": { es: "Contacto", en: "Contact" },
    "contact.subtitle": {
      es: "Envíanos los detalles de tu proyecto y te responderemos a la brevedad.",
      en: "Send us the details of your project and we’ll get back to you shortly."
    },
    "contact.form.name": { es: "Nombre completo", en: "Full name" },
    "contact.form.phone": { es: "Teléfono", en: "Phone" },
    "contact.form.email": { es: "Correo electrónico", en: "Email" },
    "contact.form.message": { es: "Cuéntanos sobre tu proyecto...", en: "Tell us about your project..." },
    "contact.form.submit": { es: "Enviar mensaje", en: "Send message" },

    "footer.rights": {
      es: "© 2015–" + new Date().getFullYear() + " L & B General Service. Todos los derechos reservados.",
      en: "© 2015–" + new Date().getFullYear() + " L & B General Service. All rights reserved."
    },
    "footer.made": {
      es: "Empresa de construcción y remodelación residencial desde 2015.",
      en: "Residential construction and remodeling company since 2015."
    }
  };

  function applyLanguage(lang) {
    currentLang = lang;
    document.documentElement.setAttribute("lang", lang === "es" ? "es" : "en");
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      const t = translations[key];
      if (t) {
        el.textContent = t[lang];
      }
    });
    if (langToggle) {
      langToggle.textContent = lang === "es" ? "ES / EN" : "EN / ES";
    }
  }

  if (langToggle) {
    langToggle.addEventListener("click", () => {
      applyLanguage(currentLang === "es" ? "en" : "es");
    });
  }

  document.querySelectorAll("[data-scroll-to]").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href") || link.dataset.scrollTo;
      const id = targetId.replace("#", "");
      const target = document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  const projectCards = document.querySelectorAll("[data-project-card]");
  const modal = document.querySelector("[data-gallery-modal]");
  const modalOverlay = document.querySelector("[data-gallery-overlay]");
  const modalClose = document.querySelector("[data-gallery-close]");
  const modalTitle = document.querySelector("[data-gallery-title]");
  const modalImage = document.querySelector("[data-gallery-image]");
  const modalPrev = document.querySelector("[data-gallery-prev]");
  const modalNext = document.querySelector("[data-gallery-next]");
  const modalCounter = document.querySelector("[data-gallery-counter]");
  const modalThumbnails = document.querySelector("[data-gallery-thumbnails]");

  let currentProject = null;
  let currentIndex = 0;
  const galleries = {};

  document.querySelectorAll("[data-project-image]").forEach(img => {
    const pid = img.getAttribute("data-project-id");
    const idx = parseInt(img.getAttribute("data-project-index"), 10);
    if (!galleries[pid]) galleries[pid] = [];
    galleries[pid].push({ index: idx, src: img.getAttribute("src"), alt: img.getAttribute("alt") || "" });
  });

  function openModal(projectId, title) {
    currentProject = projectId;
    currentIndex = 0;
    if (!galleries[projectId]) return;
    modalTitle.textContent = title;
    renderThumbnails();
    showImage(0);
    document.body.classList.add("modal-open");
    modal.classList.add("is-visible");
    modalOverlay.classList.add("is-visible");
  }

  function closeModal() {
    document.body.classList.remove("modal-open");
    modal.classList.remove("is-visible");
    modalOverlay.classList.remove("is-visible");
  }

  function showImage(idx) {
    const gallery = galleries[currentProject];
    if (!gallery || gallery.length === 0) return;
    if (idx < 0) idx = gallery.length - 1;
    if (idx >= gallery.length) idx = 0;
    currentIndex = idx;
    const item = gallery[idx];
    modalImage.setAttribute("src", item.src);
    modalImage.setAttribute("alt", item.alt || modalTitle.textContent);
    modalCounter.textContent = (idx + 1) + " / " + gallery.length;
    modalThumbnails.querySelectorAll("button").forEach((btn, i) => {
      btn.classList.toggle("is-active", i === idx);
    });
  }

  function renderThumbnails() {
    modalThumbnails.innerHTML = "";
    const gallery = galleries[currentProject];
    if (!gallery) return;
    gallery.forEach((item, i) => {
      const btn = document.createElement("button");
      btn.className = "thumb";
      btn.type = "button";
      const img = document.createElement("img");
      img.src = item.src;
      img.alt = item.alt || modalTitle.textContent;
      btn.appendChild(img);
      btn.addEventListener("click", () => showImage(i));
      modalThumbnails.appendChild(btn);
    });
  }

  projectCards.forEach(card => {
    card.addEventListener("click", () => {
      const pid = card.getAttribute("data-project-card");
      const titleEl = card.querySelector("[data-project-title]");
      openModal(pid, (titleEl && titleEl.textContent) || "Proyecto");
    });
  });

  modalClose.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", closeModal);
  modalPrev.addEventListener("click", () => showImage(currentIndex - 1));
  modalNext.addEventListener("click", () => showImage(currentIndex + 1));
  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("is-visible")) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowLeft") showImage(currentIndex - 1);
    if (e.key === "ArrowRight") showImage(currentIndex + 1);
  });

  applyLanguage("es");
});


// === MOBILE MENU SLIDE-IN TOGGLE v6 ===
const hamb = document.getElementById("hamburger-btn");
const mobMenu = document.getElementById("mobile-menu");
const overlay = document.getElementById("mobile-overlay");

if(hamb){
  hamb.addEventListener("click", ()=>{
    mobMenu.classList.toggle("open");
    overlay.classList.toggle("active");
  });
}

if(overlay){
  overlay.addEventListener("click", ()=>{
    mobMenu.classList.remove("open");
    overlay.classList.remove("active");
  });
}

document.querySelectorAll("#mobile-menu a").forEach(a=>{
  a.addEventListener("click", ()=>{
    mobMenu.classList.remove("open");
    overlay.classList.remove("active");
  });
});



// === v7: Disable body scroll when gallery opens ===
const galleryModal = document.querySelector("[data-gallery-modal]");
const galleryOverlay = document.querySelector("[data-gallery-overlay]");

function disableScroll(){
  document.body.classList.add("no-scroll");
}
function enableScroll(){
  document.body.classList.remove("no-scroll");
}

// Hook into existing modal open / close
if(galleryModal){
  const observer = new MutationObserver(()=>{
    if(galleryModal.classList.contains("is-visible")){
        disableScroll();
    } else {
        enableScroll();
    }
  });
  observer.observe(galleryModal, { attributes: true });
}
