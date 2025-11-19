# Arquitectura del Proyecto - Correla Voz

Este documento describe la arquitectura técnica, las decisiones de diseño y las herramientas utilizadas en la construcción de la página web de la Murga Correla Voz.

## 1. Stack Tecnológico

*   **Lenguaje Principal:** [TypeScript](https://www.typescriptlang.org/) (TSX). Se utiliza tipado estático para garantizar la robustez del código y mejorar la experiencia de desarrollo (autocompletado y detección de errores).
*   **Librería de UI:** [React](https://react.dev/) (v19). Se utiliza el paradigma de **Componentes Funcionales** y **Hooks**.
*   **Estilos:**
    *   [Tailwind CSS](https://tailwindcss.com/) (vía CDN) para el estilizado utilitario rápido y responsivo.
    *   **CSS Nativo (`<style>` en index.html):** Para animaciones complejas (`keyframes`), fuentes personalizadas y efectos específicos (como el borde de luces de carnaval o el efecto Ken Burns).
*   **Gestión de Paquetes/Módulos:** El proyecto utiliza módulos ES6 nativos (`type="module"`) y un `importmap` para la resolución de dependencias de React en el navegador, sin necesidad de un paso de compilación pesado (bundling) tradicional para desarrollo rápido.

## 2. Patrones de Diseño y Paradigmas

### Arquitectura "Config-Driven UI" (UI Conducida por Configuración)
La característica arquitectónica más importante de esta aplicación es la separación total entre la lógica de presentación (código React) y el contenido (datos).
*   **Fuente de la Verdad:** El archivo `config.json` en la raíz actúa como una base de datos ligera y CMS (Content Management System).
*   **Beneficio:** Permite que personas sin conocimientos de programación actualicen fechas, fotos, textos y enlaces simplemente editando un archivo JSON, sin riesgo de romper la lógica de la aplicación.

### Diseño Atómico y Modularización
La aplicación está estructurada en componentes pequeños y reutilizables:
*   **Átomos:** `Section.tsx` (contenedor genérico con animación de entrada), iconos en `constants.tsx`.
*   **Moléculas:** `EventModal.tsx` (modal de detalle), tarjetas de álbumes en `PhotosSection`.
*   **Organismos:** Las secciones principales (`AboutSection`, `CalendarSection`, `Header`).

### React Hooks
Se hace un uso intensivo de Hooks para la gestión del estado y ciclo de vida:
*   `useState`: Manejo de carga, errores, modales abiertos y datos de configuración.
*   `useEffect`: Para efectos secundarios como llamadas `fetch` al `config.json`, detección de scroll y redimensionamiento.
*   `useMemo`: Para cálculos costosos o derivados, como filtrar y ordenar eventos del calendario o calcular la posición de los confetis, evitando re-renderizados innecesarios.
*   `useRef`: Para referencias directas al DOM, crucial para el scroll horizontal del carrusel de fotos.

## 3. Estructura de Directorios

*   `/`: Archivos raíz de configuración y punto de entrada (`index.html`, `App.tsx`).
*   `/components`: Contiene todos los componentes de React aislados por funcionalidad.
*   `/assets`: (Referenciado en el código) Imágenes estáticas.
*   `types.ts`: Definiciones de tipos TypeScript compartidas (Interfaces para `EventItem`, `AlbumItem`, `ConfigData`, etc.).
*   `config.json`: El archivo de datos dinámicos.

## 4. Flujo de Datos

1.  Al cargar la aplicación (`App.tsx`), un `useEffect` ejecuta un `fetch('/config.json')`.
2.  La aplicación muestra un estado de "Cargando...".
3.  Una vez recibido el JSON, se valida implícitamente con las interfaces de `types.ts` y se guarda en el estado.
4.  Los datos se distribuyen a los componentes hijos (`Header`, `CalendarSection`, etc.) a través de `props`.

## 5. Características Técnicas Destacadas

*   **Lógica de Calendario:** Algoritmo en `CalendarSection` que filtra eventos pasados (más de 48hs), ordena los futuros y determina cuál es el "Próximo" basándose en la fecha/hora actual y la duración estimada.
*   **Carrusel Inteligente:** `PhotosSection` calcula automáticamente qué álbum es más cercano a la fecha actual y centra el scroll en él al cargar.
*   **Efectos Visuales:** Uso de animaciones CSS avanzadas para lograr la estética "Carnavalesca" (luces de neón, bordes parpadeantes, confeti generado proceduralmente).
