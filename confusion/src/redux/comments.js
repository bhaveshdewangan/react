import * as ActionTypes from './actionTypes';

export const Comments = (state = {
    errMess: null,
    comments: []
}, action) => {
    switch (action.type) {

        case ActionTypes.ADD_COMMENT:
            const comment = action.payload;
            return { ...state, errMess: null, comments: state.comments.concat(comment) }

        case ActionTypes.COMMENTS_FAILED:
            return { ...state, errMess: action.payload, comments: [] }

        case ActionTypes.ADD_COMMENTS:
            return { ...state, errMess: null, comments: action.payload }

        default:
            return state;
    }
}