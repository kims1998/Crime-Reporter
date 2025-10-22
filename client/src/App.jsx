import { useEffect, useRef, useState } from "react";
import "./Styles/App.css";
import SDSUMap from "./Map.jsx";
import Report from "./CreateReport.jsx";
import Filter from "./Filter.jsx";

export default function App() {
    // 'Create Report' pop-up
    const [showModal, setShowModal] = useState(false);
   // Login pop-up
    const position = { lat: 32.7764, lng: -117.0719 };
    const [authOpen, setAuthOpen] = useState(false);

    // Close on ESC
    useEffect(() => {
        function onKey(e) {
            if (e.key === "Escape") setShowModal(false);
        }
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    // Close if clicking the dark backdrop (but not the rectangle itself)
    const backdropRef = useRef(null);
    function onBackdropClick(e) {
        if (e.target === backdropRef.current) setShowModal(false);
    }

    return (
        <div className="page">
            <header className="header">
                <div className="schoolLogo"></div>
                <button className="loginBtn" onClick={() => setAuthOpen(true)}>Login</button>
            </header>

            <nav className="navBar">
                <div className="card filtersCard">
                    <Filter />
                </div>
                <button className="createBtn"
                        onClick={() => setShowModal(true)}>
                    Create Report
                </button>
            </nav>

            {/* Main content with left rail and map */}
            <main className="content">
                <section className="leftCol">
                    <div className="card reportCard">
                        <h2>REPORT</h2>

                        <div className="reportField">
                            <strong>Date of Incident:</strong>
                            <span>MM/DD/YYYY</span>
                        </div>

                        <div className="reportField">
                            <strong>Time:</strong>
                            <span>00:00 AM/PM</span>
                        </div>

                        <div className="reportField">
                            <strong>Type of Incident:</strong>
                            <span>–</span>
                        </div>

                        <div className="reportField">
                            <strong>Description of Incident:</strong>
                            <p className="reportDescription">No description yet.</p>
                        </div>
                    </div>
                </section>

                <section className="mapPanel">
                    <SDSUMap />
                </section>
            </main>
            <Report
                showModal={showModal}
                setShowModal={setShowModal}
                backdropRef={backdropRef}
                onBackdropClick={onBackdropClick}
            />
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
         <button className="linkish" type="button" onClick={onClose}>Close</button>
       </p>
     </div>
   </div>
 );
}
