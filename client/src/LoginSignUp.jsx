import './Styles/LoginSignUp.css';
import { useState } from "react";

/*Login page & Sign up page */
function AuthModal({ open, onClose }) {
    const [mode, setMode] = useState('login');
    const [form, setForm] = useState({
        email: '',
        redId: '',
        password: '',
        confirm: '',
        firstName: '',
        lastName: ''
    });

    const resetForm = () => {
        setForm({
            email: '',
            redId: '',
            password: '',
            confirm: '',
            firstName: '',
            lastName: ''
        });
    };

    if (!open) return null;

    const onChange = (e) => setForm({
        ...form,
        [e.target.name]: e.target.value
    });

    const onSubmit = (e) => {
        e.preventDefault();
        if (mode === 'signup' && form.password !== form.confirm) {
            alert('Passwords do not match');
            return;
        }

        console.log('Submitted:', form);
        onClose();
    };

    const userClose = (e) => {
        e.preventDefault();
        if (mode === 'signup' ? 'log in' : 'login') {
            onClose();
            resetForm();
            setMode('login');
        }
    }

    return (
        <div className="modalBackdrop" role="dialog" aria-modal="true" aria-labelledby="authTitle">
            <div className="modalContent">
                <h2 id="authTitle">
                    {mode === 'login' ? 'Log in' : 'Create an Account'}
                </h2>

                <form onSubmit={ onSubmit }>
                    {mode === 'signup' && (
                        <>
                            <input
                                className="field"
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={ form.firstName }
                                onChange={ onChange }
                                required
                            />
                            <input
                                className="field"
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={ form.lastName }
                                onChange={ onChange }
                                required
                            />
                            <input
                                className="field"
                                type="email"
                                name="email"
                                placeholder="SDSU Email"
                                value={ form.email }
                                onChange={ onChange }
                                required
                            />
                            <input
                                className="field"
                                type="text"
                                name="redId"
                                placeholder="Red ID"
                                value={ form.redId }
                                onChange={ onChange }
                                required
                            />
                            <input
                                className="field"
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={form.password}
                                onChange={ onChange }
                                required
                            />
                            <input
                                className="field"
                                type="password"
                                name="confirm"
                                placeholder="Confirm Password"
                                value={ form.confirm }
                                onChange={ onChange }
                                required
                            />
                        </>
                    )}

                    {mode === 'login' && (
                        <>
                            <input
                                className="field"
                                type="text"
                                name="redId"
                                placeholder="Red ID"
                                value={ form.redId }
                                onChange={ onChange }
                                required
                            />
                            <input
                                className="field"
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={ form.password }
                                onChange={ onChange }
                                required
                            />
                        </>
                    )}

                    <button type="submit" className="field" style={{ cursor: 'pointer' }}>
                        {mode === 'login' ? 'Log In' : 'Sign Up'}
                    </button>
                </form>

                <p className="swapText">
                    {mode === 'login' ? 'No account?' : 'Already have an account?'}
                    <button
                        className="linkish"
                        type="button"
                        onClick={() => { setMode(mode === 'login' ? 'signup' : 'login');
                            resetForm();
                        }}
                    >
                        {mode === 'login' ? 'Create an account' : 'Log in'}
                    </button>
                </p>

                <p style={{ marginTop: 12 }}>
                    <button className="linkish" type="button" onClick={ userClose }>
                        Close
                    </button>
                </p>
            </div>
        </div>
    );
}

export default AuthModal;