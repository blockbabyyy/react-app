import React from 'react';
import AddDevice from './components/AddDevice';
import ServerList from './components/ServerList';
import Container from "react-bootstrap/Container";
import Header from "./components/Header";
import { ServerProvider } from './components/ServerContext';

function App() {
    return (
        <div className="App">
            <Header />
            <Container>
                <ServerProvider>
                    <AddDevice />
                    <ServerList />
                </ServerProvider>
            </Container>
        </div>
    );
}

export default App;
