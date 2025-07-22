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
- Unity
- Node
- Express

-----
## Instalacion del aplicativo web (Frontend)

Se debe tener instalado node.js v16, npm y git (opcional para clonar el repositorio)

Entra a la carpeta del proyecto (puedes usar el comando: cd bazar-n-sanity)

Se instala las dependencias (npm install)

Se inicia el servidor de desarrollo (npm run dev)

## Instalacion del aplicativo web (Backend)

Se debe tener instalado node.js v16, npm y git (opcional para clonar el repositorio)

Entrar a la carpeta Backend (puedes usar el comando: cd backend)

Se instala las dependencias (npm install)

Se inicia el servidor de desarrollo (npm run dev)

Se debe hacer el proceso tanto en el frontend como en el backend para usar correctamente el aplicativo web

-----
## ESTRUCTURA DEL PROYECTO
- backend Todo lo relacionado con el backend (validaciones, creacion de tablas, modulo de sql, controladores)
- public Todo lo que tiene que ver con imagenes del aplicativo y sprites de los minijuegos
- src/
    assets Almacena fondos de juegos, iconos de monedas del aplicativo y fuentes

    hooks Relacionado a la estructura para almacenar el inventario

    Components Estructura base de minijuegos, vista del inventario, navegacion y lo relacionado a el bazar

    Context Manejo de la economia y el inventario

    Flappy Bird Relacionado al minijuego Crash Flap

    Pages Paginas en las que se pueden navegar, la vista de cada isla y su respectiva exploracion (vista de minijuegos)

    Utils Relacionado a las palabras usadas en el minijuego de Wordle

- App.tsx Rutas de cada archivo que hay en el proyecto

## FUNCIONALIDADES

- Sistema de Login y registro
- Exploracion de islas (Isla wumpa e isla de tesoros perdidos)
- Minijuegos Crash Wordle, Crash Flap, Fruit Catcher y Ruleta
- Sistema de recompensas por desempeño, puede ganar frutas wumpa,  cristales o reliquias
- Personalizacion de mascaras
- Desafio Contrarreloj

