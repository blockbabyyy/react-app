import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function EditServerForm({ server, onUpdate, onClose }) {
    const [name, setName] = useState(server.name);
    const [ipAddress, setIPAddress] = useState(server.ipAddress);
    const [port, setPort] = useState(server.port);

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedServer = {
            name: name,
            ipAddress: ipAddress,
            port: port,
        };
        onUpdate(updatedServer);
        onClose();

    };

    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Редактирование сервера</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="name">
                        <Form.Label>Имя</Form.Label>
                        <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="ipAddress">
                        <Form.Label>IP-адрес</Form.Label>
                        <Form.Control type="text" value={ipAddress} onChange={(e) => setIPAddress(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="port">
                        <Form.Label>Порт</Form.Label>
                        <Form.Control type="text" value={port} onChange={(e) => setPort(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Сохранить
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}



export default EditServerForm;
