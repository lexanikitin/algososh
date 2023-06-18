import {BASE_URL} from "../constants";

describe('Запуск приложения', ()=>{
  it('приложение поднялось', ()=>{
    cy.visit(BASE_URL);
    cy.contains(/МБОУ АЛГОСОШ/i);
  })
})
