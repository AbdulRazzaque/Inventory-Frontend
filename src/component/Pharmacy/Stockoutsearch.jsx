import React from 'react'
import { Link } from 'react-router-dom'
import InventoryNavbar from '../Navbar/InventoryNavbar'
import axios from 'axios'
import moment from 'moment'
const Stockoutsearch = () => {

	const [searchNo,setSearchNo] = React.useState(0)
	const [data,setData] = React.useState([])
	const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InNoYXJqZWVsc2siLCJfaWQiOiI2M2JmZmE2OTY2ZWJiYzg0MGQ4ZmZiODkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzM1MzEyNzd9.9TU3mS2SgZLA8P3Rqop9z83fX0iWsPC1_UBi8HJXAEw"
	const getDocDetails = async()=>{
		try {
			
		} catch (error) {
			console.log('Error in Get Doc Details',);
			
		}
	}

	const getSearchData =(search)=>{
		axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/stock/getDocumentStockOut`,{docNo:search?search:null},{headers:{token:accessToken}})
		.then(res=>{
			console.log(res)
			setData(res.data.result)
		})
		.catch(err=>{
			console.log(err)
		})
	}


	React.useEffect(()=>{
		getSearchData()
	},[])
//moment.parseZone(param.row.date).local().format("DD/MM/YY")
  return (
    <div>
  <InventoryNavbar/> 
              <h1 className='text-center my-8 font-bold text-2xl'>Stock-out Search</h1>

<div className="flex justify-center">
  <div className="mb-3 xl:w-96 ">
    <div className="input-group relative flex  items-stretch w-full mb-4">
      <input onChange={(e)=>setSearchNo(e.target.value)} type="search" className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search" aria-label="Search" aria-describedby="button-addon2"/>
      <button onClick={()=>getSearchData(searchNo)} className="btn  px-6 mx-3 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center" type="button" id="button-addon2">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
        </svg>
      </button>
    </div>
  </div>
</div>

<table className="min-w-full border-collapse block md:table">
		<thead className="block md:table-header-group">
			<tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
				<th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">SNO</th>
				<th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Document Number</th>
				<th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Date</th>

			</tr>
		</thead>
		<tbody className="block md:table-row-group">
			
			{
				data.map((item,index)=>(
				// data[index+1]&&(item.docNo!==data[index+1].docNo&&
				<tr key={index} className="bg-gray-300 border border-grey-500 md:border-none block md:table-row">
				<td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">SNO</span>{index+1}</td>
				<Link to={`/stockoutdetails/${item._id.docNo}`}>	<td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Document Number</span>{item._id.docNo}</td></Link>	
				<td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">User Name</span>{moment.parseZone(item.createdAt[0]).local().format("DD/MM/YY")}</td>
			</tr>
			// )
				))
			}
				
		</tbody>
	</table>
    </div>
  )
}

export default Stockoutsearch