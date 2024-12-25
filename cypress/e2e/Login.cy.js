describe('Login Page Test Scenario', () => {
  const baseUrl = 'https://monsiteweb.com.tn/gestion-conge-test';

      // Visit the login page before running tests
      beforeEach(() => {
        // Visit the login page before running tests
        cy.visit(baseUrl);
        
      });
  
    it('Should display all required elements on the login page', () => {
      // Verify the presence of the Username input field
      cy.get('[data-cy="login"]').should('be.visible');
  
      // Verify the presence of the Password input field
      cy.get('[data-cy="password"]').should('be.visible');
  
      // Verify the presence of the Login button
      cy.get('button#send').should('be.visible');
  
      // Verify the presence of the Language dropdown menu
      cy.get('select#language').should('be.visible');
    });
  
     it('Should change the language using the dropdown menu', () => {
      // Select French from the language dropdown menu
      cy.get('select#language').select('fr');
  
      // Verify the dropdown reflects the language change
      cy.get('select#language').should('have.value', 'fr');
    });
  
    it('Should allow user to login with valid credentials', () => {
      // Enter valid username
      cy.get('[data-cy="login"]').type('testuser');
  
      // Enter valid password
      cy.get('[data-cy="password"]').type('[jjZJVTxxa71');
  
      // Click on the Login button
      cy.get('button#send').click();
  
      // Verify redirection to the homepage
      cy.url().should('eq', `${baseUrl}/home`);
    });
  
    it('Should display an error for missing username or password', () => {
      // Leave the username and password fields empty and click login
      cy.get('button#send').click();
  
      // Verify an error message appears
      cy.contains('Please fill the login field').should('be.visible');
    });
  });
  