import React, { createContext, useState } from 'react';

// Создаем контекст
const ServerContext = createContext();

// Создаем провайдер контекста
export const ServerProvider = ({ children }) => {
    const [servers, setServers] = useState([]);

    const addServer = (newServer) => {
        setServers([...servers, newServer]);
    };

    const deleteServer = (serverToDelete) => {
        const updatedServers = servers.filter(
            (server) => server.ipAddress !== serverToDelete.ipAddress
        );
        setServers(updatedServers);
    };

    const editServer = (editedServer) => {
        const updatedServers = servers.map((server) =>
            server.ipAddress === editedServer.ipAddress ? editedServer : server
        );
        setServers(updatedServers);
    };

    const serverContextValue = {
        servers,
        addServer,
        deleteServer,
        editServer,
    };

    return (
        <ServerContext.Provider value={serverContextValue}>
            {children}
        </ServerContext.Provider>
    );
};

export default ServerContext;
