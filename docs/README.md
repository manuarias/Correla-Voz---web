# Correla Voz - Sitio Web Oficial

Esta es la aplicación web para la murga **Correla Voz**. Es una Single Page Application (SPA) moderna, rápida y diseñada para ser visualmente impactante, reflejando la estética del carnaval.

## Características Principales

*   **Calendario de Eventos:** Muestra las próximas fechas ordenadas cronológicamente. Destaca automáticamente el próximo evento y oculta los que ya pasaron hace más de 48 horas.
*   **Galería de Fotos:** Un carrusel interactivo que enlaza a álbumes de Google Photos. Se centra automáticamente en el álbum más reciente.
*   **Información de la Murga:** Sección de historia ("Nuestra Esencia"), reseñas y datos de contacto.
*   **Info de Ensayos:** Muestra horarios y ubicación con integración a Google Maps.
*   **Enlaces Importantes:** Acceso rápido a redes sociales (Instagram, YouTube, Spotify).

## Cómo actualizar el contenido

No es necesario tocar el código fuente para actualizar la información de la web. Todo el contenido se gestiona a través del archivo `config.json` ubicado en la raíz del proyecto.

### Estructura del `config.json`

1.  **`calendarEvents`**: Lista de presentaciones.
    *   Formato de fecha: "YYYY-MM-DD".
    *   Si el evento no tiene hora, borrar el campo `"time"`.
2.  **`photoAlbums`**: Lista de álbumes.
    *   `imageUrl`: URL de la foto de portada.
    *   `albumUrl`: Enlace al álbum de Google Photos.
    *   `date`: Texto libre (ej: "15 de Noviembre, 2025").
3.  **`aboutSection`**:
    *   `review`: Texto corto de presentación.
    *   `history`: Lista de bloques que pueden ser texto o imagen para contar la historia.
    *   `rehearsalSchedule` y `rehearsalLocation`: Datos del ensayo.

## Instalación y Ejecución

Este proyecto utiliza tecnologías web estándar.

1.  Asegúrate de tener los archivos en tu servidor web.
2.  El punto de entrada es `index.html`.
3.  Al ser una aplicación basada en módulos ES, debe servirse a través de un servidor HTTP (no funciona abriendo el archivo `index.html` directamente desde el explorador de archivos debido a políticas de CORS con los módulos).

## Estética

El diseño utiliza una paleta oscura con acentos en **Rojo**, **Turquesa** y **Amarillo**. Las fuentes utilizadas son *Bungee* (títulos), *Rye* (encabezado principal) y *Inter* (texto legible), cargadas desde Google Fonts.
