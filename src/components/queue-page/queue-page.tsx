import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "./queue-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {sleep} from "../../utils/utils";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {Queue} from "./Queue";

export const QueuePage: React.FC = () => {
  type TElement = { value: string, state: ElementStates };

  const [isEnqueueLoader, setEnqueueLoader] = useState<boolean>(false);
  const [isDequeueLoader, setDequeueLoader] = useState<boolean>(false);
  const [isClearLoader, setClearLoader] = useState<boolean>(false);
  const [queue] = useState(new Queue<TElement>(8));
  const [input, setInput] = useState<string>('');

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }
  const enqueueHandler = async () => {
    setEnqueueLoader(true);
    queue.enqueue({value: input, state: ElementStates.Changing})
    await sleep(SHORT_DELAY_IN_MS);
    queue.getQueue()[queue.getTail()].state = ElementStates.Default;
    setInput('');
    setEnqueueLoader(false);
  }
  const dequeueHandler = async () => {
    setDequeueLoader(true);
    queue.getQueue()[queue.getHead()].state = ElementStates.Changing;
    await sleep(SHORT_DELAY_IN_MS);
    queue.dequeue();
    setDequeueLoader(false);
  }
  const clearHandler = async () => {
    setClearLoader(true);
    queue.clearQueue();
    await sleep(SHORT_DELAY_IN_MS);
    setInput('');
    setClearLoader(false);
  }

  return (
    <SolutionLayout title="Очередь">
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
            isLoader={isEnqueueLoader}
            disabled={isDequeueLoader || input.length === 0 || queue.getTail() > 6}
            onClick={
              enqueueHandler
            }
          />
          <Button
            type={'button'}
            text={'Удалить'}
            isLoader={isDequeueLoader}
            disabled={isEnqueueLoader || queue.getLength() === 0}
            onClick={
              dequeueHandler
            }
          />
          <Button
            type={'button'}
            text={'Очистить'}
            isLoader={isClearLoader}
            disabled={isDequeueLoader || isEnqueueLoader || queue.getLength() === 0}
            onClick={
              clearHandler
            }
            extraClass={'ml-30'}
          />
        </div>

        <ul className={styles.resultContainer}>
          {
            queue.getQueue().map((item, index) => {
              return (
                <li key={index}>
                  <Circle
                    letter={item.value}
                    state={item.state}
                    index={index}
                    head={index === queue.getHead() && queue.getLength() !== 0 ? 'head' : ''}
                    tail={index === queue.getTail() && queue.getLength() !== 0 ? 'tail' : ''}
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
