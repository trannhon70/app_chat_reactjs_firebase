
import { onAuthStateChanged } from 'firebase/auth';
import {createContext, useEffect, useState} from 'react'
import Loading from '../Component/Loading/Loading';
import { auth } from '../Firebase/Firebase';

export const AuthContext = createContext();

const AuthProvider = ({children}) =>{
    const [user,setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        onAuthStateChanged(auth,(user) =>{
            setUser(user);
            localStorage.setItem('user',JSON.stringify(user));
            setLoading(false);
        });
    },[]);
    if(loading){
        return <Loading/>;
    }
    return <AuthContext.Provider value={{user}} >  {children} </AuthContext.Provider>
}
export default AuthProvider;