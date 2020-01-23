import { FILTERING_API, FILTER_API_SUCCESS, FILTER_API_FAILURE } from '../actions/constants';



export const initialState = {
    items: [],
    recommendedItems:{},
    isFetching: false,
    error: false,
}

export default function filterReducer(state = initialState, action) {

    switch(action.type) {
        case FILTERING_API:
            return {
                ...state,
                isFetching: true
            }
        case FILTER_API_SUCCESS:
            return {
                ...state,
                isFetching: false,
                items: action.data
            }
        case FILTER_API_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            }
        default:
            return state
    }
}