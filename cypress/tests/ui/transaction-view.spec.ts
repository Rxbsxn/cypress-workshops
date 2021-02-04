import { User, Transaction } from "../../../src/models";

type NewTransactionCtx = {
  transactionRequest?: Transaction;
  authenticatedUser?: User;
};

describe("Transaction View", function () {
  const ctx: NewTransactionCtx = {};

  beforeEach(function () {
    cy.task("db:seed");
  });

  it("transactions navigation tabs are hidden on a transaction view page", function () {
    
  });

  it("likes a transaction", function () {
   
  });

  it("comments on a transaction", function () {
   
  });

  it("accepts a transaction request", function () {
    
  });

  it("rejects a transaction request", function () {
   
  });

  it("does not display accept/reject buttons on completed request", function () {
    
  });
});
