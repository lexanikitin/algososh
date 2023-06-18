import {MAIN_PAGE_URL} from "../constants";

describe('Запуск приложения', ()=>{
  it('приложение поднялось', ()=>{
    cy.visit(MAIN_PAGE_URL);
    cy.contains(/МБОУ АЛГОСОШ/i);
  })
})
