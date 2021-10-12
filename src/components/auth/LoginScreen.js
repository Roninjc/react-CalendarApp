import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

import { useForm } from '../../hooks/useForm';
import { startLogin, startRegister } from '../../actions/auth';

import './login.css';

export const LoginScreen = () => {

    const dispatch = useDispatch();

    const [ formLoginValues, handleLoginInputChanges ] = useForm({});

    const { lEmail, lPassword } = formLoginValues;

    const [ formRegisterValues, handleRegisterInputChanges ] = useForm({});

    const { rName, rEmail, rPassword1, rPassword2 } = formRegisterValues;

    const handleLogin = (e) => {
        e.preventDefault();

        dispatch( startLogin( lEmail, lPassword ) );
    }

    const handleRegister = (e) => {
        e.preventDefault();

        if ( rPassword1 !== rPassword2 ) {
            Swal.fire('Feil', 'Passordene er ikke de samme', 'error');
        }

        dispatch( startRegister( rName ,rEmail, rPassword1 ) );
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Log in</h3>
                    <form onSubmit={ handleLogin }>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Email"
                                name="lEmail"
                                value={ lEmail }
                                onChange={ handleLoginInputChanges }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Passord"
                                name="lPassword"
                                value={ lPassword }
                                onChange={ handleLoginInputChanges }
                            />
                        </div>
                        <div className="form-group center">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registrering</h3>
                    <form onSubmit= { handleRegister }>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Navn"
                                name="rName"
                                value={ rName }
                                onChange={ handleRegisterInputChanges }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                name="rEmail"
                                value={ rEmail }
                                onChange={ handleRegisterInputChanges }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Passord"
                                name="rPassword1"
                                value={ rPassword1 }
                                onChange={ handleRegisterInputChanges }
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Gjenta passord"
                                name="rPassword2"
                                value={ rPassword2 }
                                onChange={ handleRegisterInputChanges }
                            />
                        </div>

                        <div className="form-group center">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Opprett konto" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
