import React from "react";
import { IoHomeSharp } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
import { MdVideoLibrary } from "react-icons/md";
import { RiSearchLine } from "react-icons/ri";

function AdminSidebar() {
  return (
    <div className="sidebar">
    <div className="container-fluid">
      <div className="sidebarelements">
        {" "}
        <IoHomeSharp />
      </div>
      <div className="sidebarelements">
        {" "}
        <FaMicrophone />
      </div>
      <div className="sidebarelements">
        {" "}
        <HiUsers />
      </div>
      <div className="sidebarelements">
        {" "}
        <MdVideoLibrary />
      </div>
      <div className="sidebarelements">
        {" "}
        <RiSearchLine />
      </div>
    </div></div>
  );
}

export default AdminSidebar;
