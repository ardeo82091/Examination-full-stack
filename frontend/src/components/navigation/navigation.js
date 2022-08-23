import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { useNavigate} from "react-router-dom";
import axios from "axios";
import img from '../../unnamed.png'
import  './navigation.css'
function Navigation({ userName, role }) {
    let navigate = new useNavigate();
    const handleMyLogout = () => {
        axios.post('http://localhost:8082/api/v1/logout').then((resp)=> {
            navigate('/');
        });
    };

    if (role === "admin") {
        const createQuestionPath = "/CreateQuestion/" + userName
        const getTestPath = "/getTest/" + userName
        const createUserPath = "/createUser/" + userName
        const allUsersPath = "/allUsers/" + userName

        return (

            <Navbar collapseOnSelect expand="lg" bg="" variant = "light" style={{background : "Tomato"}}>
                <Container>
                    <Navbar.Brand href="/">
                        <img src={img} className = "img" alt = "logo"></img> &nbsp;
                        {userName}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">

                            <NavDropdown title="CREATE" id="basic-nav-dropdown">
                                <NavDropdown.Item href={createQuestionPath}>Question</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href={createUserPath}>User</NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown title="GET" id="basic-nav-dropdown">
                                <NavDropdown.Item href={allUsersPath}>AllUser</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href={getTestPath}>AllTest</NavDropdown.Item>
                            </NavDropdown>

                        </Nav>
                        <div className='pull-right' >
                            <ul className="nav navbar-nav">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button className="btn btn-primary" onClick={handleMyLogout} style={{ backgroundColor: "orange" , float : "right"}}>Logout</button>
                                
                            </ul>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    } else {
        const UserTestPath = "/userTech/" + userName
        return (

            <Navbar collapseOnSelect expand="lg" bg="" variant = "light" style={{background : "Tomato"}}>
                <Container>
                    <Navbar.Brand href="/">
                        <img src={img} className = "img" alt = "logo"></img> &nbsp;
                        {userName}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <NavDropdown title="Test" id="collasible-nav-dropdown">
                                <NavDropdown.Item href={UserTestPath}>Take Test</NavDropdown.Item>
                            </NavDropdown>

                        </Nav>
                        <div className='pull-right' >
                            <ul className="nav navbar-nav">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                        <button className="btn btn-primary" onClick={handleMyLogout} style={{ backgroundColor: "orange" }}>Logout</button>
                            </ul>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }

}
export default Navigation
