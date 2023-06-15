import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { authContext } from '../context/authContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { logout, getUser } = useContext(authContext)
  const user = getUser()
  const navigate = useNavigate()

  const onClickLogout = () => {
    logout()
    navigate('/login')
  }
  
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>VODA.ai Blog</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate('/blog')}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate('/blog/posts')}>Posts</Nav.Link>
            <Nav.Link onClick={() => navigate('/blog/favourite-posts')}>Favourite Posts</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {`${user.firstname} ${user.lastname}`}
          </Navbar.Text>
          <i onClick={() => onClickLogout()} 
             className="bi bi-box-arrow-in-left" 
             style={{color:'rgba(255,255,255,0.55)', fontWeight: 'bolder', fontSize: '24px', marginLeft: '8px', cursor: 'pointer'}}>
          </i>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;