import { Container, Spinner } from "react-bootstrap"
const CenteredSpinner = () => {
    return (
        <div className="centered-div">
            <Container>
                <div className="spinner-grow" style={{width: '14rem', height: '14rem'}} role="status"></div>
            </Container>
        </div>
    )
}

export default CenteredSpinner