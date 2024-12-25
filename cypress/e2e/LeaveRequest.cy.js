describe('Leave Request Test Scenario', () => {
    const baseUrl = 'https://monsiteweb.com.tn/gestion-conge-test';
  
    beforeEach(() => {
      // Login to the system before accessing the leave request page
      cy.visit(baseUrl);
      cy.get('[data-cy="login"]').type('testuser');
      cy.get('[data-cy="password"]').type('[jjZJVTxxa71');
      cy.get('button#send').click();
      cy.url().should('eq', `${baseUrl}/home`);
      cy.visit(`${baseUrl}/leaves/create`);
    });
  
    it('Form Elements Verification', () => {
      // Verify form elements presence and visibility
      cy.get('select#type').should('be.visible');
      cy.get('input#viz_startdate').should('be.visible');
      cy.get('select#startdatetype').should('be.visible')
        .and('contain', 'Morning').and('contain', 'Afternoon');
      cy.get('input#viz_enddate').should('be.visible');
      cy.get('select#enddatetype').should('be.visible')
        .and('contain', 'Morning').and('contain', 'Afternoon');
      cy.get('input#duration').should('be.visible').and('have.attr', 'readonly');
      cy.get('textarea[name="cause"]').should('be.visible');
      cy.get('button[name="status"][value="1"]').should('be.visible'); // Planned button
      cy.get('button[name="status"][value="2"]').should('be.visible'); // Requested button
      cy.get('a.btn-danger').should('be.visible'); // Cancel button
    });
  
    it('Should allow the user to select a leave type and verify the selection', () => {
      cy.get('select#type').select('Congé Maternité').should('have.value', '2');
      cy.get('select#type option:selected').should('contain.text', 'Congé Maternité');
    });
  
    it('Should allow the user to enter valid dates and periods and verify duration update', () => {
      cy.get('input#viz_startdate').type('2024-12-25');
      cy.get('select#startdatetype').select('Morning').should('have.value', 'Morning');
      cy.get('input#viz_enddate').type('2025-12-26');
      cy.get('select#enddatetype').select('Afternoon').should('have.value', 'Afternoon');
      cy.get('input#duration').should('not.be.empty').and('have.value', '2'); // Replace '' with the expected duration
    });
  
    it('Should allow the user to enter text in the Cause field and verify it is accepted', () => {
      cy.get('textarea[name="cause"]').type('Family emergency');
      cy.get('textarea[name="cause"]').should('have.value', 'Family emergency');
    });
  
    it('Should redirect without saving the leave request when the Cancel button is clicked', () => {
      cy.visit(`${baseUrl}/leaves/create`);
      cy.get('a.btn-danger').click();
      cy.url().should('eq', `${baseUrl}/leaves`);
    });
  
    it('Should save the leave request as "Requested" when the Requested button is clicked', () => {
      cy.get('select#type').select('Congé');
      cy.get('input#viz_startdate').type('2024-12-20');
      cy.get('select#startdatetype').select('Morning');
      cy.get('input#viz_enddate').type('2024-12-31');
      cy.get('select#enddatetype').select('Afternoon');
      cy.get('textarea#cause').type('I would like to take holidays');
      cy.get('button[name="status"][value="2"]').click();
      cy.url().should('eq', `${baseUrl}/leaves`);
      cy.contains('The leave request has been successfully created').should('be.visible');
    });
  
    it('Should allow leave request creation without filling the "Cause" field', () => {
      cy.get('select#type').select('Congé');
      cy.get('input#viz_startdate').type('2024-12-20');
      cy.get('select#startdatetype').select('Morning');
      cy.get('input#viz_enddate').type('2024-12-31');
      cy.get('select#enddatetype').select('Afternoon');
      cy.get('button[name="status"][value="2"]').click();
      cy.url().should('eq', `${baseUrl}/leaves`);
      cy.contains('The leave request has been successfully created').should('be.visible');
    });
  
    it('Should display validation message when submitting without duration', () => {
      cy.get('button[name="status"][value="2"]').click();
      cy.get('.bootbox .modal-body').should('have.text', 'The field Duration is mandatory.');
    });
  });
  