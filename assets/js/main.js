(function(){
  'use strict';

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor){
    anchor.addEventListener('click', function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if(target){
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
      }
    });
  });

  // Navbar background on scroll
  const nav = document.getElementById('mainNav');
  function setNav(){
    if(window.scrollY > 40) nav.classList.add('scrolled'); else nav.classList.remove('scrolled');
  }
  setNav();
  window.addEventListener('scroll', setNav);
})();

document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    function updateActiveLink() {
        let current = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 100; // Ajuste por el header
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", updateActiveLink);
});

document.querySelectorAll(".icon-rotate-once").forEach(icon => {
  icon.addEventListener("mouseenter", function () {
    if (!icon.classList.contains("done")) {
      icon.classList.add("icon-rotating");
      icon.classList.add("done"); // Marca que ya giró

      setTimeout(() => {
        icon.classList.remove("icon-rotating");
      }, 700); // coincide con el transition
    }
  });
});

 // Activar tooltips (para botones deshabilitados que muestren explicación)
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })

//Animaciones de correo enviado

document.addEventListener('DOMContentLoaded', function () {

  const form = document.getElementById('contactForm');
  const btn = document.getElementById('btnEnviar');

  if (!form || !btn) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // evita recarga

    // 🔐 Validar captcha ANTES de enviar
    if (typeof grecaptcha !== 'undefined' && grecaptcha.getResponse() === '') {
      Swal.fire({
        icon: 'warning',
        title: 'Verificación requerida',
        text: 'Por favor confirma que no eres un robot.'
      });
      return; // NO envía, NO borra
    }

    // 🔄 SweetAlert de carga
    Swal.fire({
      title: 'Enviando mensaje...',
      text: 'Por favor espera un momento',
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form)
    })
    .then(res => res.json())
    .then(data => {

      // Error o warning → NO limpiar formulario
      if (data.status !== 'success') {
        Swal.fire({
          icon: data.status,
          title: 'Atención',
          text: data.message
        });
        return;
      }

      // ÉXITO → animación + reset
      Swal.fire({
        html: `
          <svg class="checkmark" viewBox="0 0 52 52">
            <circle class="checkmark-circle" cx="26" cy="26" r="25"/>
            <path class="checkmark-check" fill="none" d="M14 27l7 7 16-16"/>
          </svg>
          <h3>¡Mensaje enviado!</h3>
          <p>Gracias por contactarme.<br>Te responderé pronto.</p>
        `,
        showConfirmButton: false,
        timer: 2300,
        allowOutsideClick: false,
        customClass: {
          popup: 'animate__animated animate__zoomIn'
        }
      });

      form.reset();              //  solo aquí
      grecaptcha.reset();        // reset captcha

    })
    .catch(() => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo enviar el mensaje. Intenta más tarde.'
      });
    });
  });
});


//Efecto Blur En Modales//
document.querySelectorAll('.modal').forEach(modal => {

  modal.addEventListener('show.bs.modal', () => {
    document.getElementById('blurOverlay')?.classList.add('active');
  });

  modal.addEventListener('hide.bs.modal', () => {
    document.getElementById('blurOverlay')?.classList.remove('active');
  });

});



