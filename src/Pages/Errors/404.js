import { Link } from "react-router-dom";
import "./404.css";

export default function Err404() {
  return (
    <div className="error-404-container">

      <div className="error-card-404">
        <h1 className="error-title-404">404</h1>
        <h2 className="error-subtitle-404">الصفحة غير موجودة</h2>
        <p className="error-message-404">
          يبدو أنك وصلت لصفحة مفقودة أو لم تعد متاحة.  
          تأكد من الرابط أو عد إلى الصفحة الرئيسية.
        </p>

        <Link to="/" className="error-btn-404">
          العودة للرئيسية
        </Link>
      </div>

    </div>
  );
}
