'use strict';

function gridService() {
  this.grid = [[]];

  this.createGrid = (rowSize, columnSize) => {
    for (let i = 0; i < rowSize; i++) {
      this.grid[i] = [];
      for (let j = 0; j < columnSize; j++) {
        this.grid[i][j] = false;
      }
    }
  };

  this.toggleCoordinate = (rowIndex, columnIndex) => {
    this.grid[rowIndex][columnIndex] = !this.grid[rowIndex][columnIndex];
  };

  this.getCoordinate = (row, column) => this.grid[row][column];

  this.setCoordinate = (row, column, value) => {
    this.grid[row][column] = value;
  };

  this.getRowSize = () => this.grid.length;

  this.getColumnSize = () => this.grid[0].length;
}

angular.module('conwaysApp').service('gridService', gridService);