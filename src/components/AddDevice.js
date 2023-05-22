import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import ServerContext from './ServerContext';

function AddDevice() {
    const { servers, addServer } = useContext(ServerContext);

    const [name, setName] = useState('');
    const [ipAddress, setIPAddress] = useState('');
    const [port, setPort] = useState('');
    const [ipError, setIpError] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const toggleForm = () => {
        setIsOpen(!isOpen);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const isValidIP = validateIPAddress(ipAddress);

        if (!isValidIP) {
            setIpError('Неправильный формат IP-адреса');
            return;
        }

        const existingServer = servers.find((server) => server.ipAddress === ipAddress);

        if (existingServer) {
            setIpError('Сервер с таким IP-адресом уже существует');
            return;
        }

        const newData = {
            name: name,
            ipAddress: ipAddress,
            port: port
        };

        addServer(newData);
        setName('');
        setIPAddress('');
        setIpError('');
        setPort('');
    };

    const validateIPAddress = (ip) => {
        const ipParts = ip.split('.');
        if (ipParts.length !== 4) {
            return false;
        }
        for (let i = 0; i < 4; i++) {
            const part = parseInt(ipParts[i]);
            if (isNaN(part) || part < 0 || part > 255) {
                return false;
            }
        }
        return true;
    };

    return (
        isOpen ? (
            <Form>
                <Row>
                    <Col xs="auto">
                        <Form.Label htmlFor="name" visuallyHidden>
                            Name
                        </Form.Label>
                        <Form.Control
                            type="text"
                            id="name"
                            className="mb-2 "
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Имя"
                        />
                    </Col>
                    <Col xs="auto">
                        <Form.Label htmlFor="ipAdress" visuallyHidden>
                            IP
                        </Form.Label>
                        <InputGroup className="mb-2">
                            <Form.Control
                                className={`mb-2 ${ipError ? 'is-invalid' : ''}`}
                                type="ip"
                                id="ipAdress"
                                value={ipAddress}
                                onChange={(e) => {
                                    setIPAddress(e.target.value);
                                    const isValidIP = validateIPAddress(e.target.value);
                                    setIpError(isValidIP ? '' : 'Неправильный формат IP-адреса');
                                }}
                                placeholder="IP-Адрес"
                            />
                            <Form.Control.Feedback type="invalid">{ipError}</Form.Control.Feedback>
                        </InputGroup>
                    </Col>
                    <Col xs="auto">
                        <Form.Label htmlFor="port" visuallyHidden>
                            Port
                        </Form.Label>
                        <Form.Control
                            type="text"
                            id="port"
                            className="mb-2 "
                            value={port}
                            onChange={(e) => setPort(e.target.value)}
                            placeholder="Порт"
                        />
                    </Col>
                    <Col xs="auto">
                        <Button type="submit" className="mb-2" onClick={handleSubmit}>
                            Добавить
                        </Button>
                    </Col>
                    <Col xs="auto">
                        <Button variant="outline-danger" onClick={toggleForm}>Закрыть</Button>
                    </Col>
                </Row>
            </Form>
        ) : (
            <Button className="mb-3" onClick={toggleForm}>Добавить</Button>
        )
    );
}

export default AddDevice;
