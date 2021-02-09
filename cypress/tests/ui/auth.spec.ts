import { curryRight } from "cypress/types/lodash";

describe("User Sign-up and Login", function () {
  beforeEach(function () {
    cy.task("db:seed");
  });

  it("should redirect unauthenticated user to signin page", function () {
   cy.visit('/');
   cy.get('h1').contains('Sign in')

   cy.get('form').find('input').should('have.length', 3)
  });
  
  it("should allow a visitor to sign-up, login, and logout", function () {
    // sign-up
    cy.visit('/signup');
    cy.get('#firstName').type('Adam');
    cy.get('#lastName').type('Nowak');
    cy.get('#username').type('anowak');
    cy.get('#password').type('secret');
    cy.get('#confirmPassword').type('secret');
    cy.get('button[type=submit]').click();

    // sign-in

    cy.myLogin({ username: 'anowak', password: 'secret' });

    // create bank account

    cy.get('button[data-test=user-onboarding-next]').click();
    cy.get('#bankaccount-bankName-input').type('abcdefghi')
    cy.get('#bankaccount-routingNumber-input').type('10 202222')
    cy.get('#bankaccount-accountNumber-input').type('123456789')
    cy.get('button[data-test="bankaccount-submit"]').click();
    cy.get('button[data-test="user-onboarding-next"]').click();

    // logout

    cy.get('div[data-test="sidenav-signout"]').click();
  });

  it('should allow to login', function () {
    cy.myLogin({ username: 'cypress.user', password: 'hicypress' });
    cy.location('pathname').should('eq', '/')
    cy.get('h6[data-test="sidenav-user-full-name"]').contains('Cypress U');
  });

  xit("should remember a user for 30 days after login", function () {
    
  });


  it("should display login errors", function () {
    cy.visit('/');
    cy.myLogin({ username: 'hello world', password: 'hicypress' });

    cy.get('div[data-test="signin-error"]').should('exist');
  });

  xit("should display signup errors", function () {
    cy.visit('/signup');
    cy.get('#firstName').type('Adam');
    cy.get('#lastName').type('Nowak');
    cy.get('#username').type('cypress.user');
    cy.get('#password').type('hicypress');
    cy.get('#confirmPassword').type('hicypress');
    cy.get('button[type=submit]').click();
  });

  it("should error for an invalid user", function () {
    cy.visit('/');

    cy.myLogin({ username: 'xxx', password: 'hicypress' });

    cy.get('div[data-test="signin-error"]').should('exist').contains('Username or password is invalid');
  });

  it("should error for an invalid password for existing user", function () {
    cy.visit('/');

    cy.myLogin({ username: 'cypress.user', password: '2137' });

    cy.get('div[data-test="signin-error"]').should('exist').contains('Username or password is invalid');
  });
});
