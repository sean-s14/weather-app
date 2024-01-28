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

describe("Ensure theme toggle works", () => {
  it("Check if button and dropdown items exist", () => {
    // Find the button inside the nav with the id of mode-toggle
    cy.get("nav > button#mode-toggle").should("exist");
    cy.get("nav > button#mode-toggle").click();
    cy.get("[data-radix-popper-content-wrapper]").should("exist");
    cy.get("[data-radix-collection-item]").should("have.length", 3);
  });

  describe("Check if theme changes", () => {
    beforeEach(() => {
      cy.get("nav > button#mode-toggle").click();
    });

    it("Change theme to dark", () => {
      // select the dropdown item with the text of Dark
      cy.get("[data-radix-collection-item]").contains("Dark").click();

      // check that html has class of dark
      cy.get("html").should("have.class", "dark");

      // check if localStorage has vite-ui-theme key with value of dark
      cy.window().its("localStorage.vite-ui-theme").should("eq", "dark");
    });

    it("Change theme to light", () => {
      cy.get("[data-radix-collection-item]").contains("Light").click();
      cy.get("html").should("have.class", "light");
      cy.window().its("localStorage.vite-ui-theme").should("eq", "light");
    });

    it("Change theme to system", () => {
      cy.get("[data-radix-collection-item]").contains("System").click();

      // check if system is dark or light
      const isDarkMode =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      const systemTheme = isDarkMode ? "dark" : "light";

      cy.get("html").should("have.class", systemTheme);
      cy.window().its("localStorage.vite-ui-theme").should("eq", "system");
    });
  });
});
