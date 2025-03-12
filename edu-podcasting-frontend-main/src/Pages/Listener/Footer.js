import React from "react";
import "./footer.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import img from "../../Assest/Logo (3).png";
import { RiInstagramFill } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { CiCircleQuestion } from "react-icons/ci";
import { PiCopyrightThin } from "react-icons/pi";

function Footer() {
  return (
    <div>
      <div className="footer_body">
        <Row>
          <Col>
            {" "}
            <img className="footerimg" src={img} alt="img"></img>
          </Col>
          <Col className="ms-5">
            <h6 className="footerhead">CONSUMER POLICY</h6>
            <p>Toggleerms and conditons</p>
            <p>Complaints</p>
            <p>Privacy policy</p>
          </Col>
          <Col>
            <h6 className="footerhead">HELP</h6>
            <p>Security</p>
            <p>F&q</p>
            <p>Privacy</p>
          </Col>
          <Col>
            <h6 className="footerhead">ABOUT</h6>
            <p>About US</p>
            <p>Achievements</p>
          </Col>
          <Col>
            <h6 className="footerhead">SOCIAL</h6>
            <p className="footerbody">
              <RiInstagramFill /> &nbsp; <FaFacebook /> &nbsp; <FaThreads />
              &nbsp; <FaXTwitter /> &nbsp; <IoMdMail />
            </p>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <CiCircleQuestion /> HELP CENTER
          </Col>
          <Col></Col>
          <Col>
            {" "}
            <PiCopyrightThin /> Srishticampus@2023
          </Col>
          <Col></Col>
          <Col>WWW.edushere.com</Col>
        </Row>
      </div>
    </div>
  );
}

export default Footer;
