import React from 'react'
import MaterialTable from 'material-table'
import { ThemeProvider,createTheme, Stack, TextField, Autocomplete  } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Stockoutdetails = () => {
    const { useState } = React;
    const params = useParams()
    const [stockOut,setStockOut] = React.useState([])

    console.log(params)
    const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InNoYXJqZWVsc2siLCJfaWQiOiI2M2JmZmE2OTY2ZWJiYzg0MGQ4ZmZiODkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzM1MzEyNzd9.9TU3mS2SgZLA8P3Rqop9z83fX0iWsPC1_UBi8HJXAEw"
    const getSearchData =(search)=>{
      axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/stock/getStockAllStockOut`,{search:search?search:null},{headers:{token:accessToken}})
      .then(res=>{
        console.log(res)
        setData(res.data.result)
        setStockOut(res.data.result)
      })
      .catch(err=>{
        console.log(err)
      })
    }
    React.useEffect(()=>{
      if(params.id){
        getSearchData(params.id)
      }
      
    },[])

    const [columns, setColumns] = useState([
      { title: 'Date', field: 'name' },
      { title: 'Products Name', field: 'name' },
      { title: 'Products Unit', field: 'unit' },
      { title: 'Qauntity', field: 'quantity'},
     
      {title: 'total',field: 'birthCity',lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },},
    ]);
  
    const [data, setData] = useState([]);
    const defaultMaterialTheme = createTheme();
    return (
   
        <div className='mx-6'>
              <h1 className='text-center my-8 font-bold text-2xl'>Stock-out Details</h1>
            
          <ThemeProvider theme={defaultMaterialTheme}>
           <MaterialTable
          title="Stock-out Details"
          columns={columns}
          data={data}
          editable={{
            onBulkUpdate: changes =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  resolve();
                }, 1000);
              }),     
            onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  resolve();
                }, 1000);
              }),     
          }}
        />
        </ThemeProvider>
      {/* <center> <button type="submit" className=" text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-10 mb-1 mt-1 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 relative my-2">Print </button></center>  */}
    
        </div>
      )
}

export default Stockoutdetails