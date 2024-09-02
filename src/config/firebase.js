import { initializeApp } from "firebase/app";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, doc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore"
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDIJTuytgrqKhy_t27yyS7CRm_3KXEcATw",
    authDomain: "chat-app-6fb59.firebaseapp.com",
    projectId: "chat-app-6fb59",
    storageBucket: "chat-app-6fb59.appspot.com",
    messagingSenderId: "983980866098",
    appId: "1:983980866098:web:13bd6319aa63ad613ada2b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

const signup = async (username, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await setDoc(doc(db, "users", user.uid), {
            id: user.uid,
            username: username.toLowerCase(),
            email,
            name: "",
            avatar: "",
            bio: "Hey, there i am using chat app",
            lastseen: Date.now()
        })
        await setDoc(doc(db, "chats", user.uid), {
            chatsData: []
        })
    } catch (error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))

    }
}


const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    }
    catch (error) {
        console.error(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const logout = async () => {
    try {
        await signOut(auth)
    } catch (error) {
        console.error(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const resetPass = async (email) => {
    if (!email) {
        toast.error("Enter your email")
        return null;
    }
    try {
        const userRef = collection(db, 'users')
        const q = query(userRef, where('email', '==', email))
        const querySnap = await getDocs(q);
        if (!querySnap.empty) {
            await sendPasswordResetEmail(auth, email)
            toast.error("Reset Email Sent")
        }
        else {
            toast.error("Email doesn't exist")
        }
    } catch (error) {
        console.error(error);
        toast.error(error.message)
    }
}

export { signup, login, logout, resetPass };
