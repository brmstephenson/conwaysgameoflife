'use strict';

describe('rules service', function() {
  beforeEach(angular.mock.module('conwaysApp'));

  let rulesService, gridService;

  beforeEach(inject(function(_rulesService_, _gridService_) {
    rulesService = _rulesService_;
    gridService = _gridService_;

  }));

  describe('shouldCellDie(rowIndex, columnIndex) method', function() {
    it('should die due to underpopulation', function() {
      const expectedGrid = [
        [false, false, false],
        [false, true, false],
        [false, false, false]
      ];
      const expectedRowIndex = 1;
      const expectedColumnIndex = 1;
      const expectedValue = true;

      gridService.grid = expectedGrid;

      const actualValue = rulesService.shouldCellDie(expectedRowIndex, expectedColumnIndex);

      expect(actualValue).toEqual(expectedValue);
    });

    it('should die due to overpopulation', function() {
      const expectedGrid = [
        [false, true, false],
        [false, true, true],
        [true, true, false]
      ];
      const expectedRowIndex = 1;
      const expectedColumnIndex = 1;
      const expectedValue = true;

      gridService.grid = expectedGrid;

      const actualValue = rulesService.shouldCellDie(expectedRowIndex, expectedColumnIndex);

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
      const expectedValue = false;

      gridService.grid = expectedGrid;

      const actualValue = rulesService.shouldCellDie(expectedRowIndex, expectedColumnIndex);

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
});