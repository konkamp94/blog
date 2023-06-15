import { useNavigate } from "react-router-dom";
import { authContext } from "../context/authContext";
import { useContext, useState } from "react";


const useApiErrorHandling = () => {
    const [error, setError] = useState(null)
    const {logout} = useContext(authContext)
    const navigate = useNavigate()

    const handleApiError = (error) => {
        if(error?.response?.status === 401) {
            logout()
            navigate('/login')
        } else if(error?.response?.status === 500) {
            setError('Something went wrong, please try again later')
        } else {
            error.response ? setError(error.response.data.message) 
                           : setError('Check your internet connection')
        }
    }

    return [error, handleApiError]
}

export default useApiErrorHandling;