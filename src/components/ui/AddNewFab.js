import React from 'react';

import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';

export const AddNewFab = () => {

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch( uiOpenModal() );
    }

    return (
        <button
            className="btn btn-primary fab box-shadow"
            onClick={ handleClick }
        >
            <i className="fas fa-plus"></i>
        </button>
    )
}
