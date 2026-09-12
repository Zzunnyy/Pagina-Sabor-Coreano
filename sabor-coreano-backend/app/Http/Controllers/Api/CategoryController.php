<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;

class CategoryController extends Controller
{
    /**
     * Lista las categorías para el catálogo público (filtros del frontend).
     */
    public function index()
    {
        return response()->json(Category::all(['id', 'nombre']));
    }
}
