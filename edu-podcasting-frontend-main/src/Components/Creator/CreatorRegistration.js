import React, { useState } from "react";
import "../Creator/creator.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import axiosInstance from "../../Baseurl";
import validator from "validator";
import { useNavigate } from "react-router-dom";

function CreatorRegister() {
  const [CreatorRegister, setCreatorRegister] = useState({
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

  const navigate=useNavigate()

  const creatorRegisterChange = (e) => {
    console.log(e.target.value);
    setCreatorRegister({
      ...CreatorRegister,
      [e.target.name]:
        e.target.name === "file" ? e.target.files[0] : e.target.value,
    });
  };

  const onSubmitData = (e) => {
    e.preventDefault();

    if (!validator.isMobilePhone(CreatorRegister.mobile)|| !validator.isByteLength(CreatorRegister.mobile,{
      min: 10,
      max: 10
    })) {
      alert("inValid Phone Number");
    } else if (
      !validator.isByteLength(CreatorRegister.pincode, {
        min: 6,
        max: 6,
      })
    ) {
      alert("invalid Pincode");
    } else if (!validator.isStrongPassword(CreatorRegister.password)) {
      alert(
        "password should have mininum 8 charecters including  1 Uppercase letter,1 lowercase letter, a number and special charecter "
      );
    } else {
      const formData = new FormData();
      for (let key in CreatorRegister) {
        formData.append(key, CreatorRegister[key]);
      }
      formData.append("image", CreatorRegister.image);
      console.log(CreatorRegister.image);
      axiosInstance
        .post("/CreatorRegister", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response, "y");
          alert(response.data.msg);
          navigate("/creatorlogin")

        })
        .catch((error) => {
          console.error("Error submitting data: ", error);
        });

      console.log("Submitted");
    }
  };

  return (
    <div>
      <form onSubmit={onSubmitData}>
        <div className="backgroundimg">
          <Container>
            <Row>
              {" "}
              <Col>
                <div className="text-center ms-5 ps-5 mt-4">
                  <b>Register</b>
                </div>

                <label>Name</label>
                <div className="firstname">
                  <input
                    type="text"
                    placeholder="firstname"
                    className="form-control"
                    name="firstname"
                    id="inputtransparent"
                    value={CreatorRegister.firstname}
                    onChange={creatorRegisterChange}
                  />
                </div>
                <div className="mb-2 mt-3">
                  <label className="pb-3">Gender</label>
                  <div>
                    <label for="male">&nbsp; Male &nbsp;</label>
                    <input
                      type="radio"
                      id="male"
                      name="gender"
                      value="Male"
                      onChange={creatorRegisterChange}
                      required
                    />
                    <label for="female">&nbsp; Female &nbsp;</label>
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      value="Female"
                      onChange={creatorRegisterChange}
                      required
                    />
                    <label for="other">&nbsp; Other &nbsp;</label>

                    <input
                      type="radio"
                      id="other"
                      name="gender"
                      value="Other"
                      onChange={creatorRegisterChange}
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
                    id="inputtransparent"
                    className="form-control"
                    value={CreatorRegister.dob}
                    onChange={creatorRegisterChange}
                    required
                  />
                </div>
              </Col>
              <Col>
                {" "}
                <div className="mt-5  mb-3">
                  <label></label>

                  <input
                    type="text"
                    id="inputtransparent"
                    placeholder="lastname"
                    name="lastname"
                    className="form-control"
                    value={CreatorRegister.lastname}
                    onChange={creatorRegisterChange}
                    required
                  />
                </div>
              </Col>
              <Col></Col>
            </Row>
            <Row>
              <Col>
                <label>location</label>

                <div className="mb-3">
                  <input
                    type="text"
                    id="inputtransparent"
                    placeholder="street"
                    className="form-control"
                    value={CreatorRegister.street}
                    name="street"
                    onChange={creatorRegisterChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>Contact</label>
                  <input
                    id="inputtransparent"
                    type="number"
                    placeholder="mobile"
                    className="form-control"
                    value={CreatorRegister.mobile}
                    name="mobile"
                    onChange={creatorRegisterChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>Email verification</label>

                  <input
                    id="inputtransparent"
                    type="email"
                    placeholder="Enter your email"
                    className="form-control"
                    name="email"
                    value={CreatorRegister.email}
                    onChange={creatorRegisterChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    id="inputtransparent"
                    type="password"
                    placeholder="password"
                    name="password"
                    className="form-control"
                    value={CreatorRegister.password}
                    onChange={creatorRegisterChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <select
                    id="inputtransparent"
                    name="country"
                    className="form-control"
                    onChange={creatorRegisterChange}
                  >
                    <option value="">Select Country</option>
                    <option>Nationality</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                    <option value="India">India</option>
                    <option value="France">France</option>
                    <option value="Germany">Germany</option>
                    <option value="Japan">Japan</option>
                    <option value="China">China</option>
                    <option value="Brazil">Brazil</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Spain">Spain</option>
                    <option value="Italy">Italy</option>
                    <option value="Russia">Russia</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="South Africa">South Africa</option>
                  </select>
                </div>
                <div className="mb-3">
                  Profile Picture
                  <br />
                  <input
                    type="file"
                    id="inputtransparent"
                    placeholder="Choose file"
                    className="form-control"
                    name="file"
                    onChange={creatorRegisterChange}
                    required
                  />
                </div>
              </Col>
              <Col>
                <div className="mb-3 pt-4">
                  <input
                    type="text"
                    placeholder="city"
                    name="city"
                    id="inputtransparent"
                    className="form-control"
                    value={CreatorRegister.city}
                    onChange={creatorRegisterChange}
                    required
                  />
                </div>
                <div className="mb-3 pt-4">
                  <input
                    type="number"
                    id="inputtransparent"
                    placeholder="Pincode"
                    name="pincode"
                    className="form-control"
                    value={CreatorRegister.pincode}
                    onChange={creatorRegisterChange}
                    required
                  />
                </div>
              </Col>
              <Col></Col>
            </Row>
            <div className="text-center">
              {" "}
              <button
                type="submit"
                className=" RegisterButton ps-5 pe-5 p-2 mt-5 mb-5"
              >
                Register
              </button>
              <button
                type="reset"
                className="cancelbutton ps-5 pe-5 p-2 mt-5 mb-5"
              >
                Cancel
              </button>
            </div>
          </Container>
        </div>
      </form>
    </div>
  );
}

export default CreatorRegister;
