// Se muestran los 3 productos y el usuario debe elegir que cantidad de cada uno quiere comprar
// El valor de cada input se guarda para poder calcular el precio final
// Una vez elegida la cantidad debe hacer click en "ver carrito" para avanzar con la compra
// Una funcion calcula el valor total para cada producto, multiplicando la cantidad seleccionada por el precio
// Se suman los totales para calcular el valor final
// Finalmente el usuario debe elegir un metodo de pago válido y en base a eso se le muestra el valor que pagará

// variableS para ir agregando los clientes y las compras
let clientes = [];
let productos = [
    {Pantalones: 0},
    {Buzos: 0},
    {Remeras: 0},
    {Zapatillas: 0}
];

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
// objetos del DOM
const pantalones = document.querySelector("#comprar-pantalon");
const buzos = document.querySelector("#comprar-buzo");
const remeras = document.querySelector("#comprar-remera");
const zapatillas = document.querySelector("#comprar-zapatillas");

const botonVerCarrito = document.querySelector("#verCarrito");
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

// precios
const precioPantalon = 4000;
const precioRemera = 2500;
const precioBuzo = 6000;
const precioZapatillas = 10000;

// Cantidad de cada producto
let totalPantalones = 0;
let totalBuzos = 0;
let totalRemeras = 0;
let totalZapatillas = 0;

// Definicion de la variable valorFinal
let valorFinal = 0;

// funcion para calcular el precio total de cada producto
function calcularTotal(producto, precio){
    return producto * precio;
}

// Apretar el boton para ir al carrito
botonVerCarrito.onclick = () => {
    // Obtener la cantidad de cada producto y calcular el precio
    totalPantalones = calcularTotal(pantalones.value, precioPantalon);
    totalRemeras = calcularTotal(remeras.value, precioRemera);
    totalBuzos = calcularTotal(buzos.value, precioBuzo);
    totalZapatillas = calcularTotal(zapatillas.value, precioZapatillas);

    // Calcular precio final
    valorFinal = totalPantalones + totalBuzos + totalRemeras + totalZapatillas;
    console.log(valorFinal)
    // Mostrar las cantidades y el precio de cada producto en el carrito
    productosCarrito.innerText = `${remeras.value} remeras: $${totalRemeras}
                            ${buzos.value} buzos: $${totalBuzos}
                            ${pantalones.value} pantalones: $${totalPantalones}
                            ${zapatillas.value} zapatillas: $${totalZapatillas}
                            Valor final: $${valorFinal}`
    

    // cargar los productos al array
    productos = [
        {Pantalones: Number(pantalones.value)},
        {Buzos: Number(buzos.value)},
        {Remeras: Number(remeras.value)},
        {Zapatillas: Number(zapatillas.value)},
    ];

    // Mostrar el carrito, si hay productos seleccionados
    if (valorFinal === 0) {
        carritoVacio.classList.toggle("ver");
    }
    else {
        carrito.classList.toggle("ver");
    }
    if (carritoVacio.classList.contains("ver") || carrito.classList.contains("ver")){
        botonVerCarrito.textContent = "Cerrar carrito";
    }
    else {
        botonVerCarrito.textContent = "Ir al carrito";
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
        carrito.classList.toggle("ver");
        botonVerCarrito.textContent = "Ir al carrito";
        remeras.value = 0;
        buzos.value = 0;
        zapatillas.value = 0;
        pantalones.value = 0;
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
    formulario.onsubmit = () => {
        clientes.push(new Cliente(formNombre.value, formApellido.value, formEmail.value, formDireccion.value, formCP.value, productos))
        alert("Listo! Gracias por su compra")
    }   

}



