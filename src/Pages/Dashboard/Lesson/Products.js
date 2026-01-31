import { useEffect, useState } from "react";
import { Pro, PRO } from "../../../Api/Api";
import { Axios } from "../../../Api/axios";
import { Link } from "react-router-dom";
import TableShow from "../../../Components/Dashboard/Table";

export default function Products() {
  //  States
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  console.log(products);

  //  Get All Categories
  useEffect(() => {
    setLoading(true);
    Axios.get(`/${PRO}?page=${page}&limit=${limit}`)
      .then((data) => {
        setProducts(data.data.data);
        setTotal(data.data.total);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [page, limit]);

  const header = [
    { key: "images", name: "Images" },
    { key: "title", name: "Title" },
    {
      key: "description",
      name: "Description",
    },
    {
      key: "price",
      name: "Price",
    },
    {
      key: "rating",
      name: "Rating",
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
      const res = await Axios.delete(`${Pro}/${id}`);
      setProducts((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="white w-100 px-4 py-3 rounded shadow-sm">
      <div className="d-flex align-items-center justify-content-between">
        <h1>Products Page</h1>
        <Link className="btn btn-primary" to="/dashboard/category/add">
          Add Products
        </Link>
      </div>

      <TableShow
        header={header}
        data={products}
        delete={handleDelete}
        page={page}
        limit={limit}
        setLimit={setLimit}
        setPage={setPage}
        loading={loading}
        total={total}
        search="titel"
        searchLink={Pro}
      />
    </div>
  );
}
