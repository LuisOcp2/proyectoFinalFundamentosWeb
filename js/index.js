// Selección de elementos del DOM
const listaProductos = document.querySelector(".product-list"); // Contenedor donde se mostrarán los productos
const botonPaginaAnterior = document.getElementById("prev-page"); // Botón para ir a la página anterior
const botonPaginaSiguiente = document.getElementById("next-page"); // Botón para ir a la página siguiente
const elementoNumeroPagina = document.getElementById("page-number"); // Elemento que muestra el número de página actual

// Configuración de paginación
const productosPorPagina = 15; // Cantidad de productos a mostrar por página
let paginaActual = 1; // Página actual (inicia en 1)
let totalPaginas = Math.ceil(productData.length / productosPorPagina); // Calcula el total de páginas necesarias

// Función principal que muestra los productos en la página actual
function mostrarProductos() {
  // Limpia el contenedor de productos antes de agregar nuevos
  listaProductos.innerHTML = "";

  // Calcula los índices de los productos a mostrar
  const indiceInicio = (paginaActual - 1) * productosPorPagina; // Índice del primer producto
  const indiceFin = indiceInicio + productosPorPagina; // Índice del último producto + 1
  const productosAMostrar = productData.slice(indiceInicio, indiceFin); // Obtiene los productos para esta página

  // Crea y agrega cada producto al contenedor
  productosAMostrar.forEach((producto) => {
    // Crea el contenedor principal del producto
    const elementoProducto = document.createElement("div");
    elementoProducto.classList.add("product-card"); // Añade clase CSS

    // Crea y configura la imagen del producto
    const imagenProducto = document.createElement("img");
    imagenProducto.src = `../img/${producto.image}`; // Ruta de la imagen
    imagenProducto.alt = producto.name; // Texto alternativo

    // Crea y configura el nombre del producto
    const nombreProducto = document.createElement("h3");
    nombreProducto.textContent = producto.name;

    // Crea y configura la categoría del producto
    const categoriaProducto = document.createElement("p");
    categoriaProducto.textContent = `Categoría: ${producto.category}`;

    // Crea y configura el precio del producto (formateado a 2 decimales)
    const precioProducto = document.createElement("p");
    precioProducto.textContent = `Precio: $${producto.price.toFixed(2)}`;

    // Crea y configura atributos adicionales del producto
    const atributoProducto1 = document.createElement("p");
    atributoProducto1.textContent = `${producto.attribute1}`;

    const atributoProducto2 = document.createElement("p");
    atributoProducto2.textContent = `${producto.attribute2}`;

    // Agrega todos los elementos al card del producto
    elementoProducto.appendChild(imagenProducto);
    elementoProducto.appendChild(nombreProducto);
    elementoProducto.appendChild(categoriaProducto);
    elementoProducto.appendChild(precioProducto);
    elementoProducto.appendChild(atributoProducto1);
    elementoProducto.appendChild(atributoProducto2);

    // Agrega el card del producto al listado principal
    listaProductos.appendChild(elementoProducto);
  });

  // Actualiza la interfaz con la página actual
  elementoNumeroPagina.textContent = paginaActual;
  // Deshabilita botones según la página actual
  botonPaginaAnterior.disabled = paginaActual === 1; // Deshabilita si estamos en la primera página
  botonPaginaSiguiente.disabled = paginaActual === totalPaginas; // Deshabilita si estamos en la última página
}

// Evento para el botón de página anterior
botonPaginaAnterior.addEventListener("click", () => {
  paginaActual--; // Disminuye el número de página
  mostrarProductos(); // Vuelve a renderizar los productos
});

// Evento para el botón de página siguiente
botonPaginaSiguiente.addEventListener("click", () => {
  paginaActual++; // Aumenta el número de página
  mostrarProductos(); // Vuelve a renderizar los productos
});

// Mostrar los productos iniciales al cargar la página
mostrarProductos();
