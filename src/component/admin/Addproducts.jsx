// import React, { Fragment } from 'react'
// import { DataGrid } from '@mui/x-data-grid';
// import AdminNavbar from '../Navbar/AdminNavbar'
// import logo from '../../images/inventory.jpg'
// import { useState } from 'react'
// import { useForm } from 'react-hook-form' 
// import axios from 'axios'
// import  { useEffect } from 'react'
// import {Alert, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField} from '@mui/material'
// import AlertTitle from '@mui/material/AlertTitle';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// const Addproducts = () => {
//     const [alert, setAlert] = useState(false);
//     const [isValid, setIsValid] = useState(false);
//     const [data,setData] = React.useState([])
//     const [showDialog,setShowDialog]=useState(false)
//     const [update,setUpdate]=useState([])
//     const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InNoYXJqZWVsc2siLCJfaWQiOiI2M2JmZmE2OTY2ZWJiYzg0MGQ4ZmZiODkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzM1MzEyNzd9.9TU3mS2SgZLA8P3Rqop9z83fX0iWsPC1_UBi8HJXAEw"
//     // const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InNoYXJqZWVsc2siLCJfaWQiOiI2M2JlODIxMTc0NGJmMzIzMWQ0Njg4MWQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzM2Nzk3NDF9.AlhQthpnXqIEJG9JP_buafPXA-MNeBPUo5FIFNKae3o"
//     // const [errorMsg, setErrorMsg] = useState("");
//     const { register, handleSubmit, formState: { errors } } = useForm();
//     const [arrayId,setArrayId] = React.useState([])
//     const [flag,setFlag] = React.useState(false)
//     const onSubmit = async(data,event) => {
     
//         try {
//             const res= await axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/product/createProduct`, data,
//             {headers:{token:`${accessToken}`}})
//             .then(response=>{
//             console.log(response, 'res')
//             setFlag(!flag)
//               event.target.reset();
//           }).catch(error => {
//                 setIsValid(error.response.data.message);
//                 setTimeout(() => {
//                     setIsValid(false);
//                 }, 3000);
//           });
            
//         } catch (error) {
//             alert(error)
            
//         }
        
//       ;
//   }
// const getAlldata = ()=>{
  
//     axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/product/getAllProducts`)
//     .then(res=>{
//         console.log(res)
//         setData(res.data.result)
//     })

// }
// const deleteRow = async (update) => {
//   try {
//     await axios
//       .delete(
//         `${process.env.REACT_APP_DEVELOPMENT}/api/product/deleteProduct/${update._id}`,update,
//         {headers:{token:`${accessToken}`}})
//         .then(response=>{
//         console.log('Response',response)
//         // apiRef.current.updateRows([update])
//         })

//         getAlldata();
      
//     setAlert(false);
//   } catch (error) {
//     console.log(error);
//   }
// };
// useEffect(()=>{
// getAlldata()
// },[flag])


//   console.log(arrayId)
//   const columns2 = [
//     // {
//     //     field: 'checkbox',
//     //     headerName: '',
//     //     width: 50,
//     //     renderCell: (params) => (
//     //       <Checkbox
//     //         color="primary"
//     //         checked={params.value}
//     //         onChange={() => handleCheckboxChange(params.row.id)}
//     //       />
//     //     ),
//     //   },
//     { field: 'id', headerName: 'ID',width:20},
//     //{ field: 'brand', headerName: 'Brand Name',valueGetter:(param)=>param.value.name,width:150},
//     { field: 'name', headerName: 'Name',valueGetter:(param)=>param.row.name,width:150},
//     { field: 'companyName', headerName: 'Company Name',valueGetter:(param)=>param.row.companyName,width:200},
//     { field: 'type', headerName: 'Type',valueGetter:(param)=>param.row.type.map(item=>item),width:200},
//     { field: 'unit', headerName: 'Unit',valueGetter:(param)=>param.row.unit.map(item=>item),width:200},
//     // {field:"createdAt",headerName:"Created At",valueGetter:(param)=>moment.parseZone(param.value).local().format("DD/MM/YY"),width:120}
//     {title:"Action" ,
//     field:'Action',
//     width:150,
//     renderCell:()=>(
//       <Fragment>
//           <Button  onClick={()=>setShowDialog(true)} ><EditIcon/></Button>
       
//       </Fragment>
//     )
//   },
//     {title:"Delete" ,
//     field:'Delete',
//     width:150,
//     renderCell:()=>(
//       <Fragment>
//         <Button color="error" onClick={() => setAlert(true)}>
//             <DeleteIcon />
//           </Button>
       
//       </Fragment>
//     )
//   },


