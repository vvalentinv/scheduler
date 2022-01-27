describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it("should navigate to Tuesday", () => {
    cy.visit("/");

    // cy.get("li").contains("Tuesday").click();

    cy.contains("[data-testid]", "Tuesday").click()
    cy.contains("[data-testid]", "Tuesday").should("have.css", "background-color", "rgb(242, 242, 242)")

    cy.contains("[data-testid]", "Tuesday")
      .click()
      .should("have.css", "background-color", "rgb(242, 242, 242)");
  });
});
