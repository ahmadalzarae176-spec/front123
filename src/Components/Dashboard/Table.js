import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
//import "./table.css";
//import PaginatedItems from "./Pagination/Pagination";
import { useEffect, useState } from "react";
//import { Axios } from "../../Api/axios";
import TransformDate from "../../helpers/TransformDate";
import { Axios } from "../../Api/axios";

export default function TableShow(props) {
  const safeData = Array.isArray(props.data) ? props.data : [];
  const currentUser = props.currentUser || {
    name: "",
  };
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const filtredDataByDate =
    date.length !== 0
      ? safeData.filter((item) => TransformDate(item.created_at) === date)
      : safeData;

  const filterSearchByDate =
    date.length !== 0
      ? filteredData.filter((item) => TransformDate(item.created_at) === date)
      : filteredData;

  const showWhichData =
    search.length > 0 ? filterSearchByDate : filtredDataByDate;

async function getSearchedData() {
  try {
    const res = await Axios.post(
      `${props.searchLink}/search?title=${search}`
    );

    // نحمي النتيجة مهما كان شكلها
    const result = Array.isArray(res.data)
      ? res.data
      : Array.isArray(res.data.data)
      ? res.data.data
      : [];

    setFilteredData(result);
  } catch (err) {
    console.log(err);
    setFilteredData([]);
  } finally {
    setSearchLoading(false);
  }
}

  useEffect(() => {
    const debounce = setTimeout(() => {
      search.length > 0 ? getSearchedData() : setSearchLoading(false);
    }, 500);

    return () => clearTimeout(debounce);
  }, [search]);

  // Header Show
  const headerShow = props.header.map((item, key) => (
    <th
      key = {key}
      className="text-white f-cairo"
      style={{ backgroundColor: "purple", color: "white" }}
    >
      {item.name}
    </th>
  ));
  // Body Show
    const dataShow = (showWhichData || []).map((item, key) => (
    <tr key={key}>
      {/* أو key={item.id} أفضل بكثير إذا كان item.id موجود وفريد */}
      <td>{item.id}</td>
      {props.header.map((item2, key2) => (
        <td key={key2}>
          {item2.key === "image" ? (
            <img width="50px" src={item[item2.key]} alt="" />
          ) : item2.key === "images" ? (
            <div className="d-flex align-item-center justify-content-start gap-2 flex-wrap">
              {item[item2.key]?.map(
                (
                  img,
                  index // ← أضفنا index هنا
                ) => (
                  <img
                    key={index} // ← أو key={img.id} إذا وُجد
                    className=""
                    width="50px"
                    src={img.image}
                    alt=""
                  />
                )
              )}
            </div>
          ) : (
            <>
              {item[item2.key]}
              {currentUser && item[item2.key] === currentUser.name && " (You)"}
            </>
          )}
        </td>
      ))}
      <td>
        <div className="d-flex align-item-center gap-2">
          <Link to={`${item.id}`}>
            <FontAwesomeIcon fontSize={"19px"} icon={faEdit} />
          </Link>
          {currentUser.name !== item.name && (
            <FontAwesomeIcon
              onClick={() => props.delete(item.id)}
              fontSize={"19px"}
              color="red"
              cursor={"pointer"}
              icon={faTrash}
            />
          )}
        </div>
      </td>
    </tr>
  ));
  // return Data
  return (
    <>
      <div className="col-3">
        <Form.Control
          className="my-2"
          type="search"
          aria-label="input example"
          placeholder="search"
          onChange={(e) => {
            setSearch(e.target.value);
            setSearchLoading(true);
          }}
        />
      </div>
      <div className="col-5">
        <Form.Control
          className="my-2"
          type="date"
          aria-label="input example"
          placeholder="search"
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
      </div>
      <Table
        className="table-shadow rounded overflow-hidden text-white"
        striped
        hover
      >
        <thead className="px-2">
          <tr>
            <th
              className="f-cairo text-white"
              style={{ backgroundColor: "purple", color: "white" }}
            >
              id
            </th>
            {headerShow}
            <th
              className="f-cairo text-white"
              style={{ backgroundColor: "purple", color: "white" }}
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {props.loading ? (
            <tr className="text-center">
              <td colSpan={12}>Loading...</td>
            </tr>
          ) : searchLoading ? (
            <tr className="text-center">
              <td colSpan={12}>Searching...</td>
            </tr>
          ) : (
            dataShow
          )}
        </tbody>
      </Table>
      <div className="d-flex align-item-center justify-content-end flex-wrap">
        <div className="col-1">
          {/*<Form.Select
            onChange={(e) => props.setLimit(e.target.value)}
            aria-label="Default select example"
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </Form.Select>*/}
        </div>
        {/* <PaginatedItems
          setPage={props.setPage}
          itemsPerPage={props.limit}
          data={props.data}
          total={props.total}
        />*/}
      </div>
    </>
  );
}
