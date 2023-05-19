import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from "./trace.svg";

function Header() {
    return (
        <>

             <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">
                        <img
                            alt="logo"
                            src={logo}
                            width="44"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        НИИ Радио
                    </Navbar.Brand>
                </Container>
            </Navbar>
            <br/>
        </>
    );
}

export default Header;