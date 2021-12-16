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

describe("Blog app", function () {
  describe("login form", function () {
    it("should show login form by default", function () {
      cy.get("#username").should("exist");
      cy.get("#password").should("exist");
      cy.get("#login").should("exist");
    });
    // it("front page can be opened", function () {
    //   cy.contains("Login to blog list app!");
    // });

    // it("will show error if password is wrong", function () {
    //   cy.get("#username").type("edan");
    //   cy.get("#password").type("not_the_right_password");
    //   cy.contains("#login").click();
    //   cy.get(".swal2-shown").contains("invalid username or password");
    //   cy.get("html").should("not.contain", "edan has logged in");
    // });

    // it("can login to the app", function () {
    //   cy.get("#username").type("edan");
    //   cy.get("#password").type("1234");
    //   cy.contains("#login").click();
    //   cy.contains("edan has logged in");
    // });
  });

  //   describe("blog page", function () {
  //     beforeEach(function () {
  //       cy.get("#username").type("edan");
  //       cy.get("#password").type("1234");
  //       cy.contains("#login").click();
  //     });
  //   });
});
