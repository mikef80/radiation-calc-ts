import { Button, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Nav } from "react-bootstrap";
import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onRegistration } from "../../api/auth";

const Signup = (): JSX.Element => {
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const onChange = (e: SyntheticEvent) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const { data } = await onRegistration(values);
      setError("");
      setSuccess(data.message);
      setValues({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
      });
      setConfirmPassword("");
      setTimeout(() => {
        navigate('/login')
      }, 1000);
    } catch (error: any) {
      console.log(error.response.data.errors[0].msg);
      setError(error.response.data.errors[0].msg);
      setSuccess("");
    }
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
              name='firstname'
              placeholder='Enter First Name'
              value={values.firstname}
              onChange={(e) => onChange(e)}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicLastName'>
            <Form.Label>Last Name:</Form.Label>
            <Form.Control
              type='text'
              name='lastname'
              placeholder='Enter Last Name'
              value={values.lastname}
              onChange={(e) => onChange(e)}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Email address:</Form.Label>
            <Form.Control
              type='email'
              name='email'
              placeholder='Enter email'
              value={values.email}
              onChange={(e) => onChange(e)}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type='password'
              name='password'
              placeholder='Password'
              value={values.password}
              onChange={(e) => onChange(e)}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicPasswordConfirm'>
            <Form.Label>Confirm Password:</Form.Label>
            <Form.Control
              type='password'
              name='confirm-password'
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>

          <div style={{ color: "red", margin: "10px 0" }}>{error}</div>
          <div style={{ color: "green", margin: "10px 0" }}>{success}</div>

          <Button variant='primary' type='submit' className="w-100">
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
