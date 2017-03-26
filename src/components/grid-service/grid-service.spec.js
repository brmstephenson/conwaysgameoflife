'use strict';

describe('grid service', function() {
  beforeEach(angular.mock.module('conwaysApp'));
    
  let gridService, startingFakeGrid;
    
  beforeEach(inject(function(_gridService_) {
    gridService = _gridService_;
  }));
  
  beforeEach(function() {
    startingFakeGrid = [[false, false, false], [false, false, false]];
  });
    
  it('should have an empty grid by default', function() {
    const expectedGrid = [[]];
    
    expect(gridService.grid).toEqual(expectedGrid);
  });
  
  it('should create a grid based on the given size', function() {
    const expectedNumberOfRows = 2;
    const expectedNumberOfColumns = 3;

    gridService.createGrid(expectedNumberOfRows, expectedNumberOfColumns);
   
    expect(gridService.grid).toEqual(startingFakeGrid);
  });
  
  describe('get set and toggle coordinates on the grid', function(){
    let expectedValue,
        expectedRow,
        expectedColumn,
        expectedGrid;
    
    beforeEach(function() {
      expectedValue = true;
      expectedGrid = angular.copy(startingFakeGrid);
      expectedGrid[0][1] = true;
      expectedRow = 0;
      expectedColumn = 1;
      
      gridService.grid = startingFakeGrid;
    });
    
    it('should get a coordinate on the grid', function() {
      gridService.grid[expectedRow][expectedColumn] = expectedValue;

      const actualValue = gridService.getCoordinate(expectedRow, expectedColumn);

      expect(actualValue).toEqual(expectedValue);
    });

    it('should set a coordinate on the grid', function() {
      gridService.setCoordinate(expectedRow, expectedColumn, expectedValue);

      const actualGrid = gridService.grid;

      expect(actualGrid).toEqual(expectedGrid);
    });

    it('should toggle a coordinate on the grid', function() {
      gridService.toggleCoordinate(expectedRow, expectedColumn);

      const actualGrid = gridService.grid;

      expect(actualGrid).toEqual(expectedGrid);
    });
  });

  describe('get size of grid', function() {
    beforeEach(function() {
      gridService.createGrid(2,4);
    });

    it('should get the row size of the grid', function() {
      const expectedRowSize = 2;

      const actualRowSize = gridService.getRowSize();

      expect(actualRowSize).toEqual(expectedRowSize);
    });

    it('should get the row size of the grid', function() {
      const expectedColumnSize = 4;

      const actualRowSize = gridService.getColumnSize();

      expect(actualRowSize).toEqual(expectedColumnSize);
    });
  });
});