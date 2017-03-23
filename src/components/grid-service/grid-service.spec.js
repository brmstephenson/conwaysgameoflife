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
        expectedColumn;
    
    beforeEach(function() {
      expectedValue = true;
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

      const actualValue = gridService.grid[expectedRow][expectedColumn];

      expect(actualValue).toEqual(expectedValue);
    });

    it('should toggle a coordinate on the grid', function() {
      gridService.toogleCoordinate(expectedRow, expectedColumn);

      expect(gridService.grid[expectedRow][expectedColumn]).toEqual(expectedValue);
    });
  });
});