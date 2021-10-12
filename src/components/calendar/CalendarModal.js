import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2';

import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { eventClearActiveEvent, eventStartAddNew, eventStartUpdate } from '../../actions/events';
import { formClearValues, formSetValues } from '../../actions/form';

import './modal.css';
import '../../styles.css';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};
Modal.setAppElement('#root');

// const now = moment().minutes(0).seconds(0).add(1, 'hours');
// const nowPlus1 = now.clone().add(1, 'hours');

// const initEvent = {
//     title: 'Udefinert',
//     notes: '',
//     start: now.toDate(),
//     end: nowPlus1.toDate()
// };


export const CalendarModal = () => {

    const dispatch = useDispatch();
    const { modalOpen } = useSelector(state => state.ui);
    const { activeEvent } = useSelector(state => state.calendar);
    const { initEvent: formValues } = useSelector(state => state.form);

    // const [dateStart, setDateStart] = useState( now.toDate() );
    // const [dateEnd, setDateEnd] = useState( nowPlus1.toDate() );
    const [titleValid, setTitleValid] = useState(true);

    // const [formValues, setFormValues] = useState( initEvent );

    const { notes, title, start, end } = formValues;

    useEffect(() => {
        if ( activeEvent ) {
            // setFormValues( activeEvent );
            dispatch( formSetValues( activeEvent ) );
        } else {
            // setFormValues( initEvent );
            dispatch( formClearValues() );
        }
    }, [ activeEvent, dispatch ]);

    const handleInputChange = ({ target }) => {

        // setFormValues({
        //     ...formValues,
        //     [target.name]: target.value
        // });
        dispatch( formSetValues({
            ...formValues,
            [target.name]: target.value
        }));

    }

    const closeModal = () => {
        dispatch( uiCloseModal() );
        dispatch( eventClearActiveEvent() );
        // setFormValues( initEvent );
        dispatch( formClearValues() );
    }

    const hanldeStartDateChange = (e) => {
        // setDateStart( e );
        // setFormValues({
        //     ...formValues,
        //     start: e
        // });
        dispatch( formSetValues({
            ...formValues,
            start: e
        }));
    }

    const hanldeEndDateChange = (e) => {
        // setDateEnd( e );
        // setFormValues({
        //     ...formValues,
        //     end: e
        // });
        dispatch( formSetValues({
            ...formValues,
            end: e
        }));
    }

    const handelSubmitForm = (e) => {
        e.preventDefault();

        const momentStart = moment( start );
        const momentEnd = moment( end );

        if ( momentStart.isSameOrAfter( momentEnd ) ) {
            return Swal.fire('Feil', 'Sluttid må være senere enn starttid', 'error');
        }

        if ( title.trim() < 1 ) {
            return setTitleValid(false);
        }

        if ( activeEvent ) {
            dispatch( eventStartUpdate( formValues ) );
        } else {
            dispatch( eventStartAddNew( formValues ) );
        }


        setTitleValid(true);
        closeModal();
    }

    return (
        <Modal
            isOpen={ modalOpen }
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={ customStyles }
            closeTimeoutMS={ 200 }
            className="modal backdrop box-shadow"
            overlayClassName="modal-fondo"
        >

            <h1> { (activeEvent) ? 'Redigere arrangement' : 'Nytt arrangement' } </h1>
            <hr />
            <form
                className="container"
                onSubmit={ handelSubmitForm }
            >

                <div className="form-group">
                    <label>Startdato og klokkeslett</label>
                    <DateTimePicker
                        onChange={ hanldeStartDateChange }
                        value={ start }
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Sluttdato og klokkeslett</label>
                    <DateTimePicker
                        onChange={ hanldeEndDateChange }
                        value={ end }
                        minDate={ start }
                        className="form-control"
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Tittel og notater</label>
                    <input 
                        type="text" 
                        className={`form-control transparent ${ !titleValid && 'is-invalid' }`}
                        placeholder="Hendelsestittel"
                        name="title"
                        autoComplete="off"
                        value={ title }
                        onChange={ handleInputChange }
                    />
                    <small id="emailHelp" className="form-text text-muted">Kort beskrivelse</small>
                </div>

                <div className="form-group">
                    <textarea 
                        type="text" 
                        className="form-control transparent"
                        placeholder="Notater"
                        rows="5"
                        name="notes"
                        value={ notes }
                        onChange={ handleInputChange }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Tilleggsinformasjon</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Lagre</span>
                </button>

            </form>
        </Modal>
    )
}
