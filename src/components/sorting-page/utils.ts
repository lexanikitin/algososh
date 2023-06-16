import {TElementNum} from "../../types/elements";
import {Dispatch, SetStateAction} from "react";
import {sleep} from "../../utils/utils";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {ElementStates} from "../../types/element-states";

export const bubbleSort = async (inputArray: TElementNum[], direction: string = 'asc', setArray: Dispatch<SetStateAction<TElementNum[]>>) => {
  if(!inputArray.length) return [];
  const arr = inputArray;
  await sleep(SHORT_DELAY_IN_MS)

  for (let i = arr.length - 1; i >= 0; i--) {
    for (let j = 0; j < i; j++) {
      arr[j].state = ElementStates.Changing;
      arr[j + 1].state = ElementStates.Changing;
      setArray([...arr]);
      await sleep(SHORT_DELAY_IN_MS);
      if (direction == 'asc') {
        if (arr[j].value > arr[j + 1].value) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      } else {
        if (arr[j + 1].value > arr[j].value) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
      arr[j + 1].state = ElementStates.Modified;
      arr[j].state = ElementStates.Default;
    }
    arr[i].state = ElementStates.Modified;
  }
  return arr
}
export const selectionSort = async (inputArray: TElementNum[], direction: string = 'asc', setArray: Dispatch<SetStateAction<TElementNum[]>>) => {
  if(!inputArray.length) return [];
  const arr = inputArray;
  await sleep(SHORT_DELAY_IN_MS)
  for (let i = 0; i < arr.length - 1; i++) {
    let currentElem = i
    for (let j = i + 1; j <= arr.length - 1; j++) {
      arr[i].state = ElementStates.Changing;
      arr[j].state = ElementStates.Changing;
      setArray([...arr]);
      await sleep(SHORT_DELAY_IN_MS)
      if (direction == 'asc') {
        if (arr[currentElem].value > arr[j].value) {
          currentElem = j;
        }
      } else {
        if (arr[currentElem].value < arr[j].value) {
          currentElem = j;
        }
      }
      arr[j].state = ElementStates.Default;
      arr[i].state = ElementStates.Default;
      setArray([...arr]);
    }
    [arr[i], arr[currentElem]] = [arr[currentElem], arr[i]];
    arr[i].state = ElementStates.Modified;
    setArray([...arr]);
  }
  arr[arr.length - 1].state = ElementStates.Modified;
  return arr
}
