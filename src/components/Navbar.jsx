import axios from "axios";
import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function Header({ user }) {
  // console.log(user);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    // console.log("token frm nav: ", token);
    if (!token) {
      return;
    }
    axios("https://authnastedformapi.onrender.com")
      .then((response) => {
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <Navbar className="Navbg">
      <Container>
        <Navbar.Brand href="#" className="text-white">
          Navbar
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {user ? (
            <Navbar.Text className="text-white m-2">
              Hello,{" "}
              <Link to="profile" className="text-white m-2">
                {user.name}
              </Link>{" "}
              |{" "}
              <a href="" onClick={logout} className="text-white m-2">
                Logout
              </a>
            </Navbar.Text>
          ) : (
            <Navbar.Text className="text-white">
              <Link to="login" className="text-white m-2">
                Login
              </Link>{" "}
              |{" "}
              <Link to="register" className="text-white m-2">
                Register
              </Link>
            </Navbar.Text>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
