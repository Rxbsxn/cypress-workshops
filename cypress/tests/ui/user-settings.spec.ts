describe("User Settings", function () {
  beforeEach(function () {
    cy.task("db:seed");
  });

  it("renders the user settings form", function () {
    cy.myLogin({ username: 'cypress.user', password: 'hicypress' });
    cy.getBySel('sidenav-user-settings').click();
    cy.getBySel('user-settings-form').should('exist');
  });

  it("should display user setting form errors", function () {
    cy.myLogin({ username: 'cypress.user', password: 'hicypress' });
    cy.getBySel('sidenav-user-settings').click();

    cy.get('#user-settings-phoneNumber-input').type('5');
    cy.get('#user-settings-phoneNumber-input-helper-text').contains('Phone number is not valid');
    cy.getBySel('user-settings-submit').should('be.disabled');
  });

  it("updates first name, last name, email and phone number", function () {
    cy.myLogin({ username: 'cypress.user', password: 'hicypress' });
    cy.getBySel('sidenav-user-settings').click();

    cy.get('#user-settings-firstName-input').type('5');
    cy.getBySel('user-settings-submit').click();

    cy.get('#user-settings-firstName-input').should('have.value', 'Cypress5');
  });
});
