import Alert from 'react-bootstrap/Alert';

const Error = (props) => {

    return (
        <Alert variant='danger' className='mt-3'>
            {props.message}
        </Alert>
    )

}

export default Error;