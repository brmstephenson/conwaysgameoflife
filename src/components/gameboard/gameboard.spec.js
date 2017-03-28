'use strict';

describe('gameboard component', function() {
  beforeEach(angular.mock.module('conwaysApp'));

  let gridService, $componentController, $compile, $rootScope, $interval;

  beforeEach(inject(function(_$componentController_, _$compile_, _$rootScope_, _$interval_, _gridService_) {
    $componentController = _$componentController_;
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $interval = _$interval_;
    gridService = _gridService_;
  }));

  describe('gameboard directive', function(){
    let gameboardController, gameboardComponent;

    beforeEach(function() {
      gameboardController  = $componentController('cglGameboard', null, {rowSize: 3, columnSize: 2});
      gameboardComponent = $compile('<cgl-gameboard></cgl-gameboard>')($rootScope);
      $rootScope.$digest();
    });

    describe('initial state', function() {
      it('should set an initial row size', function() {
        const expectedRowSize = 3;

        const actualRowSize = gameboardController.rowSize;

        expect(actualRowSize).toEqual(expectedRowSize);
      });

      it('should set an initial row size', function() {
        const expectedColumnSize = 2;

        const actualRowSize = gameboardController.columnSize;

        expect(actualRowSize).toEqual(expectedColumnSize);
      });

      it('should set an initial grid', function() {
        gridService.createGrid(3, 2);

        const expectedGrid = gridService.grid;

        gameboardController.$onInit();
        $rootScope.$digest();

        const actualGrid = gameboardController.gameboard;

        expect(actualGrid).toEqual(expectedGrid);
      });

      describe('shouldClearfix(index) method', function() {
        it('should return false when it does not need to clear floats', function() {
          const expectedIndex = 0;
          const expectedValue = false;

          gameboardController.$onInit();
          $rootScope.$digest();

          const actualClearfixValue = gameboardController.shouldClearfix(expectedIndex);
          expect(actualClearfixValue).toEqual(expectedValue);
        });

        it('should return true when it needs to clear floats', function() {
          const expectedIndex = 1;
          const expectedValue = true;

          gameboardController.$onInit();
          $rootScope.$digest();

          const actualClearfixValue = gameboardController.shouldClearfix(expectedIndex);
          expect(actualClearfixValue).toEqual(expectedValue);
        });
      });

      describe('toggleCoordinate(rowIndex, columnIndex) method', function() {
        let expectedRowIndex, expectedColumnIndex;
        beforeEach(function() {
          expectedRowIndex = 0;
          expectedColumnIndex = 1;

          gameboardController.$onInit();
          $rootScope.$digest();
        });

        it('should change the only coordinate value to true', function() {
          const expectedGameboard = [
            [false, true],
            [false, false],
            [false, false]
          ];

          gameboardController.clickCoordinate(expectedRowIndex, expectedColumnIndex);

          const actualGameboard = gameboardController.gameboard;

          expect(actualGameboard).toEqual(expectedGameboard);
        });

        it('should change the only coordinate value to false', function() {
          const expectedGameboard = [
            [false, false],
            [false, false],
            [false, false]
          ];

          gameboardController.gameboard[expectedRowIndex][expectedColumnIndex] = true;

          gameboardController.clickCoordinate(expectedRowIndex, expectedColumnIndex);

          const actualGameboard = gameboardController.gameboard;

          expect(actualGameboard).toEqual(expectedGameboard);
        });
      });
    });

    xdescribe('start and stop simulation', function() {
      it('should start and stop the simulation', function() {
        gameboardController.startConwaysGameOfLife();

        $interval.flush(1000);

        gameboardController.stopConwaysGameOfLife();

        expect($intervalSpy.cancel.calls.count()).toBe(2);
      })
    })
  });
});