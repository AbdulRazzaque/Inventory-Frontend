import {
  Autocomplete,
  Button,
  Container,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
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
  { field: "expriy", headerName: " Expriy", width: 130 },];
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
  const [selectedProduct,setSelectedProduct] = React.useState(null)
  const [selectedSupplier,setSelectedSupplier] = React.useState(null)
  const [productType, setProductType] = useState(null);
  const [unit, setUnit] = useState(null);
  const [selectedDate,setSelectedDate] = React.useState('')
  const [allStocks,setAllStocks] = React.useState([])
  const [sum ,setSum]=useState('')
  const [flag,setFlag] = React.useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();

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
    })
    .catch(err=>{
      console.log(err.response)
    })
    

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
        //console.log(err.response.data)
      })
     getAllSuppliers()
     getAllProducts()
  }, [flag]);
  return (
    <div className="">
       <InventoryNavbar/>
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
                  sx={{ width: 200 }}
                  id="outlined-basic"
                  label="Item code "
                  variant="outlined"
                />
                {/* docno cannot be zero */}
                <TextField
                  type="number"
                  //  value={value}
                  // disablePortal
                  sx={{ width: 200 }}
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
                  // value={supplierId}
                  onChange={(event, newValue) => {
                    setSelectedSupplier(newValue);
                  }}
                  getOptionLabel={(supplier) =>supplier.name}
                  options={allSuppliers}
                  sx={{ width: 200 }}
                  //  {...register("suplier", { required: true, maxLength: 20 })}
                  renderInput={(params) => (
                    <TextField {...params} label="Supplier" />
                  )}
                />

                <Autocomplete
                  id="combo-box-demo"
                  onChange={(event, newValue) => {
                    setSelectedProduct(newValue);
console.log(selectedProduct)
                  }}
                  getOptionLabel={(product) =>  
                  product.name
                   }
              
                  options={allProducts}
                  sx={{ width: 200 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Product " />
                  )} />

               <Autocomplete
                  id="combo-box-demo"
                  onChange={(event, newValue) => {
                    setSelectedProduct(newValue);

                  }}
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
                
                  getOptionLabel={(productType) => productType}
                    //  value={productType}
                 
                   options={selectedProduct?selectedProduct.type:[]}
                    value={selectedProduct?selectedProduct.type:[]}
                  sx={{ width: 250 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Product Type" />
                  )} /> 

           {/* <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={allProducts}
              onChange={(e, val) => setSelectedProduct(val)}
              getOptionLabel={(e) => e.type}
              value={(e) => e.type}
              sx={{ width: 200 }}
              renderInput={(params) => (
                <TextField {...params} label="Select Products" />
              )}
            /> */}
                  
                  
                  
                  </Stack>

              <Stack direction="row" spacing={2} mt="10px">
                <Autocomplete
                  id="combo-box-demo"
                  onChange={(evvent, newValue) => {
                    setUnit(newValue);
                  }}
                  options={selectedProduct?selectedProduct.unit:[]}
                  value={selectedProduct?selectedProduct.unit:[]}
                  getOptionLabel={(unit) => unit}
                  sx={{ width: 250 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Product Unit" /> )}/>

                <TextField
                  type="number"
                  name="Price"
                  sx={{ width: 200 }}
                  id="outlined-basic"
                  label="Price"
                  variant="outlined"
                  {...register("price", { required: true, maxLength: 20 })}/>

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



{/* <LocalizationProvider 
        
        dateAdapter={AdapterDateFns} >
        <DesktopDatePicker
        label="Start Date"
        inputFormat="dd/MM/yyyy"
        value={selectedDate}
      
        onChange={(newValue) => {
        var d = moment.parseZone(newValue).local().format("DD/MM/YY")
          
          setSelectedDate(d)
          console.log(d ,'dgsgdgndsjkn')
         
        }}
       
        renderInput={(params) =>   <TextField fullWidth {...params} />}

        
      />
      </LocalizationProvider> */}
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
                     

                      <TableCell align="right">Id</TableCell>
                      <TableCell align="right">Suplier No</TableCell>
                      <TableCell align="right">Suplier</TableCell>
                      <TableCell align="right">Add product</TableCell>
                      <TableCell align="right">company Name</TableCell>
                      <TableCell align="right">Product Type</TableCell>
                      <TableCell align="right">Product Unit</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right"> Quantity</TableCell>
                      <TableCell align="right"> Expriy</TableCell>
                      <TableCell align="right"> Total</TableCell>
                      <TableCell align="right"> Delete</TableCell>


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
                        <TableCell align="right">{parseInt(row.price)}</TableCell>
                        <TableCell align="right">{parseInt(row.quantity)}</TableCell>
                        <TableCell align="right">{moment.parseZone(row.expiry).local().format("DD/MM/YY")}</TableCell>
                        <TableCell align="right">{parseInt(row.quantity) * parseInt(row.price)}</TableCell>



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
          {/* <center> <button type="submit" className=" text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-10 mb-1 mt-1 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 relative mx-2 ">Print </button></center> */}

          <center> <button type="submit" className=" text-white bg-red-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-10 mb-1 mt-1 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 relative mx-3">Grand Total ={sum} </button></center>
        </div>

      </form>
    </div>
  );
};
export default Stockin;