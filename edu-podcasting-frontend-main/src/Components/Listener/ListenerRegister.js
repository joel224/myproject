import React, { useState } from "react";
import "./listenerregister.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import axiosInstance from "../../Baseurl";
import validator from 'validator' 
import { useNavigate } from "react-router-dom";

function ListenerRegister() {
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
  
  const navigate=useNavigate()


  const ListenerRegisterChange = (e) => {
    console.log(e.target.value)
    setListenerRegister({
      ...listenerRegister,
      [e.target.name]: e.target.name === 'file' ? e.target.files[0] : e.target.value,
    });
  };
  
  const onSubmitData = (e) => {
    e.preventDefault();

    if (!validator.isMobilePhone(listenerRegister.mobile) || !validator.isByteLength(listenerRegister.mobile, {
      min: 10,
      max: 10
    })) {
      alert("inValid Phone Number");
    } else if (!validator.isByteLength(listenerRegister.pincode, {
      min: 6,
      max: 6
    })) {
      alert("invalid Pincode");
    } else if (!validator.isStrongPassword(listenerRegister.password)) {
      alert("password should have mininum 8 charecters including  1 Uppercase letter,1 lowercase letter, a number and special charecter ");
    } else {
      const formData = new FormData();
    for (let key in listenerRegister) {
      formData.append(key, listenerRegister[key]);
    }
    formData.append("image", listenerRegister.image);
    console.log(listenerRegister.image);
    axiosInstance
      .post('/listenerregister', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        alert(response.data.msg)
        // window.location.reload();
        navigate("/listenerlogin")
      })
      .catch((error) => {
        console.error("Error submitting data: ", error);
      });

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
            <div className="text-center mb-4 ps-5 mt-4"><b>Register</b></div>
            <label>Name</label>
            <div className="firstname">
                <input
                  type="text"
                  required
                  placeholder="firstname"
                  className="form-control"
                  name="firstname"
                  id="inputtransparent"
                  value={listenerRegister.firstname}
                  onChange={ListenerRegisterChange}
                />
              </div>
              <div className="mb-2 mt-3 ">
                <label className="pb-3">Gender :</label>
                <div>
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
              </div>
              <div className="mb-2 mt-3">
                <input
                  type="date"
                  placeholder="dob"
                  name="dob"
                  id="inputtransparent"
                  className="form-control"
                  value={listenerRegister.dob}
                  onChange={ListenerRegisterChange}
                  required
                />
              </div>
            </Col>
            <Col>
              {" "}
              <div className="pt-5 mt-5">
                <input
                  type="text"
                  placeholder="lastname"
                  name="lastname"
                  id="inputtransparent"

                  className="form-control"
                  value={listenerRegister.lastname}
                  onChange={ListenerRegisterChange}
                  required
                />
              </div>
            </Col>
            <Col></Col>
          </Row>
          <Row>
            <Col>
            <div className="mb-2 mt-3">
            <input
              type="text"
              placeholder="street"
              name="street"
              id="inputtransparent"

              className="form-control"
              value={listenerRegister.street}
              onChange={ListenerRegisterChange}
              required
            />
          </div>
              <div className="mb-2 mt-3">
                <input
                  type="number"
                  placeholder="mobile"
                  className="form-control"
                  id="inputtransparent"

                  value={listenerRegister.mobile}
                  name="mobile"
                  onChange={ListenerRegisterChange}
                  required
                />
              </div>
              <div className="mb-2 mt-3">
                <input
                  type="email"
                  id="inputtransparent"

                  placeholder="Enter your email"
                  className="form-control"
                  name="email"
                  value={listenerRegister.email}
                  onChange={ListenerRegisterChange}
                  required
                />
              </div>
              <div className="mb-2 mt-3">
                <input
                  type="password"
                  placeholder="password"
                  id="inputtransparent"

                  name="password"
                  className="form-control"
                  value={listenerRegister.password}
                  onChange={ListenerRegisterChange}
                  required
                />
              </div>
              <div className="mb-2 mt-3">
                <select
                  id="country-state"
                  name="country"
                  className="form-control"
                  onChange={ListenerRegisterChange}
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
              <div className="mb-2 mt-3">
                Profile Picture
                <br />
                <input
                type="file"
                placeholder="Choose file"
                id="inputtransparent"

                className="form-control"
                name="file"
                onChange={ListenerRegisterChange}
                required
                />
              </div>
            </Col>
            <Col>
              <div className="mb-2 mt-3">
                <input
                  type="text"
                  placeholder="city"
                  name="city"
                  className="form-control"
                  id="inputtransparent"

                  value={listenerRegister.city}
                  onChange={ListenerRegisterChange}
                  required
                />
              </div>
              <div className="mb-2 mt-3">
                <input
                  type="number"
                  placeholder="Pincode"
                  name="pincode"
                  id="inputtransparent"

                  className="form-control"
                  value={listenerRegister.pincode}
                  onChange={ListenerRegisterChange}
                  required
                />
              </div>
            </Col>
            <Col></Col>
            <Col></Col>
          </Row>
          <div className="text-center">
            {" "}
            <button type="submit"  className=" RegisterButton ps-5 pe-5 p-2 mt-5 mb-5">
              Register
            </button>
            <button type="reset" className="cancelbutton ps-5 pe-5 p-2 mt-5 mb-5">
              Cancel
            </button>
          </div>
        </Container></div>
      </form>
    </div>
  );
}

export default ListenerRegister;