//   ];
//   const handleCheckboxChange =()=>{
//     axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/product/deleteProduct`,{array:arrayId},{headers:{token:accessToken}})
//     .then(res=>{
//         console.log(res)
//         setArrayId([])
//         setFlag(!flag)
//     })
//   }
  
//   const updateData=(e)=>{
//     setUpdate({...update,[e.target.name]:e.target.value})
//     console.log(update)
  
// }
// const updateRow = async() =>{

// try {
   
//     console.log(update)
// await  axios.put(`${process.env.REACT_APP_DEVELOPMENT}/api/product/updateProduct/${update._id}`,update,
// {headers:{token:`${accessToken}`}})
// .then(response=>{
// console.log('Response',response)
// // apiRef.current.updateRows([update])
// })
// getAlldata()

// setShowDialog(false)
// } catch (error) {
// console.log(error)
// } 


// }
//   return (
//     <div>
//           <AdminNavbar/>
//     {/* <div className='mt-8'> */}
//     <div>

//   <section className="bg-gray-50 ">
//   <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
//   {/* {isValid  &&
//       <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3rounded relative" role="alert">
//       <strong className="font-bold">Add Products successfully!</strong>
  
 
//     </div>
      
// } */}
//   <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-gray-900 ">
//   <img className="w-56 h-32 mr-6 mt-6" src={logo} alt="logo"/>
         
//       </a>
//       <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gray-10 dark:border-gray-600">
//           <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//               <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
//                  Add Products 
//               </h1>
          
//               <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
//                   <div>
//                       <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Enter Product Name</label>
//                       <input {...register("name",{ required: true, pattern: /^\S.*\S$/ })} type="text"  id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Product Name"  required  />
//                   </div>
//                   <div>
//                       <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Enter Company Name</label>
//                       <input {...register("companyName", { required: true, pattern: /^\S.*\S$/ })}  type="text"    id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Company Name" required/>
//                   </div>
//                   <div>
//                       <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Enter Products Type</label>
//                       <input   {...register("type", { required: true, pattern: /^\S.*\S$/ })} type="text"  id="type" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Products Name" required/>
//                   </div>
                  
        
//                   <div>
//                       <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Unit</label>
//                       <input {...register("unit", { required: true, pattern: /^\S.*\S$/ })} type="text"    id="password" placeholder="Enter Unit Number" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
//                   </div>
//                   <div className="flex items-center justify-between">
//                       <div className="flex items-start">
                       
                         
//                       </div>

//                     <button type="submit" className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" >Submit</button>
//                   </div>
                    
                     

//               </form>
//           </div>
//       </div>
//   </div>
// </section>

//         {alert && (
//           <Dialog open={alert} style={{ height: 600 }}>
//             <DialogTitle>Delete Row</DialogTitle>
//             <DialogContent>
//               <DialogContentText id="alert-dialog-description">
//                 Are You sure You want to delete this.
//               </DialogContentText>
//             </DialogContent>
//             <DialogActions>
//               <Button variant="contained" onClick={() => deleteRow(update)}>
//                 Yes
//               </Button>
//               <Button
//                 variant="outlined"
//                 color="error"
//                 onClick={() => {
//                   setAlert(false);
//                 }}
//               >
//                 Cancel
//               </Button>
//             </DialogActions>
//           </Dialog>
//         )}


// {
//     isValid && 
//     <Alert severity="error">
//     <AlertTitle>Error</AlertTitle>
//     <strong> {isValid} </strong>
//   </Alert>
// }



// { update &&
//     <Dialog open={showDialog} style={{height:600}}>
//     <DialogTitle>Update Data</DialogTitle>
//     <DialogContent>
//     <Grid container>
//   <Grid item xs={12}>

//   <TextField className="my-2" sx={{ width: 500 }}  variant="outlined" id="outlined-basic" label="Products Name" name='name' required value={update.name} onChange={updateData} />
//   <TextField className="my-2" sx={{ width: 500 }}  variant="outlined" id="outlined-basic" label=" Company Name"  required name='companyName' value={update.companyName} onChange={updateData} />
//   <TextField className="my-2" sx={{ width: 500 }}  variant="outlined" id="outlined-basic" label=" Company Name"  required name='type' value={update.type} onChange={updateData} />
//   <TextField className="my-2" sx={{ width: 500 }} variant="outlined" id="outlined-basic" label="Unit" name='unit'  required value={update.unit} onChange={updateData} />
// </Grid>
// </Grid>

//     </DialogContent>
//     <DialogActions>
//       <Button variant='contained' onClick={updateRow}>Update</Button>
//       <Button variant='outlined' color='error'
//        onClick={()=>{setShowDialog(false)}}>Cancel</Button>
//     </DialogActions>
//     </Dialog>
//           }

