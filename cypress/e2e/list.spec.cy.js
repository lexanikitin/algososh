import {
  DEFAULT_STATE_STYLE,
  MAIN_PAGE_URL,
  CIRCLE,
  CHANGING_STATE_STYLE,
  CIRCLE_HEAD,
  CIRCLE_TAIL,
  CIRCLE_LETTER,
  LIST_URL,
  CUT_HEAD_BTN,
  CUT_TAIL_BTN,
  APPEND_BTN,
  PREPEND_BTN,
  ADD_ON_INDEX_BTN, POP_ON_INDEX_BTN, LIST_VALUE_INPUT, LIST_INDEX_INPUT, MODIFIED_STATE_STYLE
} from "../constants";
import {SHORT_DELAY_IN_MS} from "../../src/constants/delays";

const testCase = 'test'

describe('Алгоритм работы кнопок на странице "Связный список"', () => {
  beforeEach(() => {
    cy.visit(MAIN_PAGE_URL + LIST_URL);
  });
  it('кнопки не доступны при открытии страницы (input пустые) ', () => {
    cy.get(APPEND_BTN).should("be.disabled");
    cy.get(PREPEND_BTN).should("be.disabled");
    cy.get(ADD_ON_INDEX_BTN).should("be.disabled");
    cy.get(POP_ON_INDEX_BTN).should("be.disabled");
    cy.get(CUT_HEAD_BTN).should("not.be.disabled");
    cy.get(CUT_TAIL_BTN).should("not.be.disabled");
  });
  it('кнопка Добавить в head/tail активируется при заполнении input значения', () => {
    cy.get(LIST_VALUE_INPUT).type(testCase[0]);
    cy.get(APPEND_BTN).should("not.be.disabled");
    cy.get(PREPEND_BTN).should("not.be.disabled");
    cy.get(ADD_ON_INDEX_BTN).should("be.disabled");
    cy.get(POP_ON_INDEX_BTN).should("be.disabled");
    cy.get(CUT_HEAD_BTN).should("not.be.disabled");
    cy.get(CUT_TAIL_BTN).should("not.be.disabled");
  });
  it('кнопки операций по индексу активны только при вводе и значения и индекса в input', () => {
    cy.get(LIST_VALUE_INPUT).type(testCase[0]);
    cy.get(LIST_INDEX_INPUT).type(1);
    cy.get(APPEND_BTN).should("not.be.disabled");
    cy.get(PREPEND_BTN).should("not.be.disabled");
    cy.get(ADD_ON_INDEX_BTN).should("not.be.disabled");
    cy.get(POP_ON_INDEX_BTN).should("not.be.disabled");
    cy.get(CUT_HEAD_BTN).should("not.be.disabled");
    cy.get(CUT_TAIL_BTN).should("not.be.disabled");
  });
});
describe('Визуализация алгоритма Связного списка', () => {
  beforeEach(() => {
    cy.visit(MAIN_PAGE_URL + LIST_URL);
  });
  it('генерация списка из нескольких элементов, в котором есть head, tail, значения', () => {
    cy.clock();
    cy.get(CIRCLE).each((item) => {
      cy.wrap(item).should("have.css", "border", DEFAULT_STATE_STYLE).invoke("text").should("not.be.empty");
    });
    cy.get(CIRCLE_HEAD).first().contains("head");
    cy.get(CIRCLE_TAIL).last().contains("tail");
  });
  it('добавление элемента в head', () => {
    cy.clock();
    cy.get(LIST_VALUE_INPUT).type(testCase);
    cy.get(PREPEND_BTN).click();
    cy.get(CIRCLE_HEAD).first().contains(testCase);
    cy.get(CIRCLE_HEAD).first().get(CIRCLE).should("have.css", "border", CHANGING_STATE_STYLE);
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(CIRCLE).first().contains(testCase);
    cy.get(CIRCLE_HEAD).first().contains('head');
    cy.get(CIRCLE_HEAD).first().get(CIRCLE).should("have.css", "border", MODIFIED_STATE_STYLE);
  });
  it('добавление элемента в tail', () => {
    cy.clock();
    cy.get(LIST_VALUE_INPUT).type(testCase);
    cy.get(APPEND_BTN).click();
    cy.get(CIRCLE_HEAD).eq(-2).contains(testCase);
    cy.get(CIRCLE).eq(-2).should("have.css", "border", CHANGING_STATE_STYLE);
    cy.get(CIRCLE_TAIL).last().contains('tail');
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(CIRCLE).last().contains(testCase);
    cy.get(CIRCLE_TAIL).last().contains('tail');
    cy.get(CIRCLE).last().should("have.css", "border", MODIFIED_STATE_STYLE);
  });
  it('добавление элемента в по индексу', () => {
    cy.clock();
    cy.get(LIST_VALUE_INPUT).type(testCase);
    cy.get(LIST_INDEX_INPUT).type('2');

    cy.get(ADD_ON_INDEX_BTN).click();

    cy.get(CIRCLE_HEAD).eq(0).contains(testCase);
    cy.get(CIRCLE_HEAD).eq(0).get(CIRCLE).should("have.css", "border", CHANGING_STATE_STYLE);

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(CIRCLE_HEAD).eq(0).contains('head');
    cy.get(CIRCLE).eq(0).should("have.css", "border", CHANGING_STATE_STYLE);
    cy.get(CIRCLE_HEAD).eq(1).contains(testCase);
    cy.get(CIRCLE_HEAD).eq(1).get(CIRCLE).should("have.css", "border", CHANGING_STATE_STYLE);

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(CIRCLE_HEAD).eq(0).contains('head');
    cy.get(CIRCLE_HEAD).eq(2).contains(testCase);
    cy.get(CIRCLE).eq(0).should("have.css", "border", CHANGING_STATE_STYLE);
    cy.get(CIRCLE).eq(1).should("have.css", "border", CHANGING_STATE_STYLE);
    cy.get(CIRCLE_HEAD).eq(2).get(CIRCLE).should("have.css", "border", CHANGING_STATE_STYLE);

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(CIRCLE_HEAD).eq(0).contains('head');
    cy.get(CIRCLE).eq(0).should("have.css", "border", DEFAULT_STATE_STYLE);
    cy.get(CIRCLE).eq(1).should("have.css", "border", DEFAULT_STATE_STYLE);
    cy.get(CIRCLE).eq(2).should("have.css", "border", MODIFIED_STATE_STYLE);
    cy.get(CIRCLE).eq(2).contains(testCase);

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(CIRCLE).eq(2).should("have.css", "border", DEFAULT_STATE_STYLE);
  });
  it('удаление элемента из head', () => {
    cy.clock();
    cy.get(CUT_HEAD_BTN).click();

    cy.get(CIRCLE_TAIL).first().find(CIRCLE).first().should("have.css", "border", CHANGING_STATE_STYLE);
    cy.get(CIRCLE_LETTER).first().should("be.empty");

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(CIRCLE).first().should("have.css", "border", DEFAULT_STATE_STYLE);
    cy.get(CIRCLE_LETTER).first().should("not.be.empty");
  });
  it('удаление элемента из tail', () => {
    cy.clock();
    cy.get(CUT_TAIL_BTN).click();

    cy.get(CIRCLE_TAIL).eq(-2).find(CIRCLE).first().should("have.css", "border", CHANGING_STATE_STYLE);
    cy.get(CIRCLE_LETTER).eq(-2).should("be.empty");

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(CIRCLE).last().should("have.css", "border", DEFAULT_STATE_STYLE);
    cy.get(CIRCLE_LETTER).last().should("not.be.empty");
  });
  it('удаление элемента по индексу 2', () => {
    cy.clock();
    cy.get(LIST_INDEX_INPUT).type('2');
    cy.get(POP_ON_INDEX_BTN).click();

    cy.get(CIRCLE).first().should("have.css", "border", CHANGING_STATE_STYLE);

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(CIRCLE).eq(0).should("have.css", "border", CHANGING_STATE_STYLE);
    cy.get(CIRCLE).eq(1).should("have.css", "border", CHANGING_STATE_STYLE);

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(CIRCLE).eq(0).should("have.css", "border", CHANGING_STATE_STYLE);
    cy.get(CIRCLE).eq(1).should("have.css", "border", CHANGING_STATE_STYLE);
    cy.get(CIRCLE).eq(2).should("have.css", "border", CHANGING_STATE_STYLE);

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(CIRCLE).eq(0).should("have.css", "border", CHANGING_STATE_STYLE);
    cy.get(CIRCLE).eq(1).should("have.css", "border", CHANGING_STATE_STYLE);
    cy.get(CIRCLE).eq(2).should("have.css", "border", DEFAULT_STATE_STYLE);
    cy.get(CIRCLE_LETTER).eq(2).should('be.empty');
    cy.get(CIRCLE_TAIL).eq(2).find(CIRCLE).first().should("have.css", "border", CHANGING_STATE_STYLE);

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(CIRCLE).eq(2).should("have.css", "border", DEFAULT_STATE_STYLE);
    cy.get(CIRCLE_LETTER).eq(2).should('not.be.empty');

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get(CIRCLE).eq(0).should("have.css", "border", DEFAULT_STATE_STYLE);
    cy.get(CIRCLE).eq(1).should("have.css", "border", DEFAULT_STATE_STYLE);
  });


});
