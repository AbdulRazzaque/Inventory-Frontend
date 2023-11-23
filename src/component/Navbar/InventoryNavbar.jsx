import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import '../../app.css'
import './navbar.css'
import logo from '../../images/logo.jpeg'
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
const InventoryNavbar = () => {
  return (
    <div>
           <h1 className='text-center mt-2 mb-2'>Inventory Management System</h1>
        <Navbar bg="light" expand="lg" className=''>
          <Container>
          
        <Link to="/">   <Navbar.Brand  className='navbr_brand'>  </Navbar.Brand></Link> 
          <img src={logo} className="navabar_logo" alt="" / >

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                {/* <Nav.Link href="#home">Add User</Nav.Link>
                <Nav.Link href="#link">Add Produuts</Nav.Link> */}
                
                <NavDropdown title="Transaction" id="basic-nav-dropdown" style={{fontWeight:'bold'}}>
                <Link to="/stockin">   <NavDropdown.Item href="#action/3.1"><b>Stock In</b> </NavDropdown.Item></Link>
                <Link to="/stockout">    <NavDropdown.Item href="#action/3.2"><b>Stock Out</b> </NavDropdown.Item></Link>
                  <Link to="/stockoutsearch">       <NavDropdown.Item href="#action/3.4"> <b> Stockout Search</b></NavDropdown.Item></Link>
                <Link to="/productslist"><NavDropdown.Item href="#action/3.0"><b>Stock List</b> </NavDropdown.Item></Link>  

                  {/* <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item> */}
                </NavDropdown>


                <NavDropdown title="Inventory" id="basic-nav-dropdown" style={{fontWeight:'bold'}} >

                  <Link to="/stockinventoty">       <NavDropdown.Item href="#action/3.3"><b> Stock Inventory</b> </NavDropdown.Item></Link>
                  <Link to="/monthlyreport">       <NavDropdown.Item href="#action/3.4"><b>  Monthly Report</b></NavDropdown.Item></Link>
                  {/* <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item> */}
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
          {/* <Link to="/" ><Button variant="contained" color="error" className='mr-4' >Log Out  <LogoutIcon className='mx-1'/></Button> </Link> */}
          <Link to="/" >  <button type="button" class="btn btn-danger mr-4">Log Out  <LogoutIcon className='mx-1'/></button> </Link>
        </Navbar>
    
    </div>
    );
}

export default InventoryNavbar