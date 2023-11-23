// import React, { useEffect, useState } from 'react'
// import logo from '../../images/banner.png'

// import Stockout from './Stockout'
// import { useLocation } from 'react-router-dom';
// import './pdf.css'

// const Stockoutpdf = () => {
//   useEffect(() => {
    
//     setTimeout(() => {
//         window.print();            
//     }, 1000);
//   }, [])
  
//   const text= new Date()
//   const date= text.toLocaleDateString()
//   const location = useLocation();
//   let item = location.state.data;
//   const ref = React.createRef();
//   // let logo= location.state.image
//    const [ imgs, setImgs ] = useState(logo)
  
//  console.log(location.state.image,'image')
//   console.log(location.state.data, "Stockout");

//   // const location = useLocation();
//   // let item = location.state.data
//   // const ref = React.createRef();
//   // console.log(location.state.data, 'Stockout')

//   console.log(item, 'data')


//   return (
//     <div className='background'>
//       <div className="md:px-32 py-2 ">
//         <div className="">
//           <table className="  report-container">
//             <table>
//               <thead className="report-header text-black">
//                 <img src={logo} alt="" className='w-[1000px] h-[133px] m-auto ' />
 
//                 <tr>
//                   <th className="report-header-cell">
//                     <div className="header-info">
//                       <div className="grid grid-cols-2  report-header ">
//                         <div className='font-bold text-lg relative my-3 report-header-cell'>Date:{item && date}</div>

//                         <div className='font-bold text-2xl relative right-28 underline  report-header-cell'>Drug Issued Form</div>
//                       </div>
//                       <div className="grid grid-cols-2 gap-24   report-header-cell">
//                         <div className='font-bold ml-1   report-header-cell'>Location:{ item && item[0].locationName}</div>

//                         <div className='font-bold text-lg  report-header-cell'>Trainer:{ item && item[0].trainerName}</div>
//                       </div>

//                     </div>
//                   </th>
//                 </tr>
//               </thead>
//             </table>

//             <table className="  report-container">
//               <thead className="report-header text-black">
//                 <tr className=''>
//                   <th className=" text-center py-1 px-2 w-16 uppercase font-bold text-sm border mt-3  ">No</th>
//                   <th className="  py-3 px-11 uppercase font-bold text-center text-sm border report-header-cell ">Item</th>
//                   <th className="text-center py-3 w-32 uppercase font-bold text-sm border report-header-cell ">Unit</th>
//                   <th className="text-center py-3 px-0 w-32 uppercase font-bold text-sm border  report-header-cell">Quantity</th>
//                 </tr>

 
//               </thead>
//               <tfoot className="report-footer grid grid-cols-2 gap-80 revert-layer">
//                 <tr>
//                   <td className="report-footer-cell">
//                     <div className="footer-info">
//                       <div className={"page-footer"}>
//                         <div className="grid grid-cols-2 gap-96">
//                           <div>
//                             <div className='font-bold text-xl ml-1'>Sign:</div>
//                           </div>
//                           <div>
//                             <div className='font-bold  text-xl'>Taken by:</div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </td>
//                 </tr>
//               </tfoot>

//               <tbody className="report-content text-gray-700">
//                 {
//                   item?.map((datas, i) => {
//                     return (

//                       <tr key={i} >
//                         <td className="report-content-cell text-center py-1 px-2 border "><div className="main"> {i + 1}</div> </td>
//                         <td className="report-content-cell  text-left py-1 px-4 border"><div className="main"> {datas.productName}</div> </td>
//                         <td className="report-content-cell text-center py-1 px-2 border "><div className="main"> {datas.unit}</div> </td>
//                         <td className="report-content-cell text-center py-1 px-0  border"><div className="main"> {datas.quantity}</div> </td>

//                       </tr>
//                     )
//                   })
//                 }
//               </tbody>
//             </table>
//           </table>
//         </div>
//       </div>

