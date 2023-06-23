import {
  DEFAULT_STATE_STYLE,
  CIRCLE, STACK_URL, POP_BTN, CLEAR_BTN, PUSH_BTN, CHANGING_STATE_STYLE
} from "../constants";
import {SHORT_DELAY_IN_MS} from "../../src/constants/delays";

const testCase = 'test'

describe('Алгоритм работы кнопок на странице "Стек"', () => {
  beforeEach(() => {
    cy.visit(STACK_URL);
  });
  it('кнопки не доступна при открытии страницы (input пустой) ', () => {
    cy.get(PUSH_BTN).should("be.disabled");
    cy.get(POP_BTN).should("be.disabled");
    cy.get(CLEAR_BTN).should("be.disabled");
  });
  it('кнопка Добавить активируется при заполнении input', () => {
    cy.get('input').type(testCase[0]);
    cy.get(PUSH_BTN).should("not.be.disabled");
  });
  it('кнопки Удалить/Очистить активируются при добавлении эл-та в стек', () => {
    cy.get('input').type(testCase[0]);
    cy.get(PUSH_BTN).click();
    cy.get(POP_BTN).should("not.be.disabled");
    cy.get(CLEAR_BTN).should("not.be.disabled");
  });
  it('кнопка Добавить деактивируется при очистке input', () => {
    cy.get('input').type(testCase[0]);
    cy.get(PUSH_BTN).should("not.be.disabled");
    cy.get('input').clear();
    cy.get(PUSH_BTN).should("be.disabled");
  });
  it('все кнопки деактивируются при удалении последнего элемента стека', () => {
    cy.get('input').type(testCase[0]);
    cy.get(PUSH_BTN).click();
    cy.get(PUSH_BTN).should("be.disabled");
    cy.get(POP_BTN).should("not.be.disabled");
    cy.get(CLEAR_BTN).should("not.be.disabled");
    cy.get('input').type(testCase[1]);
    cy.get(PUSH_BTN).click();
    cy.get(PUSH_BTN).should("be.disabled");
    cy.get(POP_BTN).should("not.be.disabled");
    cy.get(CLEAR_BTN).should("not.be.disabled");
    cy.get(POP_BTN).click();
    cy.get(PUSH_BTN).should("be.disabled");
    cy.get(POP_BTN).should("not.be.disabled");
    cy.get(CLEAR_BTN).should("not.be.disabled");
    cy.get(POP_BTN).click();
    cy.get(PUSH_BTN).should("be.disabled");
    cy.get(POP_BTN).should("be.disabled");
    cy.get(CLEAR_BTN).should("be.disabled");
  });
  it('все кнопки деактивируются при очистке стека', () => {
    cy.get('input').type(testCase[0]);
    cy.get(PUSH_BTN).click();
    cy.get(PUSH_BTN).should("be.disabled");
    cy.get(POP_BTN).should("not.be.disabled");
    cy.get(CLEAR_BTN).should("not.be.disabled");
    cy.get('input').type(testCase[1]);
    cy.get(PUSH_BTN).click();
    cy.get(PUSH_BTN).should("be.disabled");
    cy.get(POP_BTN).should("not.be.disabled");
    cy.get(CLEAR_BTN).should("not.be.disabled");
    cy.get(CLEAR_BTN).click();
    cy.get(PUSH_BTN).should("be.disabled");
    cy.get(POP_BTN).should("be.disabled");
    cy.get(CLEAR_BTN).should("be.disabled");
  });
});
describe('Визуализация алгоритма стека', () => {
  beforeEach(() => {
    cy.visit(STACK_URL);
  });
  it('добавляем элементы', () => {
    cy.clock();
    for (let i = 0; i < testCase.length; i++) {
      cy.get("input").type(testCase[i]);
      cy.get(PUSH_BTN).click();
      for (let j = 0; j <= i; j++) {
        cy.get(CIRCLE)
          .eq(j)
          .should("have.css", "border", j === i ? CHANGING_STATE_STYLE : DEFAULT_STATE_STYLE)
          .contains(testCase[j]);
      }
      cy.tick(SHORT_DELAY_IN_MS);
      for (let j = 0; j <= i; j++) {
        cy.get(CIRCLE).eq(j).should("have.css", "border", DEFAULT_STATE_STYLE).contains(testCase[j]);
      }
    }
    cy.get(CIRCLE).should("have.length", testCase.length);
  });

  it('удаляем элементы', () => {
    cy.clock();
    for (let i = 0; i < testCase.length; i++) {
      cy.get("input").type(testCase[i]);
      cy.get(PUSH_BTN).click();
      cy.tick(SHORT_DELAY_IN_MS);
    }
    cy.get(CIRCLE).should("have.length", testCase.length);
    cy.tick(SHORT_DELAY_IN_MS);

    for (let i = 0; i < testCase.length; i++) {
      cy.get(POP_BTN).click();
      for (let j = 0; j < testCase.length - i; j++) {
        cy.get(CIRCLE)
          .eq(j)
          .should("have.css", "border", j === testCase.length - i - 1 ? CHANGING_STATE_STYLE : DEFAULT_STATE_STYLE)
          .contains(testCase[j]);
      }
      cy.tick(SHORT_DELAY_IN_MS);
      for (let j = 0; j < testCase.length - i - 1; j++) {
        cy.get(CIRCLE)
          .eq(j)
          .should("have.css", "border", DEFAULT_STATE_STYLE)
          .contains(testCase[j]);
      }
    }
  });

  it('очищаем стек', () => {
    cy.clock();
    for (let i = 0; i < testCase.length; i++) {
      cy.get("input").type(testCase[i]);
      cy.get(PUSH_BTN).click();
      cy.tick(SHORT_DELAY_IN_MS);
    }
    cy.get(CIRCLE).should("have.length", testCase.length);
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(CLEAR_BTN).click();
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(CIRCLE).should("not.exist");
  });
})
