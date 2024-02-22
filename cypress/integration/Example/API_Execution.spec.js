context('Sample API testcases', () => {

    describe('Execute Rest APIs ', () => {
        const endpointData = require('/cypress/fixtures/endpoint')

        //Executing steps for GET API
        it('Execute GET API', function() {
            cy.request({
                method:'GET',
                url : endpointData.getURL
            }).then(function(response){
                expect(response.status).to.equal(200);
            })   
        })

        //Executing steps for POST API
        it('Execute POST API', function() {
            cy.request({
                method:'POST',
                url : endpointData.postURL,
                headers : {}
            }).then(function(response){
                expect(response.status).to.equal(200);
            })
        })
    })
})  