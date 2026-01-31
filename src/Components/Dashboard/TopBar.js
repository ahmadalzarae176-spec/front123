import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { Menu } from "../../context/MenuContext";
import { useContext, useState } from "react";

export default function TopBar() {
  const menu = useContext(Menu);
  const setIsOpen = menu.setIsOpen;
  const [name, setName] = useState("");
  return (
    <div className="top-bar rounded mb-3 py-2 shadow-sm">
      <div className=" d-flex align-item-center justify-content-between h-100">
        <div
          className="d-flex align-item-center gap-5"
          style={{ marginTop: "10px" }}
        >
          <h1>أولي النهى</h1>
          <FontAwesomeIcon
            onClick={() => setIsOpen((Prev) => !Prev)}
            cursor={"pointer"}
            icon={faBars}
            style={{ marginTop: "10px" }}
          />
        </div>
        <div style={{ marginTop: "15px" }}>
          <DropdownButton id="dropdown-basic-button" title={name}>
            <Dropdown.Item>Logout</Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
    </div>
  );
}
