import { useState } from "react";
import Button from "../button/button.component";
import { signInAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInWithGooglePopup } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import "./sign-in-form.styles.scss";

// import {signInWithGooglePopup, createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";


const defaultFormFields = {
    email: "",
    password: "",
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
         await createUserDocumentFromAuth(user);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        /** copy the existing one(spread) spread in, update/modify the field with its new value */
        setFormFields({...formFields,[name]: value});
    };

    const handleSubmit = async(event) => {
        event.preventDefault();

        try{
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response);
        }catch(error){
          switch(error.code){
            case "auth/wrong-password":
                alert("incorrect password or email");
                break;
            case "auth/user-not-found":
                alert("no user associated with this email");
                break
            default:
                console.log(error);
          }
        //   if(error.code === "auth/email-already-in-use"){
        //     alert("Cannot create user, email already in use");
        // }
        }
    };

    return(
        <div className="sign-in-container">
            <h2>Already have an account </h2>
            <span>Sign in with your email and password</span>
            <form action="" onSubmit={handleSubmit}>
                <FormInput label="Email" forInput="email" type="email" onChange={handleChange} name="email" id="email" value={email} />
                <FormInput label="Password" forInput="password" type="password" onChange={handleChange} name="password" id="password" value={password} />
                <div className="buttons-container">
                    <Button type="submit">Sign in</Button>
                    <Button type="button" buttonType="google" onClick={signInWithGoogle}>Sign in with Google</Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;
