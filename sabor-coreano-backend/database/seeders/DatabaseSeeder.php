<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Crear Usuario Administrador
        \App\Models\User::create([
            'name' => 'Admin Sabor Coreano',
            'email' => 'admin@saborcoreano.com',
            'password' => \Illuminate\Support\Facades\Hash::make('password123'),
            'rol' => 'admin',
        ]);

        // 2. Crear Usuario Normal
        \App\Models\User::create([
            'name' => 'Cliente Feliz',
            'email' => 'cliente@ejemplo.com',
            'password' => \Illuminate\Support\Facades\Hash::make('secreto123'),
            'rol' => 'cliente',
        ]);

        // 3. Crear Categoría
        $categoria = new \App\Models\Category();
        $categoria->nombre = 'Los Favoritos';
        $categoria->save();

        // 4. Crear Platillo 1
        $p1 = new \App\Models\Product();
        $p1->category_id = $categoria->id;
        $p1->nombre = 'Pollo Frito Coreano';
        $p1->precio = 15.99;
        $p1->descripcion = 'Crujiente pollo bañado en salsa agridulce picante';
        $p1->stock = 50;
        $p1->sku = 'PFC-001';
        $p1->save();

        // 5. Crear Platillo 2
        $p2 = new \App\Models\Product();
        $p2->category_id = $categoria->id;
        $p2->nombre = 'Bulgogi';
        $p2->precio = 18.50;
        $p2->descripcion = 'Carne de res marinada a la parrilla con sésamo';
        $p2->stock = 30;
        $p2->sku = 'BLG-002';
        $p2->save();
    }
}
