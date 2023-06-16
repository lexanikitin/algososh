import {Button} from "./button";
import renderer from "react-test-renderer";
import {fireEvent, render, screen} from "@testing-library/react";

describe('Отрисовка компонента Button:', () => {
  it('кнопка с текстом', () => {
    const testTree = renderer
      .create(<Button text={'Test'}/>)
      .toJSON();
    expect(testTree).toMatchSnapshot();
  });
  it('кнопка без текста', () => {
    const testTree = renderer
      .create(<Button/>)
      .toJSON();
    expect(testTree).toMatchSnapshot();
  });
  it('заблокированная кнопка', () => {
    const testTree = renderer
      .create(<Button text={'Test'} disabled={true}/>)
      .toJSON();
    expect(testTree).toMatchSnapshot();
  });
  it('кнопка с индикацией загрузки', () => {
    const testTree = renderer
      .create(<Button text={'Test'} isLoader={true}/>)
      .toJSON();
    expect(testTree).toMatchSnapshot();
  });
  it('корректность вызова callback при клике', ()=>{
    const callback = jest.fn();
    render(<Button onClick={callback}/>);
    fireEvent.click(screen.getByRole('button'))
    expect(callback).toHaveBeenCalledTimes(1);
  });

})
