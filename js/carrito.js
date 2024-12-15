

// Elementos necesarios
const botonesAgregar = document.querySelectorAll('.btn-agregar');
const carritoIcon = document.getElementById('carrito');
const carritoCount = document.getElementById('carrito-count');
const botonCompra = document.querySelector('.btn-compra');

const carritoPopup = document.createElement('div');
carritoPopup.className = 'carrito-popup';
document.body.appendChild(carritoPopup);

let carrito = [];

// Función para actualizar la vista del carrito
function actualizarCarrito() {
    if (carrito.length === 0) {
        carritoPopup.innerHTML = '<h3>Tu carrito está vacío</h3>';
        carritoPopup.style.display = 'none';
        return;
    }
    carritoPopup.innerHTML = `
        <h3>Carrito de Compras</h3>
        <div>
            ${carrito.map((item, index) => `
                <div class="carrito-item">
                    <img src="${item.img}" alt="${item.nombre}">
                    <div class="info">
                        <p>${item.nombre}</p>
                        <p>S/.${item.precioUnitario.toFixed(2)} c/u</p>
                        <p>Subtotal: S/.${(item.precioUnitario * item.cantidad).toFixed(2)}</p>
                        <p>Cantidad: 
                            <button onclick="cambiarCantidad(${index}, -1)">-</button>
                            ${item.cantidad}
                            <button onclick="cambiarCantidad(${index}, 1)">+</button>
                        </p>
                    </div>
                    <button onclick="eliminarDelCarrito(${index})">X</button>
                </div>
            `).join('')}
        </div>
        <p class="carrito-total">Total: S/.${calcularTotal()}</p>
        <div class="carrito-buttons">
            <button onclick="vaciarCarrito()">Vaciar</button>
            <button class="btn-finalizar" onclick="finalizarCompra()">Finalizar</button>
        </div>
    `;

    // Agregar evento dinámico al botón "Finalizar"
    const btnFinalizar = document.querySelector('.btn-finalizar');
    if (btnFinalizar) {
        btnFinalizar.addEventListener('click', abrirVentanaDatos);
    }
}

// Función para agregar productos al carrito
botonesAgregar.forEach((boton) => {
    boton.addEventListener('click', () => {
        const producto = boton.parentElement;
        const nombre = producto.querySelector('h3').innerText;
        const precioUnitario = parseFloat(producto.querySelector('p').innerText.replace('S/.', ''));
        const img = producto.querySelector('img').src;
        const existe = carrito.find(item => item.nombre === nombre);
        
        if (existe) {
            existe.cantidad++;
        } else {
            carrito.push({ 
                nombre, 
                precioUnitario, 
                img, 
                cantidad: 1 
            });
        }
        
        carritoCount.innerText = carrito.reduce((total, item) => total + item.cantidad, 0);
        actualizarCarrito();
    });
});

// Función para cambiar la cantidad de un producto
function cambiarCantidad(index, cantidad) {
    carrito[index].cantidad += cantidad;
    if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1);
    }
    carritoCount.innerText = carrito.reduce((total, item) => total + item.cantidad, 0);
    actualizarCarrito();
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    carritoCount.innerText = carrito.reduce((total, item) => total + item.cantidad, 0);
    actualizarCarrito();
}

// Función para vaciar el carrito
function vaciarCarrito() {
    carrito = [];
    carritoCount.innerText = 0;
    actualizarCarrito();
}

// Función para calcular el total
function calcularTotal() {
    return carrito.reduce((total, item) => total + item.precioUnitario * item.cantidad, 0).toFixed(2);
}



botonCompra.addEventListener('click', (event) => {
    event.preventDefault(); // Evitar que recargue la página
    carritoPopup.style.display = carritoPopup.style.display === 'block' ? 'none' : 'block';
});

// Mostrar/Ocultar carrito al hacer clic en el icono
document.getElementById('carrito').addEventListener('click', () => {
    carritoPopup.style.display = carritoPopup.style.display === 'block' ? 'none' : 'block';
});

// Función para manejar el carrito flotante
function manejarCarritoFlotante() {
    const headerHeight = document.querySelector('header').offsetHeight;
    const scrollPosition = window.scrollY;

    if (scrollPosition > headerHeight) {
        carritoIcon.classList.add('carrito-flotante');
    } else {
        carritoIcon.classList.remove('carrito-flotante');
    }
}



// Agregar event listener para el scroll
window.addEventListener('scroll', manejarCarritoFlotante);






// Seleccionar elementos necesarios
const finalizarCompraBtn = document.querySelector('.carrito-buttons button:last-child');
const popupDatos = document.getElementById('popup-datos');
const popupDatosClose = document.getElementById('popup-datos-close');
const formDatos = document.getElementById('form-datos');
const popupCompra = document.getElementById('popup');

// Función para abrir la ventana de datos
function abrirVentanaDatos() {
    carritoPopup.style.display = 'none'; // Cerrar ventana del carrito
    popupDatos.style.display = 'block'; // Mostrar ventana de datos
}
// Agregar evento para cerrar el popup
popupDatosClose.addEventListener('click', () => {
    popupDatos.style.display = 'none'; // Cambiado para consistencia
});
// Función para cerrar la ventana de datos
function cerrarVentanaDatos() {
    popupDatos.style.display = 'none';
}

// Función para completar la compra después de llenar los datos
formDatos.addEventListener('submit', (e) => {
    e.preventDefault(); // Evitar envío del formulario
    cerrarVentanaDatos();
    // Mostrar ventana de confirmación de compra
    alert('Gracias por tu compra. ¡Vuelve pronto!');
	formDatos.reset();
    vaciarCarrito(); // Vaciar el carrito
});

// Event listeners para abrir y cerrar la ventana de datos
finalizarCompraBtn.addEventListener('click', abrirVentanaDatos);
popupDatosClose.addEventListener('click', cerrarVentanaDatos);

// Cerrar la ventana emergente de compra (ya existente)
document.getElementById('popup-close').addEventListener('click', () => {
    popupCompra.style.display = 'none';
});
