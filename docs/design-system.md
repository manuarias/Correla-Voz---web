# Correla Voz — Design System

> Design System MVP v1.0  
> Fecha: Abril 2026  
> Stack: React + Tailwind CSS v4

---

## Brand Colors

Los 4 colores de la identidad de la murga.

| Nombre | Hex | Token CSS | Uso |
|--------|-----|-----------|-----|
| **Murga Red** | `#dc2626` | `--color-murga-red` | Color primario, botones, acentos, bordes hover |
| **Murga Turquoise** | `#42a9c2` | `--color-murga-turquoise` | Color de acento, badges, glows |
| **Murga Black** | `#000000` | `--color-murga-black` | Fondo principal, superficie base |
| **Murga White** | `#ffffff` | `--color-murga-white` | Texto principal sobre fondos oscuros |

### Semantic Tokens

Los tokens semánticos mapean a los colores de marca y permiten cambiar la identidad sin tocar los componentes.

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-primary` | `var(--color-murga-red)` | Botones primarios, estados activos |
| `--color-accent` | `var(--color-murga-turquoise)` | Badges, highlights, glows |
| `--color-surface` | `var(--color-murga-black)` | Fondos de cards, secciones |
| `--color-surface-elevated` | `#1e293b` (slate-800) | Cards con elevación |
| `--color-surface-border` | `#334155` (slate-700) | Bordes de cards |
| `--color-text-primary` | `var(--color-murga-white)` | Texto principal |
| `--color-text-muted` | `#94a3b8` (slate-400) | Texto secundario |

---

## Typography

### Font Families

| Token | Fuente | Uso |
|-------|--------|-----|
| `--font-heading-primary` | `Rye` | H1, títulos principales |
| `--font-heading-secondary` | `WC Mano Negra Bta` | H2, subtítulos |
| `--font-heading-tertiary` | `Bungee` | H3, H4, labels |
| `--font-body` | `Inter` | Cuerpo de texto, párrafos |

### Google Fonts URLs

```
Rye: https://fonts.google.com/specimen/Rye
Bungee: https://fonts.google.com/specimen/Bungee
Inter: https://fonts.google.com/specimen/Inter
WC Mano Negra Bta: Fuente custom (no Google Fonts)
```

### Tipografía Aplicada

```
H1: Rye, 2.25rem (36px), blanco, glow rojo/turquesa
H2: WC Mano Negra Bta, 1.5rem (24px), blanco, text-shadow negro
H3: Bungee, 1.25rem (20px), blanco
Body: Inter, 1rem (16px), slate-300
Caption: Inter, 0.875rem (14px), slate-400
```

---

## Shadows & Effects

| Token | Valor | Uso |
|-------|-------|-----|
| `--shadow-card` | `0 4px 6px -1px rgba(0, 0, 0, 0.3)` | Sombra de cards |
| `--shadow-button` | `0 2px 4px rgba(220, 38, 38, 0.3)` | Sombra de botones |
| `--shadow-glow-red` | `0 0 15px rgba(220, 38, 38, 0.5)` | Glow rojo (carnaval) |
| `--shadow-glow-turquoise` | `0 0 15px rgba(66, 169, 194, 0.5)` | Glow turquesa |

### Animaciones

| Animación | Duración | Uso |
|-----------|----------|-----|
| `modal-enter` | 200ms | Entrada de modales |
| `murga-glow` | 6s infinite | Glow pulsante en títulos |
| `murga-glow-soft` | 8s infinite | Glow sutil en subtítulos |
| `kenburns` | 40s infinite | Zoom lento en backgrounds |

---

## Spacing

Usamos el scale default de Tailwind:

| Token | Valor |
|-------|-------|
| `space-1` | 4px |
| `space-2` | 8px |
| `space-3` | 12px |
| `space-4` | 16px |
| `space-6` | 24px |
| `space-8` | 32px |
| `space-12` | 48px |
| `space-16` | 64px |

### Layout

- **Container max-width**: 1280px
- **Container padding**: 16px (móvil) / 24px (tablet) / 32px (desktop)
- **Section padding vertical**: 80px (móvil) / 120px (desktop)

---

## Border Radius

| Token | Valor | Uso |
|-------|-------|-----|
| `rounded-sm` | 2px | Badges, tags pequeños |
| `rounded-md` | 6px | Botones default |
| `rounded-lg` | 8px | Cards, modales |
| `rounded-xl` | 12px | Cards destacadas |
| `rounded-full` | 9999px | Botones icono, avatares |

---

## Componentes Base

### Button

Componente con variantes controladas por CVA (Class Variance Authority).

#### Variants

| Variant | BG | Texto | Border | Hover |
|---------|-----|-------|--------|-------|
| **default** | `bg-primary` (rojo) | blanco | none | `hover:bg-primary/90` |
| **outline** | transparent | blanco | `border-surface-border` | `hover:bg-surface-elevated` |
| **ghost** | transparent | blanco | none | `hover:bg-surface-elevated` |
| **link** | transparent | `text-primary` | none | underline |

#### Sizes

| Size | Padding | Font | Height |
|------|---------|------|--------|
| **sm** | px-3 py-1.5 | text-sm | 32px |
| **default** | px-4 py-2 | text-base | 40px |
| **lg** | px-6 py-3 | text-lg | 48px |
| **icon** | p-2 | - | 40px x 40px |

#### Estados

- **Default**: Como arriba
- **Hover**: Cambio de fondo/borde
- **Focus**: Ring rojo (`focus-visible:ring-2 focus-visible:ring-primary`)
- **Disabled**: Opacity 50%, cursor not-allowed

