import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../../Api/axios";
import { STD } from "../../../Api/Api";
import { Class } from "../../../Api/Api";
import LoadingSubmit from "../../../Components/Loading/Loading";

export default function AddStudent() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [vegSystem, setVegSystem] = useState("");
  const [vegTouched, setVegTouched] = useState(false);
  const [role, setRole] = useState(""); // هون صار مستلم ID من الباك
  const [Loading, setLoading] = useState(false);

  // ▼ الصفوف القادمة من الباك
  const [grades, setGrades] = useState([]);
  const [selectedGradeId, setSelectedGradeId] = useState("");
  const [class_loading, setClassLoading] = useState(true);
  const [error, setError] = useState(null);
  // ▼ المواد القادمة من الباك
  const [subjects, setSubjects] = useState([]);

  // ▼ المواد المختارة
  const [selectedSubjects, setSelectedSubjects] = useState([]);

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

  // 🔹 عندما يختار المستخدم نظام مواد → جيب المواد من الباك
  useEffect(() => {
    if (vegSystem === "subject") {
      Axios.get(`${STD}/subjects`)
        .then((res) => {
          setSubjects(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [vegSystem]);

  //  Handle Submit
  async function HandleSubmit(e) {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await Axios.post(`${STD}/add`, {
        name,
        phone,
        role, // هنا صار ID من الباك
        vegSystem,
        subjects: vegSystem === "subject" ? selectedSubjects : [],
      });

      window.location.pathname = "/dashboard/users";
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

        {/* =============================== */}
        {/* الاسم */}
        {/* =============================== */}
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label> اسم الطالب</Form.Label>
          <Form.Control
            ref={focus}
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="الاسم..."
          />
        </Form.Group>

        {/* =============================== */}
        {/* رقم الهاتف */}
        {/* =============================== */}
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>رقم الهاتف</Form.Label>
          <Form.Control
            value={phone}
            required
            onChange={(e) => setPhone(e.target.value)}
            type="number"
            placeholder="رقم الهاتف..."
          />
        </Form.Group>

        {/* =============================== */}
        {/* نوع التسجيل */}
        {/* =============================== */}
        <Form.Group className="mb-3" required>
          <Form.Label>نوع التسجيل</Form.Label>

          <div onBlur={() => setVegTouched(true)}>
            <Form.Check
              inline
              label="نظام صفي"
              name="vegSystem"
              type="radio"
              value="class"
              checked={vegSystem === "class"}
              onChange={(e) => setVegSystem(e.target.value)}
            />

            <Form.Check
              inline
              label="نظام مواد"
              name="vegSystem"
              type="radio"
              value="subject"
              checked={vegSystem === "subject"}
              onChange={(e) => setVegSystem(e.target.value)}
            />
          </div>

          {vegTouched && !vegSystem && (
            <small style={{ color: "red" }}>الرجاء اختيار نوع التسجيل</small>
          )}
        </Form.Group>

        {/* =============================== */}
        {/* عرض المواد عند اختيار نظام مواد */}
        {/* =============================== */}
        {vegSystem === "subject" && (
          <div
            className="mt-2 p-2"
            style={{ border: "1px solid #ddd", borderRadius: 6 }}
          >
            <strong>اختر المواد:</strong>

            {subjects.length === 0 ? (
              <p>جاري تحميل المواد...</p>
            ) : (
              subjects.map((sub) => (
                <Form.Check
                  key={sub.id}
                  label={sub.name}
                  value={sub.id}
                  type="checkbox"
                  onChange={(e) => {
                    const id = sub.id;

                    if (e.target.checked) {
                      setSelectedSubjects((prev) => [...prev, id]);
                    } else {
                      setSelectedSubjects((prev) =>
                        prev.filter((s) => s !== id)
                      );
                    }
                  }}
                />
              ))
            )}
          </div>
        )}

        {/* =============================== */}
        {/* زر الإرسال */}
        {/* =============================== */}
        <button
          onClick={() => setVegTouched(true)}
          disabled={
            name.length <= 1 || phone.length <= 1 || !vegSystem || role === ""
          }
          className="btn btn-primary mt-3"
        >
          Submit
        </button>
      </Form>
    </>
  );
}
