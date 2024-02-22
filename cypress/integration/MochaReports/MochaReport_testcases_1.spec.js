context('Sample testcases with Mocha report-1', () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })

  describe('Mocha cases-1', () => {
  
    it('Verify that user enters the date', function() {
        cy.openURL('reactCalendar_URL');  
        cy.actionClick('calendarView_btn',1);
        cy.actionClick('calendarView_1_year_selector_btn');
        cy.actionClick('calendarView_1_yearList','year');
        cy.actionSelectDate('calendarView_1_month_item','calendarView_1_date_btn',1,'date'); 
    })
  })
})  