import {
  CHANGING_STATE_STYLE,
  DEFAULT_STATE_STYLE,
  MODIFIED_STATE_STYLE,
  STRING_URL,
  SUBMIT_BTN,
  CIRCLE
} from "../constants";
import {DELAY_IN_MS} from "../../src/constants/delays";

const testCase = 'test'
describe('Алгоритм работы кнопки на странице Строка', () => {
  beforeEach(() => {
    cy.visit(STRING_URL);
  });
  it('кнопка не доступна при открытии страницы (input пустой) ', () => {
    cy.get(SUBMIT_BTN).should("be.disabled");
  });
  it('кнопка активируется при заполнении input', () => {
    cy.get('input').type(testCase);
    cy.get(SUBMIT_BTN).should("not.be.disabled");
  });
  it('кнопка деактивируется при очистке input', () => {
    cy.get('input').type(testCase);
    cy.get('input').clear();
    cy.get(SUBMIT_BTN).should("be.disabled");
  });
});
describe('Визуализация алгоритма разворота строки', () => {
  before(() => {
    cy.visit(STRING_URL);
  });
  it('тест и алгоритма разворота и стилей ', () => {
    cy.clock();
    cy.get('input').type(testCase);
    cy.get(SUBMIT_BTN).click();
    cy.get(CIRCLE).eq(0).as('0');
    cy.get(CIRCLE).eq(1).as('1');
    cy.get(CIRCLE).eq(2).as('2');
    cy.get(CIRCLE).eq(3).as('3');
    cy.get('@0').should('have.css', 'border', CHANGING_STATE_STYLE).contains('t');
    cy.get('@1').should('have.css', 'border', DEFAULT_STATE_STYLE).contains('e');
    cy.get('@2').should('have.css', 'border', DEFAULT_STATE_STYLE).contains('s');
    cy.get('@3').should('have.css', 'border', CHANGING_STATE_STYLE).contains('t');
    cy.tick(DELAY_IN_MS);
    cy.get('@0').should('have.css', 'border', MODIFIED_STATE_STYLE).contains('t');
    cy.get('@1').should('have.css', 'border', CHANGING_STATE_STYLE).contains('e');
    cy.get('@2').should('have.css', 'border', CHANGING_STATE_STYLE).contains('s');
    cy.get('@3').should('have.css', 'border', MODIFIED_STATE_STYLE).contains('t');
    cy.tick(DELAY_IN_MS);
    cy.get('@0').should('have.css', 'border', MODIFIED_STATE_STYLE).contains('t');
    cy.get('@1').should('have.css', 'border', MODIFIED_STATE_STYLE).contains('s');
    cy.get('@2').should('have.css', 'border', MODIFIED_STATE_STYLE).contains('e');
    cy.get('@3').should('have.css', 'border', MODIFIED_STATE_STYLE).contains('t');
  });
})
