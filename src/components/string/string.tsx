import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import styles from './string.module.css'
import {ElementStates} from "../../types/element-states";
import {Circle} from "../ui/circle/circle";
import {sleep} from "../../utils/utils";

export const StringComponent: React.FC = () => {
  type TElement = { value: string, state: ElementStates };
  const [isLoader, setLoader] = useState<boolean>(false);
  const [isDisplay, setDisplay] = useState<boolean>(false);
  const [array, setArray] = useState<TElement[]>([])
  const [input, setInput] = useState<string>('')
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplay(false)
    setInput(e.target.value);
  }
  const onButtonClickHandler = async () => {
    setDisplay(true)
    setLoader(true);

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
        await sleep(1000)
      }
      [arr[i], arr[j]] = [arr[j], arr[i]];
      arr[i].state = ElementStates.Modified;
      arr[j].state = ElementStates.Modified;
      setArray([...arr]);
    }
    console.log(arr);
    setLoader(false);
  }
  return (
    <SolutionLayout title="Строка">
      <div className={styles.wrapper}>
        <div className={styles.taskContainer}>
          <Input
            type={'text'}
            maxLength={11}
            isLimitText={true}
            onChange={onChangeHandler}
          />
          <Button
            type={'submit'}
            text={'Развернуть'}
            isLoader={isLoader}
            onClick={
              onButtonClickHandler
            }
          />
        </div>
        {isDisplay ?
          <ul className={styles.resultContainer}>
            {
              array.map((item, index) => {
                return (
                  <li key={index}>
                    <Circle letter={item.value} state={item.state}/>
                  </li>
                )
              })
            }
          </ul> : ''}
      </div>
    </SolutionLayout>
  );
};
