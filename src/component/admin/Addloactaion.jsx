import React, { Fragment, useState } from 'react'

// import logo from '../../images/logo1.jfif'
import logo from '../../images/inventory.jpg'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import AdminNavbar from '../Navbar/AdminNavbar'
import { Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import {Button} from '@mui/material'
import moment from 'moment';
import AlertTitle from '@mui/material/AlertTitle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
const Addloactaion = () => {
    const [alert, setAlert] = useState(false);

    const [isValid, setIsValid] = useState(false);
    const [arrayId,setArrayId] = React.useState([])
    const [flag,setFlag] = React.useState(false)
    const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InNoYXJqZWVsc2siLCJfaWQiOiI2M2JmZmE2OTY2ZWJiYzg0MGQ4ZmZiODkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzM1MzEyNzd9.9TU3mS2SgZLA8P3Rqop9z83fX0iWsPC1_UBi8HJXAEw"
    const [data,setData] = React.useState([])
    const [showDialog,setShowDialog]=useState(false)
    const [update,setUpdate]=useState([])
    
    const { register, handleSubmit, formState: { errors } } = useForm();

    const getLocations = ()=>{
        axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/location/getAllLocations`,{headers:{token:accessToken}})
        .then(res=>{
          setData(res.data.result)
        })
    }

    const onSubmit = async(data,event) => {
        
     try {
        console.log(data, 'data');

      
        const res= await axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/location/createLocation`, data,{headers:{token:`${accessToken}`}})
        .then(response=>{
        console.log(response, 'res')
      getLocations()
      event.target.reset()
      }).catch(error =>{
        setIsValid(error.response.data.message);
        setTimeout(() => {
            setIsValid(false);
        }, 3000);
      })   
     } catch (error) {
        alert(error)
     }
 
  }

//----------------------------------------   Update api call Here ---------------------------------------------
const updateData=(e)=>{
    setUpdate({...update,[e.target.name]:e.target.value})
    console.log(update)
  
}
const updateRow = async() =>{
    try {
       
        console.log(update)
    await  axios.put(`${process.env.REACT_APP_DEVELOPMENT}/api/location/UpdateLocation/${update._id}`,update,
    {headers:{token:`${accessToken}`}})
    .then(response=>{
    console.log('Response',response)
    // apiRef.current.updateRows([update])
    })
    getLocations()
    
    setShowDialog(false)
    } catch (error) {
    console.log(error)
    } 
    
    
    }
    // ---------------------------------------------------Delete Row -----------------------------------------------------
    const deleteRow = async (update) => {
        try {
          await axios
            .delete(
              `${process.env.REACT_APP_DEVELOPMENT}/api/location/deletelocationone/${update._id}`,update,
              {headers:{token:`${accessToken}`}})
              .then(response=>{
              console.log('Response',response)
              // apiRef.current.updateRows([update])
              })
      
              getLocations();
            
          setAlert(false);
        } catch (error) {
          console.log(error);
        }
      };
  React.useEffect(()=>{
    getLocations()
  },[flag])
  const columns2 = [
    { field: 'id', headerName:<b>No </b>,width:20},
    //{ field: 'brand', headerName: 'Brand Name',valueGetter:(param)=>param.value.name,width:150},
    { field: 'name', headerName: <b>Name </b>  ,valueGetter:(param)=>param.row.name,width:150},
    { field: 'trainerName', headerName:<b>Trainer Name </b> ,valueGetter:(param)=>param.row.trainerName.map(item=>item),width:200},
    { field: 'doctorName', headerName:<b>Doctor Name </b> ,valueGetter:(param)=>param.row.doctorName.map(item=>item),width:200},
    {field:"createdAt",headerName: <b>Date </b> ,valueGetter:(param)=>moment.parseZone(param.value).local().format("DD/MM/YY"),width:120},
    {headerName:<b> Action</b> ,
    field:'Action',
    width:150,
    renderCell:()=>(
      <Fragment>
          <Button  onClick={()=>setShowDialog(true)} ><EditIcon/></Button>
       
      </Fragment>
    )
  },
    {headerName:<b> Delete</b> ,
    field:'Delete',
    width:150,
    renderCell:()=>(
      <Fragment>
        <Button color="error" onClick={() => setAlert(true)}>
            <DeleteIcon />
          </Button>
       
      </Fragment>
    )
  },
  
  
  ];
  return (
    <div>
          <AdminNavbar/>
    <section className="bg-gray-50 ">
 
<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
{isValid  &&
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3rounded relative" role="alert">
      <strong className="font-bold"> Location Created successfully!</strong>
  
 
    </div>
      
}
<a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-gray-900 ">
<img className="w-56 h-32 mr-6 mt-2" src={logo} alt="logo"/>
         
      </a>
      <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gray-10 dark:border-gray-600">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                 Add Location
              </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                  <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Location Name</label>
                  <input type="text" {...register("name", { required: true, pattern: /^\S.*\S$/ })} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter location name" required/>
              </div>
              <div>
                  <label htmlFor="Location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Trainer Name</label>
                  <input type="text" {...register("trainerName", { required: true, pattern: /^\S.*\S$/ })} id="password" placeholder="Enter Trainer name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500" required  />
              </div>
              <div>
                  <label htmlFor="Location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Doctor Name</label>
                  <input type="text" {...register("doctorName", { required: true, pattern: /^\S.*\S$/ })} id="password" placeholder="Enter Trainer name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
              </div>
              <div className="flex items-center justify-between">
                  <div className="flex items-start">
                   
                     
                  </div>

              </div>
               
                <button type="submit" className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" >Submit</button>
                
        
           
          </form>
      </div>
  </div>
</div>
</section>
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

  <TextField className="my-2" sx={{ width: 500 }}  variant="outlined" id="outlined-basic" label=" Name" name='name' required value={update.name} onChange={updateData} />
  <TextField className="my-2" sx={{ width: 500 }}  variant="outlined" id="outlined-basic" label=" Trainer Name"  required name='trainerName' value={update.trainerName} onChange={updateData} />
  <TextField className="my-2" sx={{ width: 500 }}  variant="outlined" id="outlined-basic" label=" Doctor Name"  required name='doctorName' value={update.doctorName} onChange={updateData} />
  {/* <TextField className="my-2" sx={{ width: 500 }} variant="outlined" id="outlined-basic" label="Unit" name='unit'  required value={update.unit} onChange={updateData} /> */}
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
<h1>All location</h1>
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

    {/* <Button
    onClick={()=>{
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/location/deleteLocations`,{array:arrayId},{headers:{token:accessToken}})
        .then(res=>{
            console.log(res)
            setArrayId([])
            setFlag(!flag)
        })
    }
    } 
    color="error" className="my-3" variant="contained">Delete Selected Item</Button> */}
    <div style={{ height: '80vh', width: '100%' }}>
                <DataGrid
                    rows={data.map((item,index)=>({...item,id:index+1}))}
                    columns={columns2}
                    pageSize={100}
                    rowsPerPageOptions={[100]}
                    // checkboxSelection
                    onRowClick={(item)=>setUpdate(item.row) }
                    // onRowClick={(item,ev)=>{
                    //     if(arrayId.includes(item.row._id)){
                    //         setArrayId(arrayId.filter(i=>i!==item.row._id))
                    //     }else{
                    //         setArrayId([...arrayId,item.row._id])
                    //     }
                    // }}
                />
            </div>
</div>
  )
}

export default Addloactaion