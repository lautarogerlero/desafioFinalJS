// Se muestran los 3 productos y el usuario debe elegir que cantidad de cada uno quiere comprar
// El valor de cada input se guarda para poder calcular el precio final
// Una vez elegida la cantidad debe hacer click en "ver carrito" para avanzar con la compra
// Una funcion calcula el valor total para cada producto, multiplicando la cantidad seleccionada por el precio
// Se suman los totales para calcular el valor final
// Finalmente el usuario debe elegir un metodo de pago válido y en base a eso se le muestra el valor que pagará

// variable para agregar las compras
let productos = [];

// objetos del DOM
const pantalones = document.querySelector("#comprar-pantalon");
const buzos = document.querySelector("#comprar-buzo");
const remeras = document.querySelector("#comprar-remera");
const zapatillas = document.querySelector("#comprar-zapatillas");

const botonVerCarrito = document.querySelector("#verCarrito");

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

// funcion para almacenar valores en el LS
function subirALS(clave, valor){
    const valorAJSON = JSON.stringify(valor);
    localStorage.setItem(clave, valorAJSON);
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

    // cargar los productos al array
    productos = [
        {
            producto: "Remera",
            precio: 2500,
            cantidad: remeras.value,
        },
        {
            producto: "Buzo",
            precio: 6000,
            cantidad: buzos.value,
        },
        {
            producto: "Pantalon",
            precio: 4000,
            cantidad: pantalones.value,
        },
        {
            producto: "Zapatillas",
            precio: 10000,
            cantidad: zapatillas.value,
        }
    ]

    // subir el valor final y los productos al ls
    subirALS("ValorFinal", valorFinal);
    subirALS("Compra", productos);

    // abrir la pagina del carrito
    window.open("./secciones/carrito.html", "_self");
}



