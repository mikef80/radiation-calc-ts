import { Button, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Nav } from "react-bootstrap";
import { SyntheticEvent } from "react";

const Signup = (): JSX.Element => {
  const onFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(e);
    console.log("signup submission");
  };

  return (
    <div className='signup template d-flex justify-content-center align-items-center w-100 h-100 bg-dark'>
      <div className='col-11 col-sm-8 col-md-6 col-lg-4 col-xl-3 p-3 rounded bg-white'>
        <Form onSubmit={onFormSubmit}>
          <h3 className='text-center'>Sign Up</h3>
          <Form.Group className='mb-3' controlId='formBasicFirstName'>
            <Form.Label>First Name:</Form.Label>
            <Form.Control type='text' placeholder='Enter First Name' />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicLastName'>
            <Form.Label>Last Name:</Form.Label>
            <Form.Control type='text' placeholder='Enter Last Name' />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Email address:</Form.Label>
            <Form.Control type='email' placeholder='Enter email' />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Password:</Form.Label>
            <Form.Control type='password' placeholder='Password' />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicPasswordConfirm'>
            <Form.Label>Confirm Password:</Form.Label>
            <Form.Control type='password' placeholder='Password' />
          </Form.Group>

          <Button variant='primary' type='submit'>
            Sign Up
          </Button>
          <Form.Group>
            <small>
              <Form.Text className='text-muted text-xs'>
                Already registered? Login{" "}
                <LinkContainer to='/login' className='d-inline-flex'>
                  <Nav.Link>
                    <u>here</u>
                  </Nav.Link>
                </LinkContainer>
              </Form.Text>
            </small>
          </Form.Group>
          {/*<p className="text-muted">
            Not registered? Sign up{' '}
            <LinkContainer to='/signup' className="d-inline-flex">
              <Nav.Link>here</Nav.Link>
            </LinkContainer>
          </p> */}
        </Form>
      </div>
    </div>
  );
};

export default Signup;
