import React, {useEffect, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "./sorting.module.css";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {RadioInput} from "../ui/radio-input/radio-input";
import {Direction} from "../../types/direction";
import {Column} from "../ui/column/column";
import {ElementStates} from "../../types/element-states";
import {sleep} from "../../utils/utils";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";

export const SortingPage: React.FC = () => {
  type TElement = { value: number, state: ElementStates };
  const [isLoaderAsc, setLoaderAsc] = useState<boolean>(false);
  const [isLoaderDesc, setLoaderDesc] = useState<boolean>(false);
  const [isDisplay, setDisplay] = useState<boolean>(false);
  const [array, setArray] = useState<TElement[]>([]);
  const [input, setInput] = useState<number>(0);

  const [sortingMethod, setSortingMethod] = useState<string>('selection');

  const newArrayClickHandler = () => {
    const minLen = 3;
    const maxLen = 17;
    const minValue = 0;
    const maxValue = 100;

    setArray(Array.from({length : Math.floor(Math.random()*(maxLen-minLen)+minLen)},
      ()=>{return {value:Math.floor(Math.random()*(maxValue-minValue)+minValue), state: ElementStates.Default}}));
  }
  const ascClickHandler = async () => {
    setLoaderAsc(true);
    await sleep(SHORT_DELAY_IN_MS)

    setLoaderAsc(false);
  }
  const descClickHandler = async () => {
    setLoaderDesc(true);
    await sleep(SHORT_DELAY_IN_MS)

    setLoaderDesc(false);
  }
  useEffect(()=>{
    newArrayClickHandler();
  },[])

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.wrapper}>
        <div className={styles.taskContainer}>
          <div className={styles.wrapperRadio}>
            <RadioInput
              label={'Выбор'}
              defaultChecked={true}
              value={'selection'}
              name={'sortingMethod'}
              onClick={() => setSortingMethod('selection')}
            />
            <RadioInput
              label={'Пузырек'}
              value={'bubble'}
              name={'sortingMethod'}
              onClick={() => setSortingMethod('bubble')}
            />
          </div>
          <div className={styles.wrapperDirection}>
            <Button
              type={'button'}
              text={'По возрастанию'}
              sorting={Direction.Ascending}
              isLoader={isLoaderAsc}
              disabled={isLoaderDesc}
              onClick={
                ascClickHandler
              }
              extraClass={styles.btn}

            />
            <Button
              type={'button'}
              text={'По убыванию'}
              sorting={Direction.Descending}
              isLoader={isLoaderDesc}
              disabled={isLoaderAsc}
              onClick={
                descClickHandler
              }
              extraClass={styles.btn}
            />
          </div>
          <Button
            type={'button'}
            text={'Новый массив'}
            disabled={isLoaderAsc || isLoaderDesc}
            onClick={
              newArrayClickHandler
            }
          />
        </div>

        <ul className={styles.resultContainer}>
          {
            array.map((item, index) => {
              return (
                <li key={index}>
                  <Column index={item.value} state={item.state} />
                </li>
              )
            })
          }
        </ul>
      </div>
    </SolutionLayout>
  );
};
