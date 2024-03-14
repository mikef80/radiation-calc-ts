import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { onTermsAgree } from "../../api/auth";

const Warning = () => {
  const [show, setShow] = useState(
    localStorage.getItem("termsAgreed") === "true" ? false : true
  );

  const handleAgree = () => {
    onTermsAgree({ termsagreed: true }).then(({ data: { termsAgreed } }) => {
      localStorage.setItem("termsAgreed", termsAgreed);
      setShow(false);
    });
  };

  return (
    <Modal show={show} backdrop='static' keyboard={false} centered>
      <Modal.Header>
        <Modal.Title>IMPORTANT</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        This app is for demonstration purposes only.
        <br />
        <ul>
          <li>All calculations should be verified independently and signed off.</li>
          <li>Please ensure your calculations are recorded officially i.e in your Incident log book.</li>
          <li>Data may be removed periodically due to the ongoing development process.</li>
        </ul>
        <br />
        Click 'Agree' to agree to these terms and continue.
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' onClick={handleAgree}>
          Agree
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Warning;
