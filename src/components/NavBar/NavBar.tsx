import { Nav, Navbar, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const NavBar = (): JSX.Element => {
  return (
    <Navbar
      expand='md'
      collapseOnSelect
      bg='light'
      sticky='top'
      className='border border-primary'>
      <Container>
        <Navbar.Brand href='#' className='border border-secondary'>
          RadCalc
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls='basic-navbar-nav'
          className='border-success p-1'
        />
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
