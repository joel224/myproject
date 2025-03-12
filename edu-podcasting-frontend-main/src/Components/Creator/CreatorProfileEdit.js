import React, { useState, useEffect } from "react";
import "../Listener//listenerregister.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import axiosInstance from "../../Baseurl";
import validator from "validator";
import { useNavigate } from "react-router-dom";

function CreatorEdit() {
  useEffect(() => {
    axiosInstance
      .post("/viewCreatorById", { id: localStorage.getItem("creatorid") })
      .then((response) => {
        console.log(response.data.data);
        document.getElementById(
          response.data.data.gender.toLowerCase()
        ).checked = "true";
        setCreatorRegister(response.data.data);
      })
      .catch((error) => {
        console.error("Error submitting data: ", error);
      });
  }, []);

  const [creatorRegister, setCreatorRegister] = useState({
    firstname: "",
    lastname: "",
    gender: "",
    dob: "",
    mobile: "",
    email: "",
    password: "",
    street: "",
    city: "",
    country: "",
    pincode: "",
    image: "",
  });

  
  const CreatorRegisterChange = (e) => {
    console.log(e.target.value);
    setCreatorRegister({
      ...creatorRegister,
      [e.target.name]:
        e.target.name === "file" ? e.target.files[0] : e.target.value,
    });
  };

  const onSubmitData = (e) => {
    e.preventDefault();

    if (!validator.isMobilePhone(creatorRegister.mobile.toString())) {
      alert("inValid Phone Number");
    } else if (
      !validator.isByteLength(creatorRegister.pincode, {
        min: 6,
        max: 6,
      })
    ) {
      alert("invalid Pincode");
    } else if (!validator.isStrongPassword(creatorRegister.password)) {
      alert(
        "password should have mininum 8 charecters including  1 Uppercase letter,1 lowercase letter, a number and special charecter "
      );
    } else {
      const formData = new FormData();
      for (let key in creatorRegister) {
        formData.append(key, creatorRegister[key]);
      }
      formData.append("image", creatorRegister.image);
      formData.append("id", localStorage.getItem("creatorid"));
      console.log(creatorRegister.image);
      axiosInstance
        .post("/editCreatorById", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          alert(response.data.msg);
          // console.log(response,"y");
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error submitting data: ", error);
        });

      console.log("Submitted");
    }
  };
  const navigate=useNavigate()

  const cancelbtn=()=>{
    navigate("/creatorprofile")
  }
  useEffect(() => {
    if (localStorage.getItem("creatorid") !== null) {
      navigate("/creatorredit");
    } else {
      navigate("/");
    }
  }, []);
    return (
    <div>
      <form onSubmit={onSubmitData}>
        <Container>
          <Row>
            {" "}
            <Col>
              <div className="text-center m-4 ps-5 ">
                <b>Edit Profile</b>
              </div>

              <div className="firstname">
                <input
                  type="text"
                  placeholder="firstname"
                  className="form-control"
                  name="firstname"
                  value={creatorRegister.firstname}
                  onChange={CreatorRegisterChange}
                />
              </div>

              <div className=" pb-3 pt-3">
                <label className="pb-3">Gender </label>
                <div>
                <label for="male">&nbsp; Male &nbsp;</label>
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="Male"
                  onChange={CreatorRegisterChange}
                  required
                />
                <label for="female">&nbsp; Female &nbsp;</label>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="Female"
                  onChange={CreatorRegisterChange}
                  required
                />
               
                </div>
              </div>
              <div className="mb-3">
              <label>Date of birth</label>
              <input
              type="date"
              placeholder="dob"
              name="dob"
              className="form-control"
              value={creatorRegister.dob}
              onChange={CreatorRegisterChange}
              required
            />
              </div>
            </Col>
            <Col>
              {" "}
              <div className="pt-5 mt-4">
              
                <input
                  type="text"
                  placeholder="lastname"
                  name="lastname"
                  className="form-control"
                  value={creatorRegister.lastname}
                  onChange={CreatorRegisterChange}
                  required
                />
              </div>
            </Col>
            <Col></Col>
          </Row>
          <Row>
            <Col>
              <div className="mb-3">
              <label>location</label>

                <input
                  type="text"
                  placeholder="street"
                  className="form-control"
                  value={creatorRegister.street}
                  name="street"
                  onChange={CreatorRegisterChange}
                  required
                />
              </div>
              <div className="mb-3">
              <label>Contact</label>

                <input
                  type="number"
                  placeholder="mobile"
                  className="form-control"
                  value={creatorRegister.mobile}
                  name="mobile"
                  onChange={CreatorRegisterChange}
                  required
                />
              </div>
              <div className="mb-3">
              <label>Email Adress</label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="form-control"
                  name="email"
                  value={creatorRegister.email}
                  id="inputwidth"
                  onChange={CreatorRegisterChange}
                  required
                />
              </div>
            </Col>
            <Col>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="city"
                  name="city"
                  className="form-control"
                  value={creatorRegister.city}
                  onChange={CreatorRegisterChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  placeholder="Pincode"
                  name="pincode"
                  className="form-control"
                  value={creatorRegister.pincode}
                  onChange={CreatorRegisterChange}
                  required
                />
              </div>
            </Col>
            <Col></Col>
          </Row>
          <div className="text-center">
            {" "}
            <button type="submit" className=" RegisterButton ps-5 pe-5 p-2">
              Save Changes
            </button>
            <button type="button" onClick={cancelbtn} className="cancelbutton ps-5 pe-5 p-2">
              Cancel
            </button>
          </div>
        </Container>
      </form>
    </div>
  );
}

export default CreatorEdit;