// {/* {errorMsg && <p>{errorMsg}</p>} */}
//     </div>
//     <h1 className='my-2'>All product</h1>
//     {/* <h3>Total Selected Item: {arrayId.length}</h3> */}
//     {/* <p>Note: click on the row to select item not on checkbox</p> */}
//     {/* <Button
//     onClick={()=>{
//         axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/product/deleteProduct`,{array:arrayId},{headers:{token:accessToken}})
//         .then(res=>{
//             console.log(res)
//             setArrayId([])
//             setFlag(!flag)
//         })
//     }
// }
    
//     color="error" className="my-3" variant="contained">Delete Selected Item</Button> */}
//     <div style={{ height: '80vh', width: '100%' }}>
//                 <DataGrid
//                     rows={data.map((item,index)=>({...item,id:index+1}))}
//                     columns={columns2}
//                     pageSize={100}
//                     rowsPerPageOptions={[100]}
//                     onRowClick={(item)=>setUpdate(item.row) }
//                     // checkboxSelection
//                     // onRowClick={(item,ev)=>{
//                     //     if(arrayId.includes(item.row._id)){
//                     //         setArrayId(arrayId.filter(i=>i!==item.row._id))
//                     //     }else{
//                     //         setArrayId([...arrayId,item.row._id])
//                     //     }
//                     // }}
//                 />
//             </div>
//     </div>
//   )
// }

// export default Addproducts


// ----------------------------------------Component Start here ---------------------------------------------------


