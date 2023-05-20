import React, {useEffect, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "./stack-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {sleep} from "../../utils/utils";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";

export const StackPage: React.FC = () => {
  type TElement = { value: string, state: ElementStates };

  const [isPushLoader, setPushLoader] = useState<boolean>(false);
  const [isPopLoader, setPopLoader] = useState<boolean>(false);
  const [array, setArray] = useState<TElement[]>([]);
  const [input, setInput] = useState<string>('')

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }
  const pushHandler = async () => {
    setPushLoader(true);
    setArray([...array, {value: input, state: ElementStates.Changing}]);
    setInput('');
    await sleep(SHORT_DELAY_IN_MS);
    setArray([...array, {value: input, state: ElementStates.Default}]);
    setPushLoader(false);
  }
  const popHandler = async () => {
    setPopLoader(true);
    setArray(array.filter((item, index) => index !== array.length - 1));
    await sleep(SHORT_DELAY_IN_MS);
    setPopLoader(false);
  }
  const clearHandler = () => {
    setArray([]);
    setInput('');
  }


  return (
    <SolutionLayout title="Стек">
      <div className={styles.wrapper}>
        <div className={styles.taskContainer}>
          <Input
            type={'text'}
            maxLength={4}
            isLimitText={true}
            onChange={onChangeHandler}
            value={input}
          />
          <Button
            type={'button'}
            text={'Добавить'}
            isLoader={isPushLoader}
            disabled={isPopLoader || input.length === 0}
            onClick={
              pushHandler
            }
          />
          <Button
            type={'button'}
            text={'Удалить'}
            isLoader={isPopLoader}
            disabled={isPushLoader || array.length === 0}
            onClick={
              popHandler
            }
          />
          <Button
            type={'button'}
            text={'Очистить'}
            disabled={isPopLoader || isPushLoader || array.length === 0}
            onClick={
              clearHandler
            }
            extraClass={'ml-30'}
          />
        </div>

        <ul className={styles.resultContainer}>
          {
            array.map((item, index) => {
              return (
                <li key={index}>
                  <Circle
                    letter={item.value}
                    state={item.state}
                    index={index}
                    head={index === array.length - 1 ? 'top' : ''}
                  />
                </li>
              )
            })
          }
        </ul>
      </div>
    </SolutionLayout>
  );
};
