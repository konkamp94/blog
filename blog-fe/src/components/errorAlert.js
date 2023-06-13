import Alert from 'react-bootstrap/Alert';

const ErrorAlert = ({errorMessage}) => {

    return (
        <Alert variant='danger' className='mt-3'>
            {errorMessage}
        </Alert>
    )

}

export default ErrorAlert;