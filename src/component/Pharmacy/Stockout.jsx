import React from "react";
import {
  Autocomplete,
  Button,
  Container,
  Stack,
  TextField,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import date from "date-and-time";
import moment from 'moment'
import Stockoutpdf from '../Pharmacy/Stockoutpdf'
import { DataGrid } from "@mui/x-data-grid";
import InventoryNavbar from "../Navbar/InventoryNavbar";
import axios from "axios";
import { useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom"
import './pharmacy.css'
const Stockout = (props) => {
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InNoYXJqZWVsc2siLCJfaWQiOiI2M2JmZmE2OTY2ZWJiYzg0MGQ4ZmZiODkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzM1MzEyNzd9.9TU3mS2SgZLA8P3Rqop9z83fX0iWsPC1_UBi8HJXAEw";
  const [allProducts, setAllProducts] = React.useState([]);
  const [allLocations, setAllLocations] = React.useState([]);
  const [allStocks, setAllStocks] = React.useState([]);
  const [selectedStock, setSelectedStock] = React.useState(null);
  const [selectedLocation, setSelectedLocation] = React.useState(null);
  const [selectedTrainerName, setSelectedTrainerName] = React.useState(null);
  const [selectedDoctorName, setSelectedDoctorName] = React.useState(null);
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [selectedUnit, setSelectedUnit] = React.useState(null);
  const [selectedCompany,setSelectedCompany] = React.useState(null)
  const [ quantity,setQuantity]=React.useState(null)

  const [selectedDate, setSelectedDate] = React.useState("");
  const [docNo, setDocNo] = React.useState(0);
  const [flag,setFlag] = React.useState(false)

  const [stockOutData, setStockOutData] = React.useState([]);
  let navigate= useNavigate()

  const [error,setError] = React.useState("")
console.log("selectedUint",selectedUnit)
  console.log(stockOutData)
  console.log(typeof selectedUnit,"First time type")
  const { 
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_DEVELOPMENT}/api/stock/getStockOutDocNo`, {
        headers: { token: accessToken },
      })
      .then((res) => {
        console.log(res);
        if(res.data.result.length>0){
          //setDocNo(res.data.result[0].docNo)
          setValue("docNo", res.data.result[0].docNo+1);
        }
        
      });

    axios
      .get(`${process.env.REACT_APP_DEVELOPMENT}/api/stock/getAllStocks`, {
        headers: { token: accessToken },
      })
      .then((res) => {
        console.log(res);
        setAllStocks(res.data.result);
        {console.log(allStocks,'allStocks')}
      });
    axios
      .get(`${process.env.REACT_APP_DEVELOPMENT}/api/product/getAllProducts`, {
        headers: { token: accessToken },
      })
      .then((res) => {
        console.log(res);
        setAllProducts(res.data.result,);
        
      });
    axios
      .get(
        `${process.env.REACT_APP_DEVELOPMENT}/api/location/getAllLocations`,
        { headers: { token: accessToken } }
      )
      .then((res) => {
        console.log(res);
        setAllLocations(res.data.result);
      });
  }, [flag]);
// console.log(allStocks,"Heloooo")
  // console.log(selectedQuantity,'selectedQuantity');

  const onSubmit = (data) => {
    let obj = {
      productName: selectedProduct.name,
      productId: selectedProduct._id,
      product:selectedProduct,
      locationName:selectedLocation.name,
      locationId: selectedLocation._id,
      trainerName: selectedTrainerName,
      doctorName: selectedDoctorName,
      unit: selectedProduct?selectedProduct.unit[0]:null,
      companyName:selectedProduct?selectedProduct.companyName[0]:null,
      stockId: selectedStock?selectedStock._id:null,
      stock: selectedStock?selectedStock:null,
      quantity: data.quantity,
      date: selectedDate,
      docNo: parseInt(data.docNo),
    };
    console.log(obj);
    setSelectedProduct(null)
    setSelectedStock(null)
    setSelectedUnit(null)
    setSelectedCompany(null)
    setValue("quantity","")
    setStockOutData([...stockOutData, {...obj,_id:stockOutData.length}]);

    // axios
    //   .post(
    //     `${process.env.REACT_APP_DEVELOPMENT}/api/stock/stockOut`,
    //     { ...obj },
    //     { headers: { token: accessToken } }
    //   )
    //   .then((res) => {
    //     console.log(res);
    //     setError("")
    //     setStockOutData([...stockOutData, {...obj,_id:res.data.result._id}]);
    //   })
    //   .catch(err=>{
    //     if(err.response){
    //       setError(err.response.data)
    //     }
    //   })

      
      
  };
  const toComponentB=()=>{
    
const updatedArrayOfObjects = stockOutData.map(({ _id, ...rest }) => rest);

console.log(updatedArrayOfObjects);
    navigate('/Stockoutpdf',{state:{data:stockOutData}});

    
      }
    
    console.log(allStocks,"Hellooooooooo")  
   console.log("stockout", stockOutData);
  return (
    <div className="">
      <InventoryNavbar />
      <h1 className="text-center my-8 font-bold text-2xl">Stock Out</h1>
     <center> <p><b>  Note: if stock is currently present in the inventory please select stock from the dropdown</b></p></center>
      <form onSubmit={handleSubmit(onSubmit)}>
      {/* <div className="mx-4"> */}
          <Stack direction="row" justifyContent="center" spacing={2}>
            <TextField
              {...register("docNo", { required: true })}
              // disabled
              type="number"
              sx={{ width: 100 }}
              id="outlined-basic"
              // label="Doc Number"
              variant="outlined"
              // disabled
            />



            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={allLocations}
              getOptionLabel={(e) => `${ e.name}-${e.trainerName}-${e.doctorName}`}
              onChange={(ev, val) => setSelectedLocation(val)}
              sx={{ width: 500 }}
              renderInput={(params) => (
                <TextField {...params} label="Location" />)} />

            <Autocomplete
              disablePortal
              id="combo-box-demo"
              // value={selectedLocation ? selectedLocation.trainerName :[]}
              options={selectedLocation ? selectedLocation.trainerName :[]}
              onChange={(e, val) => setSelectedTrainerName(val)}
              sx={{ width: 300 }}
              // disabled
              renderInput={(params) => (
                <TextField {...params} label="Trainer" />
              )}/>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              // value={selectedLocation ? selectedLocation.doctorName : []}
              options={selectedLocation ? selectedLocation.doctorName : []}
              // disabled
              onChange={(e, val) => setSelectedDoctorName(val)}
              sx={{ width: 200 }}
              renderInput={(params) => <TextField {...params} label="Doctor" />}
            />
            <section>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Date"
                  inputFormat="dd/MM/yyyy"
                  value={selectedDate}
                  onChange={(newValue) => {
                    console.log(newValue);
                    setSelectedDate(newValue);
                  }}
                  renderInput={(params) => <TextField fullWidth {...params} />} />
              </LocalizationProvider>
            </section>
          </Stack>
          {
            stockOutData.map((item,index)=>(
              <Stack
              direction="row"
              justifyContent="center"
              spacing={2}
              marginTop="8px"
            >
              {/* <section>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Date"
                    inputFormat="dd/MM/yyyy"
                    value={item.date}
                    onChange={(newValue) => {
                      console.log(newValue);
                      let singleItem = stockOutData.filter(i=>i._id===item._id)[0]
                      singleItem.date = newValue
                      setStockOutData([...stockOutData.filter(i=>i._id!==item._id),singleItem])
                    }}
                    renderInput={(params) => <TextField fullWidth {...params} />} />
                </LocalizationProvider>
              </section> */}

              <Autocomplete
              disablePortal
              id="combo-box-demo"
              value={item.stock ? item.stock : { name: "" }}
              options={allStocks}
              getOptionLabel={(e) => `${e.name} ${e.product?.companyName?.[0] || ''} ${e.product?.unit?.[0] || ''}  `}
              onChange={(ev, val) => {
                let singleItem = stockOutData.filter(i=>i._id===item._id)[0]
                singleItem.stockId = val._id
                singleItem.stock = val
                setStockOutData([...stockOutData.filter(i=>i._id!==item._id),singleItem])
              }}
              sx={{ width: 600 }}
              renderInput={(params) => (
                <TextField {...params} label="Stock List" />
              )}
            />
  
              <Autocomplete
              className="hide"
                disablePortal
                id="combo-box-demo"
                value={item.product ? item.product : { name: "" }}
                options={allProducts}
                onChange={(e, val) => {
                  let singleItem = stockOutData.filter(i=>i._id===item._id)[0]
                  singleItem.productId = val._id
                  singleItem.productName = val.productName
                  singleItem.product = val
                  setStockOutData([...stockOutData.filter(i=>i._id!==item._id),singleItem])
                }}
                getOptionLabel={(e) => `${e.name}  `}
                sx={{ width: 350 }}
                renderInput={(params) => (
                  <TextField {...params} label=" Products List" />
                )}
              />
              <Autocomplete
              disabled
                disablePortal
                id="combo-box-demo"
                getOptionLabel={(e) => e.toString()}
                value={item.product ? item.product.unit : []}
                options={item.product ? item.product.unit : []}
                onChange={(e, val) => {
                  let singleItem = stockOutData.filter(i=>i._id===item._id)[0]
                  singleItem.unit = val
                  setStockOutData([...stockOutData.filter(i=>i._id!==item._id),singleItem])
                }}
                sx={{ width: 200 }}
                renderInput={(params) => (
                  <TextField {...params} label=" Unit" />
                )}
              />

               <Autocomplete
                disabled
                disablePortal
                id="combo-box-demo"
                getOptionLabel={(e) => e.toString()}
                value={item.product ? item.product.companyName : []}
                options={item.product ? item.product.companyName : []}
                onChange={(e, val) => {
                  let singleItem = stockOutData.filter(i=>i._id===item._id)[0]
                  singleItem.unit = val
                  setStockOutData([...stockOutData.filter(i=>i._id!==item._id),singleItem])
                }}
                sx={{ width: 200 }}
                renderInput={(params) => (
                  <TextField {...params} label=" Company Name" />
                )}
              />
  
              <TextField
                type="number"
                sx={{ width: 200 }}
                value={item.quantity}
                onChange={(val) => {
                  let singleItem = stockOutData.filter(i=>i._id===item._id)[0]
                  singleItem.quantity = val.target.value
                  setStockOutData([...stockOutData.filter(i=>i._id!==item._id),singleItem])
                }}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
               
                id="outlined-basic"
                label="Quantity"
                variant="outlined"
              />
            </Stack>
            ))
          }
          <Stack
            direction="row"
            justifyContent="center"
            spacing={2}
            marginTop="10px"
          > 
            {/* <section>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Date"
                  inputFormat="dd/MM/yyyy"
                  value={selectedDate}
                  onChange={(newValue) => {
                    console.log(newValue);
                    setSelectedDate(newValue);
                  }}
                  renderInput={(params) => <TextField fullWidth {...params} />} />
              </LocalizationProvider>
            </section> */}

            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={allStocks}
              getOptionLabel={(e) => `${e.name} ${e.product?.companyName?.[0] || ''} ${e.product?.unit?.[0] || ''} ` }
              isSearchable
              value={selectedStock?selectedStock:{name:""}}
              onChange={(ev, val) => {
                let sp = allProducts.filter((item) => item.name === val.name);
                if (sp.length > 0) {
                  setSelectedProduct(sp[0]);
                }

                setSelectedStock(val);
              }}
              sx={{ width: 600 }}
              renderInput={(params) => (
                <TextField {...params} label="Stock List" />
              )}
            />


            <Autocomplete
            className="hide"
              disablePortal
              id="combo-box-demo"
              value={selectedProduct ? selectedProduct : { name: "" }}
              options={allProducts}
              onChange={(e, val) => setSelectedProduct(val)}
              getOptionLabel={(e) => `${e.name} ${e.companyName || ''} ${e.unit || ''} `}
              // getOptionLabel={(e) => `${e.name} `}
              sx={{ width: 350 }}
              renderInput={(params) => (
                <TextField {...params} label=" Products List" />
              )}
            />
            <Autocomplete
              disablePortal
              disabled
              id="combo-box-demo"
              getOptionLabel={(e) => e.toString()}
              value={selectedProduct ? selectedProduct.unit : []}
              options={selectedProduct ? selectedProduct.unit : []}
              onChange={(e, val) => setSelectedUnit(val)}
              sx={{ width: 200 }}
              renderInput={(params) => (
                <TextField {...params} label=" Unit" />
              )}
            />

            <Autocomplete
              disablePortal
              disabled
              id="combo-box-demo"
              getOptionLabel={(e) => e.toString()}
              value={selectedProduct ? selectedProduct.companyName : []}
              options={selectedProduct ? selectedProduct.companyName : []}
              onChange={(e, val) => setSelectedCompany(val)}
              sx={{ width: 200 }}
              renderInput={(params) => (
                <TextField {...params} label="Company Name" />
              )}
            />

            <TextField
              {...register("quantity", { required: true })}
              type="number"
              sx={{ width: 200 }}
              
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
             
              id="outlined-basic"
              label="Quantity"
              variant="outlined"
            />
          </Stack>

          <p className="mt-3" style={{textAlign:"center",fontWeight:"bold",color:"red"}}>
                {error.length>0?error:null}
          </p>

          <div className="mt-3 ali">
            <center>
           
              <Button type="submit" variant="contained" alignitems="center">
                Add
              </Button>
              <Button onClick={()=>{
                axios
                .post(
                  `${process.env.REACT_APP_DEVELOPMENT}/api/stock/stockOuts`,
                  { stockOuts:stockOutData },
                  { headers: { token: accessToken } }
                )
                .then((res) => {
                  console.log(res);
                  console.log("Stock out Success")
                  setError("")
                  setStockOutData([]);
                })
                .catch(err=>{
                  if(err.response){
                    setError(err.response.data)
                  }
                })
              }} variant="outlined">Save</Button>
              <Button onClick={()=>{
                window.location.reload(false);
                // setStockOutData([])
                // setFlag(!flag)
              }}
                >
                Clear
              </Button>
            </center>
          </div>
          {/* </div> */}
      </form>

      <div
        style={{
          height: 800,
          width: "100%",
          marginTop: "10px",
          padding: "5px",
        }}
      >
        <table className="ui celled table">
  <thead>
    <tr>
    <th>Sr No</th>
    <th>Doc No</th>
    <th>Product Name</th>
    <th>Location Name</th>
    <th>Trainer Name</th>
    <th>Doctor Name</th>
    <th>Date Name</th>
    <th>Unit</th>
    <th>Quantity</th>
    <th></th>
  </tr></thead>
  <tbody>
    {
      stockOutData.length>0&&stockOutData.map((item,index)=><tr key={index}>
        <td data-label="Name">{index+1}</td>
      <td data-label="Name">{item.docNo}</td>
      <td data-label="Name">{item.productName}</td>
      <td data-label="Name">{item.locationName}</td>
      <td data-label="Name">{item.trainerName}</td>
      <td data-label="Age">{item.doctorName}</td>
      <td data-label="Job">{moment.parseZone(item.date).local().format("DD/MM/YY")}</td>
      <td data-label="Name">{item.unit}</td>
      <td data-label="Name">{item.quantity}</td>
      <td>
        <Button
        onClick={()=>{
          setStockOutData(stockOutData.filter((i)=> item._id !== i._id))
          // axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/stock/deleteStockOut`,{stockOutId:item._id,quantity:parseInt(item.quantity)},{headers:{token:accessToken}})
          // .then(res=>{
          //   console.log(res)
          //   setStockOutData(stockOutData.filter((i)=> item._id !== i._id))
          // })
        }}
        >Delete</Button>
      </td>
      </tr>)
    }
    <tr>
      
    </tr>
  </tbody>
