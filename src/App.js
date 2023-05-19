import React, { useState } from 'react';
import AddDevice from './components/AddDevice';
import ServerList from './components/ServerList';
import Container from "react-bootstrap/Container";
import Header from "./components/Header";
import { ServerProvider } from './components/ServerContext';


function App() {
    const [servers, setServers] = useState([]);

    const handleAddServer = (newServer) => {
        setServers([...servers, newServer]);
    };

    const handleDeleteServer = (serverToDelete) => {
        const updatedServers = servers.filter(
            (server) => server.ipAddress !== serverToDelete.ipAddress
        );
        setServers(updatedServers);
    };

    const handleEditServer = (editedServer) => {
        const updatedServers = servers.map((server) =>
            server.ipAddress === editedServer.ipAddress ? editedServer : server
        );
        setServers(updatedServers);
    };

    return (
        <div className="App">
            <Header/>

            <Container>
                <ServerProvider>
                <AddDevice onAdd={handleAddServer} />
                <ServerList
                    servers={servers}
                    onDelete={handleDeleteServer}
                    onEdit={handleEditServer}
                />
                </ServerProvider>
            </Container>

        </div>

    );
}

export default App;
