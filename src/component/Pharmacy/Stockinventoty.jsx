import React from 'react'
import { Autocomplete, Button, Container, Stack, TextField } from '@mui/material'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers'
import date from 'date-and-time';
import { DataGrid } from '@mui/x-data-grid';
import InventoryNavbar from '../Navbar/InventoryNavbar';
import axios from 'axios'
import moment from 'moment'
import { useState } from 'react';
const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Products Name', width: 150 },
  { field: 'quantity', headerName: 'Quantity', width: 150 },
  
  { field: 'price', headerName: 'price', width: 150 },
  {field:"createdAt",headerName:"Date",valueGetter:(param)=>moment.parseZone(param.value).local().format("DD/MM/YY"),width:120}
];

const Stockinventoty = () => {
  const [data,setData]=useState([])
  const [selectedDate,setSelectedDate] = React.useState("")
  const [selectedDate2,setSelectedDate2] = React.useState("")
  const [allProductType,setAllProductType] = React.useState([])
  const [selectedProductType,setSelectedProductType] = React.useState("")
  const [Mytotal,setTotal]=useState([])
  const [display ,setDisplay]=useState()
  //getPrevStockInInfo
  const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InNoYXJqZWVsc2siLCJfaWQiOiI2M2JmZmE2OTY2ZWJiYzg0MGQ4ZmZiODkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzM1MzEyNzd9.9TU3mS2SgZLA8P3Rqop9z83fX0iWsPC1_UBi8HJXAEw"
  React.useEffect(()=>{
    axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/product/getAllProductType`,{headers:{token:accessToken}})
    .then(res=>{
      console.log(res)
     
      setAllProductType(res.data.result)
    })
  },[])

  const handleSubmit = ()=>{
    console.log({to:selectedDate,from:selectedDate2,productType:selectedProductType.type})
    axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/stock/getPrevStockInInfo`,{to:date.format(selectedDate,'YYYY/MM/DD'),from:date.format(selectedDate2,'YYYY/MM/DD'),productType:selectedProductType.name},{headers:{token:accessToken}})
    .then(res=>{
      console.log(res)
      setTotal(res.data.result)
      let arr = res.data.result.map((item,index)=>({...item,id:index+1}))
      setData(arr)
     
      console.log(Mytotal,"Geting  Price Only");
    })

  }



  return (
    <div className=''>
        <InventoryNavbar/>
          <h1 className='text-center my-8 font-bold text-2xl'>Stock inventroy</h1>
        <Container>
        <Stack direction="row" spacing={2} justifyContent="center">
    {/* <TextField type="number" sx={{width:200}} id="outlined-basic" label="Doc Number" variant="outlined"  /> */}
    <section>
        <LocalizationProvider 
        
        dateAdapter={AdapterDateFns} >
        <DesktopDatePicker
        label="Start Date"
        inputFormat="dd/MM/yyyy"
        value={selectedDate}
        onChange={(newValue) => {
          console.log(newValue)
          setSelectedDate(newValue)
        }}
        renderInput={(params) => <TextField fullWidth {...params} />}
      />
      </LocalizationProvider>
      </section>
      <section>
        <LocalizationProvider 
        
        dateAdapter={AdapterDateFns} >
        <DesktopDatePicker
        label="End Date"
        inputFormat="dd/MM/yyyy"
        value={selectedDate2}
        onChange={(newValue) => {
          console.log(newValue)
          setSelectedDate2(newValue)
        }}
        renderInput={(params) => <TextField fullWidth {...params} />}
      />
      </LocalizationProvider>
      </section>
    <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={allProductType}
          getOptionLabel={(e)=>e.name}
          onChange={(e,newValue)=>setSelectedProductType(newValue)}
          sx={{ width: 200 }}
          renderInput={(params) => <TextField {...params} label="Product Name" />}
          
        />
    </Stack>
 
    <div className='mt-3 ali'>

  <center>  <Button onClick={()=>handleSubmit()} variant="contained" alignitems="center">Submit</Button></center> 
    </div>

        </Container>

       
 <div style={{ height: 800, width: '100%', marginTop:'10px', padding:'5px'}}>
 <DataGrid
        rows={data}
        columns={columns}
        pageSize={100}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>

    {
      Mytotal.map((row,id)=>{
       
        <p>Hello {parseInt(row.price)}</p> 
        var plus = row.price
       var plus1 = plus
        var totalPrice = plus + plus1
        
        console.log(plus,"price");
        console.log(totalPrice,'all toltal here')
      })
    }

     <div className='flex justify-center'  > 
  
        {/* <center> <button type="submit" className=" text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-10 mb-1 mt-1 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 relative ">Grand Total= </button></center>  */}
        </div>
    </div>
  ) 
}

export default Stockinventoty