<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    protected $fillable = [
        'category_id',
        'nombre',
        'precio',
        'descripcion',
        'stock',
        'sku',
        'es_activo',
        'costo_compra',
    ];

    protected function casts(): array
    {
        return [
            'precio' => 'decimal:2',
            'costo_compra' => 'decimal:2',
            'es_activo' => 'boolean',
        ];
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function inventoryMovements(): HasMany
    {
        return $this->hasMany(InventoryMovement::class);
    }
}
