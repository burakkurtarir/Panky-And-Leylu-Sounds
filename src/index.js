import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyCDUuu19SrtuVRghAYkEyEBuPBdrXAIMHs",
    authDomain: "panky-and-leylu-sounds.firebaseapp.com",
    databaseURL: "https://panky-and-leylu-sounds.firebaseio.com",
    projectId: "panky-and-leylu-sounds",
    storageBucket: "panky-and-leylu-sounds.appspot.com",
    messagingSenderId: "386204007416",
    appId: "1:386204007416:web:9ebe9aa1adf6de770e340d",
    measurementId: "G-YKXHZ7Z381"
};
firebase.initializeApp(firebaseConfig);  

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
