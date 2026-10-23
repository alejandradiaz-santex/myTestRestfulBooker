Cypress.Commands.add('verifyRoomsAvailability', (checkin, checkout) => { 
    cy.get(':nth-child(1) > .react-datepicker-wrapper > .react-datepicker__input-container > .form-control').type(checkin)
    cy.get(':nth-child(2) > .react-datepicker-wrapper > .react-datepicker__input-container > .form-control').type(checkout)
    cy.get('.col-8 > .btn').click()
    cy.get('#rooms > div > div.row.g-4 > div').should('be.visible').and('have.length.greaterThan', 0)
    cy.get('#rooms > div > div.row.g-4 > div').then(($rooms) => {//to get the number of rooms and select one randomly in the Reservation
        const roomCount = $rooms.length
        const randomRoom = Math.floor(Math.random() * roomCount) + 1
        cy.wrap(randomRoom).as('room')
    })
 })

Cypress.Commands.add('makeReservation', (firstName, lastName, phone, email) => { 
    cy.get('@room').then((roomIndex) => { // to use in the selector the room # randomly choose above
        cy.get(`:nth-child(${roomIndex}) > .card > .card-footer > .btn`).should('have.text','Book now').click()
    })
    cy.get('#doReservation').should('be.visible').and('contain', 'Reserve Now')
    cy.get('#doReservation').click()
    cy.completeBookInfo(firstName, lastName, phone, email) 
 })

Cypress.Commands.add('completeBookInfo', (firstName, lastName, phone, email) => { 
    cy.get('[name="firstname"]').type(firstName)
    cy.get('[name="lastname"]').type(lastName)
    if (email) {
        cy.get('[name="email"]').type(email)
    }
    cy.get('[name="phone"]').type(phone)
    cy.get('.btn-primary').click()
 })