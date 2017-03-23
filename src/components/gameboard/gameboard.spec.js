'use strict';

describe('gameboard component', function() {
  beforeEach(angular.mock.module('conwaysApp'));

  let gridService, $componentController, $compile, $rootScope;

  beforeEach(inject(function(_$componentController_, _$compile_, _$rootScope_, _gridService_) {
    $componentController = _$componentController_;
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    gridService = _gridService_;
  }));

  describe('gameboard directive', function(){
    let gameboardController, gameboardComponent;

    beforeEach(function() {
      gameboardController  = $componentController('cglGameboard', null, {rowSize: 4, columnSize: 3});
      gameboardComponent = $compile('<cgl-gameboard></cgl-gameboard>')($rootScope);
      $rootScope.$digest();
    });

    describe('initial state', function() {
      it('should set an initial row size', function() {
        const expectedRowSize = 4;

        const actualRowSize = gameboardController.rowSize;

        expect(actualRowSize).toEqual(expectedRowSize);
      });

      it('should set an initial row size', function() {
        const expectedColumnSize = 3;

        const actualRowSize = gameboardController.columnSize;

        expect(actualRowSize).toEqual(expectedColumnSize);
      });

      it('should set an initial grid', function() {
        gridService.createGrid(4, 3);

        const expectedGrid = gridService.grid;

        gameboardController.$onInit();
        $rootScope.$digest();

        const actualGrid = gameboardController.gameboard;

        expect(actualGrid).toEqual(expectedGrid);
      });

      describe('shouldClearfix() method', function() {
        it('should return false when it does not need to clear floats', function() {
          const expectedIndex = 1;
          const expectedValue = false;

          gameboardController.$onInit();
          $rootScope.$digest();

          const actualClearfixValue = gameboardController.shouldClearfix(expectedIndex);
          expect(actualClearfixValue).toEqual(expectedValue);
        });

        it('should return true when it needs to clear floats', function() {
          const expectedIndex = 2;
          const expectedValue = true;

          gameboardController.$onInit();
          $rootScope.$digest();

          const actualClearfixValue = gameboardController.shouldClearfix(expectedIndex);
          expect(actualClearfixValue).toEqual(expectedValue);
        });
      });
    });
  });
});