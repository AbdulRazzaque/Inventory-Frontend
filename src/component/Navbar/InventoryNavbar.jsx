import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import '../../app.css'
import './navbar.css'
import logo from '../../images/logo.jpeg'
const InventoryNavbar = () => {
  return (
    <div>
           <h1 className='text-center mt-2 mb-2'> Inventory Mangament System</h1>
        <Navbar bg="light" expand="lg" className=''>
          <Container>
          
        <Link to="/">   <Navbar.Brand  className='navbr_brand'>  </Navbar.Brand></Link> 
        <Link to="/">    <img src={logo} className="navabar_logo" alt="" / ></Link> 

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                {/* <Nav.Link href="#home">Add User</Nav.Link>
                <Nav.Link href="#link">Add Produuts</Nav.Link> */}
                
                <NavDropdown title="Transection" id="basic-nav-dropdown">
                <Link to="/stockin">   <NavDropdown.Item href="#action/3.1">Stockin</NavDropdown.Item></Link>
                <Link to="/stockout">    <NavDropdown.Item href="#action/3.2">Stockout</NavDropdown.Item></Link>
                  <Link to="/stockoutsearch">       <NavDropdown.Item href="#action/3.4">Stockout Search</NavDropdown.Item></Link>
                <Link to="/productslist"><NavDropdown.Item href="#action/3.0">Stocklist</NavDropdown.Item></Link>  

                  {/* <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item> */}
                </NavDropdown>


                <NavDropdown title="Inventory" id="basic-nav-dropdown"  >

                  <Link to="/stockinventoty">       <NavDropdown.Item href="#action/3.3">Stock-inventory</NavDropdown.Item></Link>
                  <Link to="/monthlyreport">       <NavDropdown.Item href="#action/3.4">Monthly Report</NavDropdown.Item></Link>
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

export default InventoryNavbar