<?php

namespace App\Console\Commands;

use App\Imports\ProductsImport;
use Illuminate\Console\Command;
use Maatwebsite\Excel\Facades\Excel;

class ImportarProductosExcel extends Command
{
    /**
     * php artisan productos:importar {ruta-al-archivo.xlsx}
     */
    protected $signature = 'productos:importar {archivo : Ruta del Excel a importar}';

    protected $description = 'Importa productos desde un Excel, igual que el endpoint /admin/productos/importar pero sin necesitar Postman ni token.';

    public function handle(): int
    {
        $ruta = $this->argument('archivo');

        if (! file_exists($ruta)) {
            $this->error("No se encontró el archivo: {$ruta}");

            return self::FAILURE;
        }

        $import = new ProductsImport();

        Excel::import($import, $ruta);

        $this->info('Creados: ' . count($import->creados));
        foreach ($import->creados as $nombre) {
            $this->line("  + {$nombre}");
        }

        $this->info('Actualizados: ' . count($import->actualizados));
        foreach ($import->actualizados as $nombre) {
            $this->line("  ~ {$nombre}");
        }

        if (count($import->omitidos) > 0) {
            $this->error('Omitidos: ' . count($import->omitidos));
            foreach ($import->omitidos as $fila) {
                $this->line("  x Fila {$fila['fila']} ({$fila['producto']}): {$fila['motivo']}");
            }
        }

        return self::SUCCESS;
    }
}
