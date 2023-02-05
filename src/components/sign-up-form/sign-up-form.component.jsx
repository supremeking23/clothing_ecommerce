import { useState, useContext } from "react";
import Button from "../button/button.component";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from './../../utils/firebase/firebase.utils';
import FormInput from './../form-input/form-input.component';
import "./sign-up-form.styles.scss";
import { UserContext } from './../../context/user.context';


const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
};

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const {setCurrentUser} = useContext(UserContext);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        /** copy the existing one(spread) spread in, update/modify the field with its new value */
        setFormFields({...formFields,[name]: value});
    };

    const handleSubmit = async(event) => {
        event.preventDefault();

        if(password !== confirmPassword){
            return; // exit this function
        }

        try{
            const { user } = await createAuthUserWithEmailAndPassword(email, password);

            setCurrentUser(user);

            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
        }catch(error){
            if(error.code === "auth/email-already-in-use"){
                alert("Cannot create user, email already in use");
            }
            console.error(`error ${error}`);
        }
    };

    return(
        <div className="sign-up-container">
            <h2>Don't have an account ? </h2>
            <span>Sign up with your email and password</span>
            <form action="" onSubmit={handleSubmit}>
                <FormInput label="Display Name" forInput="displayName" type="text" onChange={handleChange} name="displayName" id="displayName" value={displayName} />
                <FormInput label="Email" forInput="email" type="email" onChange={handleChange} name="email" id="email" value={email} />
                <FormInput label="Password" forInput="password" type="password" onChange={handleChange} name="password" id="password" value={password} />
                <FormInput label="Confirm Password" forInput="confirmPassword" type="password" onChange={handleChange} name="confirmPassword" id="confirmPassword" value={confirmPassword} />
                <Button type="submit">Sign up</Button>
            </form>
        </div>
    );
};

export default SignUpForm;

//continue with video 12