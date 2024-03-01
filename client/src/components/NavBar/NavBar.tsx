import { Nav, Navbar, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import RadLogo from "../Images/RadLogo";
// import logo from "../../logos/logo";

const NavBar = (): JSX.Element => {
  return (
    <Navbar expand='md' collapseOnSelect bg='light' fixed='top' className='border-bottom'>
      <Container>
        <Navbar.Brand>
          <LinkContainer to='/'>
            <Nav.Link>
              {/* {logo()} */}
              {/* <h1 className="mb-0">RadCalc</h1> */}
              <h1 className='mb-0'>
                <RadLogo width={40} height={40} />
              </h1>
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
            <LinkContainer to='/dashboard'>
              <Nav.Link>Dashboard</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
