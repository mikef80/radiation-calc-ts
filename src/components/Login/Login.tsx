import { Button, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Nav } from "react-bootstrap";
import { SyntheticEvent, useState } from "react";

const Login = (): JSX.Element => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  const onFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const loginUser = {
      emailAddress,
      password,
      rememberMe
    }
    
    console.log(loginUser);
  };



  return (
    <div className='login template d-flex justify-content-center align-items-center w-100 h-100 bg-dark'>
      <div className='col-11 col-sm-8 col-md-6 col-lg-4 col-xl-3 p-3 rounded bg-white'>
        <Form onSubmit={onFormSubmit}>
          <h3 className='text-center'>Login</h3>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicRememberMe'>
            <Form.Check
              type='checkbox'
              label='Remember me'
              className='text-muted'
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
          </Form.Group>
          <Button variant='primary' type='submit'>
            Sign In
          </Button>
          <Form.Group>
            <small>
              <Form.Text className='text-muted'>
                Not registered? Sign up{" "}
                <LinkContainer to='/signup' className='d-inline-flex'>
                  <Nav.Link>
                    <u>here</u>
                  </Nav.Link>
                </LinkContainer>
              </Form.Text>
            </small>
          </Form.Group>
          
        </Form>
      </div>
    </div>
  );
};

export default Login;
