import React from 'react'
import MaterialTable from 'material-table'
import { ThemeProvider, createTheme, Stack, TextField, Autocomplete, Box, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment'
import PrintIcon from "@mui/icons-material/Print";
const Stockoutdetails = () => {
  const navigate = useNavigate();
  const { useState } = React;
  const params = useParams()
  const [stockOut, setStockOut] = React.useState([])
  const [data, setData] = React.useState([])
  console.log(params)
  const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InNoYXJqZWVsc2siLCJfaWQiOiI2M2JmZmE2OTY2ZWJiYzg0MGQ4ZmZiODkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzM1MzEyNzd9.9TU3mS2SgZLA8P3Rqop9z83fX0iWsPC1_UBi8HJXAEw"
  const getSearchData = (search) => {
    axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/stock/getStockAllStockOut`, { search: search ? search : null }, { headers: { token: accessToken } })
      .then(res => {
        console.log(res)
        let arr = res.data.result.map((item, index) => ({ ...item, id: index + 1 }))
        setData(arr)
        // setData(res.data.result)
        setStockOut(res.data.result)
      })
      .catch(err => {
        console.log(err)
      })
  }
  React.useEffect(() => {
    if (params.id) {
      getSearchData(params.id)
    }

  }, [])

  const [columns, setColumns] = useState([
    { field: "createdAt", headerName: "Date", valueGetter: (param) => moment.parseZone(param.value).local().format("DD/MM/YY"), width: 250 },
    // { title: 'Date', field: 'createdAt', width:200 },
    { title: 'Products Name', field: 'name', width: 200 },
    { title: 'Products Unit', field: 'unit', width: 300 },
    { title: 'Location Name', field: 'locationName', width: 200 },
    { title: 'trainer Name', field: 'trainerName', width: 200 },
    { title: 'doctorName', field: 'doctorName', width: 200 },
    { title: 'Qauntity', field: 'quantity', width: 200 },
  ]);



  return (

    <div className='mx-6'>
      <h1 className='text-center my-8 font-bold text-2xl'>Stock-out Details</h1>
      <Button variant="contained" onClick={()=>  navigate('/Stockoutpdf',{state:{data:data}})}>
        <PrintIcon className="mr-1" /> Print Form
      </Button>
      <Box sx={{ height: 1000, width: '100%' }}>
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 100,
              },
            },
          }}
          pageSizeOptions={[100]}
          disableRowSelectionOnClick
        />
      </Box>
      <Button variant="contained" onClick={()=>  navigate('/Stockoutpdf',{state:{data:data}})}>
        <PrintIcon className="mr-1" /> Print Form
      </Button>
    </div>
  )
}

export default Stockoutdetails