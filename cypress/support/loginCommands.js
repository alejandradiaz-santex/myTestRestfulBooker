Cypress.Commands.add('login', (email, password) => { 
    cy.get('#username').type(email)
    cy.get('#password').type(password)
    cy.get('#doLogin').click()
 })

 Cypress.Commands.add('successLogin', (email, password) => { 
    cy.login(email, password)
    cy.get('#createRoom').should('be.visible').and('contain', 'Create')
 })