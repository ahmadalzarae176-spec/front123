import { useEffect, useState } from "react";
import { MAT, Mat } from "../../../Api/Api";
import { Axios } from "../../../Api/axios";
import { Link } from "react-router-dom";
import { Class } from "../../../Api/Api";
import TableShow from "../../../Components/Dashboard/Table";
import { Form } from "react-bootstrap";

export default function T_Intensive() {
  //  States
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(4);
  const [limit, setLimit] = useState(4);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [class_loading, setClassLoading] = useState(true);
  const [error, setError] = useState(null);
  const [grades, setGrades] = useState([]);

  const [selectedGradeId, setSelectedGradeId] = useState("");

  // 🔹 جلب الصفوف من الباك عند فتح الصفحة
  useEffect(() => {
    const fetchGrades = async () => {
      try {
        setClassLoading(true);
        const response = await Axios.get(Class);
        const data = response.data;
        // حسب شكل البيانات اللي راجعة من الـ API
        // افتراضي شائع: array of objects → [{id: 1, name: "الصف الأول"}, ...]
        setGrades(data.classes);
        // أو إذا البيانات داخل key مثلاً data.data أو data.classes:
        // setGrades(data.data  data.classes  data || []);
      } catch (err) {
        console.error("فشل جلب الصفوف:", err);
        if (err.response) {
          console.log(
            "الرد من السيرفر:",
            err.response.status,
            err.response.data,
          );
        }
        setError("تعذر تحميل قائمة الصفوف");
      } finally {
        setClassLoading(false);
      }
    };
    fetchGrades();
  }, []); // [] = نفذ مرة واحدة فقط

  //  Get All Categories
  useEffect(() => {
    setLoading(true);
    Axios.get(`/${MAT}?limit=${limit}&page=${page}`)
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
      {/* =============================== */}
      {/* الصفوف القادمة من الباك */}
      {/* =============================== */}
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput3" style={{ width: "290px"}}>
        <Form.Label></Form.Label>

        <Form.Select
          value={selectedGradeId}
          onChange={(e) => {
            const gradeId = e.target.value;
            setSelectedGradeId(gradeId);

            // هنا بتقدر ترسل الـ id لأي مكان بدك ياه
            console.log("تم اختيار الصف رقم:", gradeId);

            // مثال: إذا بدك ترسله لـ API أو لـ state أعلى
            // sendGradeIdToParent(gradeId);
          }}
          required
          disabled={class_loading || !!error}
        >
          <option disabled value="">
            {class_loading
              ? "جاري التحميل..."
              : error
                ? "حدث خطأ"
                : "اختر الصف"}
          </option>

          {grades.map((grade) => (
            <option key={grade.id} value={grade.id}>
              {grade.name}
              {/* أو grade.class_name أو grade.title ... حسب اسم الحقل في الـ API */}
            </option>
          ))}
        </Form.Select>
      </Form.Group>


    <div style={{ marginTop: "0px" }}>
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
    </div>
  );
}
