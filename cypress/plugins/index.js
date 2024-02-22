const cypress = require('cypress');
const exec = require('child_process').execSync;  
const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib'); 
const { getTestcaseID } = require('../support/JiraAPI');

module.exports = function (on,config) {
    require('cypress-mochawesome-reporter/plugin')(on);
        
    on('before:run', async (details) => {  
                console.log('override before:run');  
                await beforeRunHook(details);  
                await exec("IF EXIST cypress\\screenshots rmdir /Q /S cypress\\screenshots")  
                await exec("IF EXIST Reports rmdir /Q /S Reports")   
    });

    on('after:run', async (result) => {
            
        if(config.env.jira_flag=='true'){
                const testExecuted = result.runs[0].tests;       
                for(let i=0;i<testExecuted.length;i++){
                        await getTestcaseID(config.env.apiBaseUrl,testExecuted[i].title[2] , config.env.jiraCycleID, config.env.jiraProjectId, testExecuted[i].state , config.env.auth)
                }
        }  
        if(config.env.testrail_flag!='true') {
            await exec("npx jrm ./Reports/results.xml ./Reports/junit/*.xml");  
            await afterRunHook();    
        }
    });
};