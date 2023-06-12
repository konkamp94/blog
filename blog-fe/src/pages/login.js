import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Fade } from 'react-bootstrap';
import { validateEmail, validatePassword } from '../shared/validators';
import useInputValidation from '../hooks/useInputValidation';
import './login.css';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, validateEmailInput] = useInputValidation();
  const [passwordError, validatePasswordInput] = useInputValidation();

//   const authContext = useContext(authContext);

  const handleSubmit = (event) => {
    let isEmailValid = validateEmailInput(email, validateEmail);
    let isPasswordValid = validatePasswordInput(password, validatePassword);
    if(!isEmailValid || !isPasswordValid) {
        return;
    }
    console.log('login');
    // Perform login logic here
  };

  return (
    <div className='centered-div'>
        <Container>
            <Row className="justify-content-center">
                <Col xs={12} sm={8} md={6} lg={4}>
                <Form style={{textAlign: 'left'}}>
                    <Form.Group className="mb-2">
                        <Form.Label>Email</Form.Label>
                        <Form.Control value={email} onChange={(event) => setEmail(event.target.value)} type="text" placeholder="Enter Email" />
                        {emailError ? <span className="alert-danger">{emailError}</span> : null}
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Password</Form.Label>
                        <Form.Control value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Enter password" />
                    </Form.Group>
                    {passwordError ? <span className="alert-danger">{passwordError}</span> : null}
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