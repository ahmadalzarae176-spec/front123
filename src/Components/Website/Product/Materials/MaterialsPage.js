import React from "react";
import "./Materials.css";
import Navbar from "../../NavBar/NavBar";

export default function Materials() {
  return (
    <>
      <Navbar />
      
      <div className="teacher-page">
        <div className="image-section">
          {/* ✨ استبدل مسار الصورة أدناه بمسار صورتك داخل مجلد المشروع */}
          <img
            src={require("../../../../Assets/images/photo-1557862921-37829c790f19.avif")} // غيّر المسار حسب مكان الصورة عندك
            alt="أستاذ متكتف"
            className="teacher-image"
          />
        </div>

        <div className="text-section">
          <h1 className="title"> .....مرحباً بك في صفحة مادة</h1>
          <p className="paragraph">
            هنا يمكنك كتابة أي نص تريده — سواء تعريف عن نفسك، أو رسالة ترحيبية،
            أو وصف لمشروعك أو مؤسستك التعليمية. التصميم بسيط وأنيق ومناسب للعرض
            الاحترافي.
          </p>

          <button className="cta-btn">تواصل معنا</button>
        </div>
      </div>
      <h1> : الدرس الاول</h1>
    </>
    
  );
}