import React, { Fragment } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import AdminNavbar from '../Navbar/AdminNavbar'
import logo from '../../images/inventory.jpg'
import { useState } from 'react'
import { useForm } from 'react-hook-form' 
import axios from 'axios'
import  { useEffect } from 'react'
import {Alert, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField} from '@mui/material'
import AlertTitle from '@mui/material/AlertTitle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MaterialTable from 'material-table';
const Addproducts = () => {
    const [alert, setAlert] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [data,setData] = React.useState([])
    const [showDialog,setShowDialog]=useState(false)
    const [update,setUpdate]=useState([])
    const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InNoYXJqZWVsc2siLCJfaWQiOiI2M2JmZmE2OTY2ZWJiYzg0MGQ4ZmZiODkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzM1MzEyNzd9.9TU3mS2SgZLA8P3Rqop9z83fX0iWsPC1_UBi8HJXAEw"
    // const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InNoYXJqZWVsc2siLCJfaWQiOiI2M2JlODIxMTc0NGJmMzIzMWQ0Njg4MWQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzM2Nzk3NDF9.AlhQthpnXqIEJG9JP_buafPXA-MNeBPUo5FIFNKae3o"
    // const [errorMsg, setErrorMsg] = useState("");
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [arrayId,setArrayId] = React.useState([])
    const [flag,setFlag] = React.useState(false)
    const onSubmit = async(data,event) => {
     
        try {
            const res= await axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/product/createProduct`, data,
            {headers:{token:`${accessToken}`}})
            .then(response=>{
            console.log(response, 'res')
            setFlag(!flag)
              event.target.reset();
          }).catch(error => {
                setIsValid(error.response.data.message);
                setTimeout(() => {
                    setIsValid(false);
                }, 3000);
          });
            
        } catch (error) {
            alert(error)
            
        }
        
      ;
  }
const getAlldata = ()=>{
  
    axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/product/getAllProducts`)
    .then(res=>{
      let arr = res.data.result.map((item,index)=>({...item,id:index+1}))
      setData(arr)
      console.log(res)
    })

}
const deleteRow = async (update) => {
  try {
    await axios
      .delete(
        `${process.env.REACT_APP_DEVELOPMENT}/api/product/deleteProduct/${update._id}`,update,
        {headers:{token:`${accessToken}`}})
        .then(response=>{
        console.log('Response',response)
        // apiRef.current.updateRows([update])
        })

        getAlldata();
      
    setAlert(false);
  } catch (error) {
    console.log(error);
  }
};
useEffect(()=>{
getAlldata()
},[flag])


  console.log(arrayId)
  const columns2 = [
    {
      field: 'id',
      title: 'No',
      width: 20,
    },
    {
      field: 'name',
      title: 'Medicine',
      render: (rowData) => rowData.name,
      width: 200,
    },
    {
      field: 'companyName',
      title: 'Company',
      render: (rowData) => rowData.companyName,
      width: 200,
    },
    {
      field: 'type',
      title: 'Type',
      render: (rowData) => rowData.type.map((item) => item),
      width: 150,
    },
    {
      field: 'unit',
      title: 'Unit',
      render: (rowData) => rowData.unit.map((item) => item),
      width: 150,
    },
    {
      title: 'Action',
      field: 'Action',
      export:false,
      width: 150,
      render: (rowData) => (
        <Button onClick={() => setShowDialog(true)}>
          <EditIcon />
        </Button>
      ),
    },
    {
      title: 'Delete',
      field: 'Delete',
      export:false,
      width: 150,
      render: (rowData) => (
        <Button color="error" onClick={() => setAlert(true)}>
          <DeleteIcon />
        </Button>
      ),
    },
  ];
  
  const handleCheckboxChange =()=>{
    axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/product/deleteProduct`,{array:arrayId},{headers:{token:accessToken}})
    .then(res=>{
        console.log(res)
        setArrayId([])
        setFlag(!flag)
    })
  }
  
  const updateData=(e)=>{
    setUpdate({...update,[e.target.name]:e.target.value})
    console.log(update)
  
}
const updateRow = async() =>{

try {
   
    console.log(update)
await  axios.put(`${process.env.REACT_APP_DEVELOPMENT}/api/product/updateProduct/${update._id}`,update,
{headers:{token:`${accessToken}`}})
.then(response=>{
console.log('Response',response)
// apiRef.current.updateRows([update])
})
getAlldata()

setShowDialog(false)
} catch (error) {
console.log(error)
} 


}
  return (
    <div>
          <AdminNavbar/>
    {/* <div className='mt-8'> */}
    <div className='my-10'>

  <section className="bg-gray-50 ">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

  <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-gray-900 ">
  <img className="w-56 h-32 mr-6 mt-6" src={logo} alt="logo"/>
         
      </a>
      <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gray-10 dark:border-gray-600">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                 Add Products 
              </h1>
          
              <form className="space-y-4 my-6" onSubmit={handleSubmit(onSubmit)}>
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Enter Product Name</label>
                      <input {...register("name",{ required: true, pattern: /^\S.*\S$/ })} type="text"  id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Product Name"  required  />
                  </div>
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Enter Company Name</label>
                      <input {...register("companyName", { required: true, pattern: /^\S.*\S$/ })}  type="text"    id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Company Name" required/>
                  </div>
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Enter Products Type</label>
                      <input   {...register("type", { required: true, pattern: /^\S.*\S$/ })} type="text"  id="type" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Products Name" required/>
                  </div>
                  
        
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Unit</label>
                      <input {...register("unit", { required: true, pattern: /^\S.*\S$/ })} type="text"    id="password" placeholder="Enter Unit Number" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                  </div>
                  <div className="flex items-center justify-between">
                      <div className="flex items-start">
                       
                         
                      </div>

                    <button type="submit" className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" >Submit</button>
                  </div>
                    
                     

              </form>
          </div>
      </div>
  </div>
</section>

        {alert && (
          <Dialog open={alert} style={{ height: 600 }}>
            <DialogTitle>Delete Row</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are You sure You want to delete this.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" onClick={() => deleteRow(update)}>
                Yes
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  setAlert(false);
                }}
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        )}


{
    isValid && 
    <Alert severity="error">
    <AlertTitle>Error</AlertTitle>
    <strong> {isValid} </strong>
  </Alert>
}



{ update &&
    <Dialog open={showDialog} style={{height:600}}>
    <DialogTitle>Update Data</DialogTitle>
    <DialogContent>
    <Grid container>
  <Grid item xs={12}>

  <TextField className="my-2" sx={{ width: 500 }}  variant="outlined" id="outlined-basic" label="Products Name" name='name' required value={update.name} onChange={updateData} />
  <TextField className="my-2" sx={{ width: 500 }}  variant="outlined" id="outlined-basic" label=" Company Name"  required name='companyName' value={update.companyName} onChange={updateData} />
  <TextField className="my-2" sx={{ width: 500 }}  variant="outlined" id="outlined-basic" label=" Company Name"  required name='type' value={update.type} onChange={updateData} />
  <TextField className="my-2" sx={{ width: 500 }} variant="outlined" id="outlined-basic" label="Unit" name='unit'  required value={update.unit} onChange={updateData} />
</Grid>
</Grid>

    </DialogContent>
    <DialogActions>
      <Button variant='contained' onClick={updateRow}>Update</Button>
      <Button variant='outlined' color='error'
       onClick={()=>{setShowDialog(false)}}>Cancel</Button>
    </DialogActions>
    </Dialog>
          }


    </div>
    {/* <h1 className='my-2'>All product</h1> */}

    <MaterialTable
      columns={columns2}
      data={data}
      title="Products List"
      options={{
        headerStyle: {
          fontWeight: 'bold',
        }, 
        // pageSize: 0,
        exportButton: true,
        search: true,
      }}
      onRowClick={(event, rowData) => setUpdate(rowData)}
    />
    </div>
  )
}

export default Addproducts
