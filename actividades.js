// Archivo: activities.js

import { activitiesData } from "./assets/datos/actividades.js";

// --- Lógica de la Sección de Actividades (Página Completa) ---
const activitiesContainer = document.getElementById(
  "activities-container-full"
);
let currentActivityImages = [];
let currentImageIndex = 0;

function renderAllActivities() {
  activitiesContainer.innerHTML = "";
  // Mostramos TODAS las actividades
  activitiesData.forEach((activity, index) => {
    const isEven = index % 2 === 0;
    const orderClass1 = isEven ? "order-lg-1" : "order-lg-2";
    const orderClass2 = isEven ? "order-lg-2" : "order-lg-1";

    const activityHtml = `
      <div class="row activity-item mb-5 align-items-center" data-aos="fade-up" data-aos-duration="800">
        <div class="col-lg-6 col-md-12 ${orderClass1}">
          <div class="activity-content">
            <h3 class="activity-title">${activity.title}</h3>
            <p class="activity-description">${activity.description}</p>
          </div>
        </div>
        <div class="col-lg-6 col-md-12 ${orderClass2}">
          <div class="activity-gallery">
            <div class="single-image-container">
              <img
                src="${activity.images[0]}"
                alt="Imagen de ${activity.title}"
                class="img-fluid activity-img"
                data-activity-id="${activity.id}"
                data-bs-toggle="modal"
                data-bs-target="#imageModal"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    `;
    activitiesContainer.innerHTML += activityHtml;
  });

  activitiesContainer.addEventListener("click", (event) => {
    const imgElement = event.target.closest(".activity-img");
    if (imgElement) {
      const activityId = imgElement.dataset.activityId;
      const activityData = activitiesData.find((a) => a.id === activityId);
      if (activityData) {
        currentActivityImages = activityData.images;
        currentImageIndex = 0;
        updateImageModal();
      }
    }
  });
}

// --- Lógica del Modal de Galería ---
const modalImage = document.getElementById("modalImage");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function updateImageModal() {
  modalImage.src = currentActivityImages[currentImageIndex];
  modalImage.alt = `Imagen ${currentImageIndex + 1} de ${
    currentActivityImages.length
  }`;

  const showNavButtons = currentActivityImages.length > 1;
  prevBtn.style.display = showNavButtons ? "block" : "none";
  nextBtn.style.display = showNavButtons ? "block" : "none";
}

if (prevBtn && nextBtn) {
  prevBtn.addEventListener("click", () => {
    currentImageIndex =
      (currentImageIndex - 1 + currentActivityImages.length) %
      currentActivityImages.length;
    updateImageModal();
  });

  nextBtn.addEventListener("click", () => {
    currentImageIndex = (currentImageIndex + 1) % currentActivityImages.length;
    updateImageModal();
  });
}

// --- Inicialización ---
document.addEventListener("DOMContentLoaded", () => {
  renderAllActivities(); // Renderiza todas las actividades en esta página

  AOS.init({
    duration: 800,
    once: true,
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const navBarCollapse = document.getElementById("navbarNav");
  const navBarToggler = document.querySelector(".navbar-toggler");

  document.addEventListener("click", function (event) {
    // Verifica si el menú está abierto
    const isMenuOpen = navBarCollapse.classList.contains("show");

    // Verifica si el clic no fue en el menú ni en el botón de hamburguesa
    const isClickInsideMenu = navBarCollapse.contains(event.target);
    const isClickOnToggler = navBarToggler.contains(event.target);

    if (isMenuOpen && !isClickInsideMenu && !isClickOnToggler) {
      // Cierra el menú quitando la clase 'show'
      navBarCollapse.classList.remove("show");
      // Actualiza el atributo aria-expanded para accesibilidad
      navBarToggler.setAttribute("aria-expanded", "false");
    }
  });
});
