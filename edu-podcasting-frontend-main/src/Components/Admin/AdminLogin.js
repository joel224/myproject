import React, { useState, useEffect } from "react";
import "./adminlogin.css";
import { BsArrowClockwise } from "react-icons/bs";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Baseurl";
import { toast } from "react-toastify";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [captchaText, setCaptchaText] = useState("");
  const [userCaptchaInput, setUserCaptchaInput] = useState("");

  const navigate = useNavigate();

  const generateCaptcha = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
  };

  const handleCaptchaInputChange = (e) => {
    setUserCaptchaInput(e.target.value);
  };
  const handleReset = () => {
    setUsername("");
    setPassword("");
    setUserCaptchaInput("");
    generateCaptcha();
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  // let adminName = "Admin";
  // let adminPassword = "Admin@123";

  let handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await axiosInstance.post("/admin_login", {
        email: username,
        password: password,
      }); 
      if (result.data.message) {
        if (userCaptchaInput === captchaText) {
          toast.success("Login successful");
          localStorage.setItem("token", result.data.token);
          localStorage.setItem("creatorid", result.data.id);
          console.log(result);
          alert(result.data.message);
          console.log(result.data.id);

          navigate("/admin_dashboard");
        } else {
          document.getElementById("alertuser").innerHTML =
            "Invalid CAPTCHA. Please enter the correct text.";
        }
      }
    } catch (err) {
      console.log("Error:", err);
      if (err.response && err.response.data && err.response.data.message) {
        document.getElementById("alertuser").innerHTML =
          err.response.data.message;
      } else {
        document.getElementById("alertuser").innerHTML =
          "An error occurred. Please try again.";
      }
    }
    // if (
    //   username === adminName &&
    //   password === adminPassword &&
    //   userCaptchaInput.toUpperCase() === captchaText.toUpperCase()
    // ) {
    //   localStorage.setItem("token", "zxcvbngh");
    //   navigate("/admin_dashboard");
    // } else {
    //   if (userCaptchaInput.toUpperCase() !== captchaText.toUpperCase()) {
    //     document.getElementById("alertuser").innerHTML =
    //       "Please enter the correct captcha!";
    //   } else {
    //     document.getElementById("adminerror").innerHTML =
    //       "Please enter correct username and password!";
    //   }
    // }
  };
  

  return (
    <div className="adminlogin_body">
      <div className="adminlogin_bodyheading">
        <h1 className="mb-4" style={{ fontSize: "40px" }}>
          {" "}
          Admin ,<span> Log in ! </span>
        </h1>
        <form type="Submit" onSubmit={handleLogin} onReset={handleReset}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              type="text"
              placeholder="User Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div id="adminerror"></div>
            <p className="listener_forgot-password">forgot password ?</p>
          </Form.Group>
          <div className="col-6 listenerCaptcha mt-5 mb-3">
            <div class="captchaborder mt-3">
              <div class="card-body club_login_captcha">
                <h5 class="card-title">{captchaText}</h5>
                <button
                  type="button"
                  id="refreshbutton"
                  className="btn btn-primary"
                  onClick={generateCaptcha}
                >
                  <BsArrowClockwise />
                </button>
              </div>
            </div>
          </div>
          <div className="club_login_inputs mt-4">
            <input
              type="text"
              placeholder="Enter the Captcha"
              className="form-control mb-4"
              value={userCaptchaInput}
              onChange={handleCaptchaInputChange}
            />
          </div>
          <div id="alertuser"></div>
          <div>
            <button type="submit" className="listenerloginbtn mb-2 p-1 ">
              Log in
            </button>{" "}
          </div>
          <div>
            <button
              type="reset"
              className="listenercancelbtn p-1 mb-5"
              variant="secondary"
            >
              Cancel
            </button>{" "}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
