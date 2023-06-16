import {Button} from "./button";
import renderer from "react-test-renderer";

describe('Отрисовка компонента Button:', () => {
  test('кнопка с текстом', () => {
    const testTree = renderer
      .create(<Button text={'Test'}/>)
      .toJSON();
    expect(testTree).toMatchSnapshot();
  });
  test('кнопка без текста', () => {
    const testTree = renderer
      .create(<Button/>)
      .toJSON();
    expect(testTree).toMatchSnapshot();
  });
  test('заблокированная кнопка', () => {
    const testTree = renderer
      .create(<Button text={'Test'} disabled={true}/>)
      .toJSON();
    expect(testTree).toMatchSnapshot();
  });
  test('кнопка с индикацией загрузки', () => {
    const testTree = renderer
      .create(<Button text={'Test'} isLoader={true}/>)
      .toJSON();
    expect(testTree).toMatchSnapshot();
  });
})
