var firebase = require('firebase/app');
import { ADDING_API, ADD_SUCCESS, ADD_FAILURE } from './constants';
import firebaseApp, { itemsRef } from '../../config/firebase'


export function addJob(accepted, avatar, role, company, salary, city, bonus, tickets, experience, details, rolecompany) {
    return function(dispatch) {
    dispatch(addAPI())
      itemsRef.push({
              accepted: accepted,
              bonus: bonus,
              tickets: tickets,
              details: details,
              role: role,
              rolecompany: rolecompany,
              avatar: avatar,
              salary: salary,
              city: city,
              company: company,
              experience: experience,
              timestamp: firebase.database.ServerValue.TIMESTAMP,
              rating: 2,
              noRates: 1
            });

            var actionSetSalaryData = addAPISuccess();
            dispatch(actionSetSalaryData);
    }
}

function addAPI() {

    return {
        type: ADDING_API
    }
}

function addAPISuccess(data) {

    return {
        type: ADD_SUCCESS,
        data
    }
}

function addAPIFailure() {
    return {
        type: ADD_FAILURE
    }
}