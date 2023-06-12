import {useState} from 'react';

const useInputValidation = () => {
    const [error, setError] = useState(null);

    const validateInput = (value, validate) => {
        const {message, isValid} = validate(value); 
        if(!isValid) {
            setError(message);
            return false;
        }
        setError(null);
        return true;
    }

    return [error, validateInput];
}

export default useInputValidation;