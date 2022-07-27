// Se muestran los 3 productos y el usuario debe elegir que cantidad de cada uno quiere comprar
// El valor de cada input se guarda para poder calcular el precio final
// Una vez elegida la cantidad debe hacer click en "ver carrito" para avanzar con la compra
// Una funcion calcula el valor total para cada producto, multiplicando la cantidad seleccionada por el precio
// Se suman los totales para calcular el valor final
// Finalmente el usuario debe elegir un metodo de pago válido y en base a eso se le muestra el valor que pagará

// objetos del DOM
const pantalones = document.querySelector("#comprar-pantalon");
const buzos = document.querySelector("#comprar-buzo");
const remeras = document.querySelector("#comprar-remera");
const carrito = document.querySelector("#carrito");
const botonVerCarrito = document.querySelector("#verCarrito");
const cantidades = document.querySelector("#cantidades");
const botonPago = document.querySelector("#elegirPago");
const pago = document.querySelector("#metodo-pago");
const efectivo = document.querySelector("#efectivo");
const unaCuota = document.querySelector("#unaCuota");
const tresCuotas = document.querySelector("#tresCuotas");
const seisCuotas = document.querySelector("#seisCuotas");
const mostrarPrecioFinal = document.querySelector("#valorFinal");
const textoValorFinal = document.querySelector("#tituloValorFinal");

// precios
const precioPantalon = 4000;
const precioRemera = 2500;
const precioBuzo = 6000;

// Cantidad de cada producto
let totalPantalones = 0;
let totalBuzos = 0;
let totalRemeras = 0;

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

    // Calcular precio final
    valorFinal = totalPantalones + totalBuzos + totalRemeras;

    // Mostrar las cantidades y el precio de cada producto en el carrito
    cantidades.innerText = `${remeras.value} remeras: $${totalRemeras}
                            ${buzos.value} buzos: $${totalBuzos}
                            ${pantalones.value} pantalones: $${totalPantalones}
                            Valor final: $${valorFinal}`
    
    // Hacer visible el carrito
    carrito.classList.toggle("ver");
    if (carrito.classList.contains("ver")){
        botonVerCarrito.textContent = "Cerrar carrito";
    }
    else {
        botonVerCarrito.textContent = "Ver carrito";
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
botonPago.onclick = () => {
    pago.classList.toggle("ver");
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

}






