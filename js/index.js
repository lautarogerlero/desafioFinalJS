// Obtener los datos del carrito del LS, si no hay nada crea un array vacio
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// consumir API. Filtrar para que queden solo la ropa
const consumirApi = () => {
    fetch("https://fakestoreapi.com/products")
    .then(response => response.json())
    .then(data => {
        const ropa = data.filter(item => (item.category === "men's clothing" || item.category === "women's clothing"))
        containerProductos.innerHTML = productosHtml(ropa) ; 
        agregarAlCarrito(ropa);
    })
    .catch(() =>  swal({
        title:`Error al cargar los productos`,
        icon:"error",
        button:"Volver a intentar",
        }))
}

// mostrar en el HTML los productos (solo ropa)
const productosHtml = (arrayProductos) => {
    const items = arrayProductos.reduce((acc, curr) => {
        return acc + `
            <div class="item" id="item${curr.id}">
                <img src=${curr.image} alt=${curr.title}>
                <p>${curr.title}</p>
                <p>$${curr.price}</p>
                <button type="button" class="agregar" id=${curr.id}>Agregar al carrito</button>
            </div>
        `
    }, "")

    return items
}

consumirApi();

// objetos del DOM
const containerProductos = document.querySelector("#containerProductos");
const botonVerCarrito = document.querySelector("#verCarrito");

// Agregar el producto al carrito al apretar el boton
function agregarAlCarrito(array) {
    const botonAgregar = document.querySelectorAll(".agregar");
    
    for(let i = 0; i < botonAgregar.length; i++){
        botonAgregar[i].onclick = () => {
            const botonId = Number(botonAgregar[i].getAttribute("id"));
            let productoAgregado = array.find(producto => producto.id === botonId);
            carrito.push(productoAgregado);
            swal({
                title:`Producto Agregado!`,
                text:`Agregaste ${productoAgregado.title} al carrito. Click en OK para seguir comprando.`,
                icon:"success",
                button:"OK",
                })
            subirALS("carrito", carrito);

        }
    }
}

// funcion para almacenar valores en el LS
function subirALS(clave, valor){
    const valorAJSON = JSON.stringify(valor);
    localStorage.setItem(clave, valorAJSON);
}

// Apretar el boton para ir al carrito
botonVerCarrito.onclick = () => {
    // abrir la pagina del carrito
    window.open("./secciones/carrito.html", "_self");
}



