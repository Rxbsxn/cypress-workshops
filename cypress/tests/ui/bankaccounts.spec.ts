describe("Bank Accounts", function () {
  beforeEach(function () {
    cy.task("db:seed");
  });

  it("creates a new bank account", function () {
    cy.myLogin({ username: 'cypress.user', password: 'hicypress' });
    cy.getBySel('sidenav-bankaccounts').click();
    cy.getBySel('bankaccount-new').click();

    cy.get('#bankaccount-bankName-input').type('abcdefghi')
    cy.get('#bankaccount-routingNumber-input').type('10 202222')
    cy.get('#bankaccount-accountNumber-input').type('123456789')

    cy.getBySel('bankaccount-submit').click();

    cy.location('pathname').should('eq', '/bankaccounts')
    cy.getBySel('bankaccount-list').find('li').should('have.length', 2);
  });

  it("should display bank account form errors", function () {
    
  });

  it("soft deletes a bank account", function () {
    
  });

  it("renders an empty bank account list state with onboarding modal", function () {
    
  });
});
