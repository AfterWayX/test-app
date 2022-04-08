import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
import { createRoot } from 'react-dom/client';


const firebaseConfig = {
  apiKey: "AIzaSyA0nxx_hyEKtQ1D0bMLDgyrUlARRGcKbgU",
  authDomain: "test-app-md-1.firebaseapp.com",
  projectId: "test-app-md-1",
  databaseURL: "https://test-app-md-1-default-rtdb.europe-west1.firebasedatabase.app",
  storageBucket: "test-app-md-1.appspot.com",
  messagingSenderId: "281050328598",
  appId: "1:281050328598:web:1a87ece453f8e4cf0b0f37",
  measurementId: "G-ZC9SS7FV6Y"
};

const app = initializeApp(firebaseConfig);

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App app={app} tab="home" />);

reportWebVitals();
