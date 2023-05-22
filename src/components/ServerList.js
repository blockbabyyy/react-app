import React, { useContext, useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ServerContext from './ServerContext';
import { Col, Row } from 'react-bootstrap';

function ServerList() {
    const { servers, deleteServer, editServer } = useContext(ServerContext);

    const handleDelete = (server) => {
        deleteServer(server);
    };

    const handleEdit = (server) => {
        editServer(server);
    };

    const ServerCard = ({ server }) => {
        const [selectedOption, setSelectedOption] = useState('');

        const handleOptionChange = (selectedOption) => {
            setSelectedOption(selectedOption);
            localStorage.setItem(`selectedOption-${server.ipAddress}`, selectedOption);
        };

        useEffect(() => {
            const savedOption = localStorage.getItem(`selectedOption-${server.ipAddress}`);
            if (savedOption) {
                setSelectedOption(savedOption);
            }
        }, []);

        return (
            <Card style={{ height: '15rem', width: '20rem', marginRight: '10px' }}>
                <Card.Body>
                    <Card.Title>{server.name}</Card.Title>

                    <Card.Text>
                        IP-адрес: {server.ipAddress}
                        <br />
                        Порт: {server.port}
                    </Card.Text>
                    <Row>
                    <ButtonGroup>
                        {[1, 2, 3, 4, 5, 6].map((option) => (
                            <ToggleButton
                                key={`${server.ipAddress}${option}`}
                                id={`radio-${server.ipAddress}${option}`}
                                type="radio"
                                variant={'outline-primary'}
                                name={`radio-group-${server.ipAddress}`}
                                value={`${server.ipAddress}${option}`}
                                checked={selectedOption === `${server.ipAddress}${option}`}
                                onChange={(e) => handleOptionChange(e.currentTarget.value)}
                            >
                                {option}
                            </ToggleButton>
                        ))}
                    </ButtonGroup>
                    </Row>
                    <br/>
                    <Row>
                   <ButtonGroup>
                       <Button className="me-1" variant="outline-primary" onClick={() => handleEdit(server)}>
                           Изменить
                       </Button>
                       <Button className="me-1" variant="outline-danger" onClick={() => handleDelete(server)}>
                           Удалить
                       </Button>
                   </ButtonGroup>
                    </Row>
                </Card.Body>
            </Card>
        );
    };

    return (
        <Row xs={1} md={2} lg={4} className="g-4">
            {servers.map((server, index) => (
                <Col key={index}>
                    <ServerCard server={server} />
                </Col>
            ))}
        </Row>
    );
}

export default ServerList;
