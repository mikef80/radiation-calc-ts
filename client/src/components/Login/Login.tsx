import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Nav } from "react-bootstrap";
import { useLoaderData, Form, redirect } from "react-router-dom";
import { onLogin } from "../../api/auth";

export const loader = ({ request }: { request: Request }) => {
  return new URL(request.url).searchParams.get("message");
};

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    await onLogin({ email, password });
    localStorage.setItem("isAuth", "true");
    return redirect("/dashboard");
  } catch (error) {}

  return null;
};

const Login = (): JSX.Element => {
  let loginMsg: any = useLoaderData();

  return (
    <div className='login template d-flex justify-content-center align-items-center w-100 h-100 bg-dark'>
      <div className='col-11 col-sm-8 col-md-6 col-lg-4 col-xl-3 p-3 rounded bg-white'>
        <Form method='post' replace>
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

            {loginMsg && <div style={{ color: "red", margin: "10px 0" }}>{loginMsg}</div>}

            <Button variant='primary' type='submit' className='w-100'>
              {status === "submitting" ? "Logging in..." : "Log In"}
            </Button>

            <div className='mb-3'>
              <small>
                <div className='text-muted form-text'>
                  Not registered? Sign up{" "}
                  <LinkContainer to='/signup' className='d-inline-flex'>
                    <Nav.Link>
                      <u>here</u>
                    </Nav.Link>
                  </LinkContainer>
                </div>
              </small>
            </div>
          </fieldset>
        </Form>
      </div>
    </div>
  );
};

export default Login;
