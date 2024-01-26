import { Button, Form } from "react-bootstrap";
const Login = (): JSX.Element => {
  return (
    <div className='login template d-flex justify-content-center align-items-center w-100 vh-100 bg-dark'>
      <div className="w-40 p-5 rounded bg-white">
        <Form>
          <h3>Sign In</h3>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control type='email' placeholder='Enter email' />
            <Form.Text className='text-muted'>
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder='Password' />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicCheckbox'>
            <Form.Check type='checkbox' label='Remember me' className="text-muted" />
          </Form.Group>
          <Button variant='primary' type='submit'>
            Submit
          </Button>

        </Form>
      </div>
    </div>
  );
};

export default Login;
