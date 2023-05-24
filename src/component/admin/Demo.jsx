// import React, { useState } from "react";
// import {
//   Autocomplete,
//   Button,
//   Container,
//   Stack,
//   TextField,
// } from "@mui/material";
// import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { LocalizationProvider } from "@mui/x-date-pickers";
// import date from "date-and-time";
// import moment from 'moment'
// import Stockoutpdf from '../Pharmacy/Stockoutpdf'
// import { DataGrid } from "@mui/x-data-grid";
// import InventoryNavbar from "../Navbar/InventoryNavbar";
// import axios from "axios";
// import { useForm} from "react-hook-form";
// import {useNavigate} from "react-router-dom"
// import {IconButton} from '@mui/material';
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

// const Demo = (props) => {
//   const accessToken =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InNoYXJqZWVsc2siLCJfaWQiOiI2M2JmZmE2OTY2ZWJiYzg0MGQ4ZmZiODkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzM1MzEyNzd9.9TU3mS2SgZLA8P3Rqop9z83fX0iWsPC1_UBi8HJXAEw";
//   const [allProducts, setAllProducts] = React.useState([]);
//   const [allLocations, setAllLocations] = React.useState([]);
//   const [allStocks, setAllStocks] = React.useState([]);
//   const [selectedStock, setSelectedStock] = React.useState(null);
//   const [selectedLocation, setSelectedLocation] = React.useState(null);
//   const [selectedTrainerName, setSelectedTrainerName] = React.useState(null);
//   const [selectedDoctorName, setSelectedDoctorName] = React.useState(null);
//   const [selectedProduct, setSelectedProduct] = React.useState(null);
//   const [selectedUnit, setSelectedUnit] = React.useState(null);
//   const [ quantity,setQuantity]=React.useState(null)

//   const [selectedDate, setSelectedDate] = React.useState("");
//   const [docNo, setDocNo] = React.useState(0);
//   const [flag,setFlag] = React.useState(false)
  
//   const [stockOutData, setStockOutData] = React.useState([]);
//   let navigate= useNavigate()

//   const [error,setError] = React.useState("")

//   console.log(stockOutData)
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//   } = useForm();
//   React.useEffect(() => {
//     axios
//       .get(`${process.env.REACT_APP_DEVELOPMENT}/api/stock/getStockOutDocNo`, {
//         headers: { token: accessToken },
//       })
//       .then((res) => {
//         console.log(res);
//         if(res.data.result.length>0){
//           //setDocNo(res.data.result[0].docNo)
//           setValue("docNo", res.data.result[0].docNo+1);
//         }
        
//       });

//     axios
//       .get(`${process.env.REACT_APP_DEVELOPMENT}/api/stock/getAllStocks`, {
//         headers: { token: accessToken },
//       })
//       .then((res) => {
//         console.log(res);
//         setAllStocks(res.data.result);
//         {console.log(allStocks,'allStocks')}
//       });
//     axios
//       .get(`${process.env.REACT_APP_DEVELOPMENT}/api/product/getAllProducts`, {
//         headers: { token: accessToken },
//       })
//       .then((res) => {
//         console.log(res);
//         setAllProducts(res.data.result,);
        
//       });
//     axios
//       .get(
//         `${process.env.REACT_APP_DEVELOPMENT}/api/location/getAllLocations`,
//         { headers: { token: accessToken } }
//       )
//       .then((res) => {
//         console.log(res);
//         setAllLocations(res.data.result);
//       });
//   }, [flag]);

//   // console.log(selectedQuantity,'selectedQuantity');

//   const onSubmit = (data) => {
//     let obj = {
//       productName: selectedProduct.name,
//       productId: selectedProduct._id,
//       locationName:selectedLocation.name,
//       locationId: selectedLocation._id,
//       trainerName: selectedTrainerName,
//       doctorName: selectedDoctorName,
//       unit: selectedUnit,
//       stockId: selectedStock?selectedStock._id:null,
//       quantity: data.quantity,
//       date: selectedDate,
//       docNo: parseInt(data.docNo),
//     };
//     console.log(obj);

