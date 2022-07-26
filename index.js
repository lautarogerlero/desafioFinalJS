// Se le pide al usuario que ingrese uno de los tres productos
// Segun el producto que elija, se incrementa el contador de ese producto
// Si no ingresa un producto que se encuentre en la lista, se le pide que ingrese un producto válido
// Cuando no quiera comprar más, debe ingresar "NO" y se termina el ciclo while
// Una funcion calcula el valor total para cada producto, multiplicando la cantidad seleccionada por el precio
// Se suman los totales para calcular el valor final
// Finalmente el usuario debe elegir un metodo de pago válido y en base a eso se le muestra el valor que pagará

// objetos del DOM
const cantidades = document.querySelector("#cantidades");
const pago = document.querySelector("#metodo-pago");
const mostrarPrecioFinal = document.querySelector("#valorFinal");
const carrito = document.querySelector("#carrito");
const botonVerCarrito = document.querySelector("#verCarrito");
const botonPago = document.querySelector("#elegirPago");
const efectivo = document.querySelector("#efectivo");
const unaCuota = document.querySelector("#unaCuota");
const tresCuotas = document.querySelector("#tresCuotas");
const seisCuotas = document.querySelector("#seisCuotas");
const textoValorFinal = document.querySelector("#tituloValorFinal");

let pantalones = document.querySelector("#comprar-pantalon");
let buzos = document.querySelector("#comprar-buzo");
let remeras = document.querySelector("#comprar-remera");

// Array con la lista de productos
const productos = ["pantalon", "buzo", "remera"];

// precios
const precioPantalon = 4000;
const precioRemera = 2500;
const precioBuzo = 6000;


// funcion para calcular el precio total de cada producto
function calcularTotal(producto, precio){
    return producto * precio
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
    
    // Array para calcular el vlaor final dependiendo del método de pago
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






