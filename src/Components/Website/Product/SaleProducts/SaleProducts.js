import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

export default function SaleProducts(props) {
  return (
    <NavLink
      to={`/product/${props.id}`}
      className={`col-lg-${props.col} col-md-6 col-12`}
    >
      <div className="m-1 border rounded p-3 h-100 d-flex flex-column justify-content-between">
        <div>
          <p className="text-truncate" style={{ color: "gray" }}>
            {props.title}
          </p>
          <p className="text-truncate text-black">{props.description}</p>
        </div>
        <div className="px-5 py-4 position-relative">
          <div
            alt=""
            className="w-100"
            style={{
              backgroundImage: `url('${props.img}')`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              height: "170px",
              width: "100%",
            }}
          ></div>
        </div>
      </div>
    </NavLink>
  );
}
