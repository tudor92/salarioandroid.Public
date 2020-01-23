import { SORTING, SORTING_SUCCESS, SORTING_FAILURE } from '../actions/constants';



export const initialState = {
    items: [],
    recommendedItems:{},
    isFetching: false,
    error: false,
}

export default function sortReducer(state = initialState, action) {

    switch(action.type) {
        case SORTING:
            return {
                ...state,
                isFetching: true
            }
        case SORTING_SUCCESS:
            return {
                ...state,
                isFetching: false,
                items: action.data
            }
        case SORTING_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            }
        default:
            return state
    }
}