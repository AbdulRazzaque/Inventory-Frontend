import {
  Alert,
  AlertTitle,
  Autocomplete,
  Button,
  Container,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import axios from "axios";
import { useForm, Controller } from 'react-hook-form';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers'
import date from 'date-and-time';
import moment from 'moment'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dayjs from 'dayjs';

// import { useGetProductsQuery, useUpdatePostMutation } from "../../services/stockin";
import MaterialTable from "material-table";
import InventoryNavbar from "../Navbar/InventoryNavbar";
import { Co2Sharp } from "@mui/icons-material";
const columns = [
  { field: "id", headerName: "SrNO", width: 100 },
  { field: "itemcode", headerName: " Itemcode", width: 130 },
  { field: "suplierNo", headerName: " SuplierNo", width: 130 },
  { field: "suplier", headerName: " Suplier", width: 130 },
  { field: "addproduct", headerName: " Addproduct", width: 130 },
  { field: "typeproduct", headerName: " Product Type", width: 130 },
  { field: "productunit", headerName: " Product Unit", width: 130 },
  { field: "Price", headerName: " Price", width: 130 },
  { field: "quantity", headerName: " Quantity", width: 130 },
  { field: "expriy", headerName: " Expiry", width: 130 },];
//  var array=[]
// var b=[]

var grandtotal=[]

const Stockin = () => {
  const [array, setArray] = useState([])
  const [b, setB] = useState([])
  const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InNoYXJqZWVsc2siLCJfaWQiOiI2M2JmZmE2OTY2ZWJiYzg0MGQ4ZmZiODkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzM1MzEyNzd9.9TU3mS2SgZLA8P3Rqop9z83fX0iWsPC1_UBi8HJXAEw"

  //my hooks
  const [docNo,setDocNo] = React.useState(0)
  const [allSuppliers,setAllSuppliers] = React.useState([])
  const [allProducts,setAllProducts] = React.useState([])
  // const [selectedProduct,setSelectedProduct] = React.useState(null)
  const [selectedSupplier,setSelectedSupplier] = React.useState(null)
  const [productType, setProductType] = useState(null);
  const [unit, setUnit] = useState(null);
  const [selectedDate,setSelectedDate] = React.useState(null)
  const [allStocks,setAllStocks] = React.useState([])
  const [sum ,setSum]=useState('')
  const [flag,setFlag] = React.useState(false)

  // const {
  //   register,
  //   handleSubmit,
  //   reset ,
  //   formState: { errors },
  //   setValue
  // } = useForm();
  const { handleSubmit,register, control, reset,formState: { errors }, setValue, watch } = useForm();
  const selectedProduct = watch('product'); // Watch the 'product' field
  const autocompleteRef = useRef(null)

console.log(selectedDate)
  const onSubmit = (stock) => {

    var obj = {
      supplierId:selectedSupplier._id,
      productName:selectedProduct.name,
      companyName:selectedProduct.companyName,
      productId:selectedProduct._id,
      productType:selectedProduct.type[0],
      unit:selectedProduct.unit[0],
      expiry:selectedDate,
      supplier:selectedSupplier.name,
      docNo,
      ...stock

    }
 
    grandtotal.push(obj.price * obj.quantity)
    const sum = grandtotal.reduce((a,v) =>  a = a + v , 0 )
    setSum(sum)
     console.log(sum);

    console.log(obj, 'obj')
    axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/stock/stockIn`,{...obj},{headers:{token:accessToken}})
    .then(res=>{
      console.log(res)
      setAllStocks([...allStocks,{...obj,_id:res.data.result._id}])
      toast(res.data.msg,{
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
      reset()
    })
    
    .catch(err=>{
      // console.log(err.res.data.msg,"Here Cheack Error")
      toast(err.response.data.msg,{
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
      })
      
      
    })
    setValue('');
    // setSelectedProduct(selectedProduct.name=null,selectedProduct.companyName=null,selectedProduct.unit=null,)
    // setSelectedProduct(null)

 
  };
  console.log(allStocks, 'allstokc')


  const getAllSuppliers = ()=>{
    axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/supplier/getAllSuppliers`,{headers:{token:`${accessToken}`}})
    .then(res=>{
      setAllSuppliers(res.data.result)
    })
  }
  const getAllProducts = ()=>{
    axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/product/getAllProducts`,{headers:{token:`${accessToken}`}})
    .then(res=>{
      setAllProducts(res.data.result)
    })
  }


  useEffect(() => {
      axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/stock/getStockInDocNo`,{headers:{token:`${accessToken}`}})
      .then(res=>{
        console.log(res)
        if(res.data.result.length>0){
          setDocNo(res.data.result[0].docNo+1)
        }
        
        
      })
      .catch(err=>{
        if(err.response){
          if(err.response.data){

          }
        }
      })
     getAllSuppliers()
     getAllProducts()
  }, [flag]);

  return (
    <div className="">
       <InventoryNavbar/>
       <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div>
            <h1 className="text-center my-8 font-bold text-2xl">Stock In</h1>
            <Container>
              <Stack direction="row" spacing={2}>
                <TextField
                  type={"number"}
                  value={docNo}
                  onChange={(t) => {
                    setDocNo(t.target.value);
                  }}
                  sx={{ width:250 }}
                  id="outlined-basic"
                  label="Item code "
                  disabled
                  variant="outlined"
                />
                {/* docno cannot be zero */}
                <TextField
                  type="number"

                  sx={{ width: 250 }}
                  id="outlined-basic"
                  label="Supplier Doc No"
                  
                  variant="outlined"
                  {...register("supplierDocNo", {
                    required: true,
                    maxLength: 20,
                  })}
                />
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  onChange={(event, newValue) => {
                    setSelectedSupplier(newValue);
                  }}
                  getOptionLabel={(supplier) =>supplier.name}
                  options={allSuppliers}
                  sx={{ width: 700 }}
                  //  {...register("suplier", { required: true, maxLength: 20 })}
                  renderInput={(params) => (
                    <TextField {...params} label="Supplier" />
                  )}
                />                  
                  </Stack>
                  <Stack direction="row" spacing={2} mt="10px">
                  <Controller 
              name="product"
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  onChange={(event, newValue) => {
                    setValue('product', newValue); // Set the value in the form state
                  }}
                  options={allProducts}
                  getOptionLabel={(product) => `${product.name}  ${product.companyName}  ${product.unit}`}
                  renderInput={(params) => <TextField {...params} label="Product" />}
                  sx={{ width: 1200 }}
          />
        )}
      />
                  {/* <Autocomplete  

                  id="combo-box-demo"
                  onChange={(event, newValue) => {
                    setSelectedProduct(newValue);
                   console.log(selectedProduct)
                  }}
                  getOptionLabel={(product) =>`${product.name}  ${product.companyName}  ${product.unit}` }
              
                  options={allProducts}
                  // sx={{ width: 550 }}
                  fullWidth
                  renderInput={(params) => (
                    <TextField {...params} label="Product " />
                  )} /> */}
               
                  </Stack>
              <Stack direction="row" spacing={2} mt="10px">


                      
               <Autocomplete
                  id="combo-box-demo"
                  onChange={(event, newValue) => {
                    // setSelectedProduct(newValue);

                  }}
                  disabled
                  getOptionLabel={(e) => e.companyName}
                  value={selectedProduct?selectedProduct :{companyName:""}}
                  options={allProducts}
                  sx={{ width: 250 }}
                  renderInput={(params) => (
                    <TextField {...params} label="company Name " />
                  )} />

              <Autocomplete
                  id="combo-box-demo"
                  onChange={(event, newValue) => {
                    setProductType(newValue);
                  
                  }}
                  disabled
                  getOptionLabel={(productType) => productType}
                    //  value={productType}
                 
                   options={selectedProduct?selectedProduct.type:[]}
                    value={selectedProduct?selectedProduct.type:[]}
                  sx={{ width: 250 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Product Type" />
                  )} /> 
                <Autocomplete
                  id="combo-box-demo"
                  onChange={(evvent, newValue) => {
                    setUnit(newValue);
                  }}
                  disabled
                  options={selectedProduct?selectedProduct.unit:[]}
                  value={selectedProduct?selectedProduct.unit:[]}
                  getOptionLabel={(unit) => unit}
                  sx={{ width: 250 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Product Unit" /> )}/>

                    <FormControl  sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  startAdornment={<InputAdornment position="start">QR</InputAdornment>}
                  label="Amount"
                  name="Price"
                  {...register("price", { required: true, })}
                />
              </FormControl>

                <TextField
                  type="number"
                  sx={{ width: 200 }}
                  id="outlined-basic"
                  label="Quantity"
                  variant="outlined"
                  {...register("quantity", { required: true, maxLength: 20 })}/>


<section>
        <LocalizationProvider 
        
        dateAdapter={AdapterDateFns} >
        <DesktopDatePicker
        label="Expiry Date"
        inputFormat="dd/MM/yyyy"
        value={selectedDate}
        onChange={(newValue) => {
          setSelectedDate(newValue)
        }}
        renderInput={(params) => <TextField fullWidth {...params} />}
      />
      </LocalizationProvider>

      </section>
          </Stack>

              <div className="mt-3 ali">
                <center>
                  <Button type="submit" variant="contained" alignitems="center"> Add </Button>
           
                  <Button onClick={()=>{
                    setSum("")
                    setAllStocks([])
                    setFlag(!flag)
                    }}>Clear</Button>
                </center>
              </div>
            </Container>
          </div>

        </div>

        <div className="mx-3">
          <div
            style={{
              height: 800,
              width: "100%",
              marginTop: "10px",
              padding: "5px",
            }}
          >



            <div >
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 300 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                     

                      <TableCell align="right"><b> No </b></TableCell>
                      <TableCell align="right"><b> Suplier No </b></TableCell>
                      <TableCell align="right"><b> Suplier </b></TableCell>
                      <TableCell align="right"><b>  Product </b></TableCell>
                      <TableCell align="right"><b> Company Name </b></TableCell>
                      <TableCell align="right"><b> Product Type </b></TableCell>
                      <TableCell align="right"><b> Product Unit </b></TableCell>
                      <TableCell align="right"><b> Price </b></TableCell>
                      <TableCell align="right"><b>  Quantity </b></TableCell>
                      <TableCell align="right"><b>  Expiry </b></TableCell>
                      <TableCell align="right"><b>  Total </b></TableCell>
                      <TableCell align="right"><b>  Delete </b></TableCell>


                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allStocks.map((row, id) => (
                      <TableRow key={id}>
                        <TableCell align="right">{id + 1}</TableCell>
                        <TableCell align="right">{row.docNo}</TableCell>
                        <TableCell align="right">{row.supplier}</TableCell>
                        <TableCell align="right">{row.productName}</TableCell>
                        <TableCell align="right">{row.companyName}</TableCell>
                        <TableCell align="right">{row.productType}</TableCell>
                        <TableCell align="right">{row.unit}</TableCell>
                        <TableCell align="right">{parseFloat(row.price)}</TableCell>
                        {/* <TableCell align="right">{row.price}</TableCell> */}
                        <TableCell align="right">{parseInt(row.quantity)}</TableCell>
                        <TableCell align="right">{moment.parseZone(row.expiry).local().format("DD/MM/YY")}</TableCell>
                        {/* <TableCell align="right">{parseInt(row.quantity) * parseInt(row.price)}</TableCell> */}
                        <TableCell align="right">{parseInt(row.quantity) * parseFloat(row.price)}</TableCell>




                        <TableCell align="right">
                          <Button align="right" onClick={()=>{
                          axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/stock/deleteStockIn`,{stockInId:row._id,quantity:parseInt(row.quantity)},{headers:{token:accessToken}})
                          .then(res=>{
                            console.log(res)
                            let arr = allStocks.filter((i)=> row._id !== i._id)
                            let total = 0
                            arr.map(item=>{
                              total = total +parseInt(item.quantity) * parseInt(item.price)
                            })
                            setSum(total)
                            setAllStocks(arr)
                          })
                          
          
                          }}>
          
             <DeleteIcon/>
              </Button>
             
                        </TableCell> 
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>



            {console.log(b, 'kkkkk')}

          </div>
        </div>
        <div className='flex justify-center'>
        </div>

      </form>
    </div>
  );
};
export default Stockin;