//          {console.log(data.quantity)}
        
//          setStockOutData([...stockOutData, {...obj,_id:stockOutData.length}]);
//     // axios
//     //   .post(
//     //     `${process.env.REACT_APP_DEVELOPMENT}/api/stock/stockOut`,
//     //     { ...obj },
//     //     { headers: { token: accessToken } }
//     //   )
//     //   .then((res) => {
//     //     console.log(res);
//     //     setError("")
//     //     setStockOutData([...stockOutData, {...obj,_id:res.data.result._id}]);
//     //   })
//     //   .catch(err=>{
//     //     if(err.response){
//     //       setError(err.response.data)
//     //     }
//     //   })

      
      
//   };
//   const toComponentB=()=>{
//     navigate('/Stockoutpdf',{state:{data:stockOutData}});

    
//       }
//       // Here start Multiple Entry code 
//       const addUser =(event)=>{
   
//         if (event.code === "Enter" || event.code === "NumpadEnter") {
//           console.log("Enter key was pressed. Run your function.");
//           setUsers([...users,userTemplate])
//           event.preventDefault();
//           // callMyFunction();
//         }
//         // setUsers([...users,userTemplate])
        
//       }
//       const userTemplate ={docNo:"",location:"",trainerName:"",doctorName
//       :"",date:"",name:"",unit:"",quantity:""}
//       const [users,setUsers]=useState([userTemplate])
//       console.log("This is user data",users)
//         const onChange=(e,index)=>{
//     const updateUser = users.map((user,i)=>index ==i  ?
//      Object.assign (user,{[e.target.name]:e.target.value}):user
//     );
//     setUsers(updateUser)
//   }
//       const removeUser = (index)=>{
//         const filteredUser =[...users];
//         filteredUser.splice(index,1)
//         setUsers(filteredUser)
//       }
//    console.log("stockoutdata", selectedProduct);
//   return (
//     <div className="">
//       <InventoryNavbar />
//       <h1 className="text-center my-8 font-bold text-2xl">Stock Out</h1>
//      <center> <p><b>  Note: if stock is currently present in the inventory please select stock from the dropdown</b></p></center>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <Container>
//           <Stack direction="row" justifyContent="center" spacing={2}>
//             <TextField
//               {...register("docNo", { required: true })}
//               type="number"
//               sx={{ width: 200 }}
//               id="outlined-basic"
//               label="Doc Number"
//               variant="outlined"
//               // disabled
//               name="docNo"
              
//             />

     

//             <Autocomplete
//               disablePortal
//               id="combo-box-demo"
//               options={allLocations}
//               getOptionLabel={(e) => e.name}
//               onChange={(ev, val) => setSelectedLocation(val)}
//               sx={{ width: 200 }}
//               renderInput={(params) => (
//                 <TextField {...params} label="Location"  name="location"/>)} 
                
//                 />

