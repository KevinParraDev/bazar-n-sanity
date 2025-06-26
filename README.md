# BAZAR N SANITY Equipo 22 DEV WEB

Aplicativo web inspirado en el universo colorido y caótico de Crash Bandicoot

---
## Integrantes

- Kevin Santiago Parra Romero
- Juan Jose Marin Alvarez
- Juan Esteban Gomez Acero
- Jhon Jader Córdoba Magaña

-----
## Tecnologia utilizada

- React + Typescript
- Vite
- Css

-----
## Instalacion del aplicativo web

Se debe tener instalado node.js v16, npm y git (opcional para clonar el repositorio)

Entra a la carpeta del proyecto (puedes usar el comando: cd bazar-n-sanity)

Se instala las dependencias (npm install)

Se inicia el servidor de desarrollo (npm run dev)


## ESTRUCTURA DEL PROYECTO

- login #Todo lo relacionado con Login y registro de usuarios
- public Todo lo que tiene que ver con imagenes del aplicativo y sprites de los minijuegos
- src/
    Components # Estructura base de minijuegos, vista del inventario, navegacion y lo relacionado a el bazar

    Context # Manejo de la economia y el inventario

    Flappy Bird # Relacionado al minijuego Crash Flap

    Pages # Paginas en las que se pueden navegar, la vista de cada isla y su respectiva exploracion (vista de minijuegos)

    Utils # Relacionado a las palabras usadas en el minijuego de Wordle

- App.tsx Rutas de cada archivo que hay en el proyecto

## FUNCIONALIDADES

- Sistema de Login y registro
- Exploracion de islas (Isla wumpa e isla de tesoros perdidos)
- Minijuegos Crash Wordle, Crash Flap, Fruit Catcher y Ruleta
- Sistema de recompensas por desempeño, puede ganar frutas wumpa,  cristales o reliquias
- Personalizacion de mascaras
- Desafio Contrarreloj

