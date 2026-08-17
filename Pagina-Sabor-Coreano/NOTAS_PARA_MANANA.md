# Notas para mañana: Integración Final (Backend <-> Frontend)

Para que el proyecto quede completamente funcional, quedan exactamente 3 tareas pendientes:

## 1. Poblar la Base de Datos (Seeders en Backend)
Tus tablas de Docker ya están creadas, pero están vacías.
- **Objetivo:** Meter productos de prueba (ej. "Topokki", "Kimbap") en la base de datos para tener algo que enviar al Frontend.
- **Cómo hacerlo:** En Laravel, crearemos un "Seeder" (`php artisan make:seeder ProductSeeder`) que insertará estos datos automáticamente con un solo comando.

## 2. Crear el Controlador (El puente en Backend)
- **Objetivo:** Crear el archivo `ProductController.php` en Laravel.
- **Cómo hacerlo:** 
  1. Usar el comando: `./vendor/bin/sail artisan make:controller Api/ProductController`.
  2. Escribir una función que busque los productos en la base de datos y los devuelva en formato JSON.
  3. Declarar esa ruta en `routes/api.php` para que la URL `http://localhost:8000/api/productos` exista.

## 3. Consumir la API (En este Frontend Next.js)
- **Objetivo:** Hacer que la página pida los datos reales en lugar de tenerlos escritos "a mano" en el código.
- **Cómo hacerlo:** Usaremos la función nativa `fetch` de JavaScript para consultar `http://localhost:8000/api/productos`.
- **Ejemplo rápido:**
  ```javascript
  const obtenerProductos = async () => {
    const respuesta = await fetch('http://localhost:8000/api/productos');
    const datos = await respuesta.json();
    console.log(datos); // Aquí estarán tus productos listos para mostrarse en la pantalla.
  }
  ```

*Nota: Abre este archivo mañana cuando empieces a trabajar y continuamos desde el punto 1.*
