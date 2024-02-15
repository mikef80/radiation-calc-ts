import { Nav, Navbar, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../../logos/logo";

const NavBar = (): JSX.Element => {
  return (
    <Navbar expand='md' collapseOnSelect bg='light' sticky='top' className='border-bottom'>
      <Container>
        <Navbar.Brand href='/'>
          <LinkContainer to='/'>
            <Nav.Link>
              {/* {logo()} */}
              RadCalc
            </Nav.Link>
          </LinkContainer>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' className='p-1' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <LinkContainer to='/login'>
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/signup'>
              <Nav.Link>Signup</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
