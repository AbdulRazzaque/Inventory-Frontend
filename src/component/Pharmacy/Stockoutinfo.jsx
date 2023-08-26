// import { Autocomplete, Button, Container, Stack, TextField } from '@mui/material'
// import React from 'react'
// import { DataGrid } from '@mui/x-data-grid';
// import InventoryNavbar from '../Navbar/InventoryNavbar';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
 
  
// const columns = [
//     { field: 'id', headerName: 'SrNO', width: 70 },
//     { field: 'productsname', headerName: 'Products name', width: 130 },
//     { field: 'productstype', headerName: 'Products type', width: 130 },
//     {field: 'unit',headerName: 'unit',type: 'number',width: 90,},
//     {field: 'Quantity',headerName: 'Quantity',type: 'number',width: 90,},
//     {field: 'Price',headerName: 'Price',type: 'number',width: 90,},
//     {field: 'total',headerName: 'total',type: 'number',width: 90,},
//     {field: 'Expiry',headerName: 'Expiry',type: 'number',width: 90,},
//   ];
//   const rows = [
//     { id: 1, productstype: 'Durg', productsname: 'Medicine1', unit: 1.4 },
//     { id: 2, productstype: 'injection', productsname: 'Medicine2', unit: 1.5 },
//     { id: 3, productstype: 'injection', productsname: 'Medicine3', unit: 3.5 },

//   ];
// const Stockoutinfo = () => {
//   const [data,setData] = React.useState(null)
//   const accessToken =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InNoYXJqZWVsc2siLCJfaWQiOiI2M2JmZmE2OTY2ZWJiYzg0MGQ4ZmZiODkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzM1MzEyNzd9.9TU3mS2SgZLA8P3Rqop9z83fX0iWsPC1_UBi8HJXAEw";
//   const params = useParams()
//   console.log(params)
//   React.useEffect(()=>{
//     axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/stock/getStockoutByDocNo`,{docNo:params.docNo},{headers:{token:accessToken}})
//     .then(res=>{
//       console.log(res)
//       setData(res.data.result)
//     })
//   },[])

//   return (
//     <div className=''>
//         <InventoryNavbar/>
//           <h1 className='text-center my-8 font-bold text-2xl'>Stock Out info </h1>
//         <Container>
//         <Stack direction="row" spacing={2} flex justifyContent="center">
//       {/* <TextField type="number" sx={{width:200}} id="outlined-basic" label="Supplier Doc No" variant="outlined"  />
//       <TextField type="text" sx={{width:200}} id="outlined-basic" label="Date" variant="outlined"  /> */}

// {/* <div className="flex flex-wrap -mx-3 mb-6">
//     <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
//       <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
//       Supplier Doc No
//       </label>
//       <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Supplier Doc No"/>
      
//     </div>
//     <div className="w-full md:w-1/2 px-3">
//       <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
//       Date
//       </label>
//       <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Date"/>
//     </div>
//   </div> */}
 
//     </Stack>
//     <Stack direction="row" spacing={2} mt="10px">






//     </Stack>
//     <div className='mt-3 ali'>


//     </div>

//         </Container>
// <div className='mx-3'>
// <table className="ui celled table">
//   <thead>
//     <tr><th>Name</th>
//     <th>Doctor Name</th>
//     <th>Trainer Name</th>
//     <th>Unit</th>
//     <th>Quantity</th>
//     {/* <th>Prev Quantity</th> */}
//   </tr></thead>
//   <tbody>
//     {
//       data&&data[0].doc.map((item,index)=>(
//       <tr key={index}>
//       <td data-label="Name">{item.name}</td>
//       <td data-label="Name">{item.doctorName}</td>
//       <td data-label="Name">{item.trainerName}</td>
//       <td data-label="Name">{item.unit}</td>
//       <td data-label="Name">{item.quantity}</td>
//       {/* <td data-label="Name">{item.prevQuantity}</td> */}
//     </tr>
//       ))
//     }
//   </tbody>
// </table>
//  {/* <div style={{ height: 800, width: '100%', marginTop:'10px', padding:'5px'}}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         pageSize={10}
//         rowsPerPageOptions={[10]}
//         // checkboxSelection
//       />
//     </div> */}

//     </div>
//   {/* <center> <button type="submit" className=" text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-10 mb-1 mt-1 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 relative ">Print </button></center>  */}
//     </div>
//   )
// }

// export default Stockoutinfo





