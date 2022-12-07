import React, { useState } from "react";
import axios from "axios";
import Modal from "../../Component/Modal";
import { useNavigate } from "react-router-dom";
import "./profile.style.scss";
import Avatar from "../../assets/images/Ellipse4.png";
import Upload from "./assets/upload.png";
import Input from "../../Component/Input";
import Loader from "../Home/Loader";
import { Toast } from "../../Component/ToastAlert";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    job: "",
    location: "",
    phoneNumber: "",
    useremail: ""
  });

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user");

  // On file select (from the pop up)
  // Update the state
  const onFileChange = e => {
    e.preventDefault();
    setSelectedImage({ selectedFile: e.target.files[0] });
    setSelectedImage(URL.createObjectURL(e.target.files[0]));
    console.log(e.target.files[0]);
    e.preventDefault();
    const formData = new FormData();
    formData.append("selectedImage", selectedImage);
    axios
      .put("https://certgo.hng.tech/api/users/brand-kit", formData, {})
      .then(res => {
        console.log(res);
      });
  };

  // Handle user Logout
  const handleLogout = async e => {
    setLoading(true);
    e.preventDefault();
    await axios
      .delete("https://certify-api.onrender.com/api/auth/logout")
      .then(res => {
        if (res.status === 200) {
          console.log("logged out");
          setLoading(false);
          //navigate back to login
          navigate("/login");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      })
      .catch(err => {
        console.log(err || "couldnt log out");
        setLoading(false);
        Toast.fire({
          icon: "error",
          title: "Error logging out"
        });
      });
  };

  const url = "https://certgo.hng.tech/api/profile";
  const handleOnchange = e => {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  };

  const Submit = async e => {
    e.preventDefault();
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      };
      const response = await axios.post(
        url,
        {
          id: userId,
          name: data.name,
          job: data.job,
          location: data.location,
          phoneNumber: data.phoneNumber,
          useremail: data.useremail
        },
        {
          headers: headers
        }
      );
      if (response.status === 200) {
        Toast.fire({
          icon: "success",
          title: response.message
        });
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="profile-page">
      <div>
        <div className="user-info">
          <div className="user-avatar">
            <img
              src={selectedImage || Avatar}
              className="avatar"
              alt="profile-pic"
            />
            <label htmlFor="myFile" className="upload__label">
              <img src={Upload} alt="upload-icon" />
              <input
                type="file"
                id="myFile"
                accept="image/*"
                name="image"
                onChange={onFileChange}
              />
            </label>
          </div>
          <div className="mb-2">
            <h3>Olamiposi Benjamin</h3>
            <p className="job-title">Advisor at Stripe Inc.</p>
            <div className="location-wrapper">
              <span></span>
              <span>Lagos, Nigeria</span>
            </div>
          </div>
          <div className="mb-2">
            <p>Lite Plan</p>
            <span className="lite-plan-exp">Expires 23rd December 2022</span>
          </div>
          <div className="mb-2">
            <p>Last bulk certificate generated</p>
            <span className="last-gen-date">12th November 2022</span>
          </div>

          <div className="btn-wrapper">
            <button
              onClick={handleLogout}
              style={
                loading
                  ? { background: "#f84343", cursor: "not-allowed" }
                  : { background: "transparent", cursor: "pointer" }
              }
            >
              {loading ? <Loader /> : <span>Log Out</span>}
            </button>
          </div>
        </div>

        <div className="form">
          <h2>Manage Profile</h2>
          <form onSubmit={Submit}>
            <Input
              className="form-group"
              label={"Name"}
              callback={handleOnchange}
              id="name"
              type="text"
              placeholder="Name"
            />
            <Input
              className="form-group"
              label={"Jobs"}
              callback={handleOnchange}
              id="job"
              type="text"
              placeholder="Job"
            />

            <Input
              className="form-group"
              label={"Location"}
              callback={handleOnchange}
              id="location"
              type="text"
              placeholder="Location"
            />

            <Input
              className="form-group"
              label={"Email"}
              callback={handleOnchange}
              id="useremail"
              type="email"
              placeholder="E-mail"
            />

            <Input
              className="form-group"
              label={"Phone Number"}
              onChange={handleOnchange}
              id="phoneNumber"
              type="text"
              placeholder="(316) 555-0116"
            />

            <div id="postbtnid" className="form-btn-wrapper">
              <button onSubmit={Submit}>Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
