// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBsA0RT52yvgNb5FewZiQbjijns35Tsk9I",
    authDomain: "netflix-clone-faang.firebaseapp.com",
    projectId: "netflix-clone-faang",
    storageBucket: "netflix-clone-faang.firebasestorage.app",
    messagingSenderId: "750732574271",
    appId: "1:750732574271:web:02713e906a1b235924428a",
    measurementId: "G-LBNQTL4F0S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)