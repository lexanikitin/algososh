import {TElementNum} from "../../types/elements";
import {bubbleSort, selectionSort} from "./utils";
import {ElementStates} from "../../types/element-states";

const input: TElementNum[] = [
  {value: 2, state: ElementStates.Default},
  {value: 0, state: ElementStates.Default},
  {value: 1, state: ElementStates.Default},
  {value: 3, state: ElementStates.Default},
];
const resultAsc: TElementNum[] = [
  {value: 0, state: ElementStates.Modified},
  {value: 1, state: ElementStates.Modified},
  {value: 2, state: ElementStates.Modified},
  {value: 3, state: ElementStates.Modified},
];
const resultDesc: TElementNum[] = [
  {value: 3, state: ElementStates.Modified},
  {value: 2, state: ElementStates.Modified},
  {value: 1, state: ElementStates.Modified},
  {value: 0, state: ElementStates.Modified},
];
const setArray = jest.fn();

describe.each([
  {direction: 'asc', result: resultAsc},
  {direction: 'desc', result: resultDesc}
])('алгоритм сортировки выбором c %s', ({direction, result}) => {
  it('пустой массив ', async ()=>{
    const output = await selectionSort([], direction, setArray);
    expect(output).toEqual([]);
  });
  it('массив из одного элемента ', async ()=>{
    const output = await selectionSort([{value: 0, state: ElementStates.Default}], direction, setArray);
    expect(output).toEqual([{value: 0, state: ElementStates.Modified}]);
  });
  it('массив из нескольких элементов ', async ()=>{
    const output = await selectionSort(input, direction, setArray);
    expect(output).toEqual(result);
  });
});
describe.each([
  {direction: 'asc', result: resultAsc},
  {direction: 'desc', result: resultDesc}
])('алгоритм сортировки пузырьком c %s', ({direction, result}) => {
  it('пустой массив ', async ()=>{
    const output = await bubbleSort([], direction, setArray);
    expect(output).toEqual([]);
  });
  it('массив из одного элемента ', async ()=>{
    const output = await bubbleSort([{value: 0, state: ElementStates.Default}], direction, setArray);
    expect(output).toEqual([{value: 0, state: ElementStates.Modified}]);
  });
  it('массив из нескольких элементов ', async ()=>{
    const output = await bubbleSort(input, direction, setArray);
    expect(output).toEqual(result);
  });
})
