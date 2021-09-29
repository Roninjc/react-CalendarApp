import moment from 'moment';

import { types } from "../types/types";


const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlus1 = now.clone().add(1, 'hours');

const initialState = {
    initEvent: {
        title: 'Udefinert',
        notes: '',
        start: now.toDate(),
        end: nowPlus1.toDate()
    }
};

export const formReducer = ( state = initialState, action ) => {
    
    switch ( action.type ) {
        case types.formSetValues:
            return {
                ...state,
                initEvent: action.payload
            }
    
        case types.formClearValues:
            return {
                ...state,
                initEvent: initialState.initEvent
            }
    
        default:
            return state;
    }
}
