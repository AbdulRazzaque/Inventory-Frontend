import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import InventoryNavbar from '../Navbar/InventoryNavbar'
import axios from 'axios'
import moment from 'moment'
import MaterialTable, { MTableToolbar } from "material-table";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import PrintIcon from "@mui/icons-material/Print";
const Stockoutsearch = () => {
	const navigate = useNavigate();
	const [searchNo,setSearchNo] = React.useState(0)
	const [data,setData] = React.useState([])
	const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InNoYXJqZWVsc2siLCJfaWQiOiI2M2JmZmE2OTY2ZWJiYzg0MGQ4ZmZiODkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzM1MzEyNzd9.9TU3mS2SgZLA8P3Rqop9z83fX0iWsPC1_UBi8HJXAEw"
	const columns = [
		{ field: 'id', title: 'SNO', width: 50 },
		{ field: '_id.docNo', title: 'Doc NO', width: 50 },
		{ field: 'trainerName[0]', title: 'Trainer Name', width: 130 },
		{field: "createdAt[0]",title: "Date",width: 130, type:'date',render:(rowData)=>moment(rowData.createdAt[0]).format("DD/MM/YYYY")},
		{
		  title: 'Actions',
		  field: 'actions',
		  export:false,
		  width: 90,
		  render: (rowData) => (
			<IconButton
			onClick={() =>clickPrintIcon(rowData)} // Add your click handler for the icon action
			>
			<PrintIcon /> {/* Display the icon */}
			</IconButton>
		  ),
		},
	 
	  ];


  // ------------------------------------------Get Search Data code -------------------------------------------------------------

	const getSearchData =(search)=>{
		axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/stock/getDocumentStockOut`,{docNo:search?search:null},{headers:{token:accessToken}})
		.then(res=>{
			console.log(res)
			let arr = res.data.result.map((item,index)=>({
				...item,
				id:index +1
			}))
			setData(arr)
		})
		.catch(err=>{
			console.log(err)
		})
	}
  // ------------------------------------------Print code here -------------------------------------------------------------

  const clickPrintIcon=(row)=>{
	const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InNoYXJqZWVsc2siLCJfaWQiOiI2M2JmZmE2OTY2ZWJiYzg0MGQ4ZmZiODkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzM1MzEyNzd9.9TU3mS2SgZLA8P3Rqop9z83fX0iWsPC1_UBi8HJXAEw"
  
	axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/stock/getStockAllStockOut`,{search:row._id.docNo},{headers:{token:accessToken}})
	.then(res=>{
	  console.log(res.data.result,'data 1')
	  let arr = res.data.result.map((item,index)=>({...item,id:index+1}))
	//   setPrintdata(arr)
	  navigate('/Stockoutpdf',{state:{data:arr}});
	  
	})
	.catch(err=>{
	  console.log(err)
	})

    console.log(row._id.docNo, "Aftere click on print button")
  }

  // ------------------------------------------On row click data code here -------------------------------------------------------------


	console.log(data,"Here i am cheack data")

const handleRowClick = (event, rowData) => {
    navigate(`/stockoutdetails/${rowData._id.docNo}`);
  };


  React.useEffect(()=>{
	getSearchData()
},[])
  return (
    <div>
  <InventoryNavbar/> 
              <h1 className='text-center my-8 font-bold text-2xl'>Stock-out Search</h1>
	 <MaterialTable
      title="Stock-out Search"
      columns={columns}
      data={data}       
     onRowClick={(event,rowData)=>handleRowClick(event,rowData)}
      options={{
        headerStyle: {
          fontWeight: 'bold',
        },
        exportButton: true,
        pageSize: 50, // Set the initial page size to 100
        pageSizeOptions: [100,300,400], // Provide an array of possible page sizes
        search: true,
        filtering:true
      }}
     

    /> 
    </div>
  )
}

export default Stockoutsearch