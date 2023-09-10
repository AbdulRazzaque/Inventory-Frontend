import { Autocomplete, Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Stack, TextField } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import InventoryNavbar from '../Navbar/InventoryNavbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
  import moment from 'moment' 
  import DeleteIcon from "@mui/icons-material/Delete";
  import EditIcon from "@mui/icons-material/Edit";
import './pharmacy.css'
import { ClassNames } from '@emotion/react';

const Stockininfo = () => {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState([]);
  const [allProducts,setAllProducts] = React.useState([])
  const [showDialog, setShowDialog] = useState(false);
  const [alert, setAlert] = useState(false);
  const [allSuppliers,setAllSuppliers] = React.useState([])

  const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InNoYXJqZWVsc2siLCJfaWQiOiI2M2JmZmE2OTY2ZWJiYzg0MGQ4ZmZiODkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzM1MzEyNzd9.9TU3mS2SgZLA8P3Rqop9z83fX0iWsPC1_UBi8HJXAEw";
  const params = useParams()
  console.log(params)


  const alldata =()=>{
    axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/stock/getStockInByDocNo`,{docNo:params.docNo},{headers:{token:accessToken}})
    .then(res=>{
      let arr= res.data.result[0].doc.map((item,index)=>({...item,id:index+1}))
      // [0].doc.map
      console.log(res)
      setData(arr)
    })
  }

//---------------------------------------------------- update api call here------------------------------------------------------------

const updateData = (e) => {
  setUpdate({ ...update, [e.target.name]: e.target.value,  });
  console.log(update);
};
var updatedData;
const updateRow = async () => {
  try {
  
     updatedData = {
      id: update._id,
      quantity: update.quantity,
      productName: update.name,
      originalQuantity:  update.quantity,
      
      // Add any other properties you want to update
    };

    await axios.post(
      `${process.env.REACT_APP_DEVELOPMENT}/api/stock/stockInUpdateQuantity/${update._id}`,
      updatedData,
      { headers: { token: accessToken } }
    );

    console.log("Update successful");

    setShowDialog(false);
    alldata();
  } catch (error) {
    console.log(error);
  }
};
      
  // console.log(updatedData.originalQuantity,"This is orignal Quantity")
//---------------------------------------------------- Delete api call here------------------------------------------------------------

  const deleteRow = async (updatedData) => {
    console.log(updatedData,"Herer i am calling obj")
    try {
      const updatedData = {
        id: update._id,
        quantity: update.quantity,
        productName: update.name,
        originalQuantity: update.quantity,
       
        // Add any other properties you want to update
      };
      await axios
        .delete(
        //  console.log(obj)
          `${process.env.REACT_APP_DEVELOPMENT}/api/stock/stockInDelete/${update._id}`,
          // obj,
        
          // // await  axios.delete(`${process.env.REACT_APP_DEVELOPMENT}/api/deletelab/`,
          // { headers: { token: `${accessToken}` } }
          {
            data: updatedData, // Pass the request body using the 'data' property
            headers: { token: accessToken }, // Include the token in the headers
          }
        )
         // After successful deletion, update the state to remove the deleted item
    setData(prevData => prevData.filter(item => item._id !== updatedData.id));

    setAlert(false);
    
    // Now you can call the alldata() function to refresh the data
    alldata();
  
      
    } catch (error) {
      console.log(error,"This error Delete function");
    }
  };

  React.useEffect(()=>{
    alldata()
  
    },[])
  const columns = [
    { field: 'id', headerName: <b>No</b>, width: 70 ,},
    { field: 'name', headerName: <b>Products Name </b> , width: 300 , },
    // { field: 'supplier', headerName: 'supplier Name', width: 130 },
    { field: 'productType', headerName:  <b>Products Type</b>, width: 150 },
    { field: 'companyName', headerName: <b>Company Name</b> , width: 200 },
    {field: 'unit',headerName:<b>Unit </b>,type: 'number',width: 130,},
    {field: 'quantity',headerName:<b>Quantity</b> ,type: 'number',width: 90,},
    {field: 'price',headerName: <b>Price</b>,type: 'number',width: 90,},
    // {field: 'total',headerName: 'total',type: 'number',
    // valueGetter:(param)=>  (price)*parseInt(quantity),
    // width: 90,},
    // {field: 'expiry',headerName:<b>Expiry</b> ,valueGetter:(param)=>moment.parseZone(param.row.date).format("DD/MM/YY"),width: 150,},
    // {field:"expiry",headerName:<b>Expiry</b>, valueGetter:(params)=>moment.parseZone(params.expiry).local().format("DD-MM-YY") , width:150},
    {field:"expiry",headereName:"Expiry",valueGetter:(params)=>moment(params.row.expiry).format("DD/MM/YY") ,width:150},
    // {field:"expiry",headereName:"Expiry",valueGetter:(params)=>moment.parseZone(params.expiry).local().format("DD/MM/YY") ,width:150},
    // {field:"createdAt",headerName:<b>Date</b>,valueGetter:(param)=>moment.parseZone(param.row.createdAt[0]).local().format("DD/MM/YY"),width:12 
    {
      headerName: <b>Action</b>, 
      field: "Action", 
      width: 150,
      renderCell: () => (
        <Fragment>
          <Button onClick={() => setShowDialog(true)}>
            <EditIcon />
          </Button>
        </Fragment>
      ),
    },
    {
      headerName: <b>Delete </b> ,
      field: "Delete",
      width: 150,
      renderCell: () => (
        <Fragment>
          <Button color="error" onClick={() => setAlert(true)}>
            <DeleteIcon />
          </Button>
        </Fragment>
      ),
    },
  ];
  
  return (
    <div className=''>
        <InventoryNavbar/>
          <h1 className='text-center my-8 font-bold text-2xl'>Stock Info </h1>
          <Container>
        {alert && (
          <Dialog open={alert} style={{ height: 600 }}>
            <DialogTitle>Delete Row</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are You sure You want to delete this.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" onClick={() => deleteRow(update)}>
                Yes
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  setAlert(false);
                }}
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        )} 
           {/* This Dialog box is update  */}
           {update && (
          <Dialog open={showDialog} style={{ height: 600 }}>
            <DialogTitle>Update Data</DialogTitle>
            <DialogContent>
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    className="my-2"
                    sx={{ width: 500 }}
                    variant="outlined"
                    id="outlined-basic"
                    label="Product Name"
                    name="productName"
                    required
                    disabled
                    value={update.name}
                    onChange={updateData}
                  />
                  <TextField
                    className="my-2"
                    sx={{ width: 500 }}
                    variant="outlined"
                    id="outlined-basic"
                    label=" product Type"
                    required
                    disabled
                    name="productType"
                    value={update.productType}
                    onChange={updateData}
                  />
                  <TextField
                    className="my-2"
                    sx={{ width: 500 }}
                    variant="outlined"
                    id="outlined-basic"
                    label="company Name"
                    name="companyName"
                    disabled
                    required
                    value={update.companyName}
                 
                    onChange={updateData}
                  />
                  <TextField
                    className="my-2"
                    sx={{ width: 500 }}
                    variant="outlined"
                    id="outlined-basic"
                    label="unit"
                    name="unit"
                    required
                    disabled
                    value={update.unit}
                    onChange={updateData}
                  />
                  <TextField
                    className="my-2"
                    sx={{ width: 500 }}
                    variant="outlined"
                    id="outlined-basic"
                    label="quantity"
                    name="quantity"
                    type='number'
                    required
                  
                    value={update.quantity}
                    onChange={updateData }
                  />
                  <TextField
                    className="my-2"
                    sx={{ width: 500 }}
                    variant="outlined"
                    id="outlined-basic"
                    label="price"
                    name="price"
                    required
                    disabled
                    type='number'
                    value={update.price}
                    onChange={updateData}
                  />
                  <TextField
                    className="my-2"
                    sx={{ width: 500 }}
                    variant="outlined"
                    id="outlined-basic"
                    label="expiry"
                    name="expiry"
                    required
                    disabled
                    value={moment(update.expiry).format('DD-MM-YYYY')}
                    onChange={updateData}
                  />
             </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button type="submit" variant="contained" onClick={updateRow}>
                Update
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  setShowDialog(false);
                }}
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        )}
        </Container>
        <Container>

    <div className='mt-3 ali'>


    </div>

        </Container>
          <Box sx={{ height: 900, width: "100%" }}>
        <DataGrid
          // onRowClick={(item) => setUpdate(item.row)}
          onRowClick={(item) => setUpdate(item.row)}
          rows={data}
          columns={columns}
          headerCellClassName="header-cell"
          pageSize={50}
          rowsPerPageOptions={[50]}
          // checkboxSelection
          
          // experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
  {/* <center> <button type="submit" className=" text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-10 mb-1 mt-1 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 relative ">Print </button></center>  */}
    </div>
  )
} 

export default Stockininfo