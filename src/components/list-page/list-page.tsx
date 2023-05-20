import React from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";

export const ListPage: React.FC = () => {
  return (
    <SolutionLayout title="Связный список">
      <div className={styles.wrapper}>
        <div className={styles.taskContainer}>
          <div className={styles.controlRow}>
            <Input
              type={'text'}
              maxLength={4}
              isLimitText={true}


            />
            <div className={styles.buttonWrapper}>
              <Button
                type={'button'}
                text={'Добавить в head'}
                linkedList={'big'}


              />
              <Button
                type={'button'}
                text={'Добавить в tail'}
                linkedList={'big'}

              />
              <Button
                type={'button'}
                text={'Удалить из head'}
                linkedList={'big'}

              />
              <Button
                type={'button'}
                text={'Удалить из tail'}
                linkedList={'big'}

              />
            </div>
          </div>
          <div className={styles.controlRow}>
            <Input
              type={'number'}
              max={19}
              isLimitText={true}


            />
            <div className={styles.buttonWrapper}>
              <Button
                type={'button'}
                text={'Добавить по индексу'}
                linkedList={'big'}

              />
              <Button
                type={'button'}
                text={'Удалить по индексу'}
                linkedList={'big'}

              />
            </div>
          </div>
        </div>

      </div>
    </SolutionLayout>
  );
};
