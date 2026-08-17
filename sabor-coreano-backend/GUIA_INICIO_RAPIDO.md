# Guía Rápida: Sabor Coreano Backend (Docker + Laravel Sail)

¡Hola Francisco! Si estás leyendo esto, significa que retomaste el proyecto. Aquí está el resumen de lo que dejamos configurado y los pasos exactos para que continúes sin perderte.

## 1. ¿Qué logramos configurar?
- **Reemplazamos XAMPP por Docker:** Tu proyecto backend ahora está contenerizado. Esto significa que corre sobre un entorno profesional de Linux dentro de tu Windows.
- **Instalamos Laravel Sail:** La herramienta oficial que hace que usar Docker con Laravel sea facilísimo.
- **Configuramos CORS:** Ya modificamos el archivo `config/cors.php` y `.env` para que tu frontend en Next.js (`http://localhost:3000`) se pueda comunicar con este backend sin problemas de seguridad.

---

## 2. ¿Cómo iniciar a trabajar todos los días?
Cada vez que prendas tu computadora y quieras programar en el backend, solo debes hacer esto:

1. Abre la aplicación **Docker Desktop** en tu Windows y espera a que el motor inicie (el ícono se ponga verde).
2. Abre la terminal en esta carpeta del backend (`sabor-coreano-backend`).
3. Ejecuta el comando para encender el servidor:
   ```bash
   ./vendor/bin/sail up -d
   ```
   *(Nota: si estás en la consola de Windows/Powershell y ese comando falla, puedes usar simplemente `docker compose up -d`)*.

---

## 3. Próximos pasos a seguir (Donde nos quedamos)

Una vez que el servidor de Docker esté corriendo, tus siguientes movimientos son:

### Paso A: Ejecutar las Migraciones
Necesitas crear las tablas en la nueva base de datos de Docker. Ejecuta en tu consola:
```bash
./vendor/bin/sail artisan migrate
```
*(Esto tomará todos tus archivos de la carpeta `database/migrations` y armará tu base de datos).*

### Paso B: Crear tu primer Controlador (ProductController)
Para empezar a mandar información al Frontend, crea el controlador de productos:
```bash
./vendor/bin/sail artisan make:controller Api/ProductController --api
```
Luego, abre el archivo generado en `app/Http/Controllers/Api/ProductController.php` y agrega la lógica para devolver tus productos:
```php
public function index() {
    $productos = \App\Models\Product::all();
    return response()->json($productos);
}
```

### Paso C: Definir la Ruta de la API
Abre el archivo `routes/api.php` y agrega tu nueva ruta:
```php
use App\Http\Controllers\Api\ProductController;

Route::get('/productos', [ProductController::class, 'index']);
```

### Paso D: Conectar tu Frontend
Finalmente, ve a tu proyecto de Next.js (`Pagina-Sabor-Coreano`), y en tu página o componente haz un simple fetch a la API:
```javascript
fetch('http://localhost:8000/api/productos')
  .then(res => res.json())
  .then(data => console.log(data));
```

¡Mucho éxito con el desarrollo! Puedes continuar desde aquí cuando quieras.
