context('Sample testcases for Zephyr-Jira', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
    })

    describe('Sample testcases', () => {
        it('CUA-2', function() {
            cy.openURL('reactCalendar_URL');  
            cy.actionClick('calendarView_btn',1);
            cy.actionClick('calendarView_1_year_selector_btn');
            cy.actionClick('calendarView_1_yearList','year');
            cy.actionSelectDate('calendarView_1_month_item','calendarView_1_date_btn',1,'date'); 
        })

        it('CUA-4', function() {
            cy.openURL('login_URL');  
            cy.actionTypeData('username_textbox','username');
            cy.actionTypeData('password_textbox','password');
            cy.actionClick('submit_btn');
            cy.verifyPartialText('heading_path','heading_afterLogin');
        })
    })
})  