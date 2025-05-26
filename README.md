<<<<<<< HEAD
# Essence - Tu Perfumería Online 🌺
=======
# Essence - Tu Perfumería Online 
>>>>>>> 7d4547313e2175277fb7f99b8f84ba69644817a7

Una aplicación web para gestionar un catálogo de perfumes, permitiendo visualizar, buscar y registrar productos de manera eficiente.

## Características ✨

- **Catálogo de Productos**: Visualización paginada de perfumes (15 productos por página)
- **Búsqueda Avanzada**: Filtros por:
  - Nombre
  - Categoría
  - Rango de precios
  - Género
- **Registro de Productos**: Formulario con validación para agregar nuevos perfumes
- **Persistencia de Datos**: Almacenamiento local usando LocalStorage
- **Interfaz Responsiva**: Diseño adaptable a diferentes dispositivos

<<<<<<< HEAD
### Validación de Datos

- **Nombre**:

  - Máximo 20 caracteres
  - Campo obligatorio

- **Código**:

=======
## Estructura del Proyecto 📁

```
proyectoFinal/
├── index.html          # Página principal
├── css/               # Estilos
│   ├── index.css
│   ├── productos.css
│   ├── registro.css
│   ├── busqueda.css
│   └── indicaciones.css
├── js/                # Lógica
│   ├── data.js        # Gestión de datos
│   ├── productos.js   # Funcionalidad productos
│   ├── registro.js    # Validación formulario
│   ├── busqueda.js    # Lógica de búsqueda
│   └── index.js       # Scripts principales
├── pages/             # Páginas adicionales
│   ├── productos.html
│   ├── registro.html
│   ├── busqueda.html
│   └── indicaciones.html
└── img/               # Imágenes de productos
```

## Requisitos de Producto 📋

### Validación de Datos

- **Nombre**: 
  - Máximo 20 caracteres
  - Campo obligatorio

- **Código**: 
>>>>>>> 7d4547313e2175277fb7f99b8f84ba69644817a7
  - Mínimo 8 caracteres
  - Al menos una letra mayúscula
  - Al menos una letra minúscula
  - Al menos 2 números

- **Categorías Disponibles**:
<<<<<<< HEAD

=======
>>>>>>> 7d4547313e2175277fb7f99b8f84ba69644817a7
  - Floral
  - Fresco
  - Oriental
  - Cítrico
  - Amaderado

- **Otros Campos**:
  - Precio: Valor numérico positivo
  - Volumen: En mililitros (ml)
  - Intensidad: Suave, Media, Fuerte, Intensa
  - Género: Masculino, Femenino, Unisex
  - Temporada: Primavera, Verano, Otoño, Invierno
  - Stock: Cantidad disponible

## Uso 🚀

### Visualización de Productos

- Accede a la página principal para ver el catálogo
- Navega entre páginas usando los controles de paginación
- Cada página muestra 15 productos

### Búsqueda de Productos

1. Ve a la sección de búsqueda
2. Utiliza los filtros disponibles:
   - Busca por nombre
   - Filtra por categoría
   - Establece rango de precios
   - Selecciona género
3. Los resultados se actualizan automáticamente

### Registro de Productos

1. Accede a la página de registro
2. Completa el formulario con los datos requeridos
3. Asegúrate de cumplir con los requisitos de validación
4. Envía el formulario

## Características Técnicas 💻

<<<<<<< HEAD
- **Almacenamiento**:

=======
- **Almacenamiento**: 
>>>>>>> 7d4547313e2175277fb7f99b8f84ba69644817a7
  - Utiliza LocalStorage para persistencia de datos
  - Clave de almacenamiento: "perfumes_data"

- **Paginación**:
<<<<<<< HEAD

=======
>>>>>>> 7d4547313e2175277fb7f99b8f84ba69644817a7
  - 15 productos por página
  - Cálculo automático del total de páginas

- **Búsqueda**:
  - Implementación asíncrona
  - Tiempo de respuesta simulado: 2 segundos
  - Filtros combinables

## Desarrollo 🛠️

El proyecto está estructurado en módulos para facilitar el mantenimiento:

- `data.js`: Gestión central de datos y operaciones CRUD
- `productos.js`: Lógica de visualización y paginación
- `registro.js`: Validación y procesamiento de formularios
- `busqueda.js`: Implementación de filtros y búsqueda

## Notas Adicionales 📝

- Los precios están en pesos
- Las imágenes de los productos deben estar en formato jpg
- El sistema valida automáticamente todos los campos antes de guardar
- Los datos se mantienen persistentes entre sesiones del navegador
