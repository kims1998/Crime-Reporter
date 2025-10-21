import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { useState } from 'react';
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function App() {
    const position = { lat: 32.7764, lng: -117.0719 };
    const [authOpen, setAuthOpen] = useState(false);
    return (
        <div className="page">
            {/* The login bar */}
            <div className="loginBar">
                <button className="textBtn" onClick={() => setAuthOpen(true)}>Login</button>
            </div>


            {/* Header with logo space, search bar and create report button */}
            <header className="header">
                <div className="logoPlaceholder"></div>


                <div className="searchWrap">
                    <input className="search" placeholder="Search..." disabled />
                    <span className="searchIcon">🔍</span>
                </div>


                <button className="createBtn" disabled>Create Report</button>
            </header>


            {/* Main content with left rail and map */}
            <main className="content">
                <section className="leftCol">
                    <div className="card reportCard">
                        <h2>REPORT</h2>
                        <p className="muted">(placeholder)</p>
                    </div>


                    <div className="card filtersCard">
                        <h3>FILTERS</h3>
                        <label><input type="checkbox" enabled /> Property Crime</label>
                        <label><input type="checkbox" enabled /> Violent Crime</label>
                        <label><input type="checkbox" enabled /> Theft</label>
                    </div>
                </section>


                <section className="mapPanel">
                    <APIProvider apiKey={ apiKey }>
                        <Map
                            defaultCenter = { position }
                            defaultZoom={ 16 }
                            style = {{width: '100%', height: '100%'}}
                            options = {{
                                zoomControl: true,
                                mapTypeControl: true,
                                streetViewControl: true,
                                fullscreenControl: true,
                                scaleControl: true
                            }}

                        />
                    </APIProvider>
                </section>
                </main>
             <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
        </div>
    );
}

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

  if (!open) return null;

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (mode === 'signup' && form.password !== form.confirm) {
      alert('Passwords do not match');
      return;
    }

    console.log('Submitted:', form);
    onClose();
  };

  return (
    <div className="modalBackdrop" role="dialog" aria-modal="true" aria-labelledby="authTitle">
      <div className="modalContent">
        <h2 id="authTitle">{mode === 'login' ? 'Log in' : 'Create an Account'}</h2>

        <form onSubmit={onSubmit}>
          {mode === 'signup' && (
            <>
              <input
                className="field"
                type="text"
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={onChange}
                required
              />
              <input
                className="field"
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={onChange}
                required
              />
              <input
                className="field"
                type="email"
                name="email"
                placeholder="SDSU Email"
                value={form.email}
                onChange={onChange}
                required
              />
              <input
                className="field"
                type="text"
                name="redId"
                placeholder="Red ID"
                value={form.redId}
                onChange={onChange}
                required
              />
              <input
                className="field"
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={onChange}
                required
              />
              <input
                className="field"
                type="password"
                name="confirm"
                placeholder="Confirm Password"
                value={form.confirm}
                onChange={onChange}
                required
              />
            </>
          )}

          {mode === 'login' && (
            <>
              <input
                className="field"
                type="email"
                name="email"
                placeholder="Red ID"
                value={form.email}
                onChange={onChange}
                required
              />
              <input
                className="field"
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={onChange}
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
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
          >
            {mode === 'login' ? 'Create an account' : 'Log in'}
          </button>
        </p>

        <p style={{ marginTop: 12 }}>
          <button className="linkish" type="button" onClick={onClose}>Close</button>
        </p>
      </div>
    </div>
  );
}