//------------------------------------------ Second component -----------------------------------------------------------
import { Autocomplete, Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Stack, TextField } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import InventoryNavbar from '../Navbar/InventoryNavbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
  import moment from 'moment' 
  import DeleteIcon from "@mui/icons-material/Delete";
  import EditIcon from "@mui/icons-material/Edit";


const Stockoutinfo = () => {
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
    axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/stock/getStockoutByDocNo`,{docNo:params.docNo},{headers:{token:accessToken}})
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
        `${process.env.REACT_APP_DEVELOPMENT}/api/stock/stockOutUpdateQuantity/${update._id}`,
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


//---------------------------------------------------- Delete api call here------------------------------------------------------------

// const deleteRow = async (updatedData) => {
//   console.log(updatedData,"Herer i am calling obj")
//   try {
//     const updatedData = {
//       id: update._id,
//       quantity: update.quantity,
//       productName: update.name,
//       originalQuantity: update.prevQuantity,
//       // Add any other properties you want to update
//       ...update
//     };
//     await axios
//       .delete(
//       //  console.log(obj)
//         `${process.env.REACT_APP_DEVELOPMENT}/api/stock/stockOutDelete/${updatedData._id}`,
//         // obj,
      
//         // // await  axios.delete(`${process.env.REACT_APP_DEVELOPMENT}/api/deletelab/`,
//         // { headers: { token: `${accessToken}` } }
//         {
//           data: updatedData, // Pass the request body using the 'data' property
//           headers: { token: accessToken }, // Include the token in the headers
//         }
//       )
//       .then((response) => {
//         console.log("Response", response);
//         alldata();
      
//       });
//     setAlert(false);
    
//   } catch (error) {
//     console.log(error,"This error Delete function");
//   }
// };
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
      `${process.env.REACT_APP_DEVELOPMENT}/api/stock/stockOutDelete/${updatedData._id}`,
        // obj,
      
        // // await  axios.delete(`${process.env.REACT_APP_DEVELOPMENT}/api/deletelab/`,
        // { headers: { token: `${accessToken}` } }
        {
          data: updatedData, // Pass the request body using the 'data' property
          headers: { token: accessToken }, // Include the token in the headers
        }
      )
      .then((response) => {
        console.log("Response", response);
        alldata();
      
      });
    setAlert(false);
    
  } catch (error) {
    console.log(error,"This error Delete function");
  }
};

  React.useEffect(()=>{
    alldata()
  
    },[])
  const columns = [
    { field: 'id', headerName:<b>No </b>, width: 70 },
    { field: 'name', headerName: <b>Products name </b> , width: 300 },
    // { field: 'supplier', headerName: 'supplier Name', width: 130 },

    { field: 'unit', headerName:<b>unit </b> , width: 150 },
 
    {field: 'quantity',headerName: <b>Quantity</b> ,width: 90,},

    {field: 'trainerName',headerName:<b>trainer Name</b> ,width: 200,},
    {field: 'doctorName',headerName: <b>  Doctor Name</b>,width: 200,},
    // {field: 'total',headerName: 'total',type: 'number',
    // valueGetter:(param)=>  (price)*parseInt(quantity),
    // width: 90,},
    {field: 'createdAt',headerName: <b>Date</b>,valueGetter:(param)=>moment.parseZone(param.row.createdAt).local().format("DD/MM/YY"),width: 150,},
     {
      headerName:<b>Action </b> , 
      field: "Action", 
      width: 100,
      renderCell: () => (
        <Fragment>
          <Button onClick={() => setShowDialog(true)}>
            <EditIcon />
          </Button>
        </Fragment>
      ),
    },
    {
      headerName:<b>Delete </b>,
      field: "Delete",
      width: 100,
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
          <h1 className='text-center my-8 font-bold text-2xl'>Stock Out info</h1>
          <Container>
        {alert && (
          <Dialog open={alert} style={{ height: 600 }}>
            <DialogTitle>Delete Row</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this.
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
                    onChange={updateData}
                  />
                  <TextField
                    className="my-2"
                    sx={{ width: 500 }}
                    variant="outlined"
                    id="outlined-basic"
                    label="trainer Name"
                    name="trainerName"
                    disabled
                    required
                   
                    value={update.trainerName}
                    onChange={updateData}
                  />
                  <TextField
                    className="my-2"
                    sx={{ width: 500 }}
                    variant="outlined"
                    id="outlined-basic"
                    label="Doctor Name"
                    name="doctorName"
                    required
                    disabled
                    value={update.doctorName}
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

export default Stockoutinfo