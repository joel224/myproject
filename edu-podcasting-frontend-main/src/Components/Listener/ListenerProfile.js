import React, { useState, useEffect } from "react";
import "./listenerprofile.css";
import img from "../../Assest/CARD (1).png";
import axiosInstance from "../../Baseurl";
import { Link, useNavigate } from "react-router-dom";

function ListenerProfile({ url }) {
  const navigate=useNavigate()
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
  const handlelogout=()=>{
    localStorage.removeItem("listenerid")
    localStorage.removeItem("token")
    alert('logged out successfully')
    navigate('/')
  }

  useEffect(() => {
    axiosInstance
      .post("/viewListenerById", { id: localStorage.getItem("listenerid") })
      .then((response) => {
        console.log(response.data.data);
        setListenerRegister(response.data.data);
      });
    // console.log(listenerRegister);
  }, []);
  useEffect(() => {
    if (localStorage.getItem("listenerid") !== null) {
      navigate("/listenerProfile");
    } else {
      navigate("/");
    }
  }, []);
    return (
    <div className="container">
      <div className="row" id="profilemain">
        <div className="col-3">
          <img
            src={url + listenerRegister.image.filename}
            className="profile_img"
            alt="img"
          ></img>
        </div>
        <div className="col-8 mt-2">
          <div>
            <label className="profilename">
              {listenerRegister.firstname} {listenerRegister.lastname}
            </label>
            <button className="btn btn-outline-dark bg-light px-4">
              <Link to="/listeneredit" className="editlink">
                Edit
              </Link>
            </button>{" "}
            <button onClick={handlelogout} className=" RegisterButton ms-2 p-2">Logout</button>
          </div>
          <div>{listenerRegister.email}</div>
          <div>About me</div>
          <div>
            my address : {listenerRegister.street},{listenerRegister.city},
            {listenerRegister.pincode},{listenerRegister.country}
          </div>
        </div>
      </div>
      <div className="row mt-5 mb-5">
        <h5 className="mt-3">Recently Listened</h5>
        <div className="col-3">
          <card>
            <img src={img} className="profile_img" alt="img"></img>
          </card>
        </div>
        <div className="col-3">
          <card>
            <img src={img} className="profile_img" alt="img"></img>
          </card>
        </div>
        <div className="col-3">
          <card>
            <img src={img} className="profile_img" alt="img"></img>
          </card>
        </div>
        <div className="col-3">
          <card>
            <img src={img} className="profile_img" alt="img"></img>
          </card>
        </div>
      </div>
    </div>
  );
}

export default ListenerProfile;
