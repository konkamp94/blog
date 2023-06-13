import React from 'react';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../context/authContext';
import { Container, Row, Col, Form, Button, FloatingLabel } from 'react-bootstrap';
import { validateEmail, validatePassword } from '../shared/validators';
import useInputValidation from '../hooks/useInputValidation';
import authService from '../services/authService';

const Login = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, validateEmailInput] = useInputValidation();
  const [passwordError, validatePasswordInput] = useInputValidation();
  const [loginError, setLoginError] = useState(false);
  const {saveToken} = useContext(authContext)

//   const authContext = useContext(authContext);

  const handleSubmit = async (event) => {
    let isEmailValid = validateEmailInput(email, validateEmail);
    let isPasswordValid = validatePasswordInput(password, validatePassword);
    if(!isEmailValid || !isPasswordValid) {
        return;
    }
    try{
        let response = await authService.login({email: email.trim(), password: password.trim()});
        saveToken(response.data.token)
        navigate('/blog')
    } catch(error) {
        if (error.response.status === 401) {
            setLoginError('Email or password is incorrect')
        } else if (error.response.status === 500) {
            setLoginError('Something went wrong, please try again later')
        }
    }

    // add token to local storage
  };



  return (
    <div className='centered-div'>
        <Container>
            <Row className="justify-content-center">
                <Col xs={12} sm={8} md={6} lg={4}>
                <Form style={{textAlign: 'left'}}>
                    <Form.Group className="mb-2">
                    <FloatingLabel
                        label="Email address"
                    >
                        <Form.Control value={email} 
                                      onChange={(event) => setEmail(event.target.value) } 
                                      onBlur={(event) => validateEmailInput(event.target.value, validateEmail)}
                                      type="text" placeholder="Enter Email" />
                    </FloatingLabel>
                        {emailError ? <span className="alert-danger">{emailError}</span> : null}
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <FloatingLabel
                            label="Password"
                        >
                            <Form.Control value={password} 
                                        onChange={(event) => setPassword(event.target.value)}
                                        onBlur={(event) => validatePasswordInput(event.target.value, validatePassword)}
                                        type="password" placeholder="Enter password" />
                        </FloatingLabel>
                        {passwordError ? <span className="alert-danger">{passwordError}</span> : null}
                    </Form.Group>
                    {loginError ? <span className='alert-danger'>{loginError}</span> : null}
                    <Button onClick={handleSubmit} variant="primary" style={{width: '100%'}}>
                    Login
                    </Button>
                </Form>
                </Col>
            </Row>
        </Container>
    </div>
  );
};

export default Login;