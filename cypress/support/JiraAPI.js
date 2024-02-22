const https = require('https');
const axios = require('axios');
const fs = require('fs');

async function getTestcaseID(baseUrl,testcaseName,cycleID,projectID,testStatus, auth){
    let API_URL= baseUrl+ '/rest/api/2/issue/' + testcaseName;
    let config= {
        method: 'get',
        url: API_URL,
        headers: {
            'content-type':'application/json',
            Authorization: auth
        }
    }
    let testcaseID='';
    await axios(config).then(function (response) {
        testcaseID= response.data.id;
    });
    await getExecutionID(baseUrl, testcaseID, cycleID, projectID, testStatus, auth, testcaseName);
}

async function getExecutionID(baseUrl, testcaseID, cycleID, projectID, testStatus, auth, testcaseName){
    let API_URL= baseUrl + '/rest/zapi/latest/execution?issueId='+testcaseID+'&cycleId='+cycleID+'&projectId='+projectID;
    const config= {
        method: 'get',
        url: API_URL,
        headers: {
            'content-type':'application/json',
            Authorization: auth
        }
    }
    let executionId='';
    await axios(config).then(function (response) {
        executionId = response.data.executions[0].id;
    });
    await executeTestcase (baseUrl, executionId, testStatus, auth, testcaseName);
}

async function executeTestcase(baseUrl, executionID, testStatus, auth, testcaseName){

    let API_URL= baseUrl + '/rest/zapi/latest/execution/' + executionID + '/execute';
    let apiBody='';
    if(testStatus =='failed'){
        apiBody={"status" : "2" };
    }else{
        apiBody={"status" : "1" };
    }
    const config= {
        method: 'put',
        url: API_URL,
        headers: {
            'content-type':'application/json',
            Authorization: auth
        },
        data: apiBody
    }
    await axios(config).then(function (response) {
        console.log('Executed '+testcaseName+' on Jira with status: '+testStatus+'. Response status: '+ response.status);
    });
}

module.exports = {
    getTestcaseID,
    getExecutionID,
    executeTestcase
};