import React from "react";
import NavBarHome from "../../../Component/NavBarHome/NavBarHome";
import "./AboutUs.css";
import aboutUsImage from "../../../Img/about-us.png";

function AboutUs() {
  return (
    <div>
      <NavBarHome />
      <div className="container">
        <div className="flex justify-center">
          <img
            fluid
            src={aboutUsImage}
            width="640px"
            height="auto"
            alt="logo"
          />
        </div>
        <div className="bg-orange-500 text-white p-4 rounded-3xl mt-8 ">
          <h1>
            <div className="text-bold about">Learning Management System</div>
          </h1>
          <label className="h5 mb-4">Study & Monitoring System</label>
          <div className="text-bold">
            Learning Management System Adalah Website yang dibuat untuk
            memudahkan sekolah dalam memonitoring dan management pembelajaran
            online. LMS dilakukan melalui media perantara internet berbasis web.
            Jadi, semua materi, dan bahan ajar bisa kamu akses melalui sebuah
            situs web.
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
