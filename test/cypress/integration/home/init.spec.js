import * as ctx from '../../../../quasar.conf.js';

describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('.should() - assert that <title> is correct', () => {
    cy.title().should('include', 'testing');
  });

  it('has header elements', () => {
    cy.get('header.q-header').should('contain', 'Satff management system');
  });

  it('has footer elements', () => {
    cy.get('footer.q-footer').should('contain', 'Footer');
  });

  it('has login button', () => {
    cy.get('button.q-btn').should('contain', 'Login');
  });
});
