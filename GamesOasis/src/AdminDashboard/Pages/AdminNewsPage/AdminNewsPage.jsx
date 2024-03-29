import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSidebar from '../../Components/Sidebar/Sidebar.jsx';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material"; // Import Material-UI components
import "./AdminNewsPage.css"; // Make sure to import your CSS file

const AdminNewsPage = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [gameName, setGameName] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://games-oasis-back-1.onrender.com/api/news');
        setNewsItems(response.data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const userData = JSON.parse(localStorage.getItem("userData"));
      const userRole = userData?.userRole; // Accessing userRole from userData
      const headers = {
        Authorization: `Bearer ${token}`,
        Role: userRole,
      };
  
      // Delete news item by ID
      await axios.delete(`https://games-oasis-back-1.onrender.com/api/news/${deleteItemId}`, { headers });
  
      // Update news items state by removing the deleted item
      setNewsItems(newsItems.filter(item => item._id !== deleteItemId));
  
      // Close the delete confirmation dialog
      setOpenDeleteDialog(false);
    } catch (error) {
      console.error('Error deleting news item:', error);
    }
  };
  
  const handleDeleteConfirmation = (id) => {
    setOpenDeleteDialog(true);
    setDeleteItemId(id);
  };

  const handleAddNews = async () => {
    try {
      const token = localStorage.getItem("token");
      const userRole = localStorage.getItem("userRole");

      const headers = {
        Authorization: `Bearer ${token}`,
        Role: userRole,
      };

      const formData = new FormData();
      formData.append('gameName', gameName);
      formData.append('content', content);
      formData.append('file', image);


      const response = await axios.post('https://games-oasis-back-1.onrender.com/api/news', formData, { headers });
      
      setNewsItems([...newsItems, response.data]);
      setOpenAddDialog(false);
    } catch (error) {
      console.error('Error adding news item:', error);
    }
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  return (
    <div className="AdminNewsPage">
      <div className="SidebarContainer">
        <AdminSidebar className="Sidebar" />
      </div>
      <div className="RightSide">
        <div className="PageHeading">
          <h1>Hello Admin</h1>
        </div>
        <div className="TableContainer">
          <table className="UserTable">
            <thead>
              <tr>
                <th>News Name</th>
                <th>Content</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {newsItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.gameName}</td>
                  <td>{item.content}</td>
                  <td>
                    <button onClick={() => handleDeleteConfirmation(item._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Delete confirmation dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Delete News Item</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this news item?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="error">Delete</Button>
        </DialogActions>
      </Dialog>
      {/* Add news dialog */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Add News</DialogTitle>
        <DialogContent>
          <TextField
            label="News Name"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            fullWidth
            multiline
            rows={4}
          />
          <input
            type="file"
            accept="images/*"
            onChange={handleImageChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
          <Button onClick={handleAddNews} variant="contained" color="primary">Add</Button>
        </DialogActions>
      </Dialog>
      <Button onClick={() => setOpenAddDialog(true)} variant="contained" color="primary">Add News</Button>
    </div>
  );
};

export default AdminNewsPage;
