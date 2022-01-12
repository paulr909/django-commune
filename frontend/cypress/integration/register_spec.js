describe("Registration", () => {
  beforeEach(() => {
    cy.server();

    cy.visit("/register", {
      // see https://github.com/cypress-io/cypress/issues/95#issuecomment-281273126
      onBeforeLoad(win) {
        win.fetch = null;
      },
    });
  });

  it("Should have page title", () => {
    cy.get(".auth-page h1").contains("Sign Up");
  });

  it("Should register new user", () => {
    const newUser = {
      username: "tester",
      email: "tester@mail.com",
      password: "easy-password",
    };

    cy.route("POST", /.*\/api\/users/, {
      user: {
        id: Date.now(),
        email: newUser.email,
        createdAt: new Date(),
        updatedAt: new Date(),
        username: newUser.username,
        bio: null,
        image: null,
        token: "jwt",
      },
    }).as("postUser");

    cy.get('input[placeholder="Username"]').type(newUser.username);
    cy.get('input[placeholder="Email"]').type(newUser.email);
    cy.get('input[placeholder="Password"]').type(newUser.password);
    cy.get(".container.page").screenshot();
    cy.get(".auth-page form").submit();

    cy.wait(["@postUser"]);

    cy.get(`a[href="/@${newUser.username}"]`).contains(newUser.username);
  });

  it("Should show form errors", () => {
    cy.route({
      method: "POST",
      url: /.*\/api\/users/,
      status: 422,
      response: {
        errors: {
          email: ["can not be blank"],
          password: ["can not be blank"],
          username: [
            "can not be blank",
            "is too short (minimum is 1 character)",
            "is too long (maximum is 20 characters)",
          ],
        },
      },
    }).as("postUser");

    cy.get(".auth-page form").submit();
    cy.wait("@postUser");
    cy.get(".auth-page .error-messages");
  });

  afterEach(() => {
    cy.screenshot();
    cy.reload();
  });
});
