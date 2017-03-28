'use strict';

import _ from 'lodash';

function rulesService(gridService) {
  this.shouldCellLive = (rowIndex, columnIndex) => {
    const surroundingCoordinates = gridService.getSurroundingCoordinates(rowIndex, columnIndex);

    const aliveCells = _.filter(surroundingCoordinates, (cell) => cell.value === true);

    return aliveCells.length === 2 || aliveCells.length === 3
  };

  this.shouldCellBeBorn = (rowIndex, columnIndex) => {
    const surroundingCoordinates = gridService.getSurroundingCoordinates(rowIndex, columnIndex);

    const aliveCells = _.filter(surroundingCoordinates, (cell) => cell.value === true);

    return aliveCells.length === 3;
  };

  this.simulateIteration = () => {
    let newGrid = [[]];

    for(let rowIndex = 0; rowIndex < gridService.getRowSize(); rowIndex++) {
      newGrid[rowIndex] = [];
      for(let columnIndex = 0; columnIndex < gridService.getColumnSize(); columnIndex++) {
        let cellNewValue = false;
        let currentCell = gridService.getCoordinate(rowIndex, columnIndex);

        if(currentCell === true) {
          cellNewValue = this.shouldCellLive(rowIndex, columnIndex);
        } else {
          cellNewValue = this.shouldCellBeBorn(rowIndex, columnIndex);
        }

        newGrid[rowIndex][columnIndex] = cellNewValue;
      }
    }

    gridService.grid = newGrid;
  }

}

angular.module('conwaysApp').service('rulesService', rulesService);