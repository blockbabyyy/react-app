import React, { createContext, useState } from 'react';

const ServerContext = createContext();

export const ServerProvider = ({ children }) => {
    const [servers, setServers] = useState([]);

    const addServer = (newServer) => {
        const updatedData = [...servers, newServer];
        setServers(updatedData);
        localStorage.setItem('serverData', JSON.stringify(updatedData));
    };

    const deleteServer = (serverToDelete) => {
        const updatedServers = servers.filter((server) => server.ipAddress !== serverToDelete.ipAddress);
        setServers(updatedServers);
        localStorage.setItem('serverData', JSON.stringify(updatedServers));
    };

    const editServer = (editedServer) => {
        const updatedServers = servers.map((server) =>
            server.ipAddress === editedServer.ipAddress ? editedServer : server
        );
        setServers(updatedServers);
        localStorage.setItem('serverData', JSON.stringify(updatedServers));
    };

    useState(() => {
        const savedData = localStorage.getItem('serverData');
        if (savedData) {
            setServers(JSON.parse(savedData));
        }
    }, []);

    const serverContextValue = {
        servers,
        addServer,
        deleteServer,
        editServer,
    };

    return <ServerContext.Provider value={serverContextValue}>{children}</ServerContext.Provider>;
};

export default ServerContext;
