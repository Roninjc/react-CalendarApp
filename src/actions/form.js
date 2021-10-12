import { types } from '../types/types';


export const formSetValues = (values) => ({
    type: types.formSetValues,
    payload: values
});

export const formClearValues = () => ({ type: types.formClearValues });
