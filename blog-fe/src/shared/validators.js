const validateEmail = (email) => {
    let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(!email) {
        return {message: 'Email is required', isValid: false};
    } else if(!emailRegex.test(email)) {
        return {message: 'Email is invalid', isValid: false};
    }
    return {message: null, isValid: true};
  }

  const validatePassword = (password) => {
    if(!password) {
        return {message: 'Password is required', isValid: false};
    } else if(password.length < 8) {
        return {message: 'Password must be at least 8 characters', isValid: false};
    }
    return {message: null, isValid: true};
  }

export {validateEmail, validatePassword};