---

### Card

Componente compound: `Card`, `CardHeader`, `CardContent`, `CardFooter`.

#### Base Styles

```
Card:
- bg: surface-elevated
- border: 1px solid surface-border
- border-radius: rounded-lg (8px)
- padding: space-6 (24px)

CardHeader:
- padding-bottom: space-4
- border-bottom: 1px solid surface-border (opcional)

CardContent:
- padding: space-4 0

CardFooter:
- padding-top: space-4
- border-top: 1px solid surface-border (opcional)
```

#### Variants de Card

| Variant | BG | Border | Sombra |
|---------|-----|--------|--------|
| **default** | `bg-surface-elevated` | `border-surface-border` | `shadow-card` |
| **interactive** (hover) | - | `hover:border-primary` | `hover:shadow-lg` |

#### Prop `as`

Card puede renderizarse como:
- `div` (default)
- `button` (para cards clickeables)
- `a` (para links)

---

### Badge

Componente para etiquetas y estados.

#### Variants

| Variant | BG | Texto | Border |
|---------|-----|-------|--------|
| **default** | `bg-accent` (turquesa) | negro | none |
| **outline** | transparent | `text-accent` | `border-accent` |
| **secondary** | `bg-surface-elevated` | `text-muted` | `border-surface-border` |

#### Default Styles

```
- padding: px-2 py-1
- border-radius: rounded-sm (2px)
- font: text-xs, font-bold, uppercase
- letter-spacing: tracking-wider
```

---

### Dialog

Componente compound para modales.

#### Estructura

```
DialogOverlay
  └─ DialogContent
      ├─ DialogHeader
      │   └─ DialogTitle
      ├─ (children)
      └─ DialogFooter
```

#### Overlay

```
- bg: black/70 (backdrop-blur-sm)
- position: fixed inset-0
- z-index: 50
- animation: fade-in 200ms
```

#### Content

```
- bg: surface-elevated
- border: 1px solid surface-border
- border-radius: rounded-xl (12px)
- max-width: 32rem (512px)
- width: calc(100% - 2rem)
- padding: space-6
- shadow: shadow-2xl
- animation: modal-enter 200ms
```

#### Comportamiento

- **Focus trap**: El foco queda atrapado dentro del modal
- **Escape**: Presionar ESC cierra el modal
- **Click outside**: Click en el overlay cierra el modal
- **ARIA**: `role="dialog"`, `aria-modal="true"`

---

### Section

Layout primitive para secciones de la página.

#### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `title` | string | - | Título de la sección (renderiza H2) |
| `children` | ReactNode | - | Contenido |
| `className` | string | - | Clases adicionales |

#### Comportamiento

- **Scroll reveal**: Usa IntersectionObserver para animar entrada
- **Animation**: `opacity: 0 → 1`, `translateY: 20px → 0`
- **Duration**: 800ms, easing: ease-out

---

## Ejemplos de Uso

### Card + Button

```tsx
<Card>
  <CardHeader>
    <h3>Próximo Evento</h3>
  </CardHeader>
  <CardContent>
    <p>Descripción del evento...</p>
  </CardContent>
  <CardFooter>
    <Button>Ver detalles</Button>
  </CardFooter>
</Card>
```

### Section con contenido

```tsx
<Section title="Nuestros Shows">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <Card>...</Card>
    <Card>...</Card>
    <Card>...</Card>
  </div>
</Section>
```

### Badge en lista

```tsx
<div className="flex gap-2">
  <Badge>Próximo</Badge>
  <Badge variant="outline">Agotado</Badge>
</div>
```

---

## Assets

### Logo

El logo de la murga debería estar disponible en:
- Formato SVG (preferido)
- Fondo transparente
- Versiones: full color, blanco, negro

### Iconografía

Usamos Lucide React para iconos (instalado como dependencia).

Iconos principales usados:
- Instagram
- YouTube  
- Spotify
- ChevronLeft / ChevronRight (carousel)
- ArrowUp (scroll to top)
- Calendar
- MapPin
- Clock

---

## Responsive Breakpoints

| Breakpoint | Width | Tailwind Prefix |
|------------|-------|-----------------|
| Mobile | < 640px | (default) |
| Tablet | ≥ 640px | `sm:` |
| Desktop | ≥ 768px | `md:` |
| Wide | ≥ 1024px | `lg:` |
| Extra Wide | ≥ 1280px | `xl:` |

---

## Accesibilidad

- **Focus visible**: Todos los componentes interactivos tienen ring de foco
- **Reduced motion**: Respetar `prefers-reduced-motion`
- **Color contrast**: Texto blanco sobre fondo oscuro (ratio > 7:1)
- **Keyboard navigation**: Todos los componentes navegables con teclado
- **ARIA labels**: Botones icono, modales, y elementos interactivos

---

## Notas para Diseño

1. **Estética carnaval**: La identidad es atrevida, con glows y animaciones. No temer a usar colores vibrantes.
2. **Dark mode only**: Esta web no tiene modo claro. Todo el design system asume fondo oscuro.
3. **Fuentes display**: Rye, Bungee y WC Mano Negra son fuentes con mucha personalidad. Usarlas con moderación (solo headings).
4. **Animaciones**: Las animaciones de glow (`murga-glow`) son parte de la identidad. Mantenerlas en títulos principales.
5. **Espaciado generoso**: La web tiene mucho aire entre secciones (80-120px). No compactar.

---

*Documento generado para handoff a Stitch/Figma*