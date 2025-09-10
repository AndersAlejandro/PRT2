let indiceImagenActual = 0;
let imagenesActuales = [];

const fotosActividades = {
  actividad1: [
    "assets/img/1000219230.jpg",
    "assets/img/1000219230.jpg", 
    "assets/img/1000219230.jpg",
    "assets/img/1000219230.jpg"
  ],
  actividad2: [
    "assets/img/1000219230.jpg",
    "assets/img/1000219230.jpg",
    "assets/img/1000219230.jpg", 
    "assets/img/1000219230.jpg"
  ],
  actividad3: [
    "assets/img/1000219230.jpg",
    "assets/img/1000219230.jpg",
    "assets/img/1000219230.jpg",
    "assets/img/1000219230.jpg"
  ],
  actividad4: [
    "assets/img/1000219230.jpg",
    "assets/img/1000219230.jpg",
    "assets/img/1000219230.jpg",
    "assets/img/1000219230.jpg"
  ]
};

function openImageModal(idActividad) {
  imagenesActuales = fotosActividades[idActividad] || [];
  indiceImagenActual = 0;

  const imagenModal = document.getElementById("modalImage");
  imagenModal.src = imagenesActuales[indiceImagenActual];
  imagenModal.alt = `${idActividad} - Foto ${indiceImagenActual + 1}`;

  actualizarBotones();
}

function navigateImage(direccion) {
  indiceImagenActual += direccion;

  if (indiceImagenActual >= imagenesActuales.length) {
    indiceImagenActual = 0;
  } else if (indiceImagenActual < 0) {
    indiceImagenActual = imagenesActuales.length - 1;
  }

  const imagenModal = document.getElementById("modalImage");
  imagenModal.src = imagenesActuales[indiceImagenActual];
  imagenModal.alt = `Foto ${indiceImagenActual + 1} de ${imagenesActuales.length}`;

  actualizarBotones();
}

function actualizarBotones() {
  const botonAnterior = document.getElementById("prevBtn");
  const botonSiguiente = document.getElementById("nextBtn");

  if (imagenesActuales.length <= 1) {
    botonAnterior.style.display = "none";
    botonSiguiente.style.display = "none";
  } else {
    botonAnterior.style.display = "block";
    botonSiguiente.style.display = "block";
  }
}

document.addEventListener("keydown", function(evento) {
  const modal = document.getElementById("imageModal");
  const modalAbierto = modal.classList.contains("show");

  if (modalAbierto) {
    if (evento.key === "ArrowLeft") {
      navigateImage(-1);
    } else if (evento.key === "ArrowRight") {
      navigateImage(1);
    } else if (evento.key === "Escape") {
      const botonCerrar = modal.querySelector(".btn-close");
      botonCerrar.click();
    }
  }
});

let mapaLeaflet;

function inicializarMapa() {
  const coordenadas = [-18.44566971387962, -70.29167639063388];
  
  mapaLeaflet = L.map('mapa').setView(coordenadas, 17);
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(mapaLeaflet);
  
  L.marker(coordenadas).addTo(mapaLeaflet)
    .bindPopup('Lagunillas 815, 1030786 Arica, Arica y Parinacota')
    .openPopup();
}

function abrirGoogleMaps() {
  const direccion = "Lagunillas 815, 1030786 Arica, Arica y Parinacota, Chile";
  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(direccion)}`;
  window.open(url, '_blank');
}

document.addEventListener("DOMContentLoaded", function() {
  const modal = document.getElementById("imageModal");
  const imagenModal = document.getElementById("modalImage");

  modal.addEventListener("click", function(evento) {
    if (evento.target === modal || 
        evento.target.classList.contains("modal-dialog") ||
        evento.target.classList.contains("modal-content") ||
        evento.target.classList.contains("modal-body") ||
        evento.target.classList.contains("image-container")) {
      const botonCerrar = modal.querySelector(".btn-close");
      botonCerrar.click();
    }
  });

  imagenModal.addEventListener("click", function(evento) {
    evento.stopPropagation();
  });

  const botonesNavegacion = modal.querySelectorAll("#prevBtn, #nextBtn");
  botonesNavegacion.forEach(function(boton) {
    boton.addEventListener("click", function(evento) {
      evento.stopPropagation();
    });
  });

  inicializarMapa();
  configurarNavegacion();
});

function configurarNavegacion() {
  const enlaces = document.querySelectorAll('.navbar-nav .nav-link');
  
  enlaces.forEach(function(enlace) {
    enlace.addEventListener('click', function(evento) {
      evento.preventDefault();
      
      const objetivo = enlace.getAttribute('href');
      const seccion = document.querySelector(objetivo);
      
      if (seccion) {
        const alturaNavbar = document.querySelector('.navbar').offsetHeight;
        const posicionSeccion = seccion.offsetTop - alturaNavbar - 20;
        
        window.scrollTo({
          top: posicionSeccion,
          behavior: 'smooth'
        });
      }
    });
  });
}
