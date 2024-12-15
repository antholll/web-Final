document.addEventListener("DOMContentLoaded", () => {
    // Variables del menú
    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");
    const menuProductos = document.querySelector('.menu-productos');
    const productosLink = document.querySelector('.productos-link');

    // Toggle menú principal
    menuToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        menu.classList.toggle("active");
    });

    // Manejo del submenú
    productosLink.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (window.innerWidth <= 768) {
            menuProductos.classList.toggle("active");
        }
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener("click", (e) => {
        if (!menu.contains(e.target) && !menuToggle.contains(e.target)) {
            menu.classList.remove("active");
            menuProductos.classList.remove("active");
        }
    });

});



document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("footer form");
    const emailInput = document.getElementById("email");
    const popup = document.getElementById("popup");
    const popupMessage = document.getElementById("popup-message");
    const popupClose = document.getElementById("popup-close");

    // Validación de email
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Mostrar popup
    function showPopup(message) {
        popupMessage.textContent = message; // Actualiza el mensaje
        popup.classList.remove("hidden"); // Muestra el popup
        popup.classList.add("show");

        // Cerrar el popup al hacer clic fuera del contenido
        popup.addEventListener("click", (e) => {
            if (e.target === popup) {
                closePopup();
            }
        });
    }

    // Cerrar popup
    function closePopup() {
        popup.classList.remove("show");
        popup.classList.add("hidden");
    }

    // Evento del formulario
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (validateEmail(emailInput.value)) {
            showPopup("¡Te has suscrito correctamente!");
            emailInput.value = ""; // Limpia el campo de correo
        } else {
            alert("Por favor, ingresa un correo válido.");
        }
    });

    // Cerrar popup con el botón de cerrar
    popupClose.addEventListener("click", closePopup);
});






// Seleccionar elementos del menú
const btnProductos = document.getElementById('btn-productos');
const btnSoporte = document.getElementById('btn-soporte');
const btnContacto = document.getElementById('btn-contacto');

// Función para desplazar la página a una sección específica
const scrollToSection = (id) => {
    const section = document.querySelector(id);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
};

// Evento para desplazarse a la sección de productos
btnProductos.addEventListener('click', (event) => {
    event.preventDefault(); // Evitar comportamiento predeterminado del enlace
    scrollToSection('#seccion-productos'); 
});

// Eventos para soporte y contacto (que llevan al footer)
btnSoporte.addEventListener('click', (event) => {
    event.preventDefault();
    scrollToSection('#footer'); 
});

btnContacto.addEventListener('click', (event) => {
    event.preventDefault();
    scrollToSection('#footer');
});





