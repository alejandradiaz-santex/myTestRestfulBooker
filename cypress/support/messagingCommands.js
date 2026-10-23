Cypress.Commands.add('verifyMessageForm', () => { 
   cy.get('.col-lg-8').last().should('contain','Send Us a Message')
})

Cypress.Commands.add('completeMessageInfo', (name, email, phone, subject, description) => { 
    if (name) {
        cy.get('[data-testid="ContactName"]').type(name)
    }
    cy.get('[data-testid="ContactEmail"]').type(email)
    cy.get('[data-testid="ContactPhone"]').type(phone)
    cy.get('[data-testid="ContactSubject"]').type(subject)
    cy.get('[data-testid="ContactDescription"]').type(description)
    cy.get('.d-grid > .btn').click()

})