import './commands';
import './api_commands';
import 'cypress-mochawesome-reporter/register';
import { Runnable } from 'mocha';
import addContext from 'mochawesome/addContext';
import './JiraAPI';