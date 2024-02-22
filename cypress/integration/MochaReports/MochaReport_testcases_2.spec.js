context('Sample testcases with Mocha report-2', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false
    })
  
    describe('Mocha cases-2', () => {
      
        // it('Verify that user books a flight', function() {
        //     cy.openURL('flightBooking_URL');  
        //     cy.actionRadioBtn('ticketTypeRadio_btn',3);
        //     cy.actionRadioBtn('ticketTypeRadio_btn',1);
        //     cy.actionClearThenTypeData('origin_textbox','origin_city');
        //     cy.actionClick('countryList',1);
        //     cy.actionClearThenTypeData('destination_textbox','destination_city');
        //     cy.actionClick('countryList',1);
        //     cy.actionClick('searchFlight_btn');
        // })

        it('Verify that user logged in', function() {
            cy.openURL('login_URL');  
            cy.actionTypeData('username_textbox','username');
            cy.actionTypeData('password_textbox','password');
            cy.actionClick('submit_btn');
            cy.verifyPartialText('heading_path','heading_afterLogin');
        })
    })
})  