describe ('API Validations', function(){

    const baseUrl = 'exampleUrl';
        
    it('verifyResponseCode', function () {
        var expectedResponseCode = 200,
            methodtype = "POST",
            apiBody = {
                "key1": "value1",
                "key2": "value2",
                "key3": "value3",
                "key4": "value4"
            },
            apiParams = '',
            apiHeaders = '',
            apiAuth = '';
        cy.verifyApiResponseCode(expectedResponseCode, methodtype, baseUrl, apiBody, apiParams, apiHeaders, apiAuth);
    });


    
    it('verifySchema', function(){
        
        const srcSchema=require("/schemas/schema");
        var methodtype = "GET",
            apiParams = '',
            apiHeaders = '',
            apiAuth = '';
        cy.request({
            method: methodtype,
            url: baseUrl,
            headers: apiHeaders,
            auth: apiAuth,
            qs: {apiParams}
        })
        .then((response) => {
            
            jsonData = response.body;
            cy.verifyJsonSchema(srcSchema, jsonData);
           
        });
    });


    it('verifyJsonData', function(){

        const sourcePath = require('/fixtures/source');
        var methodtype = "GET",
            apiParams = '',
            apiHeaders = '',
            apiAuth = '';

        cy.request({
            method: methodtype,
            url: baseUrl,
            headers:apiHeaders,
            auth: apiAuth,
            qs: {apiParams}
        })
        .then((response) => {
            var targetData = response.body;
            cy.compareData(sourcePath, targetData);
        })
        
    });

});
