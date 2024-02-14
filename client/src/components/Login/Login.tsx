import { Button, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Nav } from "react-bootstrap";
import { SyntheticEvent, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { onLogin } from "../../api/auth";
import { authenticateUser } from "../../redux/slices/authSlice";

const Login = (): JSX.Element => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    // rememberMe: false,
  });
  const [error, setError] = useState();

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await onLogin(values);
      dispatch(authenticateUser());
      localStorage.setItem("isAuth", true);
    } catch (error: any) {
      console.log(error.response.data.errors[0].msg);
      setError(error.response.data.errors[0].msg);
    }
  };

  return (
    <div className='login template d-flex justify-content-center align-items-center w-100 h-100 bg-dark'>
      <div className='col-11 col-sm-8 col-md-6 col-lg-4 col-xl-3 p-3 rounded bg-white'>
        <Form onSubmit={onSubmit}>
          <h3 className='text-center'>Login</h3>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='email'
              name='email'
              placeholder='Enter email'
              value={values.email}
              onChange={(e) => onChange(e)}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              name='password'
              placeholder='Password'
              value={values.password}
              onChange={(e) => onChange(e)}
            />
          </Form.Group>
          {/* <Form.Group className='mb-3' controlId='formBasicRememberMe'>
            <Form.Check
              type='checkbox'
              label='rememberMe'
              name='rememberMe'
              className='text-muted'
              checked={values.rememberMe}
              onChange={(e) => onChange(e)}
            />
          </Form.Group> */}

          <div style={{ color: "red", margin: "10px 0" }}>{error}</div>

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
