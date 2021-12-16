describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "pianissimo",
      username: "edan",
      password: "123456",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  describe("login form", function () {
    it("should show login form by default", function () {
      cy.get("#username").should("exist");
      cy.get("#password").should("exist");
      cy.get("#login").should("exist");
    });
    it("front page can be opened", function () {
      cy.contains("Login to blog list app!");
    });

    it("will show error if password is wrong", function () {
      cy.get("#username").type("edan");
      cy.get("#password").type("not_the_right_password");
      cy.get("#login").click();
      cy.get(".swal2-shown").contains("invalid username or password");
      cy.get("html").should("not.contain", "edan has logged in");
    });

    it("can login to the app", function () {
      cy.get("#username").type("edan");
      cy.get("#password").type("123456");
      cy.get("#login").click();
      cy.contains("edan has logged in");
      cy.visit("http://localhost:3000");
    });

    describe("When logged in", function () {
      beforeEach(function () {
        const userInfo = {
          username: "edan",
          password: "123456",
        };
        cy.request("POST", "http://localhost:3001/api/login", userInfo).then(
          function (response) {
            window.localStorage.setItem("user", JSON.stringify(response.body));
          }
        );
        cy.visit("http://localhost:3000/blogs");
      });

      it("A blog can be created", function () {
        cy.get("#toggleCreateFrom").should("exist");
        cy.get("#toggleCreateFrom").click();
        cy.get("#createTitle").type("Im a new title");
        cy.get("#createAuthor").type("Author");
        cy.get("#createUrl").type("some.url.com");
        cy.get(".createButton").click();
        cy.get(".blog > .titleSpan").contains("Im a new title");
      });
    });
  });
});
