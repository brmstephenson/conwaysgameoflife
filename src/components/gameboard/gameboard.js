'use strict';

import gameboardTemplate from './gameboard.html';

const gameboardComponent = {
  bindings: {
    rowSize: '<',
    columnSize: '<'
  },
  template: gameboardTemplate,
  controller: gameboardController
};

function gameboardController(gridService) {
  this.shouldClearfix = index => index + 1 === this.columnSize;

  this.clickCoordinate = (rowIndex, columnIndex) => {
    gridService.toggleCoordinate(rowIndex, columnIndex);
  };

  this.$onInit = () => {
    this.gameboard = [[]];
    gridService.createGrid(this.rowSize, this.columnSize);

    this.gameboard = gridService.grid;
  };
}

angular.module('conwaysApp').component('cglGameboard', gameboardComponent);
