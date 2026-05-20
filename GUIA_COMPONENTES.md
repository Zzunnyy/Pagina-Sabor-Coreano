# 🎨 Guía de Componentes - Sabor Coreano

## Componentes Rediseñados

### 1. Hero Section
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  [🔴] Auténtico                          [Logo con Glow]   │
│       Sabor Coreano                       [Efecto Float]   │
│       en tu puerta                                         │
│                                                             │
│  Descripción atractiva del servicio...                     │
│                                                             │
│  [Ver Menú] [Nuestra Historia]                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 2. Features Section
```
┌──────────────────┬──────────────────┬──────────────────┐
│      🔥          │      🥘          │       ⚡         │
│ Recetas Auténticas │ Ingredientes   │ Entrega Rápida  │
│                  │   Premium        │                 │
│ Preparadas con   │ Seleccionados    │ Llega fresco    │
│ técnicas         │ especialmente de │ a tu mesa en    │
│ tradicionales    │ Corea del Sur    │ poco tiempo     │
└──────────────────┴──────────────────┴──────────────────┘
```

### 3. Product Card
```
┌────────────────────────┐
│  [Popular 🏷️]         │
│                        │
│   ┌─────────────────┐  │ Hover Effect:
│   │  [Imagen 🍜]    │  │ - Zoom imagen
│   │   [Zoom 🔍]     │  │ - Sombra roja
│   └─────────────────┘  │ - Botón visible
│                        │
│  Nombre del Plato  👈  │ Hover: más rojo
│  Descripción corta...  │
│                        │
│  $XX.XX    [➕]        │ Hover: color rojo
└────────────────────────┘
```

### 4. Navbar
```
┌─────────────────────────────────────────────────────────────┐
│ [🔴 Sabor Coreano]  Menú | Sobre | Contacto   [Iniciar]   │
│  Auténtico Sabor                                             │
└─────────────────────────────────────────────────────────────┘

Hover Effects en Navegación:
Menú   <- Subrayado rojo aparece desde abajo
```

### 5. Footer
```
┌──────────────┬──────────────┬──────────────┬──────────────┐
│ Sabor Coreano│   Menú       │   Legal      │  Síguenos   │
│              │              │              │             │
│ Descripción  │ • Productos  │ • Privacidad │ 📘 📷 🐦    │
│              │ • Sobre      │ • Términos   │             │
│              │ • Contacto   │ • Cookies    │             │
└──────────────┴──────────────┴──────────────┴──────────────┘
© 2026 Sabor Coreano - Hecho con ❤️
```

## 🎨 Paleta de Colores

```
Primario (Rojo Coreano):
  - Normal:    #E63946
  - Hover:     #D62828
  - Glow:      #E63946/20

Acento (Ámbar):
  - Color:     #F4A261
  - Hover:     #F4A261/20

Neutros:
  - Fondo:     #0f0f0f (Negro puro)
  - Superficie: #1a1a1a (Gris muy oscuro)
  - Texto:     #f5f5f5 (Blanco suave)
  - Secundario: #6b7280 (Gris medio)
```

## ✨ Animaciones Disponibles

### Entrada
```javascript
animate-fade-in-up     // Desaparece desde abajo
animate-fade-in        // Desaparece simple
animate-bounce-in      // Rebota al aparecer
animate-slide-in-right // Desliza desde derecha
animate-slide-in-left  // Desliza desde izquierda
```

### Movimiento
```javascript
animate-float          // Flota arriba/abajo
animate-glow-pulse     // Glow pulsante
animate-shimmer        // Destello luminoso
```

### Delays
```javascript
delay-100, delay-200, delay-300, delay-400, 
delay-500, delay-600, delay-700, delay-800
```

## 🎯 Ejemplos de Uso

### Hero Title
```jsx
<h1 className="text-7xl font-black leading-[1.1]">
  <span className="block text-white">Auténtico</span>
  <span className="block bg-gradient-to-r from-red-500 to-amber-500 bg-clip-text text-transparent">
    Sabor Coreano
  </span>
</h1>
```

### Feature Card
```jsx
<div className="group p-8 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-500/30 rounded-2xl transition-all duration-300 hover:-translate-y-2">
  <div className="text-5xl mb-4">🔥</div>
  <h3 className="text-xl font-bold mb-2">Recetas Auténticas</h3>
  <p className="text-gray-400">Preparadas con técnicas tradicionales coreanas</p>
</div>
```

### CTA Button
```jsx
<Link href="/productos" className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(220,38,38,0.3)] overflow-hidden">
  <span className="relative z-10">Ver Menú</span>
  <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
</Link>
```

## 📱 Breakpoints Responsive

```
Mobile:  < 640px (sm)
Tablet:  640px - 1024px (md)
Desktop: > 1024px (lg)
```

## 🔍 CSS Personalizado

### Glass Effect
```css
.glass-effect {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

### Gradient Button
```css
.btn-gradient {
  position: relative;
  overflow: hidden;
}

.btn-gradient::before {
  content: '';
  position: absolute;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.btn-gradient:hover::before {
  left: 100%;
}
```

## 🎬 Timeline de Animaciones

```
Hero Section:
- Logo: delay-0ms
- Título: animate-fade-in-up
- Descripción: animate-fade-in-up delay-100
- Botones: animate-fade-in-up delay-200
- Imagen: delay-300

Features:
- Cada feature: animate-fade-in-up delay-100 * n
```

## 🎨 Temas Sugeridos para Futuro

- Dark mode (ya implementado)
- Light mode: Fondo blanco, texto oscuro
- Tema festivo: Más saturación de colores
- Tema minimalista: Más blanco, menos sombras

