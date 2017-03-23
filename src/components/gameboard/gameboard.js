'use strict';

import gameboardTemplate from './gameboard.html';

const gameboardComponent = {
  template: gameboardTemplate,
  controller: gameboardController
};

function gameboardController(gridService) {
  this.rowSize = 4;
  this.columnSize = 4;

  gridService.createGrid(this.rowSize, this.columnSize);

  this.gameboard = gridService.grid;

  this.shouldClearfix = index => index + 1 === this.columnSize;
}

angular.module('conwaysApp').component('cglGameboard', gameboardComponent);
