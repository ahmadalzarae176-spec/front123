import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import slide1 from "../../../Assets/images/slide1.jpg";
import slide2 from "../../../Assets/images/slide2.jpg";
import slide3 from "../../../Assets/images/slide3.jpg";
import "./Landing.css";

export default function Landing() {
  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <Carousel
        fade
        interval={4000}
        controls={true}
        indicators={true}
        pause={false}
      >
        {/* Slide 1 */}
        <Carousel.Item>
          <img
            className="d-block w-100 zoom-img"
            src={slide1}
            alt="First slide"
            style={{
              height: "100vh",
              objectFit: "cover",
              filter: "brightness(70%)",
            }}
          />
          <div className="custom-caption fade-zoom">
            <h2>مرحباً بك في معهد أولي النهى</h2>
            <p>نوفّر أفضل الكورسات التعليمية لجميع المستويات.</p>
            <Link
              to="/dashboard/courses"
              className="btn btn-primary animated-btn mt-3"
            >
              تصفح الدورات
            </Link>
          </div>
        </Carousel.Item>

        {/* Slide 2 */}
        <Carousel.Item>
          <img
            className="d-block w-100 zoom-img"
            src={slide2}
            alt="Second slide"
            style={{
              height: "100vh",
              objectFit: "cover",
              filter: "brightness(70%)",
            }}
          />
          <div className="custom-caption fade-zoom">
            <h2>أساتذة متميزون</h2>
            <p>تعلم من نخبة من المدرسين ذوي الخبرة العالية.</p>
            <Link
              to="/dashboard/teacher"
              className="btn btn-primary animated-btn mt-3"
            >
              تعرف على المدرسين
            </Link>
          </div>
        </Carousel.Item>

        {/* Slide 3 */}
        <Carousel.Item>
          <img
            className="d-block w-100 zoom-img"
            src={slide3}
            alt="Third slide"
            style={{
              height: "100vh",
              objectFit: "cover",
              filter: "brightness(70%)",
            }}
          />
          <div className="custom-caption fade-zoom">
            <h2>ابدأ رحلتك التعليمية الآن</h2>
            <p>انضم إلينا لتطوير مهاراتك وتحقيق أهدافك.</p>
            <Link
              to="/dashboard/student"
              className="btn btn-primary animated-btn mt-3"
            >
              انضم الآن
            </Link>
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
