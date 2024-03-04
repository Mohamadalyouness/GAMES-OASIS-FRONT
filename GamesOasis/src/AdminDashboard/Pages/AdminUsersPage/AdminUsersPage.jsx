  import React, { useState, useEffect } from "react";
  import axios from "axios";
  import AdminSidebar from "../../Components/Sidebar/Sidebar.jsx";
  import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material"; // Import Material-UI components
  import "./AdminUsersPage.css"; // Make sure to import your CSS file

  const AdminUsersPage = () => {
    const [users, setUsers] = useState([]);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false); 
    const [adminUsername, setAdminUsername] = useState("")

    useEffect(() => {
      const fetchData = async () => {
        try {
          // Retrieve token and user data from local storage
          const token = localStorage.getItem("token");
          const userDataString = localStorage.getItem("userData");
         

    
          // Parse the user data string to an object
          const userData = JSON.parse(userDataString);
    
          // Extract the role from the user data
          const userRole = userData ? userData.role : null;
          const username = userData ? userData.username : null;
    
          // Check if token and role exist
          if (!token || !userRole) {
            throw new Error("Token or role not found in local storage");
          }
          setAdminUsername(username);
    
          // Set headers with the token and user role
          const headers = {
            Authorization: `Bearer ${token}`,
            Role: userRole,
          };
    
          // Make API request with the token and role included in headers
          const response = await axios.get("https://games-oasis-back-1.onrender.com/api/getUser", {
            headers: headers,
          });
    
          // Update state with response data
          setUsers(response.data);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };
    
      fetchData();
    }, []);

    const handleDelete = async (id) => {
      try {
        console.log("Deleting user with ID:", id); // Log the ID before making the API call
    
        // Retrieve token from local storage
        const token = localStorage.getItem("token");
        const userDataString = localStorage.getItem("userData");
    
        // Parse the user data string to an object
        const userData = JSON.parse(userDataString);
    
        // Extract the role from the user data
        const userRole = userData ? userData.role : null;
    
        // Check if token and role exist
        if (!token || !userRole) {
          throw new Error("Token or role not found in local storage");
        }
    
        // Set headers with the token and user role
        const headers = {
          Authorization: `Bearer ${token}`,
          Role: userRole,
        };
    
        // Make API call to delete user by ID with token and role in headers
        await axios.delete(`https://games-oasis-back-1.onrender.com/api/deleteUser/${id}`, {
          headers: headers,
        });
        
        // Update the users state by removing the deleted user
        setUsers(users.filter(user => user._id !== id));
    
        // Close the delete confirmation dialog
        setOpenDeleteDialog(false);
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    };
    

    return (
      <div className="AdminUsersPage">
        <AdminSidebar className="sidebar" />
        <div className="RightSide">
          <div className="PageHeading">
          <h1>Welcome Admin {adminUsername}</h1>
          </div>
          <div className="TableContainer">
            <table className="UserTable">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Username</th>
                  <th>Role</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td>{user.email}</td>
                    <td>{user.username}</td>
                    <td>{user.role}</td>
                    <td>
                      <button onClick={() => {
                        setOpenDeleteDialog(true);
                        handleDelete(user._id);
                        console.log(user._id)
                      }}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Delete confirmation dialog */}
        <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
          <DialogTitle>Delete User</DialogTitle>
          <DialogContent>
            <p>Are you sure you want to delete this user?</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
            {/* The handleDelete function will be called directly with the user ID */}
            <Button onClick={handleDelete}  variant="contained" color="error">Delete</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  export default AdminUsersPage;
