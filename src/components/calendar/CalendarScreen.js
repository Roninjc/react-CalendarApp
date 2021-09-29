import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages-no';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetActive } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';
import { formSetValues } from '../../actions/form';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/nb';

moment.locale('no');

const localizer = momentLocalizer(moment) // or globalizeLocalizer

// const events = [{
//     title: 'Cumple',
//     start: moment().toDate(),
//     end: moment().add( 2, 'hours' ).toDate(),
//     bgcolor: '#fafafa',
//     notes: 'Comprar el pastel',
//     user: {
//         _id: '123',
//         name: 'Jesus'
//     }
// }]

export const CalendarScreen = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);
    const { initEvent: formValues } = useSelector(state => state.form);

    const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month' );
    const [slot, setSlot] = useState("");

    const onDoubleClickEvent = (e) => {
        dispatch( uiOpenModal() );
    }

    const onSelect = (e) => {
        dispatch( eventSetActive(e) );
    }

    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem('lastView', e);
    }

    const onSelectSlot = (e) => {
        dispatch( eventClearActiveEvent() );
        setSlot(e);
        console.log(e);
        if ( e.action === 'doubleClick' ) {
            dispatch( formSetValues({
                ...formValues,
                start: e.start,
                end: e.end
            }));
            console.log(e.start);
            console.log(e.end);
            dispatch( uiOpenModal() );
        }
    }

    const eventStyleGetter = ( event, start, end, isSelected ) => {
        
        const style = {
            backgroundColor: '#367CF7',
            borderRadius: '0px',
            opacity: '0.8',
            display: 'block',
            color: 'white'
        }

        return {
            style
        }

    }
    return (
        <div className="calendar-screen">
            <Navbar />

            <Calendar
                localizer={ localizer }
                events={ events }
                startAccessor="start"
                endAccessor="end"
                messages={ messages }
                eventPropGetter={ eventStyleGetter }
                onDoubleClickEvent={ onDoubleClickEvent }
                onSelectEvent={ onSelect }
                onSelectSlot={ onSelectSlot }
                selectable={ true }
                onView={ onViewChange }
                view={ lastView }
                components={{
                    event: CalendarEvent
                }}
            />

            <div>{JSON.stringify(slot)}</div>

            <AddNewFab />
            {
                (activeEvent) && <DeleteEventFab />
            }

            <CalendarModal />

        </div>
    )
}
