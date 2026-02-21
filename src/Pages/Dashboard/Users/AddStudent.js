import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { Form } from "react-bootstrap";
import { Axios } from "../../../Api/axios";
import { STD, Class, SubClas } from "../../../Api/Api";
import LoadingSubmit from "../../../Components/Loading/Loading";

export default function AddStudent() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [vegSystem, setVegSystem] = useState(""); // "class" أو "subject"
  const [vegTouched, setVegTouched] = useState(false);
  const [role, setRole] = useState(""); // ID من الباك إذا كان موجود

  const [grades, setGrades] = useState([]);
  const [selectedGradeId, setSelectedGradeId] = useState("");
  const [classLoading, setClassLoading] = useState(true);
  const [classError, setClassError] = useState(null);

  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [loadingSubjects, setLoadingSubjects] = useState(false);

  const [submitLoading, setSubmitLoading] = useState(false);

  const nameInputRef = useRef(null);

  // Focus on name input when component mounts
  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  // جلب الصفوف مرة واحدة
  useEffect(() => {
    const fetchGrades = async () => {
      try {
        setClassLoading(true);
        const response = await Axios.get(Class);
        // افتراض: response.data = { classes: [...] } أو array مباشرة
        setGrades(response.data.classes || response.data || []);
      } catch (err) {
        console.error("فشل جلب الصفوف", err);
        setClassError("تعذر تحميل قائمة الصفوف");
      } finally {
        setClassLoading(false);
      }
    };

    fetchGrades();
  }, []);

  // جلب المواد عند تغيير الصف أو نوع النظام
  useEffect(() => {
    if (!selectedGradeId || vegSystem !== "subject") {
      setSubjects([]);
      setSelectedSubjects([]);
      setLoadingSubjects(false);
      return;
    }

    const fetchSubjectsForGrade = async () => {
      setLoadingSubjects(true);
      try {
        const response = await Axios.get(`${SubClas}/${selectedGradeId}`);
        setSubjects(response.data.subjects || []);
      } catch (err) {
        console.error("خطأ جلب المواد:", err);
        setSubjects([]);
      } finally {
        setLoadingSubjects(false);
      }
    };

    fetchSubjectsForGrade();
  }, [selectedGradeId, vegSystem]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);

    try {
      const payload = {
        name,
        phone,
        role,
        vegSystem,
        subjects: vegSystem === "subject" || "class" ? selectedSubjects : [],
      };

      const res1 = await Axios.post(`${STD}`, payload);
      window.alert(res1.data.code);
      // console.log(res1.data.code);
      //  window.location.pathname = "/dashboard/users";
    } catch (err) {
      console.error("خطأ إضافة الطالب:", err);
      // يمكنك هنا عرض رسالة خطأ للمستخدم
    } finally {
      setSubmitLoading(false);
    }
  };

  const isFormValid =
    name.trim().length > 1 &&
    phone.trim().length > 5 &&
    vegSystem &&
    //role !== "" &&
    (vegSystem !== "subject" || selectedSubjects.length > 0);

  return (
    <>
      {" "}
      {submitLoading && <LoadingSubmit />}
      <Form
        className="white w-100 px-4 py-3 rounded shadow-sm"
        onSubmit={handleSubmit}
      >
        {" "}
        {/* ---------------- الصف ---------------- */}{" "}
        <Form.Group className="mb-3" controlId="gradeSelect">
          <Form.Label> الصف </Form.Label>{" "}
          <Form.Select
            value={selectedGradeId}
            onChange={(e) => setSelectedGradeId(e.target.value)}
            disabled={classLoading || !!classError}
            required
          >
            <option value="" disabled>
              {" "}
              {classLoading
                ? "جاري التحميل..."
                : classError
                  ? "حدث خطأ"
                  : "اختر الصف"}{" "}
            </option>
            {grades.map((grade) => (
              <option key={grade.id} value={grade.id}>
                {" "}
                {grade.name}{" "}
              </option>
            ))}{" "}
          </Form.Select>{" "}
        </Form.Group>
        {/* ---------------- الاسم ---------------- */}{" "}
        <Form.Group className="mb-3" controlId="studentName">
          <Form.Label> اسم الطالب </Form.Label>{" "}
          <Form.Control
            ref={nameInputRef}
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="الاسم..."
            required
          />
        </Form.Group>
        {/* ---------------- رقم الهاتف ---------------- */}{" "}
        <Form.Group className="mb-3" controlId="phone">
          <Form.Label> رقم الهاتف </Form.Label>{" "}
          <Form.Control
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
            placeholder="رقم الهاتف..."
            required
          />
        </Form.Group>
        {/* ---------------- نوع التسجيل ---------------- */}{" "}
        <Form.Group className="mb-3">
          <Form.Label> نوع التسجيل </Form.Label>{" "}
          <div onBlur={() => setVegTouched(true)}>
            <Form.Check
              inline
              label="نظام صفي"
              name="vegSystem"
              type="radio"
              value="class"
              checked={vegSystem === "class"}
              onChange={(e) => setVegSystem(e.target.value)}
            />{" "}
            <Form.Check
              inline
              label="نظام مواد"
              name="vegSystem"
              type="radio"
              value="subject"
              checked={vegSystem === "subject"}
              onChange={(e) => setVegSystem(e.target.value)}
            />{" "}
          </div>
          {vegTouched && !vegSystem && (
            <small
              style={{
                color: "red",
              }}
            >
              {" "}
              الرجاء اختيار نوع التسجيل{" "}
            </small>
          )}{" "}
        </Form.Group>
        {/* ---------------- عرض المواد فقط عند اختيار نظام مواد ---------------- */}{" "}
        {vegSystem === "subject" && selectedGradeId && (
          <div className="mt-4">
            {/* منطقة المواد المختارة (الـ inbox) */}
            <div className="mb-4">
              <label className="form-label fw-bold d-block mb-2">
                المواد المختارة
              </label>
              <div
                className="d-flex flex-wrap gap-2 p-3 border rounded bg-light"
                style={{ minHeight: "80px" }}
              >
                {selectedSubjects.length === 0 ? (
                  <span className="text-muted align-self-center">
                    لم يتم اختيار مواد بعد
                  </span>
                ) : (
                  selectedSubjects.map((subId) => {
                    const sub = subjects.find((s) => s.id === subId);
                    return sub ? (
                      <span
                        key={sub.id}
                        className="badge bg-primary text-white px-3 py-2 d-flex align-items-center gap-2"
                        style={{
                          fontSize: "0.95rem",
                          borderRadius: "9999px", // دائرة كاملة أو شبه دائرة
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          // إزالة المادة من المختارة عند الضغط عليها
                          setSelectedSubjects((prev) =>
                            prev.filter((id) => id !== sub.id),
                          );
                        }}
                      >
                        {sub.name}
                        <span className="fw-bold ms-1">×</span>
                      </span>
                    ) : null;
                  })
                )}
              </div>
            </div>

            {/* المواد المتاحة (كلها ظاهرة مباشرة) */}
            <div>
              <label className="form-label fw-bold d-block mb-2">
                اختر المواد المتاحة
              </label>
              <div className="d-flex flex-wrap gap-3">
                {subjects.length === 0 ? (
                  <div className="text-muted">لا توجد مواد متاحة لهذا الصف</div>
                ) : (
                  subjects
                    .filter((sub) => !selectedSubjects.includes(sub.id))
                    .map((sub) => (
                      <button
                        key={sub.id}
                        type="button"
                        className="btn btn-outline-primary px-4 py-2"
                        style={{
                          borderRadius: "9999px", // شكل دائري/شبه دائري
                          whiteSpace: "nowrap",
                          fontSize: "0.95rem",
                        }}
                        onClick={() => {
                          setSelectedSubjects((prev) => [...prev, sub.id]);
                        }}
                      >
                        {sub.name}
                      </button>
                    ))
                )}
              </div>
            </div>
          </div>
        )}
        {/* زر الإرسال */}{" "}
        <button
          type="submit"
          disabled={!isFormValid || submitLoading}
          className="btn btn-primary mt-4 px-5"
        >
          {" "}
          {submitLoading ? "جاري الإضافة..." : "إضافة الطالب"}{" "}
        </button>{" "}
      </Form>{" "}
    </>
  );
}
