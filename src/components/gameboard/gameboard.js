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

function gameboardController(gridService, $interval, rulesService, $scope) {

  let conwaysGameOfLife;

  this.isGameboardSimulating = false;

  this.startConwaysGameOfLife = () => {
    this.isGameboardSimulating = true;

    conwaysGameOfLife = $interval(() => {
      rulesService.simulateIteration();
      this.gameboard = gridService.grid;
    }, 100);
  };

  this.stopConwaysGameOfLife = () => {
    this.isGameboardSimulating = false;

    if(angular.isDefined(conwaysGameOfLife)) {
      $interval.cancel(conwaysGameOfLife);
      conwaysGameOfLife = undefined;
    }
  };

  $scope.$on('$destroy', () => {
    this.stopConwaysGameOfLife();
  });

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
