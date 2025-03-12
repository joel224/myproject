import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../Assest/Logo (1).png";
import "./listenernav.css";
import Nav from "react-bootstrap/Nav";
import axiosInstance from "../../Baseurl";

function ListenerNav({ url }) {
  const [listenernav, setListenernav] = useState("");
  useEffect(() => {
    axiosInstance
      .post("/viewListenerById", { id: localStorage.getItem("listenerid") })
      .then((response) => {
        if (
          response.data.data &&
          response.data.data.image
        ) {
          console.log(response.data.data.image.filename);
          setListenernav(response.data.data.image.filename);
        }
        console.log(listenernav, "mm");
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
              href="/listenerhome"
              className="landingpage_links me-5"
              id="landingpage_links_hover"
            >
              Home
            </Nav.Link>
            <Nav.Link
              href="/listenersubscription"
              className="landingpage_links me-5"
              id="landingpage_links_hover"
            >
              Subscription
            </Nav.Link>
            <Nav.Link
              href="/listenerWhishlist"
              className="landingpage_links me-5"
              id="landingpage_links_hover"
            >
              wishlist
            </Nav.Link>
            <Nav.Link class="nav-link" href="/listenerProfile">
              <div className="circular-img">
                <img
                  src={url + listenernav}
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

export default ListenerNav;
// src={`${url}/${data.image.filename}`}
