import React, { useState, useEffect } from "react";
import "./listenerregister.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import axiosInstance from "../../Baseurl";
import validator from "validator";

import { useNavigate } from "react-router-dom";

function ListenerEdit() {
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .post("/viewListenerById", { id: localStorage.getItem("listenerid") })
      .then((response) => {
        console.log(response.data.data);
        document.getElementById(
          response.data.data.gender.toLowerCase()
        ).checked = "true";
        setListenerRegister(response.data.data);
      })
      .catch((error) => {
        console.error("Error submitting data: ", error);
      });
  }, []);

  const [listenerRegister, setListenerRegister] = useState({
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
  const ListenerRegisterChange = (e) => {
    console.log(e.target.value);
    setListenerRegister({
      ...listenerRegister,
      [e.target.name]:
        e.target.name === "file" ? e.target.files[0] : e.target.value,
    });
  };

  const onSubmitData = (e) => {
    e.preventDefault();

    if (!validator.isMobilePhone(listenerRegister.mobile.toString())) {
      alert("inValid Phone Number");
    } else if (
      !validator.isByteLength(listenerRegister.pincode, {
        min: 6,
        max: 6,
      })
    ) {
      alert("invalid Pincode");
    } else if (!validator.isStrongPassword(listenerRegister.password)) {
      alert(
        "password should have mininum 8 charecters including  1 Uppercase letter,1 lowercase letter, a number and special charecter "
      );
    } else {
      const formData = new FormData();
      for (let key in listenerRegister) {
        formData.append(key, listenerRegister[key]);
      }
      formData.append("image", listenerRegister.image);
      formData.append("id", localStorage.getItem("listenerid"));
      console.log(listenerRegister.image);
      axiosInstance
        .post("/editListenerById", formData, {
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

  useEffect(() => {
    if (localStorage.getItem("listenerid") !== null) {
      navigate("/listeneredit");
    } else {
      navigate("/");
    }
  }, []);
    return (
    <div>
      <form onSubmit={onSubmitData}>
        <Container>
          {" "}
          <Row>
            {" "}
            <Col>
              <div className="text-center mb-4">Edit Profile</div>
              <div className="firstname">
                <input
                  type="text"
                  placeholder="firstname"
                  className="form-control"
                  name="firstname"
                  value={listenerRegister.firstname}
                  onChange={ListenerRegisterChange}
                />
              </div>
              <div className="col-12 pb-3 mt-4 ">
                <label className="pb-3">Gender :</label>
                <label for="male">&nbsp; Male &nbsp;</label>
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="Male"
                  onChange={ListenerRegisterChange}
                  required
                />
                <label for="female">&nbsp; Female &nbsp;</label>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="Female"
                  onChange={ListenerRegisterChange}
                  required
                />
              </div>
              <div className="mb-3 me-5">
              <label>Date of birth</label>
                <input
                  type="date"
                  placeholder="dob"
                  name="dob"
                  className="form-control"
                  value={listenerRegister.dob}
                  onChange={ListenerRegisterChange}
                  required
                />
              </div>
            </Col>
            <Col>
              {" "}
              <div className="lastname mt-5">
                <input
                  type="text"
                  placeholder="lastname"
                  className="form-control"
                  name="lastname"
                  value={listenerRegister.lastname}
                  onChange={ListenerRegisterChange}
                />
              </div>
            </Col>
            <Col></Col>
          </Row>
          <Row>
            <Col>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="street"
                  name="street"
                  className="form-control"
                  value={listenerRegister.street}
                  onChange={ListenerRegisterChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  placeholder="mobile"
                  className="form-control"
                  value={listenerRegister.mobile}
                  name="mobile"
                  onChange={ListenerRegisterChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="form-control"
                  name="email"
                  value={listenerRegister.email}
                  id="inputwidth"
                  onChange={ListenerRegisterChange}
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
                  value={listenerRegister.city}
                  onChange={ListenerRegisterChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  placeholder="Pincode"
                  name="pincode"
                  className="form-control"
                  value={listenerRegister.pincode}
                  onChange={ListenerRegisterChange}
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
            <button type="reset" className="cancelbutton ps-5 pe-5 p-2">
              Cancel
            </button>
          </div>
        </Container>
      </form>
    </div>
  );
}

export default ListenerEdit;
