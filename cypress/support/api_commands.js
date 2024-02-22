/* API Testing Commands */
/*Libraries required: ajv (JSON schema validation), lodash (JSON data validation), flatted (JSON string validation) */


Cypress.Commands.add('doApiCall', function (methodtype, apiHeaders, apiAuth, apiBody, apiParams) {
    return cy.request({
        methodtype, url: baseUrl, auth: apiAuth, headers: apiHeaders, body: apiBody, Params: apiParams
    })
});



Cypress.Commands.add('verifyJsonSchema', function (srcSchema, jsonData) {
    const Ajv = require('ajv');
    const avj = new Ajv();
    const validate = avj.compile(srcSchema);
    const isvalid = validate(jsonData);
    expect(isvalid).to.be.true;

});



Cypress.Commands.add('verifyApiResponseCode', function (expectedResponseCode, methodtype, baseUrl, apiBody, apiParams, apiHeaders, apiAuth) {

    cy.request({
        method: methodtype,
        url: baseUrl,
        body:apiBody,
        headers:apiHeaders,
        auth: apiAuth,
        qs:{apiParams}
    })
        .then((response) => {
            cy.log(response.status);
            expect(response.status).to.equal(expectedResponseCode);
        });
});



Cypress.Commands.add('compareData', function (sourcePath, targetData) {

    var f = require('flatted');
    var sourceData;

    cy.readFile(sourcePath).then((data) => {
        sourceData = data;
        sourceData = Object.fromEntries(Object.entries(sourceData).sort());
        targetData = Object.fromEntries(Object.entries(targetData).sort());
        
        cy.compareJsons(sourceData, targetData);
    });

});



Cypress.Commands.add('compareJsons', function (sourceData, targetData) {
    var isMatch, res;
    const _ = require('lodash');
    var f = require('flatted');

    function compare(source, target) {
        if (f.stringify(source) == f.stringify(target)) {
            return true;
        }
        else
            return false;
    }

    function getRootNodeDiff(source, target) {
        const diff = Object.keys(source).reduce((result, key) => {
            if (!target.hasOwnProperty(key)) {
                result.push(key);
            }
            else if (_.isEqual(source[key], target[key])) {
                const resultKeyIndex = result.indexOf(key);
                result.splice(resultKeyIndex, 1);
            }
            return result;
        }, Object.keys(target));

        return diff;
    }

    const getDetailedDiff = function (obj1, obj2) {
        return _.reduce(obj1, function (result, value, key) {
            if (_.isPlainObject(value)) {
                result[key] = getDetailedDiff(value, obj2[key]);
            } else if (!_.isEqual(value, obj2[key])) {
                result[key] = value;
            }
            return result;
        }, {});
    };

    res = getRootNodeDiff(sourceData, targetData);
    isMatch = compare(sourceData, targetData);
    cy.log("\nMatch status: " + isMatch + "\n Differences [Root Node]:\n");
    cy.log(res);
    const detailedDiff = getDetailedDiff(sourceData, targetData);
    cy.log("\nDetailed Differences [Child Node]: \n");
    cy.log(detailedDiff);

});
