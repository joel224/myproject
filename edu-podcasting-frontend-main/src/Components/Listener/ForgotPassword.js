import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import "./landingnav.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from '../../Baseurl';

function ForgotPassword() {
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const[conformpassword,setConformpassword]=useState("")

  const navigate = useNavigate();

//   useEffect(() => {
//     if (localStorage.getItem("listenerid") !== null) {
//       navigate("/forgotpassword");
//     } else {
//       navigate("/");
//     }
//   }, []);

// const handlesubmit=(e)=>{
//   e.preventDefault()
//   if(!email){
//     alert("please enter your mail id")
//     return
//   }
//   const credentials={email}
//   sendDataToServer(credentials,e);

//   console.log(credentials);
// }
// const sendDataToServer = (credentials,e) => {
//   e.preventDefault();
//   axiosInstance.post(`/listenerforgotPassword`, credentials).then((res) => {
//     console.log(credentials);

//    console.log(res);
//     if (res.data.status === 200) {
//       // alert("Request send successful");
//  navigate('/reader_forgotpswdsec')

//     } else {
//       alert("Sorry !! Some Internal Issues");
//     }
//   });

// };
const handleforgot=async(e)=>{
  e.preventDefault()

const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    if (!validateEmail(email)) {
      document.getElementById("alertuser").innerHTML =
        "Please enter a valid email";
      return;
    }
    if (password === "") {
      document.getElementById("alertuser").innerHTML = "password is empty";
      return;
    }
    if (conformpassword === "") {
      document.getElementById("alertuser").innerHTML = "conform password is empty";
      return;
    }
    if (password == conformpassword) {
      document.getElementById("alertuser").innerHTML = "password is not matched";
      return;
    }
    try {
      const result = await axiosInstance.post("/listenerforgotpassword", {
        email,
        password,
        conformpassword
      })
      if (result.data.message) {
          alert("Login successful");
          // localStorage.setItem("token", result.data.token);
          // localStorage.setItem("listenerid", result.data.id);
          // console.log(result);
          // console.log(result.data.id);
          // navigate("/listenerhome");
        } 
      }
     catch (err) {
      console.log("Error:", err);
      if (err.response && err.response.data && err.response.data.message) {
        document.getElementById("alertuser").innerHTML =
          err.response.data.message;
      } else {
        document.getElementById("alertuser").innerHTML =
          "An error occurred. Please try again.";
      }
    }
  }
  return (
    <div>
      <div>
        <div className="listenerforgot_main">
          <div className="row">
            <div className="col-6"></div>
            <div className="col-6">
              <h6 className="pt-5 mt-5 text-center">Change password</h6>
              <div className="listenerlogin_form">
                <form type="Submit">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control type="email" placeholder="Email Address" />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control type="password" placeholder="new password" />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="password"
                      placeholder="Conform password"
                    />
                  </Form.Group>

                  <div>
                    <button onSubmit={handleforgot} type="submit" className="listenerloginbtn mb-2 p-1">
                      Conform
                    </button>{" "}
                  </div>
                  <div>
                    <button
                      type="reset"
                      className="listenercancelbtn p-1"
                      variant="secondary"
                    >
                      Cancel
                    </button>{" "}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
