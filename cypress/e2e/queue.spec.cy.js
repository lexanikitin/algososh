import {
  DEFAULT_STATE_STYLE,
  MAIN_PAGE_URL,
  CIRCLE,
  CLEAR_BTN,
  CHANGING_STATE_STYLE,
  QUEUE_URL,
  ENQUEUE_BTN,
  DEQUEUE_BTN,
  CIRCLE_HEAD, CIRCLE_TAIL, CIRCLE_LETTER
} from "../constants";
import {SHORT_DELAY_IN_MS} from "../../src/constants/delays";

const testCase = 'test'

describe('Алгоритм работы кнопок на странице "Очередь"', () => {
  beforeEach(() => {
    cy.visit(MAIN_PAGE_URL + QUEUE_URL);
  });
  it('кнопки не доступна при открытии страницы (input пустой) ', () => {
    cy.get(ENQUEUE_BTN).should("be.disabled");
    cy.get(DEQUEUE_BTN).should("be.disabled");
    cy.get(CLEAR_BTN).should("be.disabled");
  });
  it('кнопка Добавить активируется при заполнении input', () => {
    cy.get('input').type(testCase[0]);
    cy.get(ENQUEUE_BTN).should("not.be.disabled");
    cy.get(DEQUEUE_BTN).should("be.disabled");
    cy.get(CLEAR_BTN).should("be.disabled");
  });
  it('кнопки Удалить/Очистить активируются при добавлении эл-та в очередь', () => {
    cy.get('input').type(testCase[0]);
    cy.get(ENQUEUE_BTN).click();
    cy.get(DEQUEUE_BTN).should("not.be.disabled");
    cy.get(CLEAR_BTN).should("not.be.disabled");
  });
  it('кнопка Добавить деактивируется при очистке input', () => {
    cy.get('input').type(testCase[0]);
    cy.get(ENQUEUE_BTN).should("not.be.disabled");
    cy.get('input').clear();
    cy.get(ENQUEUE_BTN).should("be.disabled");
  });
});
describe('Визуализация алгоритма очереди', () => {
  beforeEach(() => {
    cy.visit(MAIN_PAGE_URL + QUEUE_URL);
  });
  it('добавляем элементы', () => {
    cy.clock();
    for (let i = 0; i < testCase.length; i++) {
      cy.get("input").type(testCase[i]);
      cy.get(ENQUEUE_BTN).click();
      for (let j = 0; j <= i; j++) {
        cy.get(CIRCLE)
          .eq(j)
          .should("have.css", "border", j === i ? CHANGING_STATE_STYLE : DEFAULT_STATE_STYLE)
          .contains(testCase[j])
      }
      cy.tick(SHORT_DELAY_IN_MS);
      for (let j = 0; j <= i; j++) {
        cy.get(CIRCLE).eq(j).should("have.css", "border", DEFAULT_STATE_STYLE).contains(testCase[j]);
      }
      cy.get(CIRCLE_HEAD)
        .eq(0)
        .contains('head');
      cy.get(CIRCLE_TAIL)
        .eq(i)
        .contains('tail');
    }
  });
  it('удаляем элементы', () => {
    cy.clock();
    for (let i = 0; i < testCase.length; i++) {
      cy.get("input").type(testCase[i]);
      cy.get(ENQUEUE_BTN).click();
      cy.tick(SHORT_DELAY_IN_MS);
    }
    cy.tick(SHORT_DELAY_IN_MS);

    for (let i = 0; i < testCase.length; i++) {
      cy.get(CIRCLE_HEAD)
        .eq(i)
        .contains('head');
      cy.get(DEQUEUE_BTN).click();
      for (let j = i; j <= testCase.length - i - 1; j++) {
        cy.get(CIRCLE)
          .eq(j)
          .should("have.css", "border", j === i ? CHANGING_STATE_STYLE : DEFAULT_STATE_STYLE)
          .contains(testCase[j])
      }
      cy.get(CIRCLE_TAIL)
        .eq(testCase.length - 1)
        .contains('tail');
      cy.tick(SHORT_DELAY_IN_MS);
    }
  });
  it('очистка очереди', () => {
    cy.clock();
    for (let i = 0; i < testCase.length; i++) {
      cy.get("input").type(testCase[i]);
      cy.get(ENQUEUE_BTN).click();
      cy.tick(SHORT_DELAY_IN_MS);
    }
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(CLEAR_BTN).click();
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(CIRCLE_LETTER)
      .should("have.length", 8)
      .each((item) => {
        expect(item).contain('');
      });
  });
});
