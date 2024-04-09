// SimpleModal.js
import React from 'react';
import Modal from 'react-bootstrap/Modal';

function SimpleModal({ show, titulo }) {
    <Modal show={show} onHide={close}>
        <Modal.Header closeButton>
            <Modal.Title>{titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in {modalTitle}!</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
                Save Changes
            </Button>
        </Modal.Footer>
    </Modal>
}

export default SimpleModal;