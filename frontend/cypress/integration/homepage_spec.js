describe("Homepage", () => {
  beforeEach(() => {
    cy.server();
    // cy.route(
    //   /.*\/api\/articles(\?limit=(\d+)&offset=(\d+))?/,
    //   "fixture:articles.json"
    // ).as("loadArticles");

    cy.visit("/", {
      // see https://github.com/cypress-io/cypress/issues/95#issuecomment-281273126
      onBeforeLoad(win) {
        win.fetch = null;
      },
    });
    cy.get("button.nav-link").contains("Global Feed").click();
    // cy.wait(["@loadArticles"]);
  });

  it("Should have page title set", () => {
    cy.title().should("include", "Commune");
    cy.screenshot();
  });

  context("Query DOM", () => {
    it("Should have header navbar", () => {
      cy.get(".navbar").as("navbar");

      cy.get("@navbar").should("be.visible");
      cy.get("@navbar").within(() => {
        cy.get("a").as("navbarButtons");

        cy.get("@navbarButtons").its("length").should("be.gte", 4);
        cy.get("@navbarButtons")
          .contains("commune")
          .should("have.attr", "href", "/");
        cy.get("@navbarButtons")
          .contains("Home")
          .should("have.attr", "href", "/");
        cy.get("@navbarButtons")
          .contains("Sign in")
          .should("have.attr", "href", "/login");
        cy.get("@navbarButtons")
          .contains("Sign up")
          .should("have.attr", "href", "/register");
      });
    });

    it("Should have banner container", () => {
      cy.get(".banner").as("banner");

      cy.get("@banner").within(() => {
        cy.get("h1").contains("commune").should("be.visible");
        cy.get("p").contains("For like minded people.").should("be.visible");
      });
    });

    it("Should have main container with articles", () => {
      cy.get(".page").as("main");

      cy.get("@main").within(() => {
        cy.get(".feed-toggle").contains("Global Feed");
        cy.get("button.nav-link").contains("Global Feed").click();
        cy.get(".article-preview")
          .as("articles")
          .its("length")
          .should("be.lte", 10);

        cy.get("@articles").each(($el) => {
          cy.wrap($el).as("preview");
          cy.get("@preview").get("a > img");
          cy.get("@preview").get(".info > a, .info > span");
          cy.get("@preview")
            .get("button > i")
            .should("have.class", "ion-heart");
          cy.get("@preview")
            .get(".preview-link")
            .within(() => {
              cy.get("span").contains("Read more...");
            });
        });

        // cy.get(".pagination").within(() => {
        //   cy.get(".page-item")
        //     .its("length")
        //     .should("be.gt", 1);
        // });
      });
    });
  });

  context("Articles link", () => {
    afterEach(() => {
      cy.screenshot();
      cy.go("back");
    });

    it("Should navigate to Global Feed", () => {
      cy.get("button.nav-link").contains("Global Feed").click();

      cy.location("pathname").should("be.equal", "/");
      cy.get("button").contains("Global Feed");
    });
  });

  context("Navigation links", () => {
    afterEach(() => {
      cy.screenshot();
      cy.go("back");
    });

    it("Should navigate to Login page", () => {
      cy.get("a.nav-link").contains("Sign in").click();

      cy.location("pathname").should("be.equal", "/login");
      cy.get("h1").contains("Sign In");
    });

    it("Should navigate to Register page", () => {
      cy.get("a.nav-link").contains("Sign up").click();

      cy.location("pathname").should("be.equal", "/register");
      cy.get("h1").contains("Sign Up");
    });

    // it("Should navigate to first article", () => {
    //   const slug = "get-that-dog-out-of-here";
    //   const title = "Get that dog out of here";
    //
    //   cy.getArticle(slug).as("articleLoaded");
    //   cy.route(/.*\/api\/articles\/[\w-]+/, "@articleLoaded").as("loadArticle");
    //   cy.route(
    //     /.*\/api\/articles\/[\w-]+\/comments/,
    //     "fixture:comments.json"
    //   ).as("loadComments");
    //   cy.get("button.nav-link")
    //     .contains("Global Feed")
    //     .click();
    //   cy.get(".preview-link")
    //     .eq(0)
    //     .contains("Read more...")
    //     .click();
    //   cy.wait(["@loadArticle", "@loadComments"]);
    //
    //   cy.location("pathname").should("match", /\/article\/[\w-]+/);
    //   cy.get("h1").contains(title);
    // });

    // it("Should navigate to next page", () => {
    //   cy.get(".page-item")
    //     .contains("2")
    //     .as("nextPage");
    //   cy.get("@nextPage").click();
    //   cy.get("@nextPage")
    //     .parent()
    //     .should("have.class", "active");
    //   cy.get("@nextPage")
    //     .parent()
    //     .siblings(":not(.active)")
    //     .its("length")
    //     .should("be", 0);
    // });
  });
});
