'use strict';

describe('rules service', function() {
  beforeEach(angular.mock.module('conwaysApp'));

  let rulesService, gridService;

  beforeEach(inject(function(_rulesService_, _gridService_) {
    rulesService = _rulesService_;
    gridService = _gridService_;

  }));

  describe('shouldCellLive(rowIndex, columnIndex) method', function() {
    it('should not live due to underpopulation', function() {
      const expectedGrid = [
        [false, false, false],
        [false, true, false],
        [false, false, false]
      ];
      const expectedRowIndex = 1;
      const expectedColumnIndex = 1;
      const expectedValue = false;

      gridService.grid = expectedGrid;

      const actualValue = rulesService.shouldCellLive(expectedRowIndex, expectedColumnIndex);

      expect(actualValue).toEqual(expectedValue);
    });

    it('should not live due to overpopulation', function() {
      const expectedGrid = [
        [false, true, false],
        [false, true, true],
        [true, true, false]
      ];
      const expectedRowIndex = 1;
      const expectedColumnIndex = 1;
      const expectedValue = false;

      gridService.grid = expectedGrid;

      const actualValue = rulesService.shouldCellLive(expectedRowIndex, expectedColumnIndex);

      expect(actualValue).toEqual(expectedValue);
    });

    it('should live to the next generation', function() {
      const expectedGrid = [
        [false, true, false],
        [false, true, false],
        [true, false, false]
      ];
      const expectedRowIndex = 1;
      const expectedColumnIndex = 1;
      const expectedValue = true;

      gridService.grid = expectedGrid;

      const actualValue = rulesService.shouldCellLive(expectedRowIndex, expectedColumnIndex);

      expect(actualValue).toEqual(expectedValue);
    });
  });

  describe('shouldCellBeBorn method', function() {
    it('no cells should be born when there are not 3 surrounding live cells', function() {
      const expectedGrid = [
        [false, false, false],
        [false, false, false],
        [false, false, false]
      ];
      const expectedColumnIndex = 1;
      const expectedRowIndex = 1;
      const expectedValue = false;

      gridService.grid = expectedGrid;

      const actualValue = rulesService.shouldCellBeBorn(expectedRowIndex, expectedColumnIndex);

      expect(actualValue).toEqual(expectedValue);
    });

    it('cell should be born when there are 3 surrounding live cells', function() {
      const expectedGrid = [
        [false, true, false],
        [true, false, true],
        [false, false, false]
      ];
      const expectedColumnIndex = 1;
      const expectedRowIndex = 1;
      const expectedValue = true;

      gridService.grid = expectedGrid;

      const actualValue = rulesService.shouldCellBeBorn(expectedRowIndex, expectedColumnIndex);

      expect(actualValue).toEqual(expectedValue);
    });
  });

  describe('simulateIteration method', function() {
    it('should properly simulate an example iteration with only one live cell', function() {
      let startingGrid = [
        [false, false, false],
        [false, true, false],
        [false, false, false]
      ];

      const expectedGrid = [
        [false, false, false],
        [false, false, false],
        [false, false, false]
      ];

      gridService.grid = startingGrid;

      rulesService.simulateIteration();

      const actualGrid = gridService.grid;

      expect(actualGrid).toEqual(expectedGrid);
    });

    it('should properly simulate an example iteration when there is an example of overpopulation', function() {
      let startingGrid = [
        [true, true, true],
        [true, true, false],
        [false, false, false]
      ];

      const expectedValue = false;
      const exepctedRowIndex = 1;
      const exepctedColumnIndex = 1;

      gridService.grid = startingGrid;

      rulesService.simulateIteration();

      const actualGrid = gridService.grid;

      expect(actualGrid[exepctedRowIndex][exepctedColumnIndex]).toEqual(expectedValue);
    });

    it('should properly simulate an example iteration when there is an example of a surviving cell', function() {
      let startingGrid = [
        [true, true, true],
        [true, true, false],
        [false, false, false]
      ];

      const expectedValue = true;
      const exepctedRowIndex = 1;
      const exepctedColumnIndex = 0;

      gridService.grid = startingGrid;

      rulesService.simulateIteration();

      const actualGrid = gridService.grid;

      expect(actualGrid[exepctedRowIndex][exepctedColumnIndex]).toEqual(expectedValue);
    });

    it('should properly simulate an example iteration when there is an example grid', function() {
      let startingGrid = [
        [true, true, true],
        [true, true, false],
        [false, false, false]
      ];

      const expectedGrid = [
        [true, false, true],
        [true, false, true],
        [false, false, false]
      ];

      gridService.grid = startingGrid;

      rulesService.simulateIteration();

      const actualGrid = gridService.grid;

      expect(actualGrid).toEqual(expectedGrid);
    });

    it('should properly simulate an example iteration when a block pattern is given', function() {
      let expectedGrid = [
        [false, false, false, false],
        [false, true, true, false],
        [false, true, true, false],
        [false, false, false, false]
      ];

      gridService.grid = expectedGrid;

      rulesService.simulateIteration();

      const actualGrid = gridService.grid;

      expect(actualGrid).toEqual(expectedGrid);
    });
  })
});