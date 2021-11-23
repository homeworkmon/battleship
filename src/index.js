import displayController from './dom/listeners.js';
import { renderPage }from './dom/render.js';
import { gameLoop } from './game.js';

renderPage();
displayController();
gameLoop();

// get started on game loop