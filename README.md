# Essence - Tu Perfumería Online 🌺

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

### Validación de Datos

- **Nombre**: 
  - Máximo 20 caracteres
  - Campo obligatorio

- **Código**: 
  - Mínimo 8 caracteres
  - Al menos una letra mayúscula
  - Al menos una letra minúscula
  - Al menos 2 números

- **Categorías Disponibles**:
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

- **Almacenamiento**: 
  - Utiliza LocalStorage para persistencia de datos
  - Clave de almacenamiento: "perfumes_data"

- **Paginación**:
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