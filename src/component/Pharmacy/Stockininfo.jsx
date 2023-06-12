import { Autocomplete, Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Stack, TextField } from '@mui/material'
import React, { Fragment, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import InventoryNavbar from '../Navbar/InventoryNavbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
  import moment from 'moment' 
  import DeleteIcon from "@mui/icons-material/Delete";
  import EditIcon from "@mui/icons-material/Edit";


const Stockininfo = () => {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState([]);
  const [allProducts,setAllProducts] = React.useState([])
  const [showDialog, setShowDialog] = useState(false);
  const [alert, setAlert] = useState(false);
  // const [selectedSupplier,setSelectedSupplier] = React.useState()
  const [allSuppliers,setAllSuppliers] = React.useState([])

  const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InNoYXJqZWVsc2siLCJfaWQiOiI2M2JmZmE2OTY2ZWJiYzg0MGQ4ZmZiODkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzM1MzEyNzd9.9TU3mS2SgZLA8P3Rqop9z83fX0iWsPC1_UBi8HJXAEw";
  const params = useParams()
  console.log(params)
  var obj = {
    id:update.id,
    quantity:update.quantity,
    productName:update.name,
    originalQuantity:update.prevQuantity,
    // docNo:params.docNo,
    // supplierId:allSuppliers._id,
    // productId:allProducts._id,
    // supplierId:selectedSupplier._id,

    ...update
  }

  const alldata =()=>{
    axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/stock/getStockInByDocNo`,{docNo:params.docNo},{headers:{token:accessToken}})
    .then(res=>{
      let arr= res.data.result[0].doc.map((item,index)=>({...item,id:index+1}))
      // [0].doc.map
      console.log(res)
      setData(arr)
    })
  }
  React.useEffect(()=>{
  alldata()
  getAllSuppliers()
  getAllProducts()
  },[])

  const getAllSuppliers = ()=>{
    try {
      axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/supplier/getAllSuppliers`,{headers:{token:`${accessToken}`}})
      .then(res=>{
        const result= res.data.result
        // setAllSuppliers(result.map(supplier => supplier._id));
        result.map(supplier => setAllSuppliers(supplier))
      })
      
    } catch (error) {
      console.log(error)
    }

  }
  // console.log(allSuppliers._id,"All Suppliername")
  const updateData = (e) => {
    setUpdate({ ...update, [e.target.name]: e.target.value });
    console.log(update);
  };
  const getAllProducts = ()=>{
    axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/product/getAllProducts`,{headers:{token:`${accessToken}`}})
    .then(res=>{
     const result=res.data.result
      // setAllProducts(result.map(product => product._id));
      result.map(product=>setAllProducts(product))
    })
  }
  // console.log(allProducts.,"All Product")
  const updateRow = async () => {


   
    try {
      console.log(update);
      await axios
        .put(
          `${process.env.REACT_APP_DEVELOPMENT}/api/stock/stockInUpdateQuantity/${obj.id}`,
         obj,
          { headers: { token: `${accessToken}` } }
        )
        .then((response) => {
          console.log("Response", response);
          // console.log(obj)
          // apiRef.current.updateRows([update]);
        });

      setShowDialog(false);
    } catch (error) {
      console.log(error);
    }
    // console.log(obj)
   
    alldata();
  };

  const deleteRow = async (obj) => {
    // var obj = {
    //   id:update.id,
    //   productName:update.name,
    //   originalQuantity:update.prevQuantity,
    //   // docNo:params.docNo,
    //   // supplierId:allSuppliers._id,
    //   // productId:allProducts._id,
    //   // supplierId:selectedSupplier._id,

    //   ...update
    // }
    try {
      console.log("Delete function is runnig")
      await axios
        .delete(
        //  console.log(obj)
          `${process.env.REACT_APP_DEVELOPMENT}/api/stock/stockInDelete/${obj.id}`,
          obj,
        
          // await  axios.delete(`${process.env.REACT_APP_DEVELOPMENT}/api/deletelab/`,
          { headers: { token: `${accessToken}` } }
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
  const columns = [
    { field: 'id', headerName: 'SrNO', width: 70 },
    { field: 'name', headerName: 'Products name', width: 130 },
    // { field: 'supplier', headerName: 'supplier Name', width: 130 },
    { field: 'productType', headerName: 'Products type', width: 130 },
    { field: 'companyName', headerName: 'company Name', width: 130 },
    {field: 'unit',headerName: 'unit',type: 'number',width: 90,},
    {field: 'quantity',headerName: 'Quantity',type: 'number',width: 90,},
    {field: 'price',headerName: 'Price',type: 'number',width: 90,},
    // {field: 'total',headerName: 'total',type: 'number',
    // valueGetter:(param)=>  (price)*parseInt(quantity),
    // width: 90,},
    {field: 'expiry',headerName: 'Expiry',valueGetter:(param)=>moment.parseZone(param.row.date).local().format("DD/MM/YY"),width: 150,},
     {
      title: "Action", 
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
      title: "Delete",
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
              <Button variant="contained" onClick={() => deleteRow(obj)}>
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
                    label="price"
                    name="price"
                    required
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
                    value={update.expiry}
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
        {/* <Stack direction="row" spacing={2} flex justifyContent="center"> */}
      {/* <TextField type="number" sx={{width:200}} id="outlined-basic" label="Supplier Doc No" variant="outlined"  />
      <TextField type="Date" sx={{width:200}} id="outlined-basic" label="" variant="outlined"  />
      <TextField type="text" sx={{width:200}} id="outlined-basic" label="Supplier Name" variant="outlined"  /> */}
{/* <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
      Supplier Doc No
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Supplier Doc No"/>
      
    </div>
    <div className="w-full md:w-1/2 px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
      Date
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Date"/>
    </div>
    <div className="w-full  px-3 ">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
      Supplier Name
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Supplier Name"/>
    </div>
  </div> */}


    {/* </Stack> */}
    {/* <Stack direction="row" spacing={2} mt="10px">






    </Stack> */}
    <div className='mt-3 ali'>


    </div>

        </Container>
{/* <div className='mx-3'>
       
<table className="ui celled table">
  <thead>
    <tr><th>Name</th>
    <th>Products Type</th>
    <th>Unit</th>
    <th>Quantity</th>
    <th>Price</th>
    <th>Total</th>
    <th>Expiry</th>
  </tr></thead>
  <tbody>
    {
      data&&data[0].doc.map((item,index)=>(
      <tr key={index}>
      <td data-label="Name">{item.name}</td>
      <td data-label="Name">{item.productType}</td>
      <td data-label="Name">{item.unit}</td>
      <td data-label="Name">{item.quantity}</td>
      <td data-label="Name">{item.price}</td>
      <td data-label="Name">{parseInt(item.price)*parseInt(item.quantity)}</td>
      <td data-label="Name">{moment.parseZone(item.expiry).local().format("DD/MM/YY")}</td>
    </tr>
      ))
    }
  </tbody>
</table>

    </div> */}
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

export default Stockininfo