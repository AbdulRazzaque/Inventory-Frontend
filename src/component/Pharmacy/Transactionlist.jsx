import axios from 'axios'
import React from 'react'
import { Link,useParams,useNavigate } from 'react-router-dom'
import InventoryNavbar from '../Navbar/InventoryNavbar'
import moment from 'moment'
import { DataGrid } from '@mui/x-data-grid';

const Transactionlist = (props) => {
  const params = useParams()
  const navigate = useNavigate()
  console.log("transactionlistprops",params)
  const [data,setData]= React.useState(null)
  const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InNoYXJqZWVsc2siLCJfaWQiOiI2M2JmZmE2OTY2ZWJiYzg0MGQ4ZmZiODkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzM1MzEyNzd9.9TU3mS2SgZLA8P3Rqop9z83fX0iWsPC1_UBi8HJXAEw";
  React.useEffect(()=>{
    axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/stock/getStockDoucments`,{name:params.name},{headers:{token:accessToken}})
    .then(res=>{
      console.log(res)
      if(res.data.msg==="success"){
        setData(res.data.result)
      }
      
    })
  },[])
  const columns2 = [
    { field: 'id', headerName:<b>No</b> ,width:20},
    { field: 'docNo', headerName: <b>Document Number</b>,valueGetter:(param)=>param.row._id.docNo,width:150},
    { field: 'name', headerName:<b>Name</b> ,valueGetter:(param)=>params.name,width:200},
    // { field: 'quantity', headerName: 'Quantity',valueGetter:(param)=>param.row.quantity.map((item)=>item),width:150},
    {field:"createdAt",headerName:<b>Date</b>,valueGetter:(param)=>moment.parseZone(param.row.createdAt[0]).local().format("DD/MM/YY"),width:120}
  
  
  ];
  //stockoutinfo
  return (
    <div>
        <InventoryNavbar/>
          <h1 className='text-center my-8 font-bold text-2xl'>Transaction List</h1>

          <h2>Stock In</h2>
          {data&&<div style={{ height: '40vh', width: '100%' }}>
                <DataGrid
                    rows={data.stockin.map((item,index)=>({...item,id:index+1}))}
                    columns={columns2}
                    autoPageSize
                    onRowClick={(item,ev)=>navigate(`/stockininfo/${item.row._id.docNo}`)}
                />
            </div>}

            <h2>Stock Out</h2>
            {data&&<div style={{ height: '40vh', width: '100%' }}>
                <DataGrid
                    rows={data.stockout.map((item,index)=>({...item,id:index+1}))}
                    columns={columns2}
                    autoPageSize
                    headerClassName="datagrid-header"
                    onRowClick={(item,ev)=>navigate(`/stockoutinfo/${item.row._id.docNo}`)}
                    // onRowClick={(item,ev)=>props.history.push('/orderdetails',item.row)}
                />
            </div>}

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
                Date
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Document Number
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              Products Name
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              Balance Quantity
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              Stock Out
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              Stock In
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              Expiry date 
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-100 border-b">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              10/11/2022
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              1003
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
               Vitamic c
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                3
              </td>
          
         <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
         <Link to= "/stockoutinfo">  3  </Link>
              </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            <Link to= "/stockininfo">      1 </Link>
              </td> 
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                10/11/2022
              </td>
            </tr>
            <tr className="bg-white border-b">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">2</td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              10/11/2022
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              10044
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
               Vitamic c
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                50
              </td>
           <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
           <Link to= "/stockoutinfo">  3</Link>
              </td> 
             <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
             <Link to= "/stockininfo">     1</Link>
              </td> 
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                10/14/2022
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

export default Transactionlist
