var firebase = require('firebase/app');
import { RECOMMENDATIONS_API, RECOMMENDATIONS_SUCCESS, RECOMMENDATIONS_FAILURE } from './constants';
import { itemsRef } from '../../config/firebase'

export function findRecom(...info) {


    return function (dispatch) {
    

    recommendedItems = {}, items = [], companies = [];
    recommendedItems.isFetching = true;
    dispatch(recomAPI(recommendedItems));


        findLastjobs(items);
        findCompanies(companies);

    
    recommendedItems.latestJobs =  items;
    recommendedItems.companies =  companies;

    recommendedItems.isFetching = false;
   
    var recommendationsData = recomAPISuccess(recommendedItems);
    dispatch(recommendationsData);

    //for further use - recommendations based on user info/input/
    /*
    itemsRef.orderByChild('timestamp').limitToLast(6).on('value', function (snap) {

        snap.forEach((child) => {
            if (child.val().accepted === true)
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
        });
      
        shuffleArray(items);
        recommendedItems.latestJobs =  items;
        var recommendationsData = recomAPISuccess(recommendedItems);
        dispatch(recommendationsData);
       
    }, function (error) {
        dispatch(fecomAPIFailure(error));
    });
    */


    }
}

const findCompanies = (companies) =>
{
    
    let temp = "";
    let counter = 0;
    
    itemsRef.orderByChild('company').on('value', function (snap) {

        snap.forEach((child) => {
            if (child.val().accepted === true && child.val().avatar != "https://firebasestorage.googleapis.com/v0/b/salario-57bf3.appspot.com/o/Screen%20Shot%202019-05-16%20at%2021.04.46.png?alt=media&token=76a35af3-90e1-42f4-ae44-aed6b7cd08e5")
            {
                if(temp === "")
                {
                    temp = child.val().avatar;
                    return;
                }
                if(temp === child.val().avatar)
                    {counter++;
                        return;
                    }

                if(child.val().avatar != temp)
                {
                    if(counter > 5)
                        companies.push(temp);
                                        
                    temp = child.val().avatar;
                    counter = 0;
                }
                
            }
        });
      
        shuffleArray(companies); 
       
    }, function (error) {
       console.log(error);
    });

}


const findLastjobs= (items) =>
{
    
    itemsRef.orderByChild('timestamp').limitToLast(6).on('value', function (snap) {

        snap.forEach((child) => {
            if (child.val().accepted === true)
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
        });
      
        shuffleArray(items);
       
    }, function (error) {
        console.log(error);
    });

}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


function recomAPI(data) {

    return {
        type: RECOMMENDATIONS_API,
        data
    }
}

function recomAPISuccess(data) {

    return {
        type: RECOMMENDATIONS_SUCCESS,
        data
    }
}

function recomAPIFailure() {
    return {
        type: RECOMMENDATIONS_FAILURE
    }
}