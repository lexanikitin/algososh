import {stringReverse} from "./utils";

describe('Алгоритм разворота строки', () => {
  const setArray = jest.fn();
  const testCases = [
    {input: 'abcd', result: 'dcba'},
    {input: 'abcde', result: 'edcba'},
    {input: 'a', result: 'a'},
    {input: '', result: ''},
  ];

  it.each(testCases)('stringReverse %s', async ({input, result})=>{
    const output = await stringReverse(input, setArray);
    expect(output).toEqual(result);
  });
})
