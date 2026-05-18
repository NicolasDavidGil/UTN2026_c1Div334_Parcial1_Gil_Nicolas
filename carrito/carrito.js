let listaCarrito = [];

function obtenerCarrito() 
{
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

function cargarProductosCarrito() 
{
    let total = document.getElementById("valor-final");
    listaCarrito = obtenerCarrito();
    if(listaCarrito.length === 0) {
        document.getElementById("tabla-carrito").innerHTML = "<tr><td colspan='4'>El carrito está vacío</td></tr>";
        total.textContent = `El valor final a pagar es de: $0.00`;
        return;
    }
    let tabla = document.getElementById("tabla-carrito");
    listaCarrito.forEach(item => {
        let fila = document.createElement("tr");
        fila.innerHTML = "";
        fila.innerHTML += `
            <td>${item.nombre}</td>
            <td>${item.cantidad}</td>
            <td>$${item.precio.toFixed(2)}</td>            
            <td>$${(item.precio * item.cantidad).toFixed(2)}</td>
        `;
        tabla.appendChild(fila);
    });    
    let valorTotal = listaCarrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
    total.textContent = `El valor final a pagar es de: $${valorTotal.toFixed(2)}`;
}

function limpiarCarrito() 
{
    if(listaCarrito.length === 0) {
        mostrarSnackbar("El carrito ya está vacío");
        return;
    }   
    localStorage.removeItem("carrito");
    document.getElementById("tabla-carrito").innerHTML = "";
    let total = document.getElementById("valor-final");
    total.textContent = `El valor final a pagar es de: $0.00`;
    mostrarSnackbar("Carrito limpiado");
}

// Asociar evento al botón cuando la página carga
window.addEventListener("DOMContentLoaded", () =>
{
    cargarProductosCarrito();
    document.querySelector(".btn-limpiar-carrito").addEventListener("click", limpiarCarrito);
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