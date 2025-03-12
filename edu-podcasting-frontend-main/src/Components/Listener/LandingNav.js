import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../Assest/Logo (1).png";
import "./landingnav.css";
import Nav from "react-bootstrap/Nav";

function LandingNav({ props }) {
  // const [beforelogin,setBeforelogin]=useState()
  // const [afterlogin,setAfterlogin]=useState()

  // let beforeLogin = [
  //   { content: "Home", path: "./HomePage.js" },
  //   {
  //     content: "Login",
  //     path: "./ListenerLogin.js",
  //   },
  //   { content: "register", path: "./ListenerRegister.js" },
  // ];
  // let afterLogin =

  // let data = props.isRegisterdUser ? afterLogin : beforeLogin;

  // console.log(data);

  let data;

  switch (props.value) {
    case "listenerlanding":
      data = [
        { content: "Home", path: "/" },
        {
          content: "Login",
          path: "./ListenerLogin",
        },
        { content: "register", path: "./ListenerRegister" },
      ];
      break;
    case "creatorlanding":
      data = [
        { content: "Home", path: "/" },
        {content: "Login", path: "./creatorlogin"},
        { content: "register", path: "./creatorregister" },
      ];
      break;
    default:
      data = [];
  }

  return (
    <div>
      <Navbar>
        <Container>
          <Navbar.Brand href="#home">
            <img className="footerimg" src={logo} alt="img"></img>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {data.map((item, index) => (
              <Nav.Link
                key={index}
                href={item.path}
                className="landingpage_links me-5"
                id="landingpage_links_hover"
              >
                {item.content}
              </Nav.Link>
            ))}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default LandingNav;
