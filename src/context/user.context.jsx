import {createContext, useEffect, useReducer} from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

import {createAction} from "../utils/reducer/reducer.utils";


// as the actual value you want to access
export const UserContext = createContext({
    //default value
    currentUser: null,
    setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
    'SET_CURRENT_USER': "SET_CURRENT_USER",
};

const userReducer = (state, action) => {
    const {type, payload } = action;
    console.log("dispatched");
    console.log(action);
    switch(type){
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                //give me the same values on the previous state object that you had
                ...state,
                // overwrite this bit
                currentUser: payload
            }
        
        default:
            throw new Error(`Unhandled type ${type} in userReducer`);

    }
};

const INITIAL_STATE = {
    currentUser: null,
};

//actual component
export const UserProvider = ({children}) => {
    // const [currentUser, setCurrentUser] = useState(null);
    const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);
    //OR
    // const { currentUser } = state;
    console.log(currentUser);

    const setCurrentUser = (user) => {
        // dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER , payload: user});
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
    }
    
    const value = {currentUser, setCurrentUser};

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if(user){
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });

        return unsubscribe;
    }, []);

    return <UserContext.Provider value={value} >{children}</UserContext.Provider>;
}


/**
 * 
 * cons userReducer
 */

/**
 * 
 * Oberver pattern
 * 
 * click stream
 */