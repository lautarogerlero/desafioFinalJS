// Objetos del DOM
const carritoVacio = document.querySelector("#carritoVacio");
const carrito = document.querySelector("#carrito");
const productosCarrito = document.querySelector("#productosCarrito");

const mostrarValorCarrito = document.querySelector("#mostrarValorCarrito");
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

let productos = JSON.parse(localStorage.getItem("carrito")) || [];


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

// funcion para borrar datos del LS
function eliminarDelLS(clave){
    localStorage.removeItem(clave);
}

// funcion para hacer reduce de los productos y mostrarlos en el HTML
const productosHmtl = (array) => {
    const productosReduce = array.reduce((acc, curr) => {
        return acc + `
        <div class="cardCarrito">
            <img src=${curr.image}>
            <h2>${curr.title}  $${curr.price}</h2>
        </div>    
        `
    } , "")
    return productosReduce
}

let valorFinal = productos.reduce((acc, curr) => acc + Number(curr.price), 0)

// Mostrar el carrito, si hay productos seleccionados
const mostrarCarrito = () => {
    carrito.classList.toggle("ver");
    // Mostrar las cantidades y el precio de cada producto en el carrito    
    productosCarrito.innerHTML = productosHmtl(productos);
    mostrarValorCarrito.innerText = `Valor Final: $${valorFinal}`
}

// OPERADOR TERNARIO (chequear si hay productos en el carrito)
valorFinal > 0 ? mostrarCarrito() : carritoVacio.classList.toggle("ver");


// Objeto para calcular el valor final dependiendo del método de pago
const mediosDePago = {
        transferencia: valorFinal - valorFinal * 0.1,
        credito1Cuota: valorFinal,
        credito3Cuotas: valorFinal / 3,
        credito6Cuotas: valorFinal / 6
};
 

// Elegir método de pago 
// Hacer visible la sección 
botonMetodoPago.onclick = () => {
    metodoPago.classList.toggle("ver");
}
// Vaciar carrito
botonVaciarCarrito.onclick = () => {
    eliminarDelLS("carrito");
    window.open("../index.html", "_self");
}

// Dependiendo del método elegido se muestra un texto con el valor a pagar usando DESTRUCTURING
efectivo.onclick = () => {
    mostrarPrecioFinal.classList.toggle("ver");
    let {transferencia: pagoTranferencia} = mediosDePago;
    textoValorFinal.innerText = `El valor a pagar en efectivo es $${pagoTranferencia}`;
}
unaCuota.onclick = () => {
    mostrarPrecioFinal.classList.toggle("ver");
    let {credito1Cuota: pago1Cuota} = mediosDePago;
    textoValorFinal.innerText = `El valor a pagar en 1 cuota es $${pago1Cuota}`;
}
tresCuotas.onclick = () => {
    mostrarPrecioFinal.classList.toggle("ver");
    let {credito3Cuotas: pago3Cuotas} = mediosDePago;
    textoValorFinal.innerText = `El valor a pagar en 3 cuotas es $${pago3Cuotas}`;
}
seisCuotas.onclick = () => {
    mostrarPrecioFinal.classList.toggle("ver");
    let {credito6Cuotas: pago6Cuotas} = mediosDePago
    textoValorFinal.innerText = `El valor a pagar en 6 cuotas es $${pago6Cuotas}`;
}

// Mostrar formulario al apretar finalizar
botonFinalizar.onclick = () => {
    formulario.classList.toggle("ver");
}

// Guardar info del formulario y volver al inicio
formulario.onsubmit = (e) => {
    e.preventDefault();
    clientes.push(new Cliente(formNombre.value, formApellido.value, formEmail.value, formDireccion.value, formCP.value, productos));
    subirALS("Cliente", clientes);
    eliminarDelLS("carrito");
    swal({
    title:`Compra Realizada!`,
    text:`Gracias ${clientes[0].nombre}! Tu compra llegará en 2/3 días habiles.`,
    icon:"success",
    button:"Genial",
    })
    .then(() => {
        window.location.href="../index.html"
    })
    
    


}   