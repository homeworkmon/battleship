import displayController from './src/dom/listeners.js';
import { renderPage }from './src/dom/render.js';
import { gameLoop } from './src/game.js';

renderPage();
displayController();
gameLoop();

// get started on game loop