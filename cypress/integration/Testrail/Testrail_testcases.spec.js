context('Sample testcases for Testrail', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
    })

    describe('Sample testcases', () => {
      
        it('C1 Verify that user enters the date', function() {
            cy.openURL('reactCalendar_URL');  
            cy.actionClick('calendarView_btn',1);
            cy.actionClick('calendarView_1_year_selector_btn');
            cy.actionClick('calendarView_1_yearList','year');
            cy.actionSelectDate('calendarView_1_month_item','calendarView_1_date_btn',1,'date'); 
        })

        it('C2 Verify that user logged in', function() {
            cy.openURL('login_URL');  
            cy.actionTypeData('username_textbox','username');
            cy.actionTypeData('password_textbox','password');
            cy.actionClick('submit_btn');
            cy.verifyPartialText('heading_path','heading_afterLogin');
        })


        // //Open a URL to select round/one-way/multi destination flight(radio button)
        // //Then user selects the origin and destination city (from the list)
        // //Then user search for the flights
        // it('C3 Verify that user books a flight', function() {
        
        //     // param= key for the URL in endpoint.json
        //     cy.openURL('flightBooking_URL');  

        //     // param1= Key for xpath in xpath.json , param2= option number
        //     cy.actionRadioBtn('ticketTypeRadio_btn',3);
        //     cy.actionRadioBtn('ticketTypeRadio_btn',1);

        //     // param1= Key for xpath in xpath.json , param2= key for testdata in data.json
        //     cy.actionClearThenTypeData('origin_textbox','origin_city');
            
        //     //param1= key for xpath in xpath.json , param2= key for position of element 
        //     cy.actionClick('countryList',1);
        //     cy.actionClearThenTypeData('destination_textbox','destination_city');
        //     cy.actionClick('countryList',1);
        //     cy.actionClick('searchFlight_btn');
        // })

       
    })
})  