import React from "react";
import { Container } from "react-bootstrap";
import "./Admin.css";

function AdminLandingPage() {
  return (
    <div className="AdminHomebody">
      <Container>
        <div className="row">
          <div className="col-7">
            <div className="AdminHomebodyheading">
              welcome ,<span> Admin! </span>
            </div>
            <div className="AdminHomebodyparagraph"> 
              your central hub for steering the vibrant podcasting community!
              Here, you hold the reins, managing podcasts, connecting with
              creators, and overseeing user experiences with seamless ease.
            </div>
            <div>
              <button className="Adminloginbtn">Log in</button>
            </div>
          </div>
          <div className="col-5"></div>
        </div>
      </Container>
    </div>
  );
}

export default AdminLandingPage;
