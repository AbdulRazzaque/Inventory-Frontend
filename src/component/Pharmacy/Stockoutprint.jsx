import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'No', width: 70 },
  { field: 'firstName', headerName: 'Doc Number', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {field: 'age',headerName: 'Age',type: 'number',width: 90,},

];

const rows = [
  { id: 1, lastName: 'Snow', firstName: '0193', age: 35 },

];


const Stockoutprint = () => {
    return (
        
        <div className='mx-2 my-3'>
            <h1 className='font-bold text-2xl text-center my-3'> Stock out Print</h1>
        <div style={{ height: 1000, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={20}
            rowsPerPageOptions={[20]}
            checkboxSelection
            
          />
        </div>
        </div>
      );
    
    
}

export default Stockoutprint