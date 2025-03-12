import React, { useEffect } from "react";
import { IoAdd } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Baseurl";

function CreatorUploadPoadcastEdit() {
  useEffect(()=>{
    axiosInstance
        .post("/getPodcastByID",{
          id: localStorage.getItem("creatorid")
        })
        .then((response) => {
          // alert(response.data.msg);
          console.log(response,"y");
          // window.location.reload();
        })
        .catch((error) => {
          console.error("Error submitting data: ", error);
        });
  })
  // const [creatorRegister, setCreatorRegister] = useState({
  //   firstname: "",
  //   lastname: "",
  //   gender: "",
  //   dob: "",
  //   mobile: "",
  //   email: "",
  //   password: "",
  //   street: "",
  //   city: "",
  //   country: "",
  //   pincode: "",
  //   image: "",
  // });
  // const CreatorRegisterChange = (e) => {
  //   console.log(e.target.value);
  //   setCreatorRegister({
  //     ...creatorRegister,
  //     [e.target.name]:
  //       e.target.name === "file" ? e.target.files[0] : e.target.value,
  //   });
  // };

  // const onSubmitData = (e) => {
  //   e.preventDefault();

  //   if (!validator.isMobilePhone(creatorRegister.mobile.toString())) {
  //     alert("inValid Phone Number");
  //   } else if (
  //     !validator.isByteLength(creatorRegister.pincode, {
  //       min: 6,
  //       max: 6,
  //     })
  //   ) {
  //     alert("invalid Pincode");
  //   } else if (!validator.isStrongPassword(creatorRegister.password)) {
  //     alert(
  //       "password should have mininum 8 charecters including  1 Uppercase letter,1 lowercase letter, a number and special charecter "
  //     );
  //   } else {
  //     const formData = new FormData();
  //     for (let key in creatorRegister) {
  //       formData.append(key, creatorRegister[key]);
  //     }
  //     formData.append("image", creatorRegister.image);
  //     formData.append("id", localStorage.getItem("creatorid"));
  //     console.log(creatorRegister.image);
  //     axiosInstance
  //       .post("/editCreatorById", formData, {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       })
  //       .then((response) => {
  //         alert(response.data.msg);
  //         // console.log(response,"y");
  //         window.location.reload();
  //       })
  //       .catch((error) => {
  //         console.error("Error submitting data: ", error);
  //       });

  //     console.log("Submitted");
  //   }
  // };

  const navigate = useNavigate();

  const handleback = () => {
    navigate("/creatorhome");
  };
  const handleEpisodes = () => {
    navigate("/creatorepisodadd");
  };


  useEffect(() => {
    if (localStorage.getItem("creatorid") !== null) {
      navigate("/creatoruploadedit");
    } else {
      navigate("/");
    }
  }, []);  
  return (
    <div className="podcast_upload">
      <div className="container">
        <h4 className="text-center">Edit Podcast</h4>
        <div className="row">
          <div className="col">
            <label className="Creator_Name_label" for="">
              Creator Name
            </label>
            <input
              type="text"
              class="form-control"
              id="Creator_Name"
              placeholder="User name"
            ></input>
            <label className="Creator_Name_label" for="">
              Podcast Name
            </label>
            <input
              type="text"
              class="form-control"
              id="podcast_Name"
              placeholder="Title"
            ></input>
            <label className="Creator_Name_label" for="">
              Description
            </label>
            <textarea
              name="postContent"
              class="form-control"
              id="description"
              rows={4}
              cols={40}
            />
          </div>
          <div className="col">
            <label className="Creator_Name_label" for="">
              Cover Image
            </label>
            <h1>image</h1>
            <label className="Creator_Name_label" for="">
              Audio MP3
            </label>
            <h1>Audio</h1>
            <p>Total duration : </p>
            <button className="btn btn-light">Change Audio</button>
          </div>
        </div>
        <button className="btn btn-light ms-3 px-5">Save</button>
        <button
          onClick={handleEpisodes}
          className="btn ms-3 "
          id="newepisodeid"
        >
          {" "}
          <IoAdd /> New Episode
        </button>
        <button
          onClick={handleback}
          className="btn btn-secondary ms-3 px-5 text-center"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default CreatorUploadPoadcastEdit;
