import { Link } from "react-router-dom";
import "./403.css";

export default function Err403({ role }) {
  return (
    <div className="error-403-container">
      <div className="error-card-403">
        <h1 className="error-title-403">403</h1>
        <h2 className="error-subtitle-403">ACCESS DENIED</h2>
        <p className="error-message-403">
          ليس لديك صلاحية للوصول إلى هذه الصفحة.
        </p>

        <Link
          className="error-btn-403"
          to={role === "1996" ? "/dashboard/writer" : "/"}
        >
          {role === "1996"
            ? "الذهاب إلى صفحة الكاتب"
            : "العودة للصفحة الرئيسية"}
        </Link>
      </div>
    </div>
  );
}
