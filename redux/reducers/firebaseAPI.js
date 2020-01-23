import { FETCHING_API, FETCH_API_SUCCESS, FETCH_API_FAILURE } from '../actions/constants';



export const initialState = {
    items: [],
    isFetching: false,
    error: false,
}

export default function itemsReducer(state = initialState, action) {

    switch(action.type) {
        case FETCHING_API:
            return {
                ...state,
                isFetching: true
            }
        case FETCH_API_SUCCESS:
            return {
                ...state,
                isFetching: false,
                items: action.data
            }
        case FETCH_API_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            }
        default:
            return state
    }
}