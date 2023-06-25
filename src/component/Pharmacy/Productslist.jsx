import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import InventoryNavbar from '../Navbar/InventoryNavbar'
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import MaterialTable from 'material-table';
// import { ThemeProvider } from '@emotion/react';
import {ThemeProvider,createTheme,} from "@mui/material";
import { utils, writeFile } from 'xlsx';
import * as XLSX from 'xlsx' 
import { saveAs } from 'file-saver';
const Productslist = (props) => { 
  const navigate = useNavigate();
 
  const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InNoYXJqZWVsc2siLCJfaWQiOiI2M2JmZmE2OTY2ZWJiYzg0MGQ4ZmZiODkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzM1MzEyNzd9.9TU3mS2SgZLA8P3Rqop9z83fX0iWsPC1_UBi8HJXAEw"
  const [data,setData ] = React.useState([])
  // const [data2,setData2 ] = React.useState([])
  const [pageSize,setPageSize]= useState(10)
  const [pageSizeOptions, setPageSizeOptions] = useState([]); // Initial page size options
  const defaultMaterialTheme = createTheme();
  React.useEffect(()=>{
    // axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/product/getAllProducts`,{headers:{token:accessToken}})
    // .then(res=>{
    //   console.log(res)
    //   let arr = res.data.result.map((item,index)=>({...item,id:index+1}))
    //   setData(arr)
    // })
    axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/stock/getAllStocks`,{headers:{token:accessToken}})
    .then(res=>{
      console.log(res,"heere i am cheack item quantiey")
      let arr = res.data.result.map((item,index)=>({...item,id:index+1}))
      setData(arr)
    })
    
  },[])
console.log(data,"i am data ")
  useEffect(()=>{
    const calculatePageSizeOptions = () => {
      // Replace this logic with your own dynamic calculation
      // Example: Increasing pageSizeOptions based on the total number of items
  
      const totalItems = 1000; // Total number of items
      const pageSizeIncrement = 150; // Increment size for page size options
  
      const options = [];
      for (let i = pageSizeIncrement; i <= totalItems; i += pageSizeIncrement) {
        options.push(i);
      }
  
      // Add totalItems as the last option (in case it is not divisible by pageSizeIncrement)
      if (totalItems % pageSizeIncrement !== 0) {
        options.push(totalItems);
      }
  
      setPageSizeOptions(options);
    };
  
    calculatePageSizeOptions();
  }, []);
 const handleChangePageSize = (newPageSize)=>{
  setPageSize(newPageSize)

 }
 

const saveExcelFile = () => {
const selectedFields = data.map(item=>({
  name: item.name,
  companyName: item.product.companyName[0], // Assuming the type is an array, accessing the first element
  type: item.product.type[0], // Assuming the type is an array, accessing the first element
  unit: item.product.unit[0], // Assuming the type is an array, accessing the first element
  quantity: item.quantity,


}));

const workbook = XLSX.utils.book_new();
const worksheet = XLSX.utils.json_to_sheet(selectedFields);
XLSX.utils.book_append_sheet(workbook, worksheet, 'Stock List');

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const excelData = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(excelData, 'data.xlsx');
};

  const handleRowClick = (event, rowData) => {
    // Use the rowData or any other logic you need
    // For example, navigating to a different route
    navigate(`/transactionlist/${rowData.name}`);
  };

  return (
    <div>
        <InventoryNavbar/>
          {/* <h1 className='text-center my-8 font-bold text-2xl'>Products List</h1> */}
          {/* <div style={{ height: '40vh', width: '100%' }}>
                <DataGrid
                    rows={data}
                    columns={columns2}
                    autoPageSize
                    onRowClick={(item,ev)=>navigate(`/transactionlist/${item.row.name}`)}
                /> 
            </div> */}
            <h1 className='text-center my-8 font-bold text-2xl'>Stock List</h1>
           
          {/* <div style={{ height: '100vh', width: '100%' }}>
                <DataGrid
                    rows={data2}
                    columns={columns1}
                    pageSize={100}
                    rowsPerPageOptions={[100]}
                    onRowClick={(item,ev)=>navigate(`/transactionlist/${item.row.name}`)}
                />
            </div> */}
            <ThemeProvider theme={defaultMaterialTheme}>
            <MaterialTable 
      title="Stock List"
      columns={columns1}
      data={data}      
      onRowClick={handleRowClick} 
      // onRowClick={(item,ev)=>navigate(`/transactionlist/${item.row.name}`)}  
      // options={{
      //   search: true,
      //   exportButton: true,
      //   exportAllData: true,
      //   // exportCsv:saveExcelFile,
      //   // exportFileName:'export',

      //   pageSize:pageSize,
      //   pageSizeOptions: pageSizeOptions,
      //   actionsColumnIndex:-1
      // }}
      options={{
        headerStyle: {
          fontWeight: 'bold',
        },
        exportButton: true,
        pageSize: 400,
        search: true,
      }}
      onRowsPerPageChange={handleChangePageSize}
    />
            </ThemeProvider>
  </div>
  )
}
// const columns2 = [
//   { field: 'id', headerName: 'ID',width:20},
//   //{ field: 'brand', headerName: 'Brand Name',valueGetter:(param)=>param.value.name,width:150},
//   { field: 'name', headerName: 'Name',valueGetter:(param)=>param.row.name,width:150},
//   { field: 'companyName', headerName: 'companyName',valueGetter:(param)=>param.row.companyName,width:200},
//   { field: 'type', headerName: 'Type',valueGetter:(param)=>param.row.type.map((item)=>item),width:150},
//   { field: 'unit', headerName: 'Unit',valueGetter:(param)=>param.row.unit.map((item)=>item),width:150},
//   // { field: 'quantity', headerName: 'Quantity',valueGetter:(param)=>param.row.quantity.map((item)=>item),width:150},
//   {field:"updatedAt",headerName:"Updated At",valueGetter:(param)=>moment.parseZone(param.value).local().format("DD/MM/YY"),width:120},
//   {field:"createdAt",headerName:"Created At",valueGetter:(param)=>moment.parseZone(param.value).local().format("DD/MM/YY"),width:120}


// ];
const columns1 = [
  { field: 'id', title: 'No',width:20},
  //{ field: 'brand', headerName: 'Brand Name',valueGetter:(param)=>param.value.name,width:150},
  { field: 'name', title: 'Name',valueGetter:(param)=>param.row.name,width:150},
  // { field: 'companyName', title: 'company Name',valueGetter:(param)=>!param.row.product?"":param.row.product.companyName,width:200},
  // {field: 'companyName',title: 'Company Name',render: (rowData) => (!rowData.product ? '' : rowData.product.companyName),
  { field: 'product.companyName[0]', title: 'Company Name',width:150},
  // export: true,
  // width: 200},
  { field: 'product.type[0]', title: 'Type',width:150},
  // { field: 'type', title: 'Type', render: rowData => rowData.product ? rowData.product.type.join(', ') : '' ,
  // { field: 'type', title: 'Type',render:(rowData)=>(!rowData.product ? '': rowData.product.type.map((item)=>item)),
  // export: true,

  // { field: 'type', title: 'Type',valueGetter:(param)=>!param.row.product?"":param.row.product.type.map((item)=>item),width:150},
  // {
  //   field: 'unit',
  //   title: 'Unit',
  //   render: (rowData) => rowData.product && rowData.product.unit.length > 0 ? rowData.product.unit[0] : '',
  //   customExport: (rowData) => rowData.product && rowData.product.unit.length > 0 ? rowData.product.unit[0] : ''
  // },
  { field: 'product.unit[0]', title: 'Unit',width:150},
  // render:(rowData)=>(!rowData.product?"":rowData.product.unit.map((item)=>item)),width:150},
  // { field: 'unit', title: 'Unit',valueGetter:(param)=>!param.row.product?"":param.row.product.unit.map((item)=>item),width:150},
  { field: 'quantity', title: 'Available Quantity',

  width:150},
  // {field:"updatedAt",headerName:"Updated At",valueGetter:(param)=>moment.parseZone(param.value).local().format("DD/MM/YY"),width:120},
  // {field:"createdAt",headerName:"Created At",valueGetter:(param)=>moment.parseZone(param.value).local().format("DD/MM/YY"),width:120}


];
export default Productslist