</table>
        {/* <DataGrid
          rows={stockOutData.map((item, index) => ({ ...item, id: index + 1 }))}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          // checkboxSelection
        /> */}
      </div>
      <div className="flex justify-center">
        <center>
       
          <button
        onClick={()=>{
              axios
      .post(
        `${process.env.REACT_APP_DEVELOPMENT}/api/stock/stockOuts`,
        { stockOuts:stockOutData },
        { headers: { token: accessToken } }
      )
      .then((res) => {
        console.log(res);
        toComponentB()
        setError("")
        setStockOutData([]);
      })
      .catch(err=>{
        if(err.response){
          setError(err.response.data)
        }
      })
        }}
            className=" text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-10 mb-1 mt-1 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 relative mx-2 " >
              
            Print
            
          </button>
          {/* <Stockoutpdf props={stockOutData}/> */}
        </center>
        <center>
       
          {/* <button
            type="submit"
            className=" text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-10 mb-1 mt-1 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 relative "
          >
            Save
          </button> */}
        </center>
      </div>
    </div>
  );
};
const columns = [
  { field: "id", headerName: "ID", width: 20 },
  {
    field: "docNo",
    headerName: "doc No",
    valueGetter: (param) => param.row.docNo,
    width: 150,
  },
  {
    field: "productName",
    headerName: "product Name",
    valueGetter: (param) => param.row.productName,
    width: 150,
  },
  // {
  //   field: "productId",
  //   headerName: "productId",
  //   valueGetter: (param) => param.row.productId,
  //   width: 200,
  // },
  {
    field: "locationName",
    headerName: "location Name",
    valueGetter: (param) => param.row.locationName,
    width: 150,
  },
  {
    field: "trainerName",
    headerName: "trainer Name",
    valueGetter: (param) => param.row.trainerName,
    width: 150,
  },
  { 
    field: "doctorName",
    headerName: "doctor Name",
    valueGetter: (param) => param.row.doctorName,
    width: 150,
  },
  {field:"date",headerName:"Date",
  valueGetter:(param)=>moment.parseZone(param.row.date).local().format("DD/MM/YY")
  ,width:120}, 
  {
    field: "unit",
    headerName: "unit",
    valueGetter: (param) => param.row.unit,
    width: 150,
  },
  // {
  //   field: "stockId",
  //   headerName: "stockId",
  //   valueGetter: (param) => param.row.stockId,
  //   width: 150,
  // }, 
  {
    field: "quantity",
    headerName: "quantity",
    valueGetter: (param) => param.row.quantity,
    width: 150,
  },
  // {field:"date",headerName:"Date",valueGetter:(param)=>moment.parseZone(param.row.date).local().format("DD/MM/YY"),width:120}
];
export default Stockout;