//             <Autocomplete
//               disablePortal
//               id="combo-box-demo"
//               options={selectedLocation ? selectedLocation.trainerName :[]}
//               onChange={(e, val) => setSelectedTrainerName(val)}
//               sx={{ width: 200 }}
//               renderInput={(params) => (
//                 <TextField {...params} label="Trainer" 
//                 name="trainerName"
//                 />
//               )}/>
//             <Autocomplete
//               disablePortal
//               id="combo-box-demo"
//               options={selectedLocation ? selectedLocation.doctorName : []}
//               onChange={(e, val) => setSelectedDoctorName(val)}
//               sx={{ width: 200 }}
//               renderInput={(params) => <TextField {...params} label="Doctor" name="doctorName" />}
//             />
//                         <section>
//               <LocalizationProvider dateAdapter={AdapterDateFns}>
//                 <DesktopDatePicker
//                   label="Date"
//                   inputFormat="dd/MM/yyyy"
//                   value={selectedDate}
//                   onChange={(newValue) => {
//                     console.log(newValue);
//                     setSelectedDate(newValue);
//                   }}
//                   renderInput={(params) => <TextField fullWidth {...params} name="date" />} />
//               </LocalizationProvider>
//             </section>
//           </Stack>
//           {
//           users.map((user,index)=>(
//           <Stack
//             direction="row"
//             justifyContent="center"
//             spacing={2}
//             marginTop="5px"
//           >
//   <Autocomplete
//               disablePortal
//               id="combo-box-demo"
//               value={selectedProduct ? selectedProduct : { name: "" }}
//               options={allProducts}
//               onChange={(e, val) => setSelectedProduct(val)}
//               getOptionLabel={(e) => e.name}
//               sx={{ width: 200 }}
//               renderInput={(params) => (
//                 <TextField {...params} label="Select Products" name="name" />
//               )}
//             />
//             <Autocomplete
//               disablePortal
//               id="combo-box-demo"
//               options={allStocks}
//               getOptionLabel={(e) => e.name}
//               onChange={(ev, val) => {
//                 let sp = allProducts.filter((item) => item.name === val.name);
//                 if (sp.length > 0) {
//                   setSelectedProduct(sp[0]);
//                 }

//                 setSelectedStock(val);
//               }}
//               sx={{ width: 200 }}
//               renderInput={(params) => (
//                 <TextField {...params} label="Stock Name" name="name" />
//               )}
//             />
          
//             <Autocomplete
//               disablePortal
//               id="combo-box-demo"
//               getOptionLabel={(e) => e.toString()}
//               options={selectedProduct ? selectedProduct.unit : []}
//               onChange={(e, val) => setSelectedUnit(val)}
//               sx={{ width: 200 }}
//               renderInput={(params) => (
//                 <TextField {...params} label="Select Unit" name="unit"  onChange={e => onChange(e,index)} />
//               )}
//             />

//             <TextField
//               {...register("quantity", { required: true })}
//               type="number"
//               sx={{ width: 200 }}
              
//               inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
             
//               id="outlined-basic"
//               label="Quantity"
//               variant="outlined"
//               name="quantity"
//               onKeyPress={addUser}
//             />
//                  <IconButton>
//             <DeleteOutlineIcon onClick={()=>  removeUser(index)} />
//            </IconButton>
//           </Stack>
//             ))
// }
//           <p className="mt-3" style={{textAlign:"center",fontWeight:"bold",color:"red"}}>
//                 {error.length>0?error:null}
//           </p>

//           <div className="mt-3 ali">
//             <center>
           
//               <Button type="submit" variant="contained" alignitems="center">
//                 Save
//               </Button>
//               <Button onClick={()=>setFlag(!flag)}>
//                 Clear
//               </Button>
//             </center>
//           </div>
//         </Container>
//       </form>

//       <div
//         style={{
//           height: 800,
//           width: "100%",
//           marginTop: "10px",
//           padding: "5px",
//         }}
//       >
//         <table className="ui celled table">
//   <thead>
//     <tr>
//     <th>Sr No</th>
//     <th>Doc No</th>
//     <th>Product Name</th>
//     <th>Location Name</th>
//     <th>Trainer Name</th>
//     <th>Doctor Name</th>
//     <th>Date Name</th>
//     <th>Unit</th>
//     <th>Quantity</th>
//     <th></th>
//   </tr></thead>
//   <tbody>
//     {
//       stockOutData.length>0&&stockOutData.map((item,index)=><tr key={index}>
//         <td data-label="Name">{index+1}</td>
//       <td data-label="Name">{item.docNo}</td>
//       <td data-label="Name">{item.productName}</td>
//       <td data-label="Name">{item.locationName}</td>
//       <td data-label="Name">{item.trainerName}</td>
//       <td data-label="Age">{item.doctorName}</td>
//       <td data-label="Job">{moment.parseZone(item.date).local().format("DD/MM/YY")}</td>
//       <td data-label="Name">{item.unit}</td>
//       <td data-label="Name">{item.quantity}</td>
//       <td>
//         <Button
//         onClick={()=>{
//           axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/stock/deleteStockOut`,{stockOutId:item._id,quantity:parseInt(item.quantity)},{headers:{token:accessToken}})
//           .then(res=>{
//             console.log(res)
//             setStockOutData(stockOutData.filter((i)=> item._id !== i._id))
//           })
//         }}
//         >Delete</Button>
//       </td>
//       </tr>)
//     }
//     <tr>
      
