import React from 'react';
import { useDispatch } from 'react-redux';

import { eventDeleted } from '../../actions/events';

export const DeleteEventFab = () => {

    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch( eventDeleted() );
    }

    return (
        <button
            className="btn btn-danger fab-danger box-shadow"
            onClick={ handleDelete }
        >
            <i className="fas fa-trash"></i>
            <span> Slutt arrangement </span>
        </button>
    )
}
