import * as Helpers from './../Utils/Helpers';

it('shouls add consecutive elements in row', () => {
  expect(Helpers.alterRow([0, 1, 1, 0])).toEqual([2, 0, 0, 0]);
  expect(Helpers.alterRow([1, 1, 1, 0])).toEqual([2, 1, 0, 0]);
  expect(Helpers.alterRow([0, 1, 1, 1])).toEqual([2, 1, 0, 0]);
  expect(Helpers.alterRow([1, 1, 1, 1])).toEqual([2, 2, 0, 0]);
  expect(Helpers.alterRow([0, 2, 2, 0])).toEqual([4, 0, 0, 0]);
  expect(Helpers.alterRow([8, 8, 1, 8])).toEqual([16, 1, 8, 0]);
  expect(Helpers.alterRow([2, 32, 8, 64])).toEqual([2, 32, 8, 64]);
  expect(Helpers.alterRow([2, 32, 8, 64])).toEqual([2, 32, 8, 64]);
});

it('should add non consecutive elements in row', () => {
  expect(Helpers.alterRow([8, 0, 8, 64])).toEqual([16, 64, 0, 0]);
  expect(Helpers.alterRow([0, 64, 0, 64])).toEqual([128, 0, 0, 0]);
});