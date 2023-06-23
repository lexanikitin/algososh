import React, {useEffect, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "./stack-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {sleep} from "../../utils/utils";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {Stack} from "./Stack";

export const StackPage: React.FC = () => {
  type TElement = { value: string, state: ElementStates };

  const [isPushLoader, setPushLoader] = useState<boolean>(false);
  const [isPopLoader, setPopLoader] = useState<boolean>(false);
  const [isClearLoader, setClearLoader] = useState<boolean>(false);
  const [stack] = useState(new Stack<TElement>());
  const [renderStack, setRenderStack] = useState<TElement[]>([]);
  const [input, setInput] = useState<string>('')


  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }
  const pushHandler = async () => {
    setPushLoader(true);
    stack.push({value: input, state: ElementStates.Changing});
    setRenderStack(stack.getStack);
    setInput('');
    await sleep(SHORT_DELAY_IN_MS);
    stack.peak().state = ElementStates.Default
    setRenderStack(stack.getStack);
    setPushLoader(false);
  }
  const popHandler = async () => {

    setPopLoader(true);
    stack.peak().state  = ElementStates.Changing
    await sleep(SHORT_DELAY_IN_MS);
    stack.pop();
    setRenderStack(stack.getStack);
    setPopLoader(false);
  }
  const clearHandler = async () => {
    setClearLoader(true);
    stack.clearAll();
    setRenderStack(stack.getStack);
    await sleep(SHORT_DELAY_IN_MS);
    setInput('');
    setClearLoader(false);
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
            data-cy={'push'}
            type={'button'}
            text={'Добавить'}
            isLoader={isPushLoader}
            disabled={isPopLoader || input.length === 0}
            onClick={
              pushHandler
            }
          />
          <Button
            data-cy={'pop'}
            type={'button'}
            text={'Удалить'}
            isLoader={isPopLoader}
            disabled={isPushLoader || stack.getSize() === 0}
            onClick={
              popHandler
            }
          />
          <Button
            data-cy={'clear'}
            type={'button'}
            text={'Очистить'}
            isLoader={isClearLoader}
            disabled={isPopLoader || isPushLoader || stack.getSize() === 0}
            onClick={
              clearHandler
            }
            extraClass={'ml-30'}
          />
        </div>

        <ul className={styles.resultContainer}>
          {
            renderStack.map((item, index) => {
              return (
                <li key={index}>
                  <Circle
                    letter={item.value}
                    state={item.state}
                    index={index}
                    head={index === renderStack.length - 1 ? 'top' : ''}
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
