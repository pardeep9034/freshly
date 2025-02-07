import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Paper, Table, TableContainer,
  TableHead, TableRow, TableCell, TableBody,
  Modal,
  Box,
  Typography,
  TextField
} from '@mui/material';


const Employee = () => {
  const Base_URL = import.meta.env.VITE_BACKEND_URL;
  const [employees, setEmployees] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`${Base_URL}/user`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          });
        

        // console.log(response.data);
        setEmployees(response.data);
      } catch (error) {
        // console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);
  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Active</TableCell>
             
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee._id}>
                <TableCell>{employee.username}</TableCell>
                <TableCell>{employee.phoneno}</TableCell>
                <TableCell>{employee.role}</TableCell>
                <TableCell>{employee.isActive ? "Yes" : "No"}</TableCell>
               
                <TableCell>
                  <div>
                    <button className="bg-green-500 text-white px-4 py-1 rounded-md mr-2" onClick={()=>{setIsOpen(true)}}>Edit</button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded-md">Delete</button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
       

        <Box sx={{ width: 400, bgcolor: 'background.paper', p: 4 ,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',


        }}
        className="bg-white rounded-lg shadow-lg p-6">
          <Typography variant="h6" id="modal-modal-title">
            Edit Employee
          </Typography>
          <TextField
            fullWidth
            label="Username"
            
            
          ></TextField>
          
        </Box>

      </Modal>
     
    </div>
  )
}

export default Employee
