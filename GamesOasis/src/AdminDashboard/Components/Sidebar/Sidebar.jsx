import React, { useState } from "react";
import "./Sidebar.css";
import logo from "../../../assets/logo-02.png";
import { GiChampions } from "react-icons/gi";
import { LiaUserSecretSolid } from "react-icons/lia";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaNewspaper } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaFantasyFlightGames } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  //closedSideNavbar
  const ClosedSidebar = () => (
    <div className="closed-sidenavbar">
      <div className="interdivClosed">
        <ul className="ulsidenavbar">
          <Link to="/AdminUsersPage">
            <div className="flexflex">
              <li>
                {" "}
                <LiaUserSecretSolid className="homelogo" />
              </li>
            </div>
          </Link>
          <div className="gold-line-closed"></div>
          <Link to="/AdminNewsPage">
            <div className="flexflex">
              <li>
                <FaNewspaper className="userslogo" />
              </li>
            </div>
          </Link>
          <div className="gold-line-closed"></div>
          <Link to="/AdminTournementsPage">
            <div className="flexflex">
              <li>
                <GiChampions className="transactionlogo" />
              </li>
            </div>
          </Link>
          <div className="gold-line-closed"></div>
          <Link to="/AdminCommunitiesPage">
            <div className="flexflex">
              <li>
                <FaFantasyFlightGames  className="transactionlogo" />
              </li>
            </div>
          </Link>
          <div className="gold-line-closed"></div>
        </ul>
      </div>
    </div>
  );

  return (
    <div className={`adminsidenavbar ${isOpen ? "open" : ""}`}>
      <div className="navbar-toggle" onClick={toggleNavbar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>
      {isOpen ? (
        <>
          <img className="logosidenavbar" src={logo} alt="Logo" />
          <div className="interdivadmin">
            <ul className="ulsidenavbar">
              <Link to="/AdminUsersPage">
                <div className="flexflex">
                  <li>
                    {" "}
                    <LiaUserSecretSolid className="homelogo" /> Users
                  </li>
                </div>
              </Link>
              <div className="gold-line"></div>
              <Link to="/NewsAdminPage">
                <div className="flexflex">
                  <li>
                    <FaNewspaper className="userslogo" /> News
                  </li>
                </div>
              </Link>
              <div className="gold-line"></div>
              <Link to="/AdminTournementsPage">
                <div className="flexflex">
                  <li>
                    <GiChampions className="transactionlogo" /> Tournements{" "}
                  </li>
                </div>
              </Link>
              <div className="gold-line"></div>
              <Link to="/AdminCommunitiesPage">
                <div className="flexflex">
                  <li>
                    <FaFantasyFlightGames  className="transactionlogo" /> Communites{" "}
                  </li>
                </div>
              </Link>
              <div className="gold-line"></div>
              
            </ul>
          </div>
        </>
      ) : (
        <ClosedSidebar />
      )}
    </div>
  );
};

export default Sidebar;
