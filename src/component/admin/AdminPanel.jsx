import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
// import logo from '../../images/logo1.jfif'
import AdminNavbar from '../Navbar/AdminNavbar'
import logo from '../../images/inventory.jpg'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

 
const AdminPanel = () => {
 const [data, setData] = useState([])
 const [isValid, setIsValid] = useState(false);
  const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InNoYXJqZWVsc2siLCJfaWQiOiI2M2JmZmE2OTY2ZWJiYzg0MGQ4ZmZiODkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzM1MzEyNzd9.9TU3mS2SgZLA8P3Rqop9z83fX0iWsPC1_UBi8HJXAEw"
 
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async(data,event) => {
   

    try {
      const res= await axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/user/createUser`, data,
      {headers:{token:`${accessToken}`}})
      .then(response=>{
      console.log(response, 'res')
      
    })
    setIsValid(true);
    setTimeout(() => {
        setIsValid(false);
    }, 1000);
      // alert("Supplier Add succsefully")
      event.target.reset();
    } catch (error) {
      alert(error)
    }
    

      
}

useEffect(() => {
  if( data == !undefined){
    onSubmit()
  }
  }, [])


  return (
    <div>
      <AdminNavbar />

      <section className="bg-gray-50 ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        {isValid  &&
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3rounded relative" role="alert">
      <strong class="font-bold"> User Created successfully!</strong>
  
 
    </div>
      
}
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-gray-900 ">
            
            <img className="w-56 h-32 mr-6 mt-2" src={logo} alt="logo" />

          </a>
          <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gray-10 dark:border-gray-600">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Admin Panel
              </h1>
              <form className="w-full max-w-lg" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                      User Name
                    </label>
                    <input {...register("userName", { required: true })} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name"  type="text" placeholder="Jane" required />

                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                      Passwod
                    </label>
                    <input {...register("password", { required: true })} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text"  placeholder="********"  required/>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                      Choose a Depratment
                    </label>
                    <select  {...register("department")} id="countries" className="bg-gray-200 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500">

                      <option value="Pharmacy"   >Pharmacy</option>
                      <option value="Lab"  >Lab</option>
                      <option value="Hopsital"  >Hospital</option>
                      <option value="Cleaner"  >Cleaner</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                      assign a role to a user
                    </label>
                    <select  {...register("role")} id="countries"  className="bg-gray-200 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500">

                      <option value="admin" >Admin</option>
                      <option value="user" >User</option>
                    </select>
                  </div>
                  <div className="w-full px-3 pt-5 ">

                    <button type="submit" className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" >Submit</button>

                  </div>

                </div>

              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AdminPanel