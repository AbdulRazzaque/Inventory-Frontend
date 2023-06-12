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
console.log(data,"i am data 2")
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
 const handleExport = () => {
  const csvData = [
    // Generate the CSV content
    ['Company Name'],
    ...data.map((row) => [row.companyName ?? '']),
  ];

  const csvContent = csvData.map((row) => row.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'export.csv');
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
//  const handleExport = () => {
//   const csvData = [

//     // Generate the CSV content
//     ['Name','Company Name','Tpye','Unit','Available Quantity'],
    
//     ...data.map((row) =>
//     // console.log(row,"i am a all"))
//     [row.name ?? '',row.companyName ?? '',row.type ?? '',row.unit ?? '', row.quantity !== undefined ? row.quantity.toString() : '',]

    
//     ),
//   ];

//   const csvContent = csvData.map((row) => row.join(',')).join('\n');
//   const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//   const url = URL.createObjectURL(blob);

//   const link = document.createElement('a');
//   link.setAttribute('href', url);
//   link.setAttribute('download', 'export.csv');
//   link.style.display = 'none';
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// };
//  const handleExport =()=>{

//   const filteredData = data.map((row)=>({
//     ...row,

//     companyName: row.companyName?.toString(),
//     type: row.type?.toString(),
//     unit: row.unit?.toString(),
//     quantity: row.quantity?.toString(),
  
//   }));

  
//     const worksheet = XLSX.utils.json_to_sheet(filteredData);
//     const  workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook,worksheet,'sheet 1')
//     XLSX.writeFile (workbook,'export.xlsx');
//   };
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
      options={{
        exportButton: true,
        exportCsv:handleExport,
        exportFileName:'export',
        pageSize:pageSize,
        pageSizeOptions: pageSizeOptions,
        actionsColumnIndex:-1
      }}
      onChangeRowsPerPage={handleChangePageSize}
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
  { field: 'id', title: 'ID',width:20},
  //{ field: 'brand', headerName: 'Brand Name',valueGetter:(param)=>param.value.name,width:150},
  { field: 'name', title: 'Name',valueGetter:(param)=>param.row.name,width:150},
  // { field: 'companyName', title: 'company Name',valueGetter:(param)=>!param.row.product?"":param.row.product.companyName,width:200},
  {field: 'companyName',title: 'Company Name',render: (rowData) => (!rowData.product ? '' : rowData.product.companyName),
  export: true,
  width: 200},


  { field: 'type', title: 'Type',render:(rowData)=>(!rowData.product ? '': rowData.product.type.map((item)=>item)),
  export: true,
  width:150},
  // { field: 'type', title: 'Type',valueGetter:(param)=>!param.row.product?"":param.row.product.type.map((item)=>item),width:150},
  { field: 'unit', title: 'Unit',render:(rowData)=>(!rowData.product?"":rowData.product.unit.map((item)=>item)),width:150},
  // { field: 'unit', title: 'Unit',valueGetter:(param)=>!param.row.product?"":param.row.product.unit.map((item)=>item),width:150},
  { field: 'quantity', title: 'Available Quantity',

  width:150},
  // {field:"updatedAt",headerName:"Updated At",valueGetter:(param)=>moment.parseZone(param.value).local().format("DD/MM/YY"),width:120},
  // {field:"createdAt",headerName:"Created At",valueGetter:(param)=>moment.parseZone(param.value).local().format("DD/MM/YY"),width:120}


];
export default Productslist


