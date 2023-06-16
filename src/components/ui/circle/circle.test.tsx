import {Circle} from "./circle";
import renderer from "react-test-renderer";
import {ElementStates} from "../../../types/element-states";

describe('Отрисовка компонента Circle:', () => {
  test('без буквы', () => {
    const testTree = renderer
      .create(<Circle/>)
      .toJSON();
    expect(testTree).toMatchSnapshot();
  });
  test('с буквами', () => {
    const testTree = renderer
      .create(<Circle letter={'test'}/>)
      .toJSON();
    expect(testTree).toMatchSnapshot();
  });
  test('с head', () => {
    const testTree = renderer
      .create(<Circle head={'test'}/>)
      .toJSON();
    expect(testTree).toMatchSnapshot();
  });
  test('с react-элементом в head', () => {
    const testTree = renderer
      .create(<Circle head={<Circle/>}/>)
      .toJSON();
    expect(testTree).toMatchSnapshot();
  });
  test('с tail', () => {
    const testTree = renderer
      .create(<Circle tail={'test'}/>)
      .toJSON();
    expect(testTree).toMatchSnapshot();
  });
  test('с react-элементом в tail', () => {
    const testTree = renderer
      .create(<Circle tail={<Circle/>}/>)
      .toJSON();
    expect(testTree).toMatchSnapshot();
  });
  test('с index', () => {
    const testTree = renderer
      .create(<Circle index={1}/>)
      .toJSON();
    expect(testTree).toMatchSnapshot();
  });
  test('с пропом isSmall ===  true', () => {
    const testTree = renderer
      .create(<Circle isSmall={true}/>)
      .toJSON();
    expect(testTree).toMatchSnapshot();
  });
  test('в состоянии Default', () => {
    const testTree = renderer
      .create(<Circle state={ElementStates.Default}/>)
      .toJSON();
    expect(testTree).toMatchSnapshot();
  });
  test('в состоянии Changing', () => {
    const testTree = renderer
      .create(<Circle state={ElementStates.Changing}/>)
      .toJSON();
    expect(testTree).toMatchSnapshot();
  });
  test('в состоянии Modified', () => {
    const testTree = renderer
      .create(<Circle state={ElementStates.Modified}/>)
      .toJSON();
    expect(testTree).toMatchSnapshot();
  });
});
