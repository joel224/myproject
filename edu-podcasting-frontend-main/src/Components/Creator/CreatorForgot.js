import React,{useEffect} from 'react'
import Form from 'react-bootstrap/Form';
import './creator.css'
import { useNavigate } from 'react-router-dom';
function CreatorForgot() {
  const navigate=useNavigate()

  useEffect(() => {
    if (localStorage.getItem("creatorid") !== null) {
      navigate("/creatorforgotpassword");
    } else {
      navigate("/");
    }
  }, []);
    return (
          <div className="creatorforgot_main">
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
                      <Form.Control type="email" placeholder="Email Address"/>
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control type="password" placeholder="new password"/>
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control type="password" placeholder="Conform password"/>
                    </Form.Group>
                    
                    <div>
                    <button type="submit" className="listenerloginbtn mb-2 p-1">Conform</button>{' '}</div>
                    <div>
                    <button type="reset" className="listenercancelbtn p-1" variant="secondary">Cancel</button>{' '}</div>
                  </form>
                </div>
              </div>
            </div>
          </div>
    )    
}

export default CreatorForgot;


