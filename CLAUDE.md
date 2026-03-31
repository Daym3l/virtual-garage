@AGENTS.md

---

# Web Design Guidelines

Este proyecto sigue un sistema de diseño visual con reglas concretas de color, tipografía y espaciado. Aplica estas reglas SIEMPRE al crear o modificar componentes UI.

---

## 1. COLOR

### Estrategias de paleta
- **Monocromático:** un solo matiz variado en luminosidad/saturación. Usar por defecto.
- **Complementario:** dos colores opuestos (~180°). Regla: 80% primario + 20% acento (solo CTAs, alertas, badges).
- **Análogo:** tres colores contiguos (~30° entre cada uno). Un dominante, uno de soporte, uno de acento suave.

### Tokens de color del proyecto
```css
:root {
  --color-primary:       hsl(220, 70%, 50%);   /* #4285F4 */
  --color-primary-dark:  hsl(220, 70%, 20%);   /* #1565C0 */
  --color-primary-light: hsl(220, 70%, 90%);

  --color-accent:   hsl(280, 55%, 45%);   /* #9C27B0 */
  --color-info:     hsl(174, 100%, 29%);  /* #009688 */

  --color-neutral-50:  hsl(220, 15%, 97%);  /* #F5F5F5 fondo */
  --color-neutral-100: hsl(220, 12%, 93%);
  --color-neutral-300: hsl(220, 10%, 75%);
  --color-neutral-500: hsl(220, 8%,  50%);
  --color-neutral-700: hsl(220, 8%,  30%);
  --color-neutral-900: hsl(220, 10%, 10%);

  --color-success: hsl(123, 43%, 48%);  /* #4CAF50 */
  --color-warning: hsl(36,  100%, 50%); /* #FF9800 */
  --color-error:   hsl(6,   78%,  57%); /* #E74C3C */
}
```

### Reglas
- Todos los colores usan tokens `var(--color-*)`. Nunca hardcoded hex/rgb.
- Los colores semánticos (success/error/warning) no se mezclan con el color de marca.
- Contraste texto/fondo debe cumplir WCAG AA (ratio ≥ 4.5:1 para body).

---

## 2. TIPOGRAFÍA

### Fuente
- **Inter** — única familia tipográfica del proyecto.

### Escala (proporción Perfect Fourth ~1.333)
| Rol       | Token            | Tamaño | line-height | font-weight |
|-----------|------------------|--------|-------------|-------------|
| Display   | `--fs-display`   | 48px   | 1.1         | 700         |
| Heading   | `--fs-heading`   | 32px   | 1.25        | 600         |
| Body      | `--fs-body`      | 18px   | 1.6         | 400         |
| Caption   | `--fs-caption`   | 14px   | 1.4         | 400         |

### Reglas
- Solo los 4 tamaños definidos. Nunca tamaños intermedios aleatorios.
- Una sola familia tipográfica. El contraste se logra con `font-weight`, no con otra fuente.

---

## 3. ESPACIADO (Grid de 8px)

Todo margen, padding, gap o tamaño dimensional debe ser **múltiplo de 8**.

| Token        | Valor | Uso típico                                      |
|--------------|-------|-------------------------------------------------|
| `--space-1`  | 4px   | Solo interior de componente (gap icono/label)   |
| `--space-2`  | 8px   | Padding interno mínimo, gaps inline             |
| `--space-3`  | 16px  | Padding botones, gaps entre ítems               |
| `--space-4`  | 24px  | Padding cards, separación entre secciones       |
| `--space-5`  | 32px  | Separación entre bloques                        |
| `--space-6`  | 48px  | Separación entre secciones grandes              |
| `--space-7`  | 64px  | Hero padding, layout                            |
| `--space-8`  | 96px  | Separaciones muy grandes                        |

`--space-1` (4px) es la única excepción al grid. Nunca para márgenes externos.

---

## 4. FLUJO AL DISEÑAR

Antes de codificar cualquier componente UI:
1. Verificar que usa los tokens de color del proyecto.
2. Verificar que los tamaños de fuente son los 4 de la escala.
3. Verificar que paddings/margins son múltiplos de 8.
4. Verificar contraste WCAG AA.

---

## 5. DISEÑO GENERAL

- Border radius: **12px** para cards y contenedores, **8px** para elementos internos, **10px** para botones/inputs.
- Material Design 3 como referencia de sistema de componentes.
- Responsive: móvil (1 col), tablet (2 col), desktop (sidebar fijo + contenido máx 1200px).
