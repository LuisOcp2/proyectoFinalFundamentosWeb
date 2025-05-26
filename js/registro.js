// ========== ELEMENTOS DEL FORMULARIO ========== //
// Obtenemos los elementos principales del formulario
const form = document.getElementById("registroForm"); // Formulario completo
const limpiarBtn = document.getElementById("limpiarBtn"); // Botón para limpiar el formulario

// ========== PATRONES DE VALIDACIÓN ========== //
// Expresiones regulares para validar campos específicos
const patterns = {
  nombre: /^.{1,20}$/, // Nombre: 1 a 20 caracteres
  codigo: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*\d).{8,}$/, // Código: 8+ caracteres, 1 mayúscula, 1 minúscula, 2 números
};

// ========== MANEJO DE ESTADOS DE VALIDACIÓN ========== //
// Función para actualizar visualmente el estado de validación de un campo
function establecerEstadoValidacion(input, isValid, message = "") {
  // Encuentra el contenedor padre del input (form-group)
  const formGroup = input.closest(".form-group");
  // Limpia clases previas
  formGroup.classList.remove("error", "success");
  // Añade clase según si es válido o no
  formGroup.classList.add(isValid ? "success" : "error");

  // Manejo de mensajes de error
  let errorMessage = formGroup.querySelector(".error-message");
  // Si no existe y hay mensaje, lo crea
  if (!errorMessage && message) {
    errorMessage = document.createElement("span");
    errorMessage.className = "error-message";
    formGroup.appendChild(errorMessage);
  }
  // Actualiza el mensaje si existe
  if (errorMessage) {
    errorMessage.textContent = message;
  }
}

// ========== VALIDACIÓN DE CAMPOS INDIVIDUALES ========== //
function validarCampo(input) {
  const value = input.value.trim(); // Obtiene valor sin espacios

  // Validación de campo requerido
  if (!value) {
    establecerEstadoValidacion(input, false, "Este campo es requerido");
    return false;
  }

  // Validación por patrón (para campos con regex definido)
  if (input.id in patterns) {
    const isValid = patterns[input.id].test(value);
    if (!isValid) {
      const message =
        input.id === "nombre"
          ? "El nombre debe tener máximo 20 caracteres"
          : "El código debe tener mínimo 8 caracteres, 1 minúscula, 1 mayúscula y 2 números";
      establecerEstadoValidacion(input, false, message);
      return false;
    }
  }

  // Validación de números (precio y stock)
  if (input.type === "number") {
    const numValue = Number(value);
    if (isNaN(numValue) || numValue < 0) {
      establecerEstadoValidacion(input, false, "Debe ser un número positivo");
      return false;
    }
  }

  // Validación de select (debe tener opción seleccionada)
  if (input.tagName === "SELECT" && !value) {
    establecerEstadoValidacion(input, false, "Debe seleccionar una opción");
    return false;
  }

  // Si pasa todas las validaciones
  establecerEstadoValidacion(input, true);
  return true;
}

// ========== LIMPIEZA DEL FORMULARIO ========== //
function limpiarFormulario() {
  form.reset(); // Restablece valores del formulario

  // Limpia estados de validación visual
  form.querySelectorAll(".form-group").forEach((group) => {
    group.classList.remove("error", "success");
    const errorMessage = group.querySelector(".error-message");
    if (errorMessage) {
      errorMessage.remove();
    }
  });
}

// ========== MANEJO DEL ENVÍO DEL FORMULARIO ========== //
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Evita envío tradicional

  // Valida todos los campos
  let isValid = true;
  form.querySelectorAll("input, select").forEach((input) => {
    if (!validarCampo(input)) {
      isValid = false;
    }
  });

  // Si hay errores, muestra alerta y no procede
  if (!isValid) {
    alert("Por favor, corrija los errores en el formulario");
    return;
  }

  // Crea objeto producto con los datos del formulario
  const product = {
    nombre: form.nombre.value.trim(),
    categoria: form.categoria.value,
    imagen: form.imagen.value, // Esto será la ruta, ej: "../img/img7.png"
    codigo: form.codigo.value.trim(),
    precio: Number(form.precio.value),
    volumen: Number(form.volumen.value),
    intensidad: form.intensidad.value,
    genero: form.genero.value,
    temporada: form.temporada.value,
    stock: Number(form.stock.value),
  };

  try {
    // Intenta agregar el producto (usando función de data.js)
    agregarProducto(product);
    alert("Producto registrado exitosamente");
    limpiarFormulario();
    // No redirige a ninguna página(ajusta si tu página principal es otra)
  } catch (error) {
    alert("Error al registrar el producto: " + error.message);
  }
});

// ========== MANEJO DEL BOTÓN LIMPIAR ========== //
limpiarBtn.addEventListener("click", limpiarFormulario);

// ========== VALIDACIÓN EN TIEMPO REAL ========== //
// Aplica validación cuando el campo pierde foco (blur) o mientras se escribe (input)
form.querySelectorAll("input, select").forEach((input) => {
  input.addEventListener("blur", () => validarCampo(input));
  input.addEventListener("input", () => validarCampo(input));
});

// ========== PREVENCIÓN DE ENVÍO CON ENTER ========== //
// Evita que el formulario se envíe al presionar Enter
form.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
  }
});
