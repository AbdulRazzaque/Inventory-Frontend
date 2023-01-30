import Login from "./component/Login";
import { Routes, Route } from "react-router-dom";

import AdminLogin from "./component/admin/AdminLogin";
import Addgroups from "./component/admin/Addgroups";
import AdminPanel from "./component/admin/AdminPanel";
import Addproducts from "./component/admin/Addproducts";
import Addsuppliers from "./component/admin/Addsuppliers";
import Addloactaion from "./component/admin/Addloactaion";
import UserLogin from "./component/users/UserLogin";
import Dataentry from "./component/Pharmacy/Dataentry";
import Stockout from "./component/Pharmacy/Stockout";
import Demo from "./component/admin/Demo";
import Stockin from "./component/Pharmacy/Stockin";
import Productslist from "./component/Pharmacy/Productslist";
import Stockinprint from "./component/Pharmacy/Stockinprint";
import Stockoutprint from "./component/Pharmacy/Stockoutprint";
import Transactionlist from "./component/Pharmacy/Transactionlist";
import Stockininfo from "./component/Pharmacy/Stockininfo";
import Stockoutinfo from "./component/Pharmacy/Stockoutinfo";
import Monthlyreport from "./component/Pharmacy/Monthlyreport";
import Stockinventoty from "./component/Pharmacy/Stockinventoty";
import Stockoutsearch from "./component/Pharmacy/Stockoutsearch";
import Stockoutdetails from "./component/Pharmacy/Stockoutdetails";
import Navbar1 from "./component/Navbar/AdminNavbar";
import Stockoutpdf from "./component/Pharmacy/Stockoutpdf";
import MonthlystockPdf from "./component/Pharmacy/MonthlystockPdf";
function App() {
  return (
    <div className="App">
     

      <Routes>
        {/* this is path Forent page for user and admin  */}
      
      <Route path="/" element={<Login />}/> 
      

      {/* Path only for admin  */}
      <Route path="/adminlogin" element={<AdminLogin />}/>
      {/* <Route path="/addgroups" element={<Addgroups />}/> */}
      <Route path="/adminpanel" element={<AdminPanel />}/>
        <Route  path="/addproducts" element={<Addproducts/>} />
        <Route  path="/Addsuppliers" element={<Addsuppliers/>} />
        <Route  path="/Addloactaion" element={<Addloactaion/>} />


      {/* This is path for User  */}
        <Route  path="/userlogin" element={<UserLogin/>} />

        {/* this is path for User Login  */}
        <Route  path="/dataentry" element={<Dataentry/>} />
        <Route  path="/productslist" element={<Productslist/>} />
        <Route  path="/stockin" element={<Stockin/>} />
        <Route  path="/stockout" element={<Stockout/>} />
        <Route  path="/stockinprint" element={<Stockinprint/>} />
        <Route  path="/transactionlist/:name" element={<Transactionlist/>} />
        <Route  path="/stockoutprint" element={<Stockoutprint/>} />
        <Route  path="/stockininfo/:docNo" element={<Stockininfo/>} />
        <Route  path="/stockoutinfo/:docNo" element={<Stockoutinfo/>} />
        <Route  path="/monthlyreport" element={<Monthlyreport/>} />
        <Route  path="/stockinventoty" element={<Stockinventoty/>} />
        <Route  path="/stockoutsearch" element={<Stockoutsearch/>} />
        <Route  path="/stockoutdetails/:id" element={<Stockoutdetails/>} />
        <Route  path="/stockoutpdf" element={<Stockoutpdf/>} />
        <Route  path="/monthlystockpdf" element={<MonthlystockPdf/>} />
 

        <Route  path="/demo" element={<Demo/>} />
    </Routes>
    </div>
  );
}

export default App;
