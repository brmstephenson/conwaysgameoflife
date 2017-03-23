'use strict';

describe('gameboard component', function() {
  beforeEach(angular.mock.module('conwaysApp'));

  let gridService, $componentController;

  beforeEach(inject(function(_$componentController_, _gridService_) {
    $componentController = _$componentController_;
    gridService = _gridService_;
  }));

  describe('gameboard controller', function(){
    let gameboardController;

    beforeEach(function() {
      gameboardController  = $componentController('cglGameboard');
    });

    describe('initial state', function(){
      it('should set an initial row size', function() {
        const expectedRowSize = 4;

        const actualRowSize = gameboardController.rowSize;

        expect(actualRowSize).toEqual(expectedRowSize);
      });

      it('should set an initial row size', function() {
        const expectedColumnSize = 4;

        const actualRowSize = gameboardController.columnSize;

        expect(actualRowSize).toEqual(expectedColumnSize);
      });

      it('should set an initial grid', function() {
        gridService.createGrid(4, 4);

        const expectedGrid = gridService.grid;

        const actualGrid = gameboardController.gameboard;

        expect(actualGrid).toEqual(expectedGrid);
      });

      describe('shouldClearfix() method', function() {
        let fakeGrid;

        beforeEach(function() {
          gridService.createGrid(4,5);
          fakeGrid = gridService.grid;
        });

        it('should return false when it does not need to clear floats', function() {
          const expectedIndex = 2;
          const expectedValue = false;

          const actualClearfixValue = gameboardController.shouldClearfix(expectedIndex);
          expect(actualClearfixValue).toEqual(expectedValue);
        });

        it('should')
      });
    });
  });
});