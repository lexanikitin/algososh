import {FIBONACCI_URL, LIST_URL, MAIN_PAGE_URL, QUEUE_URL, SORTING_URL, STACK_URL, STRING_URL} from "../constants";

describe('Роутинг по страницам : ', () => {
  it('главная', () => {
    cy.visit(MAIN_PAGE_URL);
    cy.contains(/МБОУ АЛГОСОШ/i);
  });
  it('Строка', () => {
    cy.visit(MAIN_PAGE_URL);
    cy.get('a[href="' + STRING_URL + '"]').click();
    cy.contains('Строка');
  });
  it('Фибоначчи', () => {
    cy.visit(MAIN_PAGE_URL);
    cy.get('a[href="' + FIBONACCI_URL + '"]').click();
    cy.contains('Последовательность Фибоначчи');
  });
  it('Сортировка массива', () => {
    cy.visit(MAIN_PAGE_URL);
    cy.get('a[href="' + SORTING_URL + '"]').click();
    cy.contains('Сортировка массива');
  });
  it('Стек', () => {
    cy.visit(MAIN_PAGE_URL);
    cy.get('a[href="' + STACK_URL + '"]').click();
    cy.contains('Стек');
  });
  it('Очередь', () => {
    cy.visit(MAIN_PAGE_URL);
    cy.get('a[href="' + QUEUE_URL + '"]').click();
    cy.contains('Очередь');
  });
  it('Связный список', () => {
    cy.visit(MAIN_PAGE_URL);
    cy.get('a[href="' + LIST_URL + '"]').click();
    cy.contains('Связный список');
  });
})
