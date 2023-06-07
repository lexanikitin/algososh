import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {List} from "./List";
import {ElementStates} from "../../types/element-states";
import {ArrowIcon} from "../ui/icons/arrow-icon";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {sleep} from "../../utils/utils";

export const ListPage: React.FC = () => {
  type TElement = { value: string, state: ElementStates };
  const minLen = 4;
  const maxLen = 8;
  const minValue = 1;
  const maxValue = 100;
  const [inputValue, setInputValue] = useState<string>('');
  const [indexValue, setIndexValue] = useState<string>('');
  const [list] = useState(new List<TElement>(
    Array.from({length: Math.floor(Math.random() * (maxLen - minLen) + minLen)},
      () => {
        return {
          value: Math.floor(Math.random() * (maxValue - minValue) + minValue).toString(),
          state: ElementStates.Default
        }
      })));
  const [renderList, setRenderList] = useState<any[]>(list.toArray())
  const [isAddHeadLoader, setAddHeadLoader] = useState<boolean>(false);
  const [isCutHeadLoader, setCutHeadLoader] = useState<boolean>(false);
  const [isAddTailLoader, setAddTailLoader] = useState<boolean>(false);
  const [isCutTailLoader, setCutTailLoader] = useState<boolean>(false);
  const [isAddIndexLoader, setAddIndexLoader] = useState<boolean>(false);
  const [isCutIndexLoader, setCutIndexLoader] = useState<boolean>(false);

  const onChangeInputValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }
  const onChangeIndexValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIndexValue(e.target.value);
  }

  const prependHandler = async () => {

    setAddHeadLoader(true);
    list.prependTry({
      value: inputValue,
      state: ElementStates.Changing
    });
    setRenderList(list.toArray());
    await sleep(SHORT_DELAY_IN_MS);

    list.prepend({
      value: inputValue,
      state: ElementStates.Modified
    });
    setRenderList(list.toArray());
    await sleep(SHORT_DELAY_IN_MS);
    list.getByIndex(0)!.value.state = ElementStates.Default

    setInputValue('');
    setAddHeadLoader(false);
  }
  const appendHandler = async () => {

    setAddTailLoader(true);
    list.getByIndex(list.getLength() - 1)!.tryHead = {
      value: inputValue,
      state: ElementStates.Changing
    };
    setRenderList(list.toArray());
    await sleep(SHORT_DELAY_IN_MS);
    list.append({
      value: inputValue,
      state: ElementStates.Modified
    });
    list.getByIndex(list.getLength() - 2)!.tryHead = null;
    setRenderList(list.toArray());
    await sleep(SHORT_DELAY_IN_MS);
    list.getByIndex(list.getLength() - 1)!.value.state = ElementStates.Default

    setInputValue('');
    setAddTailLoader(false);
  }

  const cutHeadHandler = async () => {
    setCutHeadLoader(true);
    list.getByIndex(0)!.tryTail = {
      value: list.getByIndex(0)!.value.value,
      state: ElementStates.Changing
    };
    list.getByIndex(0)!.value.value = ''
    setRenderList(list.toArray());
    await sleep(SHORT_DELAY_IN_MS);
    list.cutHead();
    setRenderList(list.toArray());
    setCutHeadLoader(false);
  }

  const cutTailHandler = async () => {

    setCutTailLoader(true);
    list.getByIndex(list.getLength() - 1)!.tryTail = {
      value: list.getByIndex(list.getLength() - 1)!.value.value,
      state: ElementStates.Changing
    };
    list.getByIndex(list.getLength() - 1)!.value.value = ''
    setRenderList(list.toArray());
    await sleep(SHORT_DELAY_IN_MS);
    list.cutTail();
    setRenderList(list.toArray());
    setCutTailLoader(false)
  }
  const addOnIndexHandler = async () => {

    setAddIndexLoader(true);
    for (let i = 0; i <= Number(indexValue); i++) {
      list.getByIndex(i)!.tryHead = {
        value: inputValue,
        state: ElementStates.Changing
      }
      setRenderList(list.toArray());
      await sleep(SHORT_DELAY_IN_MS);
      list.getByIndex(i)!.tryHead = null;
      list.getByIndex(i)!.value.state = ElementStates.Changing;
    }
    for (let i = 0; i < list.getLength(); i++) {
      list.getByIndex(i)!.value.state = ElementStates.Default;
    }
    list.insert({
      value: inputValue,
      state: ElementStates.Modified
    }, Number(indexValue));
    setRenderList(list.toArray());
    await sleep(SHORT_DELAY_IN_MS);
    list.getByIndex(Number(indexValue))!.value.state = ElementStates.Default;
    setIndexValue('');
    setInputValue('');
    setAddIndexLoader(false);
  }
  const popOnIndexHandler = async () => {

    setCutIndexLoader(true);
    for (let i = 0; i <= Number(indexValue); i++) {
      list.getByIndex(i)!.value.state = ElementStates.Changing;
      setRenderList(list.toArray());
      await sleep(SHORT_DELAY_IN_MS);

    }
    list.getByIndex(Number(indexValue))!.tryTail = {
      value: list.getByIndex(Number(indexValue))!.value.value,
      state: ElementStates.Changing
    };
    list.getByIndex(Number(indexValue))!.value = {
      value: '',
      state: ElementStates.Default
    };
    setRenderList(list.toArray());
    await sleep(SHORT_DELAY_IN_MS);

    list.delete(Number(indexValue));
    setRenderList(list.toArray());
    await sleep(SHORT_DELAY_IN_MS);
    for (let i = 0; i < list.getLength(); i++) {
      list.getByIndex(i)!.value.state = ElementStates.Default;
    }
    setRenderList(list.toArray());

    setIndexValue('');
    setInputValue('');
    setCutIndexLoader(false);
  }


  return (
    <SolutionLayout title="Связный список">
      <div className={styles.wrapper}>
        <div className={styles.taskContainer}>
          <div className={styles.controlRow}>
            <Input
              type={'text'}
              maxLength={4}
              isLimitText={true}
              value={inputValue}
              onChange={onChangeInputValueHandler}
              placeholder={'Введите значение'}
            />
            <div className={styles.buttonWrapper}>
              <Button
                type={'button'}
                text={'Добавить в head'}
                linkedList={'big'}
                onClick={prependHandler}
                disabled={inputValue.length === 0 ||
                  isAddTailLoader ||
                  isCutHeadLoader ||
                  isCutTailLoader ||
                  isAddIndexLoader ||
                  isCutIndexLoader
                }
                isLoader={isAddHeadLoader}
              />
              <Button
                type={'button'}
                text={'Добавить в tail'}
                linkedList={'big'}
                onClick={appendHandler}
                disabled={inputValue.length === 0 ||
                  isAddHeadLoader ||
                  isCutHeadLoader ||
                  isCutTailLoader ||
                  isAddIndexLoader ||
                  isCutIndexLoader
                }
                isLoader={isAddTailLoader}
              />
              <Button
                type={'button'}
                text={'Удалить из head'}
                linkedList={'big'}
                onClick={cutHeadHandler}
                disabled={list.getLength() === 0 ||
                  isAddHeadLoader ||
                  isAddTailLoader ||
                  isCutTailLoader ||
                  isAddIndexLoader ||
                  isCutIndexLoader
                }
                isLoader={isCutHeadLoader}
              />
              <Button
                type={'button'}
                text={'Удалить из tail'}
                linkedList={'big'}
                onClick={cutTailHandler}
                disabled={
                  list.getLength() === 0 ||
                  isAddHeadLoader ||
                  isAddTailLoader ||
                  isCutHeadLoader ||
                  isAddIndexLoader ||
                  isCutIndexLoader
                }
                isLoader={isCutTailLoader}
              />
            </div>
          </div>
          <div className={styles.controlRow}>
            <Input
              type={'number'}
              max={list.getLength() - 1}
              isLimitText={true}
              value={indexValue}
              onChange={onChangeIndexValueHandler}
              placeholder={'Введите индекс'}
            />
            <div className={styles.buttonWrapper}>
              <Button
                type={'button'}
                text={'Добавить по индексу'}
                linkedList={'big'}
                onClick={addOnIndexHandler}
                disabled={
                  inputValue.length === 0 ||
                  indexValue.length === 0 ||
                  Number(indexValue) >= list.getLength() ||
                  Number(indexValue) < 0 ||
                  isAddHeadLoader ||
                  isAddTailLoader ||
                  isCutHeadLoader ||
                  isCutTailLoader ||
                  isCutIndexLoader
                }
                isLoader={isAddIndexLoader}
              />
              <Button
                type={'button'}
                text={'Удалить по индексу'}
                linkedList={'big'}
                onClick={popOnIndexHandler}
                disabled={
                  indexValue.length === 0 ||
                  Number(indexValue) >= list.getLength() ||
                  Number(indexValue) < 0 ||
                  isAddHeadLoader ||
                  isAddTailLoader ||
                  isCutHeadLoader ||
                  isCutTailLoader ||
                  isAddIndexLoader
                }
                isLoader={isCutIndexLoader}
              />
            </div>
          </div>
        </div>
        <ul className={styles.resultContainer}>
          {
            list.getLength() !== 0 ?
              renderList.map((item, index) => {
                return (
                  <li key={index} className={styles.node}>
                    <Circle
                      letter={item.value.value}
                      state={item.value.state}
                      index={index}
                      head={item.tryHead ? <Circle letter={item.tryHead.value} state={item.tryHead.state}
                                                   isSmall={true}/> : index === 0 ? 'head' : ''}
                      tail={item.tryTail ? <Circle letter={item.tryTail.value} state={item.tryTail.state}
                                                   isSmall={true}/> : index === list.getLength() - 1 ? 'tail' : ''}
                    />
                    {index === list.getLength() - 1 ? '' :
                      <ArrowIcon fill={item.value.state === ElementStates.Changing ? '#D252E1' : undefined}/>}
                  </li>
                )
              })
              : ''
          }
        </ul>
      </div>
    </SolutionLayout>
  );
};
