// ========== ELEMENTOS DEL DOM ========== //
// Seleccionamos todos los elementos HTML que necesitaremos manipular
const productsContainer = document.getElementById("productsContainer"); // Contenedor principal de productos
const productTemplate = document.getElementById("productTemplate"); // Plantilla HTML para cada producto
const prevPageBtn = document.getElementById("prevPage"); // Botón de página anterior
const nextPageBtn = document.getElementById("nextPage"); // Botón de página siguiente
const currentPageSpan = document.getElementById("currentPage"); // Elemento que muestra la página actual
const totalPagesSpan = document.getElementById("totalPages"); // Elemento que muestra el total de páginas

// ========== ESTADO DE LA APLICACIÓN ========== //
// Variables que controlan el estado de la paginación
let currentPage = 1; // Página actual (comienza en 1)
let totalPages = 1; // Total de páginas disponibles (se calcula después)

// ========== FUNCIÓN PARA FORMATEAR MONEDA ========== //
// Convierte un número a formato de moneda colombiana
function formatearMoneda(amount) {
  return new Intl.NumberFormat("es-CO", {
    // Configuración regional para Colombia
    style: "currency", // Formato de moneda
    currency: "COP", // Peso colombiano
    minimumFractionDigits: 0, // Sin decimales
    maximumFractionDigits: 0,
  }).format(amount);
}

// ========== CREACIÓN DE TARJETAS DE PRODUCTO ========== //
// Función que crea una tarjeta de producto basada en la plantilla HTML
function crearTarjetaProducto(product) {
  // Clonamos el contenido de la plantilla (mejor práctica para reutilizar HTML)
  const card = productTemplate.content.cloneNode(true);

  // Configuramos la imagen del producto
  const img = card.querySelector(".product-image img");
  img.src = `../img/${product.imagen}`; // Ruta de la imagen
  img.alt = product.nombre; // Texto alternativo para accesibilidad

  // Llenamos los datos del producto
  card.querySelector(".product-name").textContent = product.nombre;
  card.querySelector(".product-category").textContent = product.categoria;
  card.querySelector(".product-price").textContent = formatearMoneda(
    product.precio
  );
  card.querySelector(".product-volume").textContent = `${product.volumen}ml`;
  card.querySelector(".product-intensity").textContent = product.intensidad;
  card.querySelector(".product-gender").textContent = product.genero;
  card.querySelector(
    ".product-season"
  ).textContent = `Temporada: ${product.temporada}`;

  // Manejo del stock (cambia estilo si hay poco stock)
  const stockElement = card.querySelector(".product-stock");
  stockElement.textContent = `Stock: ${product.stock} unidades`;
  if (product.stock < 10) {
    // Si hay menos de 10 unidades
    stockElement.classList.add("low"); // Añade clase CSS para resaltar
  }

  return card; // Retorna la tarjeta completa
}

// ========== VISUALIZACIÓN DE ESTADOS ========== //
// Muestra un indicador de carga mientras se obtienen los productos
function mostrarCarga() {
  productsContainer.innerHTML = '<div class="loading">Cargando productos</div>';
  // Deshabilita los botones de paginación durante la carga
  prevPageBtn.disabled = true;
  nextPageBtn.disabled = true;
}

// ========== MOSTRAR PRODUCTOS ========== //
// Función que recibe un array de productos y los muestra en el contenedor
function mostrarProductos(products) {
  productsContainer.innerHTML = ""; // Limpia el contenedor

  // Para cada producto, crea una tarjeta y la añade al contenedor
  products.forEach((product) => {
    productsContainer.appendChild(crearTarjetaProducto(product));
  });
}

// ========== ACTUALIZACIÓN DE CONTROLES ========== //
// Actualiza los elementos de la interfaz relacionados con la paginación
function actualizarControlesPaginacion() {
  currentPageSpan.textContent = currentPage; // Actualiza número de página actual
  totalPagesSpan.textContent = totalPages; // Actualiza total de páginas

  // Deshabilita botones cuando no hay más páginas en esa dirección
  prevPageBtn.disabled = currentPage === 1;
  nextPageBtn.disabled = currentPage === totalPages;
}

// ========== CARGA DE PRODUCTOS ========== //
// Función asíncrona que carga los productos para la página actual
async function cargarProductos() {
  mostrarCarga(); // Muestra estado de carga

  // Simula un retraso de red (500ms) para demostración
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Obtiene los productos para la página actual (15 por página)
  const result = obtenerProductos(currentPage, 15);
  totalPages = result.totalPages; // Actualiza el total de páginas

  mostrarProductos(result.products); // Muestra los productos
  actualizarControlesPaginacion(); // Actualiza controles de paginación
}

// ========== EVENT LISTENERS ========== //
// Configuración de eventos para los botones de paginación
prevPageBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    // Solo actúa si no estamos en la primera página
    currentPage--; // Disminuye el número de página
    cargarProductos(); // Carga los productos de la nueva página
  }
});

nextPageBtn.addEventListener("click", () => {
  if (currentPage < totalPages) {
    // Solo actúa si no estamos en la última página
    currentPage++; // Aumenta el número de página
    cargarProductos(); // Carga los productos de la nueva página
  }
});

// ========== INICIALIZACIÓN ========== //
// Cuando el DOM está completamente cargado:
document.addEventListener("DOMContentLoaded", () => {
  inicializarDatos(); // Carga los datos iniciales (desde localStorage)
  cargarProductos(); // Carga la primera página de productos
});
