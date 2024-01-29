// Using runBefore variable to allow user to opt-out of running the beforeEach hook for specific tests. Set runBefore to false at the beginning of the test you don't want it to run for, and then set it back to true at the end of the test.
var runBefore = false;

beforeEach(() => {
  if (runBefore) {
    cy.visit("http://localhost:3000");
  }
});

it("Visit website", () => {
  cy.visit("http://localhost:3000");
  runBefore = true;
});
