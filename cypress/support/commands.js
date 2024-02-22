const endpointData = require('/cypress/fixtures/endpoint')
const xpathData = require('/cypress/fixtures/xpath')
const testData = require('/cypress/fixtures/data');

Cypress.Commands.add('openURL', function(url){
    cy.log("Visit URL: "+ endpointData[url]);
    cy.visit(endpointData[url]);  
})

Cypress.Commands.add('actionTypeData', function(xpath,data){
    cy.log("Type data: "+ testData[data] +", Xpath: "+xpathData[xpath]);
    cy.get(xpathData[xpath]).should('exist').type(testData[data]);
})

Cypress.Commands.add('actionClearThenTypeData', function(xpath,data){
    cy.log("Type data: "+ testData[data] +", Xpath: "+xpathData[xpath]);
    cy.get(xpathData[xpath]).should('exist').clear().type(testData[data]);
})

Cypress.Commands.add('actionClick', function(xpath, position){
    cy.log("Click on: " + xpathData[xpath]);
    if(position== null){
        cy.get(xpathData[xpath]).should('exist').click();
    }else{
        if(isNaN(position)){
            cy.get(xpathData[xpath]).should('exist').contains(testData[position]).click();
        }else{
            cy.get(xpathData[xpath]).should('exist').eq(position-1).click();
        }
    }
})

Cypress.Commands.add('actionSelectDate', function(xpath_month,xpath_date,position,date){
    cy.log("Xpath of element: " + xpathData[xpath_month]);
    
    let monthName;
    let monthNum;
    let monthNumData;

    // get month on website
    cy.get(xpathData[xpath_month]).eq((position-1)).then(($div) => {
        monthName = $div.text()
        var dt = new Date(Date.parse("2022/"+monthName+"/1"));
        
        //get month's number
        monthNum = dt.getMonth();

        //get testdata's month
        var dt = new Date(Date.parse("2022/"+testData.month+"/1"));

        //get testdata's month's number
        monthNumData = dt.getMonth();

        //Traverse to the required month
        if(monthNum>monthNumData){
            var diff=monthNum-monthNumData;
            var i;
            for(i=0; i<diff; i++){
                cy.actionClick('calendarView_1_monthLeft_btn');
            }
        }else if(monthNum<monthNumData){
            var diff=monthNumData-monthNum;
            var i;
            for(i=0; i<diff; i++){
                cy.actionClick('calendarView_1_monthRight_btn');
            }
        }else{
            // do nothing if they are equal
        }
        
        //click on the mentioned date
        cy.log("Xpath of date: " + xpathData[xpath_date]);
        cy.get(xpathData[xpath_date]).should('exist').eq(testData[date]-1).click();

        //verify the mentioned date
        cy.log("Verify the date: " + testData.final_date);
        cy.get(xpathData.final_date).invoke('attr','value').should('equal',testData.final_date);
    });
})

Cypress.Commands.add('actionScrollIntoView', function(xpath){
    cy.log("Click on: " + xpathData[xpath]);
    cy.get(xpathData[xpath]).should('exist').scrollIntoView();   
})

Cypress.Commands.add('actionRadioBtn', function(xpath,position){
    cy.log("Click on: " + xpathData[xpath]);
    cy.get(xpathData[xpath]).should('exist').eq(position-1).check().should('be.checked');   
})

Cypress.Commands.add('verifyText', function(xpath,val){
    cy.log("Verify data: " + testData[val]+", Xpath: "+xpathData[xpath]);
    cy.get(xpathData[xpath]).should(($div) => {
          // we can massage text before comparing
          const heading = $div.text()
          expect(heading, 'element text').to.equal(testData[val])
    })
})

Cypress.Commands.add('verifyPartialText', function(xpath,val){
    cy.log("Verify data: " + testData[val]+", Xpath: "+xpathData[xpath]);
    cy.get(xpathData[xpath]).should(($div) => {
          // we can massage text before comparing
          const heading = $div.text()
          expect(heading, 'element text').to.contain(testData[val])
    })
})