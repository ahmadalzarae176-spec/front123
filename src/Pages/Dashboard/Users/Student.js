import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../../Api/axios";
import { STD } from "../../../Api/Api";
import LoadingSubmit from "../../../Components/Loading/Loading";
import { useNavigate, useParams } from "react-router-dom";

export default function Student() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [vegSystem, setVegSystem] = useState("");
  const [disable, setDisable] = useState(true);
  const [Loading, setLoading] = useState(false);

  const nav = useNavigate();

  //  Id
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    Axios.get(`${STD}/${id}`)
      .then((data) => {
        setName(data.data.name);
        setPhone(data.data.phone);
        setVegSystem(data.data.vegSystem);
        setLoading(false);
      })
      .then(() => setDisable(false))
      .catch(() => nav("/dashboard/users/page/404", { replace: true }));
  }, []);
  //  Handle Submit
  async function HandleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await Axios.post(`${STD}/edit/${id}`, {
        name: name,
        phone: phone,
        vegSystem: vegSystem,
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
      <Form className="white w-100 px-4 py-3 rounded shadow-sm" onSubmit={HandleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="name..."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            value={phone}
            required
            onChange={(e) => setPhone(e.target.value)}
            type="text"
            placeholder="your email..."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
          <Form.Label>VegSystem</Form.Label>
          <Form.Select value={vegSystem} onChange={(e) => setVegSystem(e.target.value)}>
            <option disabled value="">
              Select VegSystem
            </option>
            {/* <option value="1995">Admin</option>
            <option value="2001">User</option>
            <option value="1996">Writer</option> */}
          </Form.Select>
        </Form.Group>
        <button disabled={disable} className="btn btn-primary">
          Save
        </button>
      </Form>
    </>
  );
}
