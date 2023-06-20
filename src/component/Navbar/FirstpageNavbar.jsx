import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import '../../app.css'
import './navbar.css'
import logo from '../../images/logo.jpeg'
const FirstpageNavbar = () => {
    return (
        <div>
          <h1 className='text-center'>Inventroy Management System</h1>
               
            <Navbar bg="light" expand="lg">
              <Container>
              <Link to="/">   <Navbar.Brand  className='navbr_brand'>  </Navbar.Brand></Link> 
              <Link to="/">    <img src={logo} className="navabar_logo" alt="" / ></Link> 

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    {/* <Nav.Link href="#home">Add User</Nav.Link>
                    <Nav.Link href="#link">Add Produuts</Nav.Link> */}
                    <NavDropdown title="Menu" id="basic-nav-dropdown">
                    <Link to="/adminlogin"><NavDropdown.Item href="#action/3.0">Admin login</NavDropdown.Item></Link>  
                    <Link to="/userlogin">   <NavDropdown.Item href="#action/3.1">User login</NavDropdown.Item></Link>
                   
                      {/* <NavDropdown.Divider />
                      <NavDropdown.Item href="#action/3.4">
                        Separated link
                      </NavDropdown.Item> */}
                    </NavDropdown>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
        
        </div>
        );
}

export default FirstpageNavbar