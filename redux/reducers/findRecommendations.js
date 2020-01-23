import { RECOMMENDATIONS_API , RECOMMENDATIONS_SUCCESS, RECOMMENDATIONS_FAILURE } from '../actions/constants';

export const initialState = {
    recommendedItems:{},
    isFetching: false,
    error: false,
}

export default function recomReducer(state = initialState, action) {    
    switch(action.type) {
        case RECOMMENDATIONS_API:
            return {
                ...state,
                recommendedItems:action.data
            }
        case RECOMMENDATIONS_SUCCESS: 
            return {
                ...state,
                isFetching: false,
                recommendedItems: action.data
            }
        case RECOMMENDATIONS_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            }
        default:
            return state
    }
}