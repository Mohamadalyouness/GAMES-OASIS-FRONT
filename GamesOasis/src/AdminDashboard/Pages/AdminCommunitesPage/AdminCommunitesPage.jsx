import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import AdminSidebar from "../../Components/Sidebar/Sidebar.jsx";
import "./AdminCommunitesPage.css"; // Make sure to import your CSS file

const AdminCommunityPage = () => {
  const [communities, setCommunities] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    open: false,
    type: null,
    id: null,
  });
  const [messages, setMessages] = useState([]);
  const [addCommunityOpen, setAddCommunityOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://games-oasis-back-1.onrender.com/api/community");
        setCommunities(response.data);

        // Fetch messages for each community
        const messagesPromises = response.data.map(async (community) => {
          const messagesResponse = await axios.get(
            `http://localhost:4005/api/chatmessage/${community._id}`
          );
          return {
            communityId: community._id,
            messages: messagesResponse.data,
          };
        });

        const messagesData = await Promise.all(messagesPromises);
        setMessages(messagesData);
      } catch (error) {
        console.error("Error fetching communities:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (communityId, messageId) => {
    try {
      await axios.delete(`https://games-oasis-back-1.onrender.com/api/chatmessage/${messageId}`);
      // Remove the deleted message from the state
      const updatedMessages = messages.map((msgData) => {
        if (msgData.communityId === communityId) {
          msgData.messages = msgData.messages.filter(
            (msg) => msg._id !== messageId
          );
        }
        return msgData;
      });
      setMessages(updatedMessages);
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const handleDeleteConfirmationOpen = (communityId, messageId) => {
    setDeleteConfirmation({
      open: true,
      type: "message",
      id: messageId,
      communityId: communityId,
    });
  };

  const handleDeleteConfirmationClose = () => {
    setDeleteConfirmation({
      open: false,
      type: null,
      id: null,
      communityId: null,
    });
  };

  const handleAddCommunityOpen = () => {
    setAddCommunityOpen(true);
  };

  // Function to close the dialog for adding a new community
  const handleAddCommunityClose = () => {
    setAddCommunityOpen(false);
  };

  // Function to handle the form submission for adding a new community
  const handleAddCommunitySubmit = async () => {
    // Add your logic to handle the form submission here
    // Example: Make a POST request to add the new community
    // After successful addition, close the dialog and update the community list
    try {
      // Make a POST request to add the new community
      // Example:
      // await axios.post("http://localhost:4005/api/community", formData);

      // After successful addition, close the dialog and update the community list
      handleAddCommunityClose();
      fetchData(); // Assuming fetchData function will refetch the communities after addition
    } catch (error) {
      console.error("Error adding community:", error);
    }
  };

  return (
    <div className="AdminCommunityPage">
      <div className="SidebarContainer">
        <AdminSidebar className="Sidebar" />
      </div>
      <div className="RightSide">
        <div className="PageHeading">
          <h1>Community Chat Management</h1>
        </div>
        <TableContainer className="TableContainer">
          <Table className="CommunityTable">
            <TableHead>
              <TableRow>
                <TableCell>Community Logo</TableCell>
                <TableCell>Members</TableCell>
                <TableCell>Messages</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {communities.map((community) => (
                <TableRow key={community._id}>
                  <TableCell className="Logotable">
                    <img
                      className="cardimg"
                      src={`https://games-oasis-back-1.onrender.com/${community.images}`}
                    />
                  </TableCell>
                  <TableCell>
                    {community.members.map((member) => (
                      <div key={member._id}>{member.username}</div>
                    ))}
                  </TableCell>
                  <TableCell>
                    {messages
                      .find((msg) => msg.communityId === community._id)
                      ?.messages.map((msg) => (
                        <div key={msg._id}>
                          <div>{msg.senderId}</div>
                          <div>{msg.message}</div>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() =>
                              handleDeleteConfirmationOpen(
                                community._id,
                                msg._id
                              )
                            }
                          >
                            Delete
                          </Button>
                        </div>
                      ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TableContainer className="TableContainer">
          <Table className="CommunityTable">
            <TableHead>
              <TableRow>
                <TableCell>Community Logo</TableCell>
                <TableCell>Community Name</TableCell>
                <TableCell>Community Description</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {communities.map((community) => (
                <TableRow key={community._id}>
                  <TableCell className="Logotable">
                    <img
                      className="cardimg"
                      src={`https://games-oasis-back-1.onrender.com/${community.images}`}
                    />
                  </TableCell>
                  <TableCell>{community.name}</TableCell>
                  <TableCell>{community.description}</TableCell>
                  <TableCell  className="buttons">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleDeleteCommunity(community._id)}
                    >
                      Delete Community
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleAddCommunityOpen()}
                      style={{ marginLeft: '30px' }}
                    >
                      Add Community
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Add Community Button */}

          {/* Dialog for adding a new community */}
          <Dialog open={addCommunityOpen} onClose={handleAddCommunityClose}>
            <DialogTitle>Add New Community</DialogTitle>
            <DialogContent>
              <Dialog open={addCommunityOpen} onClose={handleAddCommunityClose}>
                <DialogTitle>Add New Community</DialogTitle>
                <DialogContent>
                  <form>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Community Name"
                      type="text"
                      fullWidth
                      // You can add onChange event handlers to update state with the input values
                    />
                    <TextField
                      margin="dense"
                      id="description"
                      label="Community Description"
                      type="text"
                      fullWidth
                      // You can add onChange event handlers to update state with the input values
                    />
                    <form>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleLogoChange(e.target.files[0])}
                      />
                    </form>
                  </form>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleAddCommunityClose} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={handleAddCommunitySubmit} color="primary">
                    Add
                  </Button>
                </DialogActions>
              </Dialog>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleAddCommunityClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleAddCommunitySubmit} color="primary">
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </TableContainer>
      </div>
      <Dialog
        open={deleteConfirmation.open}
        onClose={handleDeleteConfirmationClose}
      >
        <DialogTitle>{"Delete Confirmation"}</DialogTitle>
        <DialogContent>
          <div>Are you sure you want to delete this message?</div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirmationClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleDelete(
                deleteConfirmation.communityId,
                deleteConfirmation.id
              );
              handleDeleteConfirmationClose();
            }}
            color="primary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminCommunityPage;
