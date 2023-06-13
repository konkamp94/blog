import { createContext } from 'react';
import jwt_decode from 'jwt-decode'

const authContext = createContext();

const AuthProvider = ({ children }) => {

    const getToken = () => {
        let token = localStorage.getItem('token')
        return token ? token : null
    }

    const getUser = () => {
        let user = localStorage.getItem('user')
        return user ? JSON.parse(user) : null
    }

    const saveToken = token => {
        let user = jwt_decode(token)
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')    
    }
    
    const ctx = {
        getToken,
        getUser,
        saveToken,
        logout,
      }
    
    return <authContext.Provider value={ctx}>
            {children}
           </authContext.Provider>

}

export {AuthProvider, authContext };