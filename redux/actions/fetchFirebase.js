import { FETCHING_API, FETCH_API_SUCCESS, FETCH_API_FAILURE } from './constants';
import { itemsRef } from '../../config/firebase'


export function fetchFirebase(searchParam, filteredParam) {
    return function (dispatch) {
        if (searchParam == "") {
        }
        else {
            dispatch(getAPI())
            itemsRef.orderByChild('role').on('value', function (snap) {
                items = [];
                snap.forEach((child) => {
                    if (
                        child.val().city.toUpperCase().includes(filteredParam.toUpperCase()) &&
                        (filterByTerm(child.val().role, searchParam) || filterByTerm(child.val().company, searchParam))
                        && child.val().accepted === true
                    )
                        items.push({
                            id: child.key,
                            bonus: child.val().bonus,
                            tickets: child.val().tickets,
                            details: child.val().details,
                            title: child.val().title,
                            role: child.val().role,
                            category: child.val().category,
                            avatar: child.val().avatar,
                            salary: parseInt(child.val().salary),
                            city: child.val().city,
                            company: child.val().company,
                            experience: child.val().experience,
                            accepted: child.val().accepted,
                            timestamp: child.val().timestamp,
                            rating: parseFloat(child.val().rating),
                            noRates: parseInt(child.val().noRates)
                        });
                    // sau aici sa fie pus dispatchul?
                });

                var actionSetSalaryData = getAPISuccess(items);
                dispatch(actionSetSalaryData);
            }, function (error) {
                dispatch(getAPIFailure(error));
            });
        }
    }
}


function filterByTerm(listEntry, field) {
    var fieldArray = field.split(" ");
    var listArray = listEntry.split(" ");

    if (fieldArray.length > 1) {

        let isValid = false;
        let count = 0;

        for (let i = 0; i < fieldArray.length; i++) {
            if (listEntry.toUpperCase().indexOf(fieldArray[i].toUpperCase()) > -1) {
                isValid = true;
                count++;
            }
        }

        if (count == fieldArray.length)
            return isValid;

    }
   else if(fieldArray.length == 1)
    {

        let isValid = false;

        for (let i = 0; i < listArray.length; i++) {
            if (field.toUpperCase() == (listArray[i].toUpperCase())) {
                isValid = true;
                break;
            }
        }

        return isValid;

    }
    else {
        if (listEntry.toUpperCase().indexOf(field.toUpperCase()) > -1)
            return true;
    }

    return false;
}

function getAPI() {

    return {
        type: FETCHING_API
    }
}

function getAPISuccess(data) {

    return {
        type: FETCH_API_SUCCESS,
        data
    }
}

function getAPIFailure() {
    return {
        type: FETCH_API_FAILURE
    }
}