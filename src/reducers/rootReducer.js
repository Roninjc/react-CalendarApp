import { combineReducers } from 'redux';

import { calendarReducer } from './calendarReducer';
import { formReducer } from './formReducer';
import { uiReducer } from './uiReducer';
import { authReducer } from './authReducer';


export const rootReducer = combineReducers({
    ui: uiReducer,
    calendar: calendarReducer,
    form: formReducer,
    auth: authReducer
});
