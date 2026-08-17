# Resumen del Backend: Sabor Coreano

Este documento resume la estructura y estado actual del backend (desarrollado en Laravel y contenerizado con Docker).

- **Docker + Laravel Sail:** Todo el entorno corre en contenedores locales, aislando MySQL, Redis y el servidor PHP. No se necesita XAMPP ni herramientas externas.
- **Base de Datos Estructurada:** Tablas listas y normalizadas para `users`, `products`, `categories`, `orders`, etc.
- **Semillero (Seeder) Configurado:** Con el comando de seed, la base de datos se auto-completa con un usuario Administrador, un Cliente y productos de prueba (Pollo Frito Coreano, Bulgogi) listos para consumirse.
- **API REST Activa:** Se creó el primer endpoint (`/api/productos`) controlado por el `ProductController` para servir los datos al Frontend en formato JSON.

## ¿Cómo funciona?

1. **Encender el Servidor:**
   Desde esta carpeta, ejecuta:
   ./vendor/bin/sail up -d

2. **Probar la API:**
   Usa Postman (o Thunder Client) y haz una petición `GET` a:
   `http://localhost/api/productos`

3. **Reiniciar Base de Datos con Datos de Prueba:**
   Si la base de datos se corrompe o quieres limpiarla y llenarla desde cero con los platillos de prueba:
   ./vendor/bin/sail artisan migrate:fresh --seed