//     </tr>
//   </tbody>
// </table>
//         {/* <DataGrid
//           rows={stockOutData.map((item, index) => ({ ...item, id: index + 1 }))}
//           columns={columns}
//           pageSize={10}
//           rowsPerPageOptions={[10]}
//           // checkboxSelection
//         /> */}
//       </div>
//       <div className="flex justify-center">
//         <center>
       
//           <button
//         onClick={()=>{toComponentB()}}
//             className=" text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-10 mb-1 mt-1 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 relative mx-2 " >
              
//             Print
            
//           </button>
//           {/* <Stockoutpdf props={stockOutData}/> */}
//         </center>
//         <center>
       
//           {/* <button
//             type="submit"
//             className=" text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-10 mb-1 mt-1 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 relative "
//           >
//             Save
//           </button> */}
//         </center>
//       </div>
//     </div>
//   );
// };
// const columns = [
//   { field: "id", headerName: "ID", width: 20 },
//   {
//     field: "docNo",
//     headerName: "doc No",
//     valueGetter: (param) => param.row.docNo,
//     width: 150,
//   },
//   {
//     field: "productName",
//     headerName: "product Name",
//     valueGetter: (param) => param.row.productName,
//     width: 150,
//   },
//   // {
//   //   field: "productId",
//   //   headerName: "productId",
//   //   valueGetter: (param) => param.row.productId,
//   //   width: 200,
//   // },
//   {
//     field: "locationName",
//     headerName: "location Name",
//     valueGetter: (param) => param.row.locationName,
//     width: 150,
//   },
//   {
//     field: "trainerName",
//     headerName: "trainer Name",
//     valueGetter: (param) => param.row.trainerName,
//     width: 150,
//   },
//   { 
//     field: "doctorName",
//     headerName: "doctor Name",
//     valueGetter: (param) => param.row.doctorName,
//     width: 150,
//   },
//   {field:"date",headerName:"Date",
//   valueGetter:(param)=>moment.parseZone(param.row.date).local().format("DD/MM/YY")
//   ,width:120},
//   {
//     field: "unit",
//     headerName: "unit",
//     valueGetter: (param) => param.row.unit,
//     width: 150,
//   },
//   // {
//   //   field: "stockId",
//   //   headerName: "stockId",
//   //   valueGetter: (param) => param.row.stockId,
//   //   width: 150,
//   // }, 
//   {
//     field: "quantity",
//     headerName: "quantity",
//     valueGetter: (param) => param.row.quantity,
//     width: 150,
//   },
//   // {field:"date",headerName:"Date",valueGetter:(param)=>moment.parseZone(param.row.date).local().format("DD/MM/YY"),width:120}
// ];
// export default Demo;

import React, { useState } from 'react';

function Demo() {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [rows, setRows] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setRows([...rows, {input1, input2}]);
    setInput1('');
    setInput2('');
  };

  const handleEdit = (index) => {
    const rowToEdit = rows[index];
    setInput1(rowToEdit.input1);
    setInput2(rowToEdit.input2);
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };

  const renderRow = (row, index) => {
    return (
      <tr key={index} onClick={() => handleEdit(index)}>
        <td>{row.input1}</td>
        <td>{row.input2}</td>
      </tr>
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Input 1:
          <input type="text" value={input1} onChange={(e) => setInput1(e.target.value)} />
        </label>
        <label>
          Input 2:
          <input type="text" value={input2} onChange={(e) => setInput2(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Input 1</th>
            <th>Input 2</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(renderRow)}
        </tbody>
      </table>
    </div>
  );
}

export default Demo;