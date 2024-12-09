import React, { useState } from 'react';
import { Typography } from '@mui/material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import AddUserModal from './adduserform';
import { useContext } from "react";
import { UserContext } from "../../../utils/GeneralContext";

const AddUser = () => {
  // State to control modal visibility
  const [open, setOpen] = useState(false);
  const { user } = useContext(UserContext);
  // Functions to open and close the modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      {/* Trigger for opening modal */}
      <div className="grid grid-rows-2 cursor-pointer" onClick={handleOpen}>
        <Typography variant="h6" className="text-center">
          Add User
        </Typography>
        <div className="total flex justify-center p-3 items-center">
          <Typography variant="h5">
            <PersonAddAlt1Icon fontSize="large" />
          </Typography>
        </div>
      </div>

      {/* Add User Modal */}
      <AddUserModal Opens={open} handleClose={handleClose} managerId={user} />
    </div>
  );
};

export default AddUser;
