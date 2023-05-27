import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';


axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

axios.interceptors.request.use(request => {
  console.log(request);
  // Edit request config
  return request;
}, error => {
  console.log(error);
  return Promise.reject(error);
});

axios.interceptors.response.use(
  response => response,
  error => {
    throw error
  }
)

// axios.interceptors.response.use(
//   function (response) {
//     if (response.data) {
//       // return success
//       if (response.status === 200 || response.status === 201) {
//         return response;
//       }
//       // reject errors & warnings
//       return Promise.reject(response);
//     }

//     // default fallback
//     return Promise.reject(response);
//   },
//   function (error) {
//     // if the server throws an error (404, 500 etc.)
//     return Promise.reject(error);
//   }
// );

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
