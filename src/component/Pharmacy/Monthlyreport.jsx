import React from "react";
import MaterialTable from "material-table";
import {
  ThemeProvider,
  createTheme,
  Stack,
  TextField,
  Autocomplete,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import date from "date-and-time";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InventoryNavbar from "../Navbar/InventoryNavbar";
import moment from "moment";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Monthlyreport = () => {
  const { useState } = React;
  const [data, setData] = useState([]);
  let navigate = useNavigate();

 
  const [columns, setColumns] = useState([
    { title: "Sno", field: "sno" },
    {
      title: "Date",
      field: "createdAt",
      type:'date',
      dateSetting: {
        format: 'dd/MM/yyyy'
       
      },
    },
    { title: "Products Name", field: "name" },
    { title: "unit", field: "unit" },

    { title: "Qauntity", field: "quantity" },
    // { title: "Price", field: "price" },
  ]);

  
  const defaultMaterialTheme = createTheme();
  const [value, setValue] = React.useState();
  const [value1, setValue1] = React.useState();
  console.log(value);
  console.log(value1);
  const [b, setB] = useState([]);
  const [allLocations, setAllLocations] = useState([]);
  const [selectedLocation, setselectedLocation] = useState();
  const [trainerName, setTrainerName] = useState("");

  const [array, setArray] = useState([]);
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InNoYXJqZWVsc2siLCJfaWQiOiI2M2JmZmE2OTY2ZWJiYzg0MGQ4ZmZiODkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzM1MzEyNzd9.9TU3mS2SgZLA8P3Rqop9z83fX0iWsPC1_UBi8HJXAEw";

  React.useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_DEVELOPMENT}/api/location/getAllLocations`,
        { headers: { token: accessToken } }
      )
      .then((res) => {
        console.log(res);
        setAllLocations(res.data.result);
      });
  }, []);

  // Here  i am start Montly data tabel
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (stock) => {
    var obj = {
      value,
      value1,
      locationName: selectedLocation.name,
      locationId: selectedLocation._id,
      trainerName,
    };

    //array.push(obj)
    axios
      .post(
        `${process.env.REACT_APP_DEVELOPMENT}/api/stock/getStockReport`,
        {
          from: date.format(value, "YYYY/MM/DD"),
          to: date.format(value1, "YYYY/MM/DD"),
          ...obj,
        },
        { headers: { token: accessToken } }
      )
      .then((res) => {
        console.log("all stockout report", res);
        setData(res.data.result);
      });
    console.log(obj, "obj");
  };
  console.log(data, "data");

  const toComponentB = () => {
    navigate("/MonthlystockPdf", { state: { data: data ,mdate:value,mdate1:value1 } });
  };

  return (
    <>
      <InventoryNavbar />
      <h1 className="text-center my-8 font-bold text-2xl">Monthly Report</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mx-6">
          <Stack
            direction="row"
            spacing={2}
            margin="23px"
            justifyContent="center"
          >
            {/* <TextField type="Date" sx={{width:200}} id="outlined-basic" label="" variant="outlined"  /> */}
            {/* <TextField type="Date"  format="yyyy-MM-dd HH:mm:ss" sx={{width:200}} id="outlined-basic" label="" variant="outlined"  /> */}
            <section>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Start Date"
                  inputFormat="dd/MM/yyyy"
                  value={value}
                  onChange={(newValue) => {
                    console.log(newValue);
                    setValue(newValue);
                  }}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              </LocalizationProvider>
            </section>
            <section>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Start Date"
                  inputFormat="dd/MM/yyyy"
                  value={value1}
                  onChange={(newValue) => {
                    console.log(newValue);
                    setValue1(newValue);
                  }}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              </LocalizationProvider>
            </section>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              onChange={(event, newValue) => {
                setselectedLocation(newValue);
              }}
              getOptionLabel={(LocationName) => LocationName.name || ""}
              options={allLocations}
              sx={{ width: 200 }}
              renderInput={(params) => (
                <TextField {...params} label="Select Location" />
              )}
            />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              onChange={(event, newValue) => {
                setTrainerName(newValue);
              }}
              getOptionLabel={(LocationName) => LocationName || ""}
              options={selectedLocation ? selectedLocation.trainerName : []}
              sx={{ width: 200 }}
              renderInput={(params) => (
                <TextField {...params} label="Select Traniner" />
              )}
            />
          </Stack>
          <center>
            {" "}
            <button
              type="submit"
              className=" text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-10 mb-1 mt-1 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 relative my-2"
            >
              Submit{" "}
            </button>
          </center>
          <ThemeProvider theme={defaultMaterialTheme}>
            <MaterialTable
            title="Monthly Report"
              data={data}
              columns={columns}
              editable={{
                isEditable: (rowData) =>
                  rowData.date ===
                  moment.parseZone(data.date).local().format("DD/MM/YY"), // only name(a) rows would be editable
                isEditable: (rowData) =>
                  rowData.ProductsName === data.ProductsName,
                isEditable: (rowData) =>
                  rowData.companyName === data.companyName, // only name(b) rows would be deletable,
                isEditable: (rowData) => rowData.Qauntity === data.Qauntity,
                isEditable: (rowData) => rowData.Price === data.Price,
                isEditable: (rowData) => rowData.total === data.total,

                onRowAddCancelled: (rowData) =>
                  console.log("Row adding cancelled"),
                onRowUpdateCancelled: (rowData) =>
                  console.log("Row editing cancelled"),
                onRowAdd: (newData) =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      /* setData([...data, newData]); */

                      resolve();
                    }, 1000);
                  }),
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      const dataUpdate = [...data];
                      const index = oldData.tableData.id;
                      dataUpdate[index] = newData;
                      setData([...dataUpdate]);

                      resolve();
                    }, 1000);
                  }),
                onRowDelete: (oldData) =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      const dataDelete = [...data];
                      const index = oldData.tableData.id;
                      dataDelete.splice(index, 1);
                      setData([...dataDelete]);

                      resolve();
                    }, 1000);
                  }),
              }}
            />
            {/* {console.log(rowData.date,'date')} */}
          </ThemeProvider>
          <center>
         
            <button
              onClick={() => {
                toComponentB();
              }}
              type="submit"
              className=" text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-10 mb-1 mt-1 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 relative my-2"
            >
              Print
            </button>
          </center>
          {/* <center> <button type="submit" className=" text-white bg-red-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-10 mb-1 mt-1 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 relative my-2">Grand Total = </button></center>  */}
        </div>
      </form>
    </>
  );
};

export default Monthlyreport;