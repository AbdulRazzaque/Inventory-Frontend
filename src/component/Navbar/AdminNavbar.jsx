import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import '../../app.css'
import './navbar.css'
// import logo from '../images/logo.jpeg'
import logo from '../../images/logo.jpeg'
import { Button } from '@mui/material';

const AdminNavbar = () => {
    return (
      <div>
        <h1 className='text-center'>Inventroy Management System</h1>
        <Navbar bg="light" expand="lg">
          <Container>
          <Link to="/">   <Navbar.Brand  className='navbr_brand'> </Navbar.Brand></Link> 
             <img src={logo} className="navabar_logo ml-10" alt=""  / >
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                {/* <Nav.Link href="#home">Add User</Nav.Link>
                <Nav.Link href="#link">Add Produuts</Nav.Link> */}
                <NavDropdown title="Selection" id="basic-nav-dropdown" style={{fontWeight:'bold'}}>
                <Link to="/adminpanel"><NavDropdown.Item href="#action/3.1"><b>Add User</b> </NavDropdown.Item></Link>  
                <Link to="/addproducts">   <NavDropdown.Item href="#action/3.1"><b>Add Product</b> </NavDropdown.Item></Link>
                <Link to="/Addsuppliers">    <NavDropdown.Item href="#action/3.2">
                   <b>  Add Supplier</b>
                  </NavDropdown.Item></Link>
                  <Link to="/Addloactaion">       <NavDropdown.Item href="#action/3.3"><b> Add Farm</b> </NavDropdown.Item></Link>
                  {/* <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item> */}
                </NavDropdown>
             

              </Nav>
            </Navbar.Collapse>
          </Container>
         {/* <Link to="/" ><Button variant="contained" color="error" className='mr-4' >Log Out  <LogoutIcon className='mx-1'/></Button> </Link> */}

          {/* <Link to="/">     <LogoutIcon/> fontSize="large" className='mr-5'/>  </Link> */}
          <Link to="/" >  <button type="button" class="btn btn-danger mr-4">Log Out  <LogoutIcon className='mx-1'/></button> </Link>
        </Navbar>
        </div>
      );
    
}

export default AdminNavbar