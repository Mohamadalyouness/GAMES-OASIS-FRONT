import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../../Components/Sidebar/Sidebar.jsx";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material"; // Import Material-UI components
import "./AdminTournementsPage.css"; // Make sure to import your CSS file

const AdminTournamentsPage = () => {
  const [tournaments, setTournaments] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteTournamentId, setDeleteTournamentId] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [teamOneName, setTeamOneName] = useState("");
  const [teamTwoName, setTeamTwoName] = useState("");
  const [gameName, setGameName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [watchLink, setWatchLink] = useState("");
  const [teamOneLogo, setTeamOneLogo] = useState(null);
  const [teamTwoLogo, setTeamTwoLogo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://games-oasis-back-1.onrender.com/api/tournament"
        );
        setTournaments(response.data);
      } catch (error) {
        console.error("Error fetching tournaments:", error);
      }

    };

    fetchData();
  }, []);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // Delete tournament by ID
      await axios.delete(
        `https://games-oasis-back-1.onrender.com/api/tournament/${deleteTournamentId}`,
        { headers }
      );

      // Update tournaments state by removing the deleted tournament
      setTournaments(
        tournaments.filter(
          (tournament) => tournament._id !== deleteTournamentId
        )
      );

      // Close the delete confirmation dialog
      setOpenDeleteDialog(false);
    } catch (error) {
      console.error("Error deleting tournament:", error);
    }
  };

  const handleDeleteConfirmation = (id) => {
    setOpenDeleteDialog(true);
    setDeleteTournamentId(id);
  };

  const handleAddTournament = async () => {
    try {
      const token = localStorage.getItem("token");
      const userRole = localStorage.getItem("userRole");

      const headers = {
        Authorization: `Bearer ${token}`,
        Role: userRole,
      };

      const formData = new FormData();
      formData.append("teamOneName", teamOneName);
      formData.append("teamTwoName", teamTwoName);
      formData.append("gameName", gameName);
      formData.append("date", date);
      formData.append("time", time);
      formData.append("watchLink", watchLink);
      formData.append("teamOneLogo", teamOneLogo);
      formData.append("teamTwoLogo", teamTwoLogo);

      const response = await axios.post(
        "https://games-oasis-back-1.onrender.com/api/tournament",
        formData,
        { headers }
      );

      setTournaments([...tournaments, response.data]);
      setOpenAddDialog(false);
    } catch (error) {
      console.error("Error adding tournament:", error);
    }
  };

  const handleTeamOneLogoChange = (event) => {
    setTeamOneLogo(event.target.files[0]);
  };

  const handleTeamTwoLogoChange = (event) => {
    setTeamTwoLogo(event.target.files[0]);
  };

  return (
    <div className="AdminTournamentsPage">
      <div className="SidebarContainer">
        <AdminSidebar className="Sidebar" />
      </div>
      <div className="RightSide">
        <div className="PageHeading">
          <h1>Hello Admin</h1>
        </div>
        <div className="TableContainer">
          <table className="TournamentsTable">
            <thead>
              <tr>
                <th>Team One</th>
                <th>Team Two</th>
                <th>Game Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Watch Link</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {tournaments.map((tournament, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={`https://games-oasis-back-1.onrender.com/assets/${tournament.teamLogos[0]}`}
                      alt={`${tournament.teamNames[0]} Logo`}
                      className="team-logo"
                    />
                    {tournament.teamNames[0]}
                  </td>
                  <td>
                    <img
                      src={`https://games-oasis-back-1.onrender.com/assets/${tournament.teamLogos[1]}`}
                      alt={`${tournament.teamNames[1]} Logo`}
                      className="team-logo"
                    />
                    {tournament.teamNames[1]}
                  </td>
                  <td>{tournament.gameName}</td>
                  <td>{tournament.date}</td>
                  <td>{tournament.time}</td>
                  <td>{tournament.watchLink}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteConfirmation(tournament._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Delete confirmation dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Delete Tournament</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this tournament?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* Add tournament dialog */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Add Tournament</DialogTitle>
        <DialogContent>
          <TextField
            label="Team One Name"
            value={teamOneName}
            onChange={(e) => setTeamOneName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Team Two Name"
            value={teamTwoName}
            onChange={(e) => setTeamTwoName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Game Name"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
          />
          <TextField
            label="Time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            fullWidth
          />
          <TextField
            label="Watch Link"
            value={watchLink}
            onChange={(e) => setWatchLink(e.target.value)}
            fullWidth
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleTeamOneLogoChange}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleTeamTwoLogoChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
          <Button
            onClick={handleAddTournament}
            variant="contained"
            color="primary"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Button
        onClick={() => setOpenAddDialog(true)}
        variant="contained"
        color="primary"
      >
        Add Tournament
      </Button>
    </div>
  );
};

export default AdminTournamentsPage;
