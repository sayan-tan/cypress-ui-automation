context('Sample intercept API testcases', () => {

    describe('Intercept API case', () => {
        
        //Testcase without any intercept
        it('Verify that user logged in without intercepted API', function() {

            cy.openURL('intercept_URL');
            cy.actionTypeData('intercept_username','intercept_username');
            cy.actionTypeData('intercept_password','intercept_password');
            cy.actionClick('intercept_login_btn');
            cy.verifyPartialText('intercept_heading_textbox','withoutStubText');
        })

        //Testcase with intercept
        it('Verify that user logged in with intercepted GET API', function() {
        
            //Intercepting GET request(/secure) and then replacing it with a custom response stored in 
            //Fixture/Intercept/get_response.html file
            cy.intercept('GET', '/secure', {fixture: './Intercept/get_response.html'}).as('secureMethod')

            cy.openURL('intercept_URL');
            cy.actionTypeData('intercept_username','intercept_username');
            cy.actionTypeData('intercept_password','intercept_password');
            cy.actionClick('intercept_login_btn');

            cy.wait('@secureMethod');

            cy.verifyPartialText('intercept_heading_textbox','withStubText');
        })
    })
})  