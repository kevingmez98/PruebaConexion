// SimpleModal.js
// Componente con la estructura de un modal
import React from 'react';
import Modal from 'react-bootstrap/Modal';

//El show es la variable que controla si el modal se muestra
//El handleClose es una función que controla la variable show
function SimpleModal({ show, handleClose, titulo, fullscreen, children }) {

    return (
        <Modal
            show={show} onHide={handleClose} fullscreen={fullscreen}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>{titulo}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal>

    )
}

export default SimpleModal;