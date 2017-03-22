angular.module('conwaysApp').service('gridService', gridService);

function gridService() {
  this.grid = [[]];
  
  this.createGrid = (rowSize, columnSize) => {
    const column = _.fill(Array(columnSize), false);
    this.grid = _.fill(Array(rowSize), column);
  };
  
  this.toogleCoordinate = (row, column) => {
    this.grid[row][column] = !this.grid[row][column];
  }
  
  this.getCoordinate = (row, column) => this.grid[row][column];
  
  this.setCoordinate = (row, column, value) => {
    this.grid[row][column] = value;
  }
}
