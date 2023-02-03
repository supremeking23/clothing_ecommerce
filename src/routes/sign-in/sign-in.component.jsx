import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";

import {auth, signInWithGooglePopup, createUserDocumentFromAuth, signInWithGoogleRedirect} from "../../utils/firebase/firebase.utils";

const SignIn = () => {

    // useEffect(() => {
    //    async function fetchData(){
    //     const response = await getRedirectResult(auth);
    //     if(response){
    //         /**if not null */
    //         const userDocRef = await createUserDocumentFromAuth(response.user);
    //     }
    //    }

    //    fetchData();
    // }, []);

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    };


    return(
        <div>
            <h1>Sign In</h1>
            <button type="button" onClick={logGoogleUser}>Sign in with google Popup</button>
        </div>
    );
};


export default SignIn;