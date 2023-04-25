import React from "react";
import logo from "../../images/logo.jpeg";
import "./pdf.css";
import { useLocation } from "react-router-dom";
import moment from 'moment'
const MonthlystockPdf = () => {
  const location = useLocation();
  let item = location.state.data;
  let to = location.state.mdate;
  let from= location.state.mdate1
  console.log(location.state.mdate,'mdate')

    return (
      
      <div className='background' >
          <img src={logo} alt="" className='w-[79px] h-[48px] '/>
    <div className='text-center m-0 p-0'>
        <p className='font-bold'>Mdicine Deliver Monthly Report</p>        
        {/* <p className='font-bold'>1 December to 31 December 2022</p>         */}
        <p className='font-bold'>To:- {moment.parseZone(to).local().format("DD/MM/YY")} From:- {moment.parseZone(from).local().format("DD/MM/YY")}</p>        
      
        </div>
        <div class="grid grid-cols-2 gap-24 ">
      <div className='font-bold ml-1 '>Traniner Name:{item && item[0].trainerName}</div>
      
      <div className='font-bold text-lg'>Farm Name:{item && item[0].locationName}</div>
    </div>  
      <div class=" ">
      <div class="md:px-32 py-2">
        <table class="   border  border-collapse border-slate-500">
          <thead class=" text-black">
            <tr>
              <th class=" text-center py-0 w-[155px] uppercase font-semibold text-sm border bg-yellow-500 ">Date</th>
              <th class="  uppercase font-semibold text-center w-[416px] text-sm border bg-yellow-500  ">Description Of Item</th>
              <th class="text-center py-0 px-0 w-[160px] uppercase font-semibold text-sm border bg-yellow-500 ">Unit</th>
              <th class="text-center py-0 w-[127px] uppercase font-semibold text-sm border bg-yellow-500  ">Qty</th>
              {/* <th class="text-center py-0 px-0 w-[224px]  uppercase font-semibold text-sm border bg-yellow-500 ">Total Price</th> */}
            </tr>
          </thead>
        <tbody class="text-gray-700">
        {item?.map((datas, i) => {
                return (
                  <tr key={i}>
            <td class=" text-center py-0 text-sm px-0 border ">{moment.parseZone(datas.date).local().format("DD/MM/YY")}</td>
            <td class=" text-left text-sm py-0  border ">{datas.name}</td>
            <td class="text-center py-0  text-sm px-0 border ">{datas.unit}</td>
            <td class="text-center py-0  text-sm px-0 border ">{datas.quantity}</td>
            {/* <td class="text-center py-0  text-sm px-0 border ">34</td> */}
          </tr>
            );
          })}
       
          {/* <tr>
            <td class=" text-center py-0 text-sm px-0   "></td>
            <td class="text-left text-sm py-0    "></td>
            <td class="text-center py-0  text-sm px-0  "></td>
            <td class="text-center py-0  text-sm px-0  border font-bold ">Grand Total =</td>
            <td class="text-center py-0  text-sm px-0  border font-bold ">7867676</td>
          </tr> */}
  
   
        </tbody>
        </table>
      </div>
      <div class="grid grid-cols-2 gap-80 revert-layer ">
    
    {/* <div className='font-bold ml-1 '>Trainer Name:</div> */}
    
    {/* <div className='font-bold text-lg'>Veterinarian name:</div> */}
  </div>
      <div class="grid grid-cols-2 gap-80 revert-layer ">
    
    {/* <div className='font-bold ml-1 '>signature:</div> */}
    
    {/* <div className='font-bold text-lg'>signature:</div> */}
  </div>
    </div>

        </div>
        
      )
}

export default MonthlystockPdf