//     </div>
//   )
// }

// export default Stockoutpdf


import React, { useEffect, useState } from 'react'
import logo from '../../images/banner.png'
import { Link,useParams,useNavigate } from 'react-router-dom'
import Stockout from './Stockout'
import { useLocation } from 'react-router-dom';
import './pdf.css'

const Stockoutpdf = () => {
  useEffect(() => {
    
    setTimeout(() => {
        window.print();            
    }, 1000);
  }, [])
  
  const text= new Date()
  const date= text.toLocaleDateString()
  const location = useLocation();
  let item = location.state.data;
  const ref = React.createRef();
  // let logo= location.state.image
   const [ imgs, setImgs ] = useState(logo)
   const params = useParams()
	const navigate = useNavigate()

  console.log(params,'params')
  console.log(navigate,'navigate')
  
 console.log(location.state.image,'image')
  console.log(location, "Stockout");

  // const location = useLocation();
  // let item = location.state.data
  // const ref = React.createRef();
  console.log(location.state.data, 'Stockout')

  console.log(item, 'data')


  return (
    <div className='background'>
      <div className="md:px-32 py-2 ">
        <div className="">
          <table className="  report-container">
            <table>
              <thead className="report-header text-black">
                <img src={logo} alt="" className='w-[1000px] h-[133px] m-auto ' />
 
                <tr>
                  <th className="report-header-cell">
                    <div className="header-info">
                      <div className="grid grid-cols-2  report-header ">
                        <div className='font-bold text-lg relative my-3 report-header-cell'>Date:{item && date}</div>

                        <div className='font-bold text-2xl relative right-28 underline  report-header-cell'>Drug Issued Form</div>
                      </div>
                      <div className="grid grid-cols-2 gap-24   report-header-cell">
                        <div className='font-bold ml-1   report-header-cell'>Location:{ item && item[0].locationName ?item && item[0].locationName : null}</div>

                        <div className='font-bold text-lg  report-header-cell'>Trainer:{ item && item[0].trainerName}</div>
                      </div>

                    </div>
                  </th>
                </tr>
              </thead>
            </table>

            <table className="  report-container">
              <thead className="report-header text-black">
                <tr className=''>
                  <th className=" text-center py-1 px-2 w-16 uppercase font-bold text-sm border mt-3  ">No</th>
                  <th className="  py-3 px-11 uppercase font-bold text-center text-sm border report-header-cell ">Item</th>
                  <th className="text-center py-3 w-32 uppercase font-bold text-sm border report-header-cell ">Unit</th>
                  <th className="text-center py-3 px-0 w-32 uppercase font-bold text-sm border  report-header-cell">Quantity</th>
                </tr>

 
              </thead>
              <tfoot className="report-footer grid grid-cols-2 gap-80 revert-layer">
                <tr>
                  <td className="report-footer-cell">
                    <div className="footer-info">
                      <div className={"page-footer"}>
                        <div className="grid grid-cols-2 gap-96">
                          <div>
                            <div className='font-bold text-xl ml-1'>Sign:</div>
                          </div>
                          <div>
                            <div className='font-bold  text-xl'>Taken by:</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tfoot>

              <tbody className="report-content text-gray-700">
                {
                  item?.map((datas, i) => {
                    return (

                      <tr key={i} >
                        <td className="report-content-cell text-center py-1 px-2 border "><div className="main"> {i + 1}</div> </td>
                        <td className="report-content-cell  text-left py-1 px-4 border"><div className="main"> {datas.productName ?datas.productName : datas.name }</div> </td>
                        <td className="report-content-cell text-center py-1 px-2 border "><div className="main"> {datas.unit}</div> </td>
                        <td className="report-content-cell text-center py-1 px-0  border"><div className="main"> {datas.quantity}</div> </td>

                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </table>
        </div>
      </div>

    </div>
  )
}

export default Stockoutpdf










