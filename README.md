# Correla Voz 🌟

El sitio web oficial de **Correla Voz**, una murga comunitaria de Tandil, Buenos Aires, Argentina. Un espacio para compartir eventos, ensayos, fotos y conocer más sobre nuestra historia.

> _"El fuego del carnaval vivo. 11 años de alegría y arte, llevando crítica, alegría y abrazo comunitario a todes. Hacemos que se prendan los bombos, el baile y la garganta para decir lo que otros callan."_

## 🚀 Inicio Rápido

### Requisitos Previos

- [Node.js](https://nodejs.org/) (v18 o superior)

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/manuarias/Correla-Voz---web.git
cd Correla-Voz---web

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Build para Producción

```bash
npm run build
npm run preview
```

## 📁 Estructura del Proyecto

```
├── components/          # Componentes React
│   ├── ui/              # Componentes UI reutilizables
│   └── *.tsx            # Secciones y componentes principales
├── hooks/               # Custom React hooks
├── lib/                 # Utilidades y funciones helpers
├── config.json          # Configuración de contenido (eventos, links, etc.)
└── index.css            # Estilos globales y tema de Tailwind
```

## 🎨 Tech Stack

- **React 19** - Framework UI
- **TypeScript** - Tipado estático
- **Tailwind CSS v4** - Estilos con CSS-first configuration
- **Vite** - Bundler y servidor de desarrollo

## ✏️ Editar Contenido

El contenido del sitio (eventos, links, fotos) se gestiona desde `config.json`:

```json
{
  "importantLinks": [...],
  "calendarEvents": [...],
  "photoAlbums": [...],
  "socialLinks": [...],
  "aboutSection": {...}
}
```

## 🤝 Contribuir

1. Haz un fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-feature`)
3. Commit tus cambios (`git commit -m 'Agregar nueva feature'`)
4. Push a la rama (`git push origin feature/nueva-feature`)
5. Abre un Pull Request

## 📜 Licencia

Este proyecto es privado y no está disponible bajo ninguna licencia de código abierto.

---

**¿Querés sumarte a la murga?** Visitá nuestra sección de [contacto](https://www.instagram.com/correla_voz/) en Instagram.
