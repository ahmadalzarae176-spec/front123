import { useEffect, useState } from "react";
import { Mat, CAT } from "../../../Api/Api";
import { Axios } from "../../../Api/axios";
import { Link } from "react-router-dom";
import TableShow from "../../../Components/Dashboard/Table";


export default function Categories() {
  //  States
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(4);
  const [limit, setLimit] = useState(4);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  //  Get All Categories
  useEffect(() => {
    setLoading(true);
    Axios.get(`/${CAT}?limit=${limit}&page=${page}`)
      .then((data) => {
        setCategories(data.data.data);
        setTotal(data.data.total);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [limit, page]);

  const header = [
    { key: "title", name: "Title" },
    {
      key: "image",
      name: "Image",
    },
    {
      key: "created_at",
      name: "Created",
    },
    {
      key: "updated_at",
      name: "Updated",
    },
  ];

  // Handel Delete
  async function handleDelete(id) {
    try {
      const res = await Axios.delete(`${Mat}/${id}`);
      setCategories((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  
  return (
    <div className="white w-100 px-4 py-3 rounded shadow-sm">
      <div className="d-flex align-items-center justify-content-between">
        <h1>Teachers Page</h1>
        <Link className="btn btn-primary" to="/dashboard/category/add">
          Add Teachers
        </Link>
      </div>

      <TableShow
        limit={limit}
        setLimit={setLimit}
        page={page}
        header={header}
        data={categories}
        delete={handleDelete}
        setPage={setPage}
        loading={loading}
        total={total}
        search="titel"
        searchLink={Mat}
      />
    </div>
  );
}
