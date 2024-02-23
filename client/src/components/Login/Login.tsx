import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Nav } from "react-bootstrap";
import { useLoaderData, Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { onLogin } from "../../api/auth";

export const loader = ({ request }: { request: Request }) => {
  return new URL(request.url).searchParams.get("message");
};

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const pathname = new URL(request.url).searchParams.get("redirectTo") || "/dashboard";

  try {
    await onLogin({ email, password });
    localStorage.setItem("isAuth", "true");
    return redirect(pathname);
  } catch (error: any) {
    return "Couldn't log user in";
  }
};

const Login = (): JSX.Element => {
  let loginMsg: any = useLoaderData();
  const errorMessage: any = useActionData();
  const navigation = useNavigation();

  return (
    <div className='login template d-flex justify-content-center align-items-center w-100 h-100 bg-dark'>
      <div className='col-11 col-sm-8 col-md-6 col-lg-4 col-xl-3 p-3 rounded bg-white'>
        <Form method='post'>
          <fieldset disabled={navigation.state === "submitting"}>
            <h3 className='text-center'>Login</h3>
            {errorMessage && (
              <div style={{ color: "red", margin: "10px 0" }}>{errorMessage}</div>
            )}
            <div className=''>
              <input
                type='email'
                className='form-control rounded-0 rounded-top'
                id='email'
                name='email'
                placeholder='Enter email'
              />
            </div>

            <div className='mb-3'>
              <input
                type='password'
                className='form-control rounded-0 rounded-bottom'
                id='password'
                name='password'
                placeholder='Enter password'
              />
            </div>

            {loginMsg && <div style={{ color: "red", margin: "10px 0" }}>{loginMsg}</div>}

            <Button variant='primary' type='submit' className='w-100'>
              {navigation.state === "submitting" ? "Logging in..." : "Log In"}
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
