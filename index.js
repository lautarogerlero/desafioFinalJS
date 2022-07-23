// Se le pide al usuario que ingrese uno de los tres productos
// Segun el producto que elija, se incrementa el contador de ese producto
// Si no ingresa un producto que se encuentre en la lista, se le pide que ingrese un producto válido
// Cuando no quiera comprar más, debe ingresar "NO" y se termina el ciclo while
// Una funcion calcula el valor total para cada producto, multiplicando la cantidad seleccionada por el precio
// Se suman los totales para calcular el valor final
// Finalmente el usuario debe elegir un metodo de pago válido y en base a eso se le muestra el valor que pagará

// objetos del DOM
const carritoDeCompras = document.querySelector("#carrito");
const precio = document.querySelector("#precio");

// Array con la lista de productos
const productos = ["pantalon", "buzo", "remera"];

// variables
let pantalones = 0;
let buzos = 0;
let remeras = 0;

// constantes
const precioPantalon = 4000;
const precioRemera = 2500;
const precioBuzo = 6000;

// ciclo while
let terminar = false;
while (terminar === false){
    let producto = prompt("Escriba el producto que desea comprar: 'Pantalon', 'Buzo', 'Remera'")
    // Si el producto ingresado está en la lista se ejecuta el primer if
    if (productos.includes(producto.toLowerCase())){
        if (producto.toLowerCase() === "pantalon"){
            pantalones += 1
        }
        else if (producto.toLowerCase() === "buzo"){
            buzos += 1
        }
        else if (producto.toLowerCase() === "remera"){
            remeras += 1
        }
    }
    else{
        alert("Ingrese un producto valido")
    }
    let pregunta = prompt("Escriba NO si no desea comprar nada más")
    if (pregunta.toUpperCase() === "NO"){
        terminar = true
    }
}

// DOM
carritoDeCompras.innerText = `${pantalones} pantalones
                              ${buzos} buzos
                              ${remeras} remeras`

// funcion para calcular el precio total de cada producto
function calcularTotal(producto, precio){
    return producto * precio
}

totalPantalones = calcularTotal(pantalones, precioPantalon);
totalRemeras = calcularTotal(remeras, precioRemera);
totalBuzos = calcularTotal(buzos, precioBuzo);

// precio final
valorFinal = totalPantalones + totalBuzos + totalRemeras;

alert(`El valor final a pagar es $${valorFinal}.
        Puede pagar en 1, 3 o 6 cuotas sin interes.
        Con traferencia bancaria tiene un 10% de descuento`);
// console.log para que quede en consola tambien
console.log(`El valor final a pagar es $${valorFinal}.
        Puede pagar en 1, 3 o 6 cuotas sin interes.
        Con transferencia bancaria tiene un 10% de descuento`);

const mediosDePago = [
    {
        transferencia: valorFinal - valorFinal * 0.1,
        credito1Cuota: valorFinal,
        credito3Cuotas: valorFinal / 3,
        credito6Cuotas: valorFinal / 6
    }
]

let cerrar = false;
while (cerrar === false){
    let pago = prompt("Elija un método de pago (A, B, C o D). A: Transferencia, B: Crédito en 1 cuota, C: Crédito en 3 cuotas, D: Crédito en 6 cuotas")
    if (pago.toUpperCase() === "A"){
        precio.innerText = `El valor final con el descuento es $${mediosDePago[0].transferencia}`
        // console.log para que quede en consola tambien
        console.log(`El valor final con el descuento es $${mediosDePago[0].transferencia}`)
        break
    }
    else if (pago.toUpperCase() === "B"){
        precio.innerText = `El pago será en 1 cuota de $${mediosDePago[0].credito1Cuota}`
        // console.log para que quede en consola tambien
        console.log(`El pago será en 1 cuota de $${mediosDePago[0].credito1Cuota}`)
        break
    }
    else if (pago.toUpperCase() === "C"){
        precio.innerText = `El pago será en 3 cuotas de $${mediosDePago[0].credito3Cuotas}`
        // console.log para que quede en consola tambien
        console.log(`El pago será en 3 cuotas de $${mediosDePago[0].credito3Cuotas}`)
        break
    }
    else if (pago.toUpperCase() === "D"){
        precio.innerText = `El pago será en 6 cuotas de $${mediosDePago[0].credito6Cuotas}`
        // console.log para que quede en consola tambien
        console.log(`El pago será en 6 cuotas de $${mediosDePago[0].credito6Cuotas}`)
        break
    }
    else {
        alert("Elija una opción válida")
    }
}

