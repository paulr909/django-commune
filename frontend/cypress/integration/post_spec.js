describe("Post", () => {
  it("Should create new post", () => {
    cy.server();
    cy.visit("/editor", {
      // see https://github.com/cypress-io/cypress/issues/95#issuecomment-281273126
      onBeforeLoad(win) {
        win.fetch = null;
      },
    });
    cy.route("POST", /.*\/api\/articles/, {
      article: {
        title: "React JS",
        slug: "react-js-w4qelc",
        body:
          "Build encapsulated components that manage their own state, then compose them to make complex UIs.\n" +
          "\n" +
          "Since component logic is written in JavaScript instead of templates, you can easily pass rich data through your app and keep state out of the DOM.",
        createdAt: "2018-10-13T18:20:22.858Z",
        updatedAt: "2018-10-13T18:20:22.858Z",
        description: "A JavaScript library for building user interfaces",
        author: {
          username: "Tester",
          bio: null,
          image: "https://avatars1.githubusercontent.com/u/47115670?s=400&v=4",
          following: false,
        },
        favored: false,
        favoritesCount: 0,
      },
    }).as("postArticle");

    cy.get('input[placeholder="Article Title"]').type("React JS");
    cy.get('input[placeholder="What\'s this article about?"]').type(
      "A JavaScript library for building user interfaces"
    );
    cy.get('textarea[placeholder="Write your article (in markdown)"]').type(
      "Build encapsulated components that manage their own state, then compose them to make complex UIs.\n" +
        "\n" +
        "Since component logic is written in JavaScript instead of templates, you can easily pass rich data through your app and keep state out of the DOM."
    );
  });
});
