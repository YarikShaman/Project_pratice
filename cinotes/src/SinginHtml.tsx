import React from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';
import SingIn from './SingIn';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <SingIn />
    </React.StrictMode>
);

reportWebVitals();
