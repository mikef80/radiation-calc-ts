import { Button, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Nav } from "react-bootstrap";
import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (): JSX.Element => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const onFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const newUser = JSON.stringify({
      firstname,
      lastname,
      email,
      password,
      confirmPassword,
    });

    const response = await fetch("http://localhost:9090/api/auth/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: newUser,
    });

    if (response.ok) {
      setFirstname("");
      setLastname("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      navigate("/login");
    }

    const returnedUser = await response.json();

    console.log(returnedUser, "<-- returnedUser");
  };

  return (
    <div className='signup template d-flex justify-content-center align-items-center w-100 h-100 bg-dark'>
      <div className='col-11 col-sm-8 col-md-6 col-lg-4 col-xl-3 p-3 rounded bg-white'>
        <Form onSubmit={onFormSubmit}>
          <h3 className='text-center'>Sign Up</h3>
          <Form.Group className='mb-3' controlId='formBasicFirstName'>
            <Form.Label>First Name:</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter First Name'
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicLastName'>
            <Form.Label>Last Name:</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Last Name'
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Email address:</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicPasswordConfirm'>
            <Form.Label>Confirm Password:</Form.Label>
            <Form.Control
              type='password'
              placeholder='Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
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
