describe('Send a Message', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });
    cy.visit('https://automationintesting.online/')
    cy.fixture('messageData').then((data) => {
        const input = data.message
        cy.wrap(input).as('messageInput');
    })
    cy.intercept('POST', '/api/message').as('messageCreation')
  })

  it('Sucessful Message sending with valid data', function () {
    cy.verifyMessageForm()
    cy.completeMessageInfo(this.messageInput.name, this.messageInput.email, this.messageInput.phone, this.messageInput.subject, this.messageInput.description)
    cy.get('.col-lg-8 > .card > .card-body').should('be.visible').and('contain', 'Thanks for getting in touch')

    cy.wait('@messageCreation').then((interception) => {
     expect(interception.response.statusCode).to.eq(200)  
     expect(interception.response.body).to.have.property('success',true)

    })    
  })

  it('Message sending with invalid email', function () {
    cy.verifyMessageForm()
    cy.completeMessageInfo(this.messageInput.name, "mad", this.messageInput.phone, this.messageInput.subject, this.messageInput.description)
    cy.get('.alert').should('be.visible').and('have.text','must be a well-formed email address')

     cy.wait('@messageCreation').then((interception) => {
     expect(interception.response.statusCode).to.eq(400)  
     expect(interception.response.body).to.deep.eq(['must be a well-formed email address'])

    }) 
  }) 

  it('Message sending with empty name', function () {
    cy.verifyMessageForm()
    cy.completeMessageInfo(null, this.messageInput.email, this.messageInput.phone, this.messageInput.subject, this.messageInput.description)
    cy.get('.alert').should('be.visible').and('have.text','Name may not be blank')

     cy.wait('@messageCreation').then((interception) => {
     expect(interception.response.statusCode).to.eq(400)  
     expect(interception.response.body).to.deep.eq(['Name may not be blank'])

    }) 
  }) 
})