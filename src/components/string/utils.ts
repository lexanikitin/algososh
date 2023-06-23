import {Dispatch, SetStateAction} from "react";
import {TElementStr} from "../../types/elements";
import {ElementStates} from "../../types/element-states";
import {sleep} from "../../utils/utils";
import {DELAY_IN_MS} from "../../constants/delays";

export const stringReverse = async (input: string, setArray: Dispatch<SetStateAction<TElementStr[]>>) => {

  const arr = input.split('').map((item: string) => {
    return {value: item, state: ElementStates.Default};
  });
  setArray(arr);
  const middle = Math.ceil(arr.length / 2);
  for (let i = 0; i < middle; i++) {
    let j = arr.length - i - 1;
    if (i !== j) {
      arr[i].state = ElementStates.Changing;
      arr[j].state = ElementStates.Changing;
      setArray([...arr]);
      await sleep(DELAY_IN_MS)
    }
    [arr[i], arr[j]] = [arr[j], arr[i]];
    arr[i].state = ElementStates.Modified;
    arr[j].state = ElementStates.Modified;
    setArray([...arr]);
  }

  return arr.map(item => item.value).join('');
}
