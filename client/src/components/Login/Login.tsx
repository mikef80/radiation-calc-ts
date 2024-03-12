import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Nav } from "react-bootstrap";
import {
  useLoaderData,
  Form,
  redirect,
  useActionData,
  useNavigation,
  useNavigate,
} from "react-router-dom";
import { onLogin } from "../../api/auth";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { authenticateUser } from "../../redux/slices/authSlice";

export const loader = ({ request }: { request: Request }) => {
  const isAuth = localStorage.getItem("isAuth") === "true";

  if (isAuth) {
    return redirect("/");
  }

  return new URL(request.url).searchParams.get("message");
};

/* export const action = async ({ request }: { request: Request }) => {
  console.log(request);

  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const pathname = new URL(request.url).searchParams.get("redirectTo") || "/dashboard";
  // const dispatch = useDispatch(); 

  try {
    await onLogin({ email, password });
    // dispatch(authenticateUser());
    localStorage.setItem("isAuth", "true");
    return redirect(pathname);
  } catch (error: any) {
    console.log(error);

    return "Couldn't log user in";
  }
}; */

const Login = (): JSX.Element => {
  let loginMsg: any = useLoaderData();
  const errorMessage: any = useActionData();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const formSubmit = async (e: any) => {
    e.preventDefault();

    const pathname = new URL(e.target.baseURI).searchParams.get("redirectTo") || "/";
    try {
      await onLogin({ email, password });

      dispatch(authenticateUser());
      localStorage.setItem("isAuth", "true");
      window.dispatchEvent(new Event("storage"));
      return navigate(pathname);
    } catch (error: any) {
      setError(error.response.data.errors[0].msg);
      return "Couldn't log user in";
    }
  };

  return (
    <div className='login template d-flex justify-content-center align-items-center w-100 h-100 bg-dark'>
      <div className='col-11 col-sm-8 col-md-6 col-lg-4 col-xl-3 p-3 rounded bg-white'>
        <Form method='post' onSubmit={formSubmit}>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className='mb-3'>
              <input
                type='password'
                className='form-control rounded-0 rounded-bottom'
                id='password'
                name='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {loginMsg && <div style={{ color: "red", margin: "10px 0" }}>{loginMsg}</div>}
            <div style={{ color: "red", margin: "10px 0" }}>{error}</div>

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
