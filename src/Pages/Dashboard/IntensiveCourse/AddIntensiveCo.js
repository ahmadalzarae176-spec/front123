import { useEffect, useRef, useState } from "react";
import { Form, FormControl, FormGroup } from "react-bootstrap";
import { Axios } from "../../../Api/axios";
import { Mat } from "../../../Api/Api";
import { Class } from "../../../Api/Api";
import LoadingSubmit from "../../../Components/Loading/Loading";

export default function AddIntensive() {
  const [title, setTitle] = useState("");
  const [material, setMaterial] = useState("");
  const [image, setImage] = useState("");
  const [Loading, setLoading] = useState(false);
  const [class_loading, setClassLoading] = useState(true);
  const [error, setError] = useState(null);
  const [grades, setGrades] = useState([]);
  const [selectedGradeId, setSelectedGradeId] = useState("");

  // Ref
  const focus = useRef("");

  //  Handel Focus
  useEffect(() => {
    focus.current.focus();
  }, []);

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
              err.response.data
            );
          }
          setError("تعذر تحميل قائمة الصفوف");
        } finally {
          setClassLoading(false);
        }
      };
      fetchGrades();
    }, []); // [] = نفذ مرة واحدة فقط
  

  //  Handle Submit
  async function HandleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const form = new FormData();
    form.append("title", title);
    form.append("image", image);
    try {
      const res = await Axios.post(`${Mat}/add`, form);
      window.location.pathname = "/dashboard/categories";
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }
  return (
    <>
      {Loading && <LoadingSubmit />}
      <Form
        className="white w-100 px-4 py-3 rounded shadow-sm"
        onSubmit={HandleSubmit}
      >
        {/* =============================== */}
        {/* الصفوف القادمة من الباك */}
        {/* =============================== */}
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
          <Form.Label>الصف</Form.Label>

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

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>المادة</Form.Label>
          <Form.Control
            ref={focus}
            value={material}
            required
            onChange={(e) => setMaterial(e.target.value)}
            type="text"
            placeholder="المادة..."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control
            ref={focus}
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title..."
          />
        </Form.Group>
        <FormGroup className="mb-3" controlId="image">
          <Form.Label>Image</Form.Label>
          <FormControl
            onChange={(e) => setImage(e.target.files.item(0))}
            type="file"
          ></FormControl>
        </FormGroup>

        <button
          disabled={title.length > 1 ? false : true}
          className="btn btn-primary"
        >
          Save
        </button>
      </Form>
    </>
  );
}
