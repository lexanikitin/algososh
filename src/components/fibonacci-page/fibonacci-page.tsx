import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {sleep} from "../../utils/utils";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";

export const FibonacciPage: React.FC = () => {
  type TElement = { value: number, index: number };
  const [isLoader, setLoader] = useState<boolean>(false);
  const [isDisplay, setDisplay] = useState<boolean>(false);
  const [array, setArray] = useState<TElement[]>([])
  const [input, setInput] = useState<number>(0)
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplay(false);
    setInput(Number(e.target.value));
  }
  const onButtonClickHandler = async () => {
    setDisplay(true)
    setLoader(true);

    let output: TElement[] = [];
    if (input >= 1) {
      output[0] = {value: 0, index: 1}
      setArray([...output])
      await sleep(SHORT_DELAY_IN_MS)
    }
    if (input >= 2) {
      output[1] = {value: 1, index: 2}
      setArray([...output])
      await sleep(SHORT_DELAY_IN_MS)
    }
    if (input > 2) {
      for (let i = 2; i <= input - 1; i++) {
        output[i] = {value: output[i - 1].value + output[i - 2].value, index: i + 1}
        setArray([...output])
        await sleep(SHORT_DELAY_IN_MS)
      }
    }
    setLoader(false);
  }


  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.wrapper}>
        <div className={styles.taskContainer}>
          <Input
            type={'number'}
            max={19}
            isLimitText={true}
            onChange={onChangeHandler}
          />
          <Button
            type={'submit'}
            text={'Рассчитать'}
            isLoader={isLoader}
            disabled={input<1 || input>19}
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
                    <Circle letter={`${item.value}`} index={item.index}/>
                  </li>
                )
              })
            }
          </ul> : ''}
      </div>
    </SolutionLayout>
  );
};
