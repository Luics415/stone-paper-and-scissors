# Piedra, Papel y Tijeras

Un juego clásico de piedra, papel y tijeras desarrollado con HTML, CSS y JavaScript. El usuario elige una opción y compite contra la computadora en una partida rápida y sencilla.

## Descripción

Este proyecto es una pequeña aplicación web para jugar al juego tradicional de piedra, papel y tijeras. La interfaz muestra:

- la elección del jugador
- la elección de la computadora
- el marcador de puntos
- mensajes de resultado como "YOU WIN!" o "COMPUTER WINS!"

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript

## Cómo jugar

1. Abre la aplicación en tu navegador.
2. Selecciona una opción:
   - `STONE`
   - `PAPER`
   - `SCISSORS`
3. La computadora elegirá al azar una opción.
4. Se actualizará el marcador y aparecerá el resultado.

## Ejecución local

Puedes abrir el archivo directamente en el navegador o ejecutarlo con un servidor local.

### Opción 1: abrir directamente

Simplemente abre [src/index.html](src/index.html) en tu navegador.

### Opción 2: usar un servidor local

Desde la carpeta del proyecto, ejecuta:

```bash
python -m http.server 8000
```

Luego abre en tu navegador:

```text
http://127.0.0.1:8000/src/index.html
```

## Estructura del proyecto

```text
stone-paper-and-scissors/
├── README.md
├── LICENSE.txt
└── src/
    ├── index.html
    ├── script.js
    └── style.css
```

## Características

- Interfaz simple y responsiva
- Animación al hacer una jugada
- Lógica de puntaje en tiempo real
- Sin dependencias externas necesarias

## Mejoras futuras

- agregar un botón de reinicio
- contar mejores de 3 o 5 rondas
- agregar sonido y efectos visuales
- implementar un modo de dificultad

<img width="1905" height="949" alt="image" src="https://github.com/user-attachments/assets/98f0995c-64fa-48ab-9814-ecabfac20046" />


## Licencia

Este proyecto se distribuye bajo la licencia incluida en [LICENSE.txt](LICENSE.txt).

## Créditos

Proyecto basado en un ejercicio clásico de JavaScript, adaptado para ejecución local y publicación en GitHub.

