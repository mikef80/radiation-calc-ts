import { Nav, Navbar, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import RadLogo from "../Images/RadLogo";
import { useEffect, useState } from "react";

const NavBar = (): JSX.Element => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth") === "true" || false);

  useEffect(() => {
    const handleLoginState = () => {
      const authenticated = localStorage.getItem("isAuth") === "true" || false;
      setIsAuth(authenticated);
    };
    window.addEventListener("storage", handleLoginState);
    return () => window.removeEventListener("storage", handleLoginState);
  }, []);

  return (
    <Navbar expand='md' collapseOnSelect bg='light' fixed='top' className='border-bottom'>
      <Container>
        <Navbar.Brand>
          <LinkContainer to='/'>
            <Nav.Link>
              <h1 className='mb-0 d-flex'>
                <RadLogo width={40} height={40} className='m-auto' />
                <div className='ms-3'>RadCalc</div>
              </h1>
            </Nav.Link>
          </LinkContainer>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' className='p-1' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            {!isAuth && (
              <LinkContainer to='/login'>
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            )}
            {!isAuth && (
              <LinkContainer to='/signup'>
                <Nav.Link>Signup</Nav.Link>
              </LinkContainer>
            )}
            {isAuth && (
              <LinkContainer to='/dashboard'>
                <Nav.Link>Dashboard</Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
