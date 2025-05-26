// Elementos del DOM
// Obtiene referencias a los elementos HTML que necesitamos manipular
const searchForm = document.getElementById("searchForm"); // Formulario de búsqueda
const limpiarBtn = document.getElementById("limpiarBtn"); // Botón para limpiar filtros
const loadingIndicator = document.getElementById("loadingIndicator"); // Indicador de carga
const resultsContainer = document.getElementById("resultsContainer"); // Contenedor de resultados
const resultsBody = document.getElementById("resultsBody"); // Cuerpo de la tabla de resultados
const noResults = document.getElementById("noResults"); // Mensaje de "no hay resultados"
const prevPageBtn = document.getElementById("prevPageBtn"); // Botón página anterior
const nextPageBtn = document.getElementById("nextPageBtn"); // Botón página siguiente
const currentPageSpan = document.getElementById("currentPage"); // Span que muestra página actual
const totalPagesSpan = document.getElementById("totalPages"); // Span que muestra total de páginas

// Estado de la aplicación
let currentResults = []; // Almacena los resultados actuales de búsqueda
let currentPage = 1; // Página actual de paginación
const resultsPerPage = 10; // Cantidad de resultados por página

// Formatear moneda
// Convierte un número a formato de moneda colombiana
function formatearMoneda(amount) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Mostrar/ocultar estado de carga
function alternarCarga(show) {
  // show: booleano que indica si mostrar el indicador de carga
  loadingIndicator.classList.toggle("hidden", !show); // Muestra/oculta indicador
  resultsContainer.classList.toggle("hidden", show); // Muestra/oculta resultados
  noResults.classList.toggle("hidden", true); // Siempre oculta "no hay resultados"
}

// Crear fila de tabla para un producto
function crearFilaProducto(product) {
  const row = document.createElement("tr");

  // Ruta corregida para archivos en subcarpeta pages/
  row.innerHTML = `
    <td><img src="../img/${product.imagen}" alt="${product.nombre}"></td>
    <td>${product.nombre}</td>
    <td>${product.categoria}</td>
    <td>${formatearMoneda(product.precio)}</td>
    <td>${product.genero}</td>
    <td>${product.intensidad}</td>
    <td class="${product.stock < 10 ? "low-stock" : ""}">
      ${product.stock} unidades
    </td>
  `;

  // Comentar la opción anterior que era para raíz
  // row.innerHTML = `
  //   <td><img src="img/${product.imagen}" ...

  return row;
}

// Mostrar resultados paginados
function mostrarResultados() {
  resultsBody.innerHTML = ""; // Limpia los resultados anteriores

  // Calcula índices para la paginación
  const start = (currentPage - 1) * resultsPerPage; // Índice inicial
  const end = start + resultsPerPage; // Índice final
  const pageResults = currentResults.slice(start, end); // Obtiene resultados para la página actual

  // Añade cada producto a la tabla
  pageResults.forEach((product) => {
    resultsBody.appendChild(crearFilaProducto(product));
  });

  // Actualiza controles de paginación
  const totalPages = Math.ceil(currentResults.length / resultsPerPage); // Calcula total de páginas
  currentPageSpan.textContent = currentPage; // Muestra página actual
  totalPagesSpan.textContent = totalPages; // Muestra total de páginas

  // Habilita/deshabilita botones según la página actual
  prevPageBtn.disabled = currentPage === 1; // Deshabilita si es primera página
  nextPageBtn.disabled = currentPage === totalPages; // Deshabilita si es última página

  // Muestra/oculta contenedores según haya resultados
  resultsContainer.classList.toggle("hidden", pageResults.length === 0);
  noResults.classList.toggle("hidden", pageResults.length > 0);
}

// Manejar envío del formulario
searchForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // Evita recarga de página
  currentPage = 1; // Reinicia a primera página

  // Obtiene valores de los filtros
  const filters = {
    nombre: searchForm.nombre.value.trim(), // Nombre (sin espacios)
    categoria: searchForm.categoria.value, // Categoría seleccionada
    precioMin: searchForm.precioMin.value
      ? Number(searchForm.precioMin.value) // Precio mínimo (convertido a número)
      : null,
    precioMax: searchForm.precioMax.value
      ? Number(searchForm.precioMax.value) // Precio máximo (convertido a número)
      : null,
    genero: searchForm.genero.value, // Género seleccionado
  };

  alternarCarga(true); // Muestra indicador de carga

  try {
    // Busca productos (con retraso de 2 segundos)
    currentResults = await buscarProductos(filters);
    mostrarResultados(); // Muestra los resultados
  } catch (error) {
    console.error("Error buscando productos:", error);
    alert("Error al buscar productos. Por favor, intente nuevamente.");
  } finally {
    alternarCarga(false); // Oculta indicador de carga
  }
});

// Limpiar filtros
limpiarBtn.addEventListener("click", () => {
  searchForm.reset(); // Resetea el formulario
  currentResults = []; // Limpia resultados
  currentPage = 1; // Vuelve a primera página
  mostrarResultados(); // Actualiza vista
});

// Controles de paginación
prevPageBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--; // Disminuye número de página
    mostrarResultados(); // Actualiza vista
  }
});

nextPageBtn.addEventListener("click", () => {
  const totalPages = Math.ceil(currentResults.length / resultsPerPage);
  if (currentPage < totalPages) {
    currentPage++; // Aumenta número de página
    mostrarResultados(); // Actualiza vista
  }
});

// Inicializar datos
document.addEventListener("DOMContentLoaded", () => {
  inicializarDatos(); // Carga datos iniciales cuando el DOM está listo
});
