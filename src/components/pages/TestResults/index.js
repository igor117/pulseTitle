import { combineEpics } from 'redux-observable';

import TestResults from './TestResults';
import { clientUrls } from '../../../config/client-urls.constants';

import { fetchPatientTestResultsDetailEpic } from './ducks/fetch-patient-test-results-detail.duck';
import { fetchPatientTestResultsEpic } from './ducks/fetch-patient-test-results.duck';

import patientsTestResults from './ducks/fetch-patient-test-results.duck';
import testResultsDetail from './ducks/fetch-patient-test-results-detail.duck';

const epics = combineEpics(fetchPatientTestResultsDetailEpic, fetchPatientTestResultsEpic);

const reducers = {
  patientsTestResults,
  testResultsDetail
};

const sidebarConfig = { key: 'results', pathToTransition: '/results', name: 'Test Results', isVisible: true };

const routers = [
  { key: 'testResults', component: TestResults, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.TEST_RESULTS}` },
  { key: 'testResultsDetail', component: TestResults, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.TEST_RESULTS}/:sourceId` },
];

export default {
  component: TestResults,
  epics, reducers, sidebarConfig, routers,
}

