import { Button, Form } from "react-bootstrap";
// import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Form as Form2 } from "react-router-dom";
import { Nav } from "react-bootstrap";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { onLogin } from "../../api/auth";
// import { authenticateUser } from "../../redux/slices/authSlice";
/* import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom"; */

/* export const loader = ({ request }: { request: Request }) => {
  return new URL(request.url).searchParams.get("message");
}; */

export const action = async (obj: { request: Request; params: object; context: any }) => {
  console.log(obj);

  console.log("I'm the action function");
  return null;
};

const Login = (): JSX.Element => {
  /* const [values, setValues] = useState({
    email: "",
    password: "",
  }); */
  // const [error, setError] = useState(null);
  // const [status, setStatus] = useState("idle");
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // let loginMsg: any = useLoaderData();

  /* const onChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  }; */

  /* const onSubmit = async (e: any) => {
    e.preventDefault();
    setStatus("submitting");
    setError(null);
    try {
      await onLogin(values);

      dispatch(authenticateUser());
      localStorage.setItem("isAuth", "true");
      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 1000);
    } catch (error: any) {
      console.log(error.response.data.errors[0].msg);
      setError(error.response.data.errors[0].msg);
    } finally {
      setStatus("idle");
    }
  }; */

  return (
    <div className='login template d-flex justify-content-center align-items-center w-100 h-100 bg-dark'>
      <div className='col-11 col-sm-8 col-md-6 col-lg-4 col-xl-3 p-3 rounded bg-white'>
        <Form2 method='post'>
          <fieldset disabled={status === "submitting"}>
            <h3 className='text-center'>Login</h3>
            <div className='mb-3'>
              <label htmlFor='email' className='form-label'>
                Email address
              </label>
              <input
                type='email'
                className='form-control'
                id='email'
                name='email'
                placeholder='Enter email'
              />
            </div>

            <div className='mb-3'>
              <label htmlFor='password' className='form-label'>
                Password
              </label>
              <input
                type='password'
                className='form-control'
                id='password'
                name='password'
                placeholder='Enter password'
              />
            </div>

            <Button variant='primary' type='submit' className='w-100'>
              {status === "submitting" ? "Logging in..." : "Log In"}
            </Button>

            <div className='mb-3'>
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
            </div>
          </fieldset>
        </Form2>

        {/* <Form onSubmit={onSubmit}>
          <fieldset disabled={status === "submitting"}>
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

            <div style={{ color: "red", margin: "10px 0" }}>{error}</div>

            {loginMsg && <div style={{ color: "red", margin: "10px 0" }}>{loginMsg}</div>}
            <Button variant='primary' type='submit' className='w-100'>
              {status === "submitting" ? "Logging in..." : "Log In"}
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
          </fieldset>
        </Form> */}
      </div>
    </div>
  );
};

export default Login;
