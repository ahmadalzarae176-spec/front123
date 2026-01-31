import React, { useEffect, useState } from "react";
import Navbar from "../../NavBar/NavBar";

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // حاول fetch من API
    fetch("/api/user")
      .then((res) => {
        if (!res.ok) throw new Error("No API");
        return res.json();
      })
      .then((data) => setUserData(data))
      .catch(() => {
        // fallback لو API مش موجود
        setUserData({
          name: "لا يوجد اسم",
          email: "انت غير مسجل",
          avatar: "https://www.w3schools.com/howto/img_avatar.png",
          courses: [],
        });
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div style={{ padding: "50px", fontFamily: "Cairo, sans-serif" }}>
        <p>جاري تحميل البيانات...</p>
      </div>
    );

  return (
    <>
    <Navbar />
    <div
      style={{
        maxWidth: "800px",
        margin: "100px auto",
        padding: "30px",
        fontFamily: "Cairo, sans-serif",
        background: "#fff",
        boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
        borderRadius: "15px",
      }}
    >
      {/* صورة واسم وبريد */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <img
          src={userData.avatar}
          alt="profile"
          style={{ width: "120px", borderRadius: "50%" }}
        />
        <div>
          <h2 style={{ margin: 0 }}>{userData.name}</h2>
          <p style={{ color: "#555", margin: "5px 0" }}>{userData.email}</p>
        </div>
      </div>

      {/* المواد */}
      <div style={{ marginTop: "30px" }}>
        <h3>المواد المسجلة:</h3>
        {userData.courses.length === 0 ? (
          <p>لا يوجد</p>
        ) : (
          <ul>
            {userData.courses.map((course, idx) => (
              <li key={idx}>{course}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
    </>
  );
}
