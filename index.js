let listaCarrito = [];

function inicializar()
{
    listaCarrito = obtenerCarrito();
    document.getElementById("numero-articulos").textContent = listaCarrito.reduce((total, item) => total + item.cantidad, 0);
}

//--- Funcion que obtiene el carrito del LocalStorage, lo parsea a un array y lo retorna ---//
function obtenerCarrito() 
{
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

//--- Funcion que guarda el carrito recibido al LocalStorage, previamente transformado a string ---//
function guardarCarrito(carrito) 
{
    console.log("Guardando carrito en LocalStorage:", carrito);
    console.log("Carrito actual: ", listaCarrito);
    localStorage.setItem("carrito", JSON.stringify(carrito));    
}

function sumarAlCarrito(e) 
{
    //--- Obtengo la referencia al elemento clickeado desde en base al evento (Propiedad exclusivamente de todos los Events) ---//
    let elementoClickeado = e.target;
    let producto = elementoClickeado.closest(".li-hamburguesa, .li-bebida, .li-tragos");
    let nombre = producto.querySelector(".nombre-producto").textContent;
    let precio = parseFloat(producto.querySelector(".precio-producto").textContent.replace("$", ""));
    let itemExistente = listaCarrito.find(item => item.nombre === nombre);
    if (itemExistente) {
        itemExistente.cantidad++;
    } else {
        listaCarrito.push({ nombre, precio, cantidad: 1 });
    }
    mostrarSnackbar(`${nombre} agregado al carrito`);
    document.getElementById("numero-articulos").textContent = listaCarrito.reduce((total, item) => total + item.cantidad, 0);
    guardarCarrito(listaCarrito);
}

function restarDelCarrito(e) 
{
    if(listaCarrito.length === 0) {
        mostrarSnackbar("El carrito está vacío. No hay productos para eliminar.");
        return;
    }
    //--- Obtengo la referencia al elemento clickeado desde en base al evento (Propiedad exclusivamente de todos los Events) ---//
    let elementoClickeado = e.target;
    let producto = elementoClickeado.closest(".li-hamburguesa, .li-bebida, .li-tragos");
    let nombre = producto.querySelector(".nombre-producto").textContent;

    let itemExistente = listaCarrito.find(item => item.nombre === nombre);

    if (itemExistente) {
        itemExistente.cantidad--;
        if (itemExistente.cantidad <= 0) {
            listaCarrito = listaCarrito.filter(item => item.nombre !== nombre);
        }
        document.getElementById("numero-articulos").textContent = listaCarrito.reduce((total, item) => total + item.cantidad, 0);
        guardarCarrito(listaCarrito);
        mostrarSnackbar(`${itemExistente.nombre} eliminado del carrito`);
    }else
    {
        mostrarSnackbar(`No hay ${producto.querySelector(".nombre-producto").textContent} en el carrito para eliminar`);
    }

}

//--- [EVENTOS] Asociacion del evento "click" a los botones "+" y "-" con la funcion manejadora del evento ---//
window.addEventListener("DOMContentLoaded", () => 
{
    const botonesSumar = document.querySelectorAll(".btn-sumar-a-carrito");
    const botonesRestar = document.querySelectorAll(".btn-restar-a-carrito");
    botonesSumar.forEach(btn => btn.addEventListener("click", sumarAlCarrito));
    botonesRestar.forEach(btn => btn.addEventListener("click", restarDelCarrito));
});



// Extras
//Reemplazo del alert que obliga a hacer click en "Aceptar" para cerrar la ventana emergente, por un Snackbar que se muestra de forma no intrusiva en la parte inferior de la pantalla y desaparece automáticamente después de unos segundos.   
//Esta repetido en carrito e index para no mover referencias, pero se podria extraer a un archivo utilitario y reutilizarlo en ambos archivos.

function mostrarSnackbar(mensaje)
{
    const snackbar = document.getElementById("snackbar");

    snackbar.innerHTML = mensaje;
    snackbar.classList.add("mostrar");

    setTimeout(() => {
        snackbar.classList.remove("mostrar");
    }, 3000);
}