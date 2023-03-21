import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBvehAwFrPRcsHuTFbkRTAjeEdTn064U4s",
  authDomain: "react-netflix-clone-dfc2e.firebaseapp.com",
  projectId: "react-netflix-clone-dfc2e",
  storageBucket: "react-netflix-clone-dfc2e.appspot.com",
  messagingSenderId: "455946132253",
  appId: "1:455946132253:web:ec1cabe3c0c6320d315ff4",
  measurementId: "G-F2HZYHGXRJ"
};


const app = initializeApp(firebaseConfig);
 export const firebaseAuth=getAuth(app);