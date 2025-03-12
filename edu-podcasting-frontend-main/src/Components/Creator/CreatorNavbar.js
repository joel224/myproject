import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../Assest/Logo (1).png";
import "../Listener/listenernav.css";
import Nav from "react-bootstrap/Nav";
import axiosInstance from "../../Baseurl";

function CreatorNavbar({url}) {
  const [creatornav, setCreatornav] = useState("");
  useEffect(() => {
    axiosInstance
      .post("/viewCreatorById", { id: localStorage.getItem("creatorid") })
      .then((response) => {
        if (
          response.data.data &&
          response.data.data.image
        ) {
          console.log(response.data.data.image.filename);
          setCreatornav(response.data.data.image.filename);
        }else{
          console.log(creatornav, "mm");
        }
      });
  },[]);

  return (
    <div>
      <Navbar>
        <Container>
          <Navbar.Brand href="#home">
            <img className="footerimg" src={logo} alt="img"></img>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav.Link
              href="/creatorhome"
              className="landingpage_links me-5"
              id="landingpage_links_hover"
            >
              Home
            </Nav.Link>
            <Nav.Link
              href="/subscription"
              className="landingpage_links me-5"
              id="landingpage_links_hover"
            >
              Subscribers
            </Nav.Link>
            <Nav.Link class="nav-link" href="/creatorprofile">
              <div className="circular-img">
                <img
                  src={url+creatornav}
                  alt="img"
                  className="profileimg"
                ></img>
              </div>
            </Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default CreatorNavbar;
// {`${url}/${data.image.filename}`}
