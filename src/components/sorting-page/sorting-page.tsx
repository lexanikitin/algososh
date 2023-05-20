import React, {useEffect, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "./sorting.module.css";
import {Button} from "../ui/button/button";
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

    setArray(Array.from({length: Math.floor(Math.random() * (maxLen - minLen) + minLen)},
      () => {
        return {value: Math.floor(Math.random() * (maxValue - minValue) + minValue), state: ElementStates.Default}
      }));
  }

  const sortClickHandler = async (direction: string) => {
    if (direction == 'asc') {
      setLoaderAsc(true);
    }
    if (direction == 'desc') {
      setLoaderDesc(true);
    }
    const arr = array;
    await sleep(SHORT_DELAY_IN_MS)
    if (sortingMethod == 'selection') {
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

    } else if (sortingMethod == 'bubble') {
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
    }
    setLoaderAsc(false);
    setLoaderDesc(false);
  }

  useEffect(() => {
    newArrayClickHandler();
  }, [])

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
                () => sortClickHandler('asc')
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
                () => sortClickHandler('desc')
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
                  <Column index={item.value} state={item.state}/>
                </li>
              )
            })
          }
        </ul>
      </div>
    </SolutionLayout>
  );
};
