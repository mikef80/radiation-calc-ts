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
        <br />
        All calculations should be verified independently.
        <br />
        <br />
        Click 'Agree' to agree to these terms and continue.
      </Modal.Body>
      <Modal.Footer>
        {/* <Button variant='secondary' onClick={handleClose}>
          Close
        </Button> */}
        <Button variant='primary' onClick={handleAgree}>
          Agree
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Warning;
