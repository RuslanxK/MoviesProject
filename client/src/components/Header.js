import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoCamera, faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getById } from "../utils";
import {baseUrl} from '../services'


const usersURL = `${baseUrl}/api/users`;

const Header = () => {
  const [user, setUser] = useState({});

  const userId = sessionStorage["userid"];

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { data: user } = await getById(usersURL, userId);
      setUser(user);
    };
    fetchData();
  }, []);

  return (
    <div className="header">
      <div className="header-container">
        <div className="logo">
          <h1>MM</h1>
          <FontAwesomeIcon icon={faVideoCamera} />
        </div>

        <nav className="nav">
          <span onClick={() => navigate("/movies")}>Movies</span>
          <span onClick={() => navigate("/members")}>Members</span>
          <span onClick={() => console.log(user)}>About us</span>
        </nav>
        <div className="userInfo">
          <span id="fullname">
            <span id="icon">
              <FontAwesomeIcon icon={faUser} /> {user?.fullname}
            </span>
          </span>
          <button className="logout" onClick={() => navigate("/")}>
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
