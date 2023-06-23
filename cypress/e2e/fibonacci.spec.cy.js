import {
  DEFAULT_STATE_STYLE,
  SUBMIT_BTN,
  CIRCLE, FIBONACCI_URL
} from "../constants";
import {SHORT_DELAY_IN_MS} from "../../src/constants/delays";

const testCase = {number: 8, result: [0, 1, 1, 2, 3, 5, 8, 13]}

describe('Алгоритм работы кнопки на странице "Последовательность Фибоначчи"', () => {
  beforeEach(() => {
    cy.visit(FIBONACCI_URL);
  });
  it('кнопка не доступна при открытии страницы (input пустой) ', () => {
    cy.get(SUBMIT_BTN).should("be.disabled");
  });
  it('кнопка активируется при заполнении input', () => {
    cy.get('input').type(testCase.number);
    cy.get(SUBMIT_BTN).should("not.be.disabled");
  });
  it('кнопка деактивируется при очистке input', () => {
    cy.get('input').type(testCase.number);
    cy.get('input').clear();
    cy.get(SUBMIT_BTN).should("be.disabled");
  });
});

describe('Визуализация алгоритма расчета последовательности', () => {
  before(() => {
    cy.visit(FIBONACCI_URL);
  });
  it('тест алгоритма и стилей', () => {
    cy.clock();
    cy.get('input').type(testCase.number);
    cy.get(SUBMIT_BTN).click();
    for (let i = 0; i < testCase.number; i++) {
      for (let j = 0; j <= i; j++) {
        cy.get(CIRCLE).eq(j).should("have.css", "border", DEFAULT_STATE_STYLE).contains(testCase.result[j]);
      }
      cy.tick(SHORT_DELAY_IN_MS);
    }
  });
})
