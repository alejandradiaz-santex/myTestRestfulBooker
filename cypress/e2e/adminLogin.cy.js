describe('Login the Admin Page', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });
    cy.visit('https://automationintesting.online/admin')
    cy.fixture('adminData').then((data) => {
        const input = data.validUser
        cy.wrap(input).as('adminInput');
    })
    cy.intercept('POST', '/api/auth/login').as('messageLogin')
  })

  it('Success Login', function () {
    cy.successLogin(this.adminInput.username, this.adminInput.password)

    cy.wait('@messageLogin').then((interception) => {
     expect(interception.response.statusCode).to.eq(200)  
     expect(interception.response.body).to.have.property('token').and.not.be.empty;
    })  
  })

 it('Failed Login, incorrect Password', function () {
    cy.login(this.adminInput.username, 'wrongpass')
    cy.get('.alert').should('be.visible').and('have.text', 'Invalid credentials') 

    cy.wait('@messageLogin').then((interception) => {
     expect(interception.response.statusCode).to.eq(401)  
     expect(interception.response.body).to.have.property('error','Invalid credentials')
    }) 
  })

  it('Failed Login, empty Username and Password', function () {
    cy.get('#doLogin').click()
    cy.get('.alert').should('be.visible').and('have.text', 'Invalid credentials') 

    cy.wait('@messageLogin').then((interception) => {
     expect(interception.response.statusCode).to.eq(401)  
     expect(interception.response.body).to.have.property('error','Invalid credentials')
    }) 
  })

})