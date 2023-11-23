import axios from 'axios'
import React from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import InventoryNavbar from '../Navbar/InventoryNavbar'
import moment from 'moment'
import { DataGrid } from '@mui/x-data-grid';
import './transactionlist.css'
const Transactionlist = (props) => {
  const params = useParams()
  const navigate = useNavigate()
  console.log("transactionlistprops", params)
  const [data, setData] = React.useState(null)
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InNoYXJqZWVsc2siLCJfaWQiOiI2M2JmZmE2OTY2ZWJiYzg0MGQ4ZmZiODkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzM1MzEyNzd9.9TU3mS2SgZLA8P3Rqop9z83fX0iWsPC1_UBi8HJXAEw";
  React.useEffect(() => {

    const originalUrl = `${process.env.REACT_APP_DEVELOPMENT}/api/stock/getStockDoucments`
    const modifiedUrl = originalUrl.replace(/%/g, '+');
    console.log(modifiedUrl,"Here i cheack url")
    axios.post(modifiedUrl, { name: params.name }, { headers: { token: accessToken } })
      .then(res => {
        console.log(res)
        if (res.data.msg === "success") {
          setData(res.data.result)
        }

      })
    }, [params.name, accessToken]);

  const parseDateFromString = (dateString) => {
    return new Date(dateString);
  };

  // Function to apply conditional row styling based on the "Expiry"
  const getRowClassName = (params) => {
    const expiryDate = parseDateFromString(params.row.expiry[0]);

    // Calculate the difference in months between the expiry date and the current date
    const monthsDifference = Math.floor((expiryDate - new Date()) / (1000 * 60 * 60 * 24 * 30));

    if (monthsDifference <= -6) {
      return 'expiry-yellow'; // Apply class name for rows with expiry date 6 months or more in the past
    }

    if (monthsDifference <= -3) {
      return 'expiry-orange'; // Apply class name for rows with expiry date between 3 and 6 months in the past
    }

    if (monthsDifference <= -1) {
      return 'expiry-red'; // Apply class name for rows with expiry date between 1 and 3 months in the past
    }

    return ''; // Default class name
  };

  const columns1 = [
    { field: 'id', headerName: <b>No</b>, width: 20 },
    { field: 'docNo', headerName: <b>Doc</b>, valueGetter: (param) => param.row._id.docNo, width: 90 },
    { field: 'name', headerName: <b>Name</b>, valueGetter: (param) => param.row.name, width: 200 },
    { field: 'price', headerName: <b>Price</b>, width: 90 },
    { field: 'createdAt', headerName: <b>Date</b>, valueGetter: (param) => moment.parseZone(param.row.createdAt[0]).local().format("DD/MM/YY"), width: 120 },
    { field: 'expiry', headerName: <b>Expiry</b>, valueGetter: (param) => moment.parseZone(param.row.expiry[0]).local().format("DD/MM/YY"), width: 120 }
  ];

  const columns2 = [
    { field: 'id', headerName: <b>No</b>, width: 20 },
    { field: 'docNo', headerName: <b>Doc</b>, valueGetter: (param) => param.row._id.docNo, width: 90 },
    { field: 'name', headerName: <b>Name</b>, valueGetter: (param) => params.name, width: 200 },
    { field: "createdAt", headerName: <b>Date</b>, valueGetter: (param) => moment.parseZone(param.row.createdAt[0]).local().format("DD/MM/YY"), width: 120 },


  ];
  //stockoutinfo
  return (
    <div>
      <InventoryNavbar />
      <h1 className='text-center my-8 font-bold text-2xl'>Transaction List</h1>

      <div class="row">
        <div class="col">
          <h2>Stock In</h2>
          {data && <div style={{ height: 1000, width: '100%' }}>
            <DataGrid
              rows={data.stockin.map((item, index) => ({ ...item, id: index + 1 }))}
              columns={columns1}

              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 100,
                  },
                },
              }}
              getRowClassName={getRowClassName}
              pageSizeOptions={[100]}
              onRowClick={(item, ev) => navigate(`/stockininfo/${item.row._id.docNo}`)}
            />
          </div>}
        </div>
        <div class="col">
          <h2>Stock Out</h2>
          {data && <div style={{ height: 1000, width: '100%' }}>
            <DataGrid
              rows={data.stockout.map((item, index) => ({ ...item, id: index + 1 }))}
              columns={columns2}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 100,
                  },
                },
              }}
              pageSizeOptions={[100]}

              headerClassName="datagrid-header"
              onRowClick={(item, ev) => navigate(`/stockoutinfo/${item.row._id.docNo}`)}
            // onRowClick={(item,ev)=>props.history.push('/orderdetails',item.row)}
            />
          </div>}
        </div>
      </div>
    </div>
  )

}

export default Transactionlist
