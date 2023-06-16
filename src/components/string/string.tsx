import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import styles from './string.module.css'
import {ElementStates} from "../../types/element-states";
import {Circle} from "../ui/circle/circle";
import {sleep} from "../../utils/utils";
import {DELAY_IN_MS} from "../../constants/delays";
import {TElementStr} from '../../types/elements'
import {stringReverse} from "./utils";

export const StringComponent: React.FC = () => {

  const [isLoader, setLoader] = useState<boolean>(false);
  const [isDisplay, setDisplay] = useState<boolean>(false);
  const [array, setArray] = useState<TElementStr[]>([])
  const [input, setInput] = useState<string>('')
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplay(false)
    setInput(e.target.value);
  }
  const onButtonClickHandler = async () => {
    setDisplay(true)
    setLoader(true);

    await stringReverse(input, setArray);

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
            value={input}
          />
          <Button
            type={'submit'}
            text={'Развернуть'}
            isLoader={isLoader}
            onClick={
              onButtonClickHandler
            }
            disabled={input.length === 0}
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
