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

    describe('start and stop simulation', function() {
      it('should run the simulation for one iteration', function() {
        let startingGrid = [
          [false, false, true],
          [false, false, false],
          [false, false, false],
        ];

        const expectedGrid = [
          [false, false, false],
          [false, false, false],
          [false, false, false]
        ];

        gridService.grid = startingGrid;

        gameboardController.toggleConwaysGameOfLife();

        $interval.flush(1100);

        const actualGrid = gameboardController.gameboard;

        expect(actualGrid).toEqual(expectedGrid);
      });

      it('should cancel the simulation when stopConwaysGameOfLife() is called', function() {
        let startingGrid = [
          [false, false, true],
          [false, false, false],
          [false, false, false],
        ];

        const expectedGrid = [
          [false, false, false],
          [false, false, false],
          [false, false, false]
        ];

        spyOn($interval, 'cancel');

        gridService.grid = startingGrid;

        gameboardController.toggleConwaysGameOfLife();

        $interval.flush(1100);

        gameboardController.toggleConwaysGameOfLife();

        expect($interval.cancel).toHaveBeenCalled();
      });

      it('should set the isGameSimulating flag when the simulation runs', function() {
        const expectedGrid = [
          [false, false, false],
          [false, false, false],
          [false, false, false]
        ];

        gridService.grid = expectedGrid;

        gameboardController.toggleConwaysGameOfLife();

        expect(gameboardController.isGameboardSimulating).toBe(true);
      });

      it('should return the start text if the simulation is not running', function() {
        const expectedText = 'Start';

        const actualText = gameboardController.getToggleButtonText();

        expect(actualText).toEqual(expectedText);
      });

      it('should return the start text if the simulation is not running', function() {
        const expectedText = 'Stop';

        gameboardController.toggleConwaysGameOfLife();

        const actualText = gameboardController.getToggleButtonText();

        expect(actualText).toEqual(expectedText);
      });
    });
  });
});