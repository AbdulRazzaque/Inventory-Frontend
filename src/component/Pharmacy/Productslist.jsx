import React from 'react'
import { Link } from 'react-router-dom'
import InventoryNavbar from '../Navbar/InventoryNavbar'
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
const Productslist = (props) => {
  const navigate = useNavigate();

  const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InNoYXJqZWVsc2siLCJfaWQiOiI2M2JmZmE2OTY2ZWJiYzg0MGQ4ZmZiODkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzM1MzEyNzd9.9TU3mS2SgZLA8P3Rqop9z83fX0iWsPC1_UBi8HJXAEw"
  const [data,setData ] = React.useState([])
  const [data2,setData2 ] = React.useState([])
  React.useEffect(()=>{
    axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/product/getAllProducts`,{headers:{token:accessToken}})
    .then(res=>{
      console.log(res)
      let arr = res.data.result.map((item,index)=>({...item,id:index+1}))
      setData(arr)
    })
    axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/stock/getAllStocks`,{headers:{token:accessToken}})
    .then(res=>{
      console.log(res)
      let arr = res.data.result.map((item,index)=>({...item,id:index+1}))
      setData2(arr)
    })
  },[])

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
          <div style={{ height: '100vh', width: '100%' }}>
                <DataGrid
                    rows={data2}
                    columns={columns1}
                    pageSize={100}
                    rowsPerPageOptions={[100]}
                    onRowClick={(item,ev)=>navigate(`/transactionlist/${item.row.name}`)}
                />
            </div>
{/* <div className="flex flex-col">
  <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-white border-b">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                SNO
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              Products Name
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              Quantity
              </th>
            </tr>
          </thead>
          <tbody>
       
       <tr className="bg-gray-100 border-b">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
              <Link to="/transactionlist">    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              Vitamin C Troy
              </td></Link> 
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
               50
              </td>
            </tr> 
            <tr className="bg-white border-b">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">2</td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              Histamil 50 ML
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
               67
              </td>
            </tr>
            <tr className="bg-gray-100 border-b">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">3</td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              Nova Par
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
               130
              </td>
            </tr>
            <tr className="bg-white border-b">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">4</td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              Xylazine
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
               78
              </td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  </div>
</div> */}
  </div>
  )
}
const columns2 = [
  { field: 'id', headerName: 'ID',width:20},
  //{ field: 'brand', headerName: 'Brand Name',valueGetter:(param)=>param.value.name,width:150},
  { field: 'name', headerName: 'Name',valueGetter:(param)=>param.row.name,width:150},
  { field: 'companyName', headerName: 'companyName',valueGetter:(param)=>param.row.companyName,width:200},
  { field: 'type', headerName: 'Type',valueGetter:(param)=>param.row.type.map((item)=>item),width:150},
  { field: 'unit', headerName: 'Unit',valueGetter:(param)=>param.row.unit.map((item)=>item),width:150},
  // { field: 'quantity', headerName: 'Quantity',valueGetter:(param)=>param.row.quantity.map((item)=>item),width:150},
  {field:"updatedAt",headerName:"Updated At",valueGetter:(param)=>moment.parseZone(param.value).local().format("DD/MM/YY"),width:120},
  {field:"createdAt",headerName:"Created At",valueGetter:(param)=>moment.parseZone(param.value).local().format("DD/MM/YY"),width:120}


];
const columns1 = [
  { field: 'id', headerName: 'ID',width:20},
  //{ field: 'brand', headerName: 'Brand Name',valueGetter:(param)=>param.value.name,width:150},
  { field: 'name', headerName: 'Name',valueGetter:(param)=>param.row.name,width:150},
  { field: 'companyName', headerName: 'company Name',valueGetter:(param)=>param.row.product.companyName,width:200},
  { field: 'type', headerName: 'Type',valueGetter:(param)=>param.row.product.type.map((item)=>item),width:150},
  { field: 'unit', headerName: 'Unit',valueGetter:(param)=>param.row.product.unit.map((item)=>item),width:150},
  { field: 'quantity', headerName: 'Quantity',valueGetter:(param)=>param.row.quantity,width:150},
  {field:"updatedAt",headerName:"Updated At",valueGetter:(param)=>moment.parseZone(param.value).local().format("DD/MM/YY"),width:120},
  {field:"createdAt",headerName:"Created At",valueGetter:(param)=>moment.parseZone(param.value).local().format("DD/MM/YY"),width:120}


];
export default Productslist



