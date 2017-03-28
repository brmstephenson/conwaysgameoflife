'use strict';

function gridService() {
  this.grid = [[]];

  const createCoordinateObject = (rowIndex, columnIndex) => {
    return {
      rowIndex: rowIndex,
      columnIndex: columnIndex,
      value: this.grid[rowIndex][columnIndex]
    }
  };

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

  this.getSurroundingCoordinates = (rowIndex, columnIndex) => {
    const rowLength = this.grid.length;
    const columnLength = this.grid[0].length;

    let surroundingCoordinates = [];

    // Column Index - 1
    if(columnIndex - 1 >= 0) {
      if(rowIndex - 1 >= 0) {
        surroundingCoordinates.push(createCoordinateObject(rowIndex - 1, columnIndex -1));
      }
      surroundingCoordinates.push(createCoordinateObject(rowIndex, columnIndex - 1));

      if(rowIndex + 1 < rowLength) {
        surroundingCoordinates.push(createCoordinateObject(rowIndex + 1, columnIndex - 1));
      }
    }

    // Column Index the same
    if(rowIndex - 1 >= 0) {
      surroundingCoordinates.push(createCoordinateObject(rowIndex - 1, columnIndex));
    }

    if(rowIndex + 1 < rowLength) {
      surroundingCoordinates.push(createCoordinateObject(rowIndex + 1, columnIndex));
    }

    // Column Index + 1
    if(columnIndex + 1 < columnLength) {
      if(rowIndex - 1 >= 0){
        surroundingCoordinates.push(createCoordinateObject(rowIndex - 1, columnIndex + 1));
      }
      surroundingCoordinates.push(createCoordinateObject(rowIndex, columnIndex + 1));

      if(rowIndex + 1 < rowLength) {
        surroundingCoordinates.push(createCoordinateObject(rowIndex + 1, columnIndex + 1));
      }
    }

    return surroundingCoordinates;
  };

  this.getRowSize = () => this.grid.length;

  this.getColumnSize = () => this.grid[0].length;
}

angular.module('conwaysApp').service('gridService', gridService);