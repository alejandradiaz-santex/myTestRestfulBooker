describe('Booking a room', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });
    cy.visit('https://automationintesting.online/')
    const num = Math.floor(Math.random() * 90) + 10
      cy.fixture('bookingData').then((data) => { // in order to take random dates without modify fixture each time the test is run
      const baseData = data.bookingInfo
      const today = new Date()
      const checkinValidDate = new Date(today)
      checkinValidDate.setDate(today.getDate() + num)
      const checkoutValidDate = new Date(checkinValidDate)
      checkoutValidDate.setDate(checkinValidDate.getDate() + 2) 
      const input = {
        ...baseData, 
        firstname: baseData.firstname,
        lastname: baseData.lastname,
        phone: baseData.phone,
        email: baseData.email,
        bookingdates: {
          checkin: checkinValidDate.toISOString().split('T')[0],
          checkout: checkoutValidDate.toISOString().split('T')[0],
        }
      }
      cy.wrap(input).as('bookingInput'); // Global variable, in order to use it within the its
    })
    cy.intercept('POST', '/api/booking').as('bookingCreation')
  })

  it('Sucessful Room booking with valid data', function () {
    cy.verifyRoomsAvailability(this.bookingInput.bookingdates.checkin,this.bookingInput.bookingdates.checkout)
    cy.makeReservation(this.bookingInput.firstname,this.bookingInput.lastname,this.bookingInput.phone,this.bookingInput.email)
    cy.get('.shadow > :nth-child(1)').should('be.visible').and('contain', 'Booking Confirmed')  

    cy.wait('@bookingCreation').then((interception) => {
     expect(interception.response.statusCode).to.eq(201)  
     expect(interception.response.body).to.have.property('firstname',this.bookingInput.firstname)
	   expect(interception.response.body).to.have.property('lastname',this.bookingInput.lastname)
	   expect(interception.response.body).to.have.property('roomid',this.room) 
     expect(interception.response.body).to.have.property('bookingid').and.be.a('number').and.greaterThan(0);
    })    

  })

  it('Room booking with invalid phone number', function () {
    cy.verifyRoomsAvailability(this.bookingInput.bookingdates.checkin,this.bookingInput.bookingdates.checkout)
    cy.makeReservation(this.bookingInput.firstname,this.bookingInput.lastname,1234,this.bookingInput.email)
    cy.get('.alert').should('be.visible').and('have.text', 'size must be between 11 and 21')

    cy.wait('@bookingCreation').then((interception) => {
     expect(interception.response.statusCode).to.eq(400)  
     expect(interception.response.body).to.have.property('errors').that.deep.equals(['size must be between 11 and 21'])
    })
  
  }) 

  it('Room Booking with empty email', function () {
    cy.verifyRoomsAvailability(this.bookingInput.bookingdates.checkin,this.bookingInput.bookingdates.checkout)
    cy.makeReservation(this.bookingInput.firstname,this.bookingInput.lastname,this.bookingInput.phone,null)
    cy.get('.alert').should('be.visible').and('have.text', 'must not be empty')

    cy.wait('@bookingCreation').then((interception) => {
     expect(interception.response.statusCode).to.eq(400)  
     expect(interception.response.body).to.have.property('errors').that.deep.equals(['must not be empty'])
    })

  }) 
})