'use strict';

import _ from 'lodash';

function rulesService(gridService) {
  this.shouldCellDie = (rowIndex, columnIndex) => {
    const surroundingCoordinates = gridService.getSurroundingCoordinates(rowIndex, columnIndex);

    const aliveCells = _.filter(surroundingCoordinates, (cell) => cell.value === true);

    return aliveCells.length < 2 || aliveCells.length > 3
  };

  this.shouldCellBeBorn = (rowIndex, columnIndex) => {
    const surroundingCoordinates = gridService.getSurroundingCoordinates(rowIndex, columnIndex);

    const aliveCells = _.filter(surroundingCoordinates, (cell) => cell.value === true);

    return aliveCells.length === 3;
  };

}

angular.module('conwaysApp').service('rulesService', rulesService);