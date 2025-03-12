import React,{useEffect} from 'react'
import './creatorsubcription.css'
import { useNavigate } from 'react-router-dom';

function CreatorSubscription() {
  const navigate=useNavigate()

  useEffect(() => {
    if (localStorage.getItem("creatorid") !== null) {
      navigate("/creatorsubscription");
    } else {
      navigate("/");
    }
  }, []);


  return (
    <div className='Creator_subcription_main'>      
    </div>
  )
}

export default CreatorSubscription
