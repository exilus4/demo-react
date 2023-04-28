import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import React from 'react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const siteKey = process.env.REACT_APP_RECAPTCHA_KEY as string;
const useEnterprise = Boolean(process.env.REACT_APP_RECAPTCHA_IS_ENTERPRISE);
  
root.render(
  <React.StrictMode>
    <GoogleReCaptchaProvider reCaptchaKey={siteKey} useEnterprise={ useEnterprise }>
      <App />
    </GoogleReCaptchaProvider>
    <div className='recaptcha_banner'>
      <span>This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy"> Privacy Policy</a> and <a href="https://policies.google.com/terms"> Terms of Service</a> apply</span>
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
