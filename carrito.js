const carritoVacio = document.querySelector("#carritoVacio");
const carrito = document.querySelector("#carrito");
const productosCarrito = document.querySelector("#productosCarrito");

const botonMetodoPago = document.querySelector("#botonMetodoPago");
const metodoPago = document.querySelector("#metodoPago");
const botonVaciarCarrito = document.querySelector("#vaciarCarrito");

const efectivo = document.querySelector("#efectivo");
const unaCuota = document.querySelector("#unaCuota");
const tresCuotas = document.querySelector("#tresCuotas");
const seisCuotas = document.querySelector("#seisCuotas");

const mostrarPrecioFinal = document.querySelector("#valorFinal");
const textoValorFinal = document.querySelector("#tituloValorFinal");
const botonFinalizar = document.querySelector("#finalizarCompra");

const formulario = document.querySelector("#formulario");
const formNombre = document.querySelector("#formNombre");
const formApellido = document.querySelector("#formApellido");
const formEmail = document.querySelector("#formEmail");
const formDireccion = document.querySelector("#formDireccion");
const formCP = document.querySelector("#formCP");

// variable para ir agregando los clientes que hacen compras
let clientes = [];

// clase de Clientes para instanciar 
class Cliente {
    constructor(nombre, apellido, email, direccion, codigoPostal, productos){
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.direccion = direccion;
        this.codigoPostal = codigoPostal;
        this.productos = productos
    }
}

// funcion para almacenar valores en el LS
function subirALS(clave, valor){
    const valorAJSON = JSON.stringify(valor);
    localStorage.setItem(clave, valorAJSON);
}

// funcion para obtener valores del LS
function bajarDelLS(clave){
    const valorTraido = localStorage.getItem(clave);
    const valorParseado = JSON.parse(valorTraido);
    return valorParseado
}

// obtener el valor final y los productos del LS
valorFinal = bajarDelLS("ValorFinal");
productos = bajarDelLS("Compra");

// chequear si hay productos en el carrito
// Mostrar el carrito, si hay productos seleccionados
if (valorFinal === 0) {
    carritoVacio.classList.toggle("ver");
}
else {
    carrito.classList.toggle("ver");
    // Mostrar las cantidades y el precio de cada producto en el carrito
    productos.forEach((elemento) => {
        let textoCarrito = `${elemento.cantidad} ${elemento.producto}: $${elemento.precio * elemento.cantidad}
        `;
        productosCarrito.innerText += textoCarrito;
    })
    productosCarrito.innerText += `Valor Final: $${valorFinal}`

}

// Array para calcular el valor final dependiendo del método de pago
const mediosDePago = [
    {
        transferencia: valorFinal - valorFinal * 0.1,
        credito1Cuota: valorFinal,
        credito3Cuotas: valorFinal / 3,
        credito6Cuotas: valorFinal / 6
    }
]  

// Elegir método de pago 
// Hacer visible la sección 
botonMetodoPago.onclick = () => {
    metodoPago.classList.toggle("ver");
}
// Vaciar carrito
botonVaciarCarrito.onclick = () => {
    window.open("../index.html", "_self");
}

// Dependiendo del método elegido se muestra un texto con el valor a pagar
efectivo.onclick = () => {
    mostrarPrecioFinal.classList.toggle("ver");
    textoValorFinal.innerText = `El valor a pagar en efectivo es $${mediosDePago[0].transferencia}`;
}
unaCuota.onclick = () => {
    mostrarPrecioFinal.classList.toggle("ver");
    textoValorFinal.innerText = `El valor a pagar en 1 cuota es $${mediosDePago[0].credito1Cuota}`;
}
tresCuotas.onclick = () => {
    mostrarPrecioFinal.classList.toggle("ver");
    textoValorFinal.innerText = `El valor a pagar en 3 cuotas es $${mediosDePago[0].credito3Cuotas}`;
}
seisCuotas.onclick = () => {
    mostrarPrecioFinal.classList.toggle("ver");
    textoValorFinal.innerText = `El valor a pagar en 6 cuotas es $${mediosDePago[0].credito6Cuotas}`;
}

// Mostrar formulario al apretar finalizar
botonFinalizar.onclick = () => {
    formulario.classList.toggle("ver");
}

// Guardar info del formulario y volver al inicio
formulario.onsubmit = (e) => {
    clientes.push(new Cliente(formNombre.value, formApellido.value, formEmail.value, formDireccion.value, formCP.value, productos));
    subirALS("Cliente", clientes);
    alert("Listo! Gracias por su compra");
}   