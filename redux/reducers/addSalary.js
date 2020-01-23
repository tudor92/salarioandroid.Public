import { ADDING_API, ADD_SUCCESS, ADD_FAILURE } from '../actions/constants';



export const initialState = {
    items: [],
    recommendedItems:{},
    isFetching: false,
    error: false,
}

export default function addReducer(state = initialState, action) {

    switch(action.type) {
        case ADDING_API:
            return {
                ...state,
                isFetching: true
            }
        case ADD_SUCCESS:
            return {
                ...state,
                isFetching: false
            }
        case ADD_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            }
        default:
            return state
    }
}