import { useEffect, useState } from "react";
//import { USERS } from "../../../Api/Api";
import { Axios } from "../../../Api/axios";
import { Link } from "react-router-dom";
import TableShow from "../../../Components/Dashboard/Table";
//import { STD } from "../../../Api/Api";
import { ALLSTD } from "../../../Api/Api";

export default function Users() {
  //  States
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(100);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  //  Get Current User
  // useEffect(() => {
  //   Axios.get(`${ALLSTD}`)
  //     .then((res) => setCurrentUser(res.data))
  //     .catch((err) => console.log("خطأ جلب المستخدم:", err));
  // }, []);

  //  Get All Users
  useEffect(() => {
    setLoading(true);
    Axios.get(`${ALLSTD}?page=${page}&limit=${limit}`)
      .then((res) => {
        setUsers(res.data.students || []);
        setTotal(res.data.total || 0);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [page, limit]);
  const header = [
    {
      key: "name",
      name: "Name",
    },
    {
      key: "phone",
      name: "Phone",
    },
    {
      key: "VegSystem",
      name: "VegSystem",
    },
    {
      key: "created_at",
      name: "Created",
    },
    {
      key: "updated_at",
      name: "Last Login",
    },
  ];

  // Handel Delete
  // async function handleDelete(id) {
  //   try {
  //     const res = await Axios.delete(`${ALLSTD}/${id}`);
  //     setUsers((prev) => prev.filter((item) => item.id !== id));
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  return (
    <div className="bg-white w-100 px-4 py-3 rounded shadow-sm">
      <div className="d-flex align-items-center justify-content-between">
        <h1>Students Page</h1>
        <Link className="btn btn-primary" to="/dashboard/user/add">
          Add Students
        </Link>
      </div>

      <TableShow
        header={header}
        data={users}
        currentUser={currentUser}
        // delete={handleDelete}
        page={page}
        limit={limit}
        setLimit={setLimit}
        setPage={setPage}
        loading={loading}
        total={total}
        search="name"
        searchLink={ALLSTD}
      />
    </div>
  );
}
