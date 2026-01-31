import { useEffect, useState } from "react";
import { Form, FormControl, FormGroup } from "react-bootstrap";
import { Axios } from "../../../Api/axios";
import { Mat } from "../../../Api/Api";
import LoadingSubmit from "../../../Components/Loading/Loading";
import { useNavigate, useParams } from "react-router-dom";

export default function Material() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [disable, setDisable] = useState(true);
  const [Loading, setLoading] = useState(false);

  const nav = useNavigate();

  //  Id
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    Axios.get(`${Mat}/${id}`)
      .then((data) => {
        setTitle(data.data.title);
        setLoading(false);
      })
      .then(() => setDisable(false))
      .catch(() => nav("/dashboard/categories/page/404", { replace: true }));
  }, []);
  //  Handle Submit
  async function HandleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const form = new FormData();
    form.append("title", title);
    form.append("image", image);

    try {
      const res = await Axios.post(`${Mat}/edit/${id}`, form);
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
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="title..."
          />
        </Form.Group>
        <FormGroup className="mb-3" controlId="image">
          <Form.Label>Image</Form.Label>
          <FormControl
            onChange={(e) => setImage(e.target.files.item(0))}
            type="file"
          ></FormControl>
        </FormGroup>

        <button disabled={disable} className="btn btn-primary">
          Save
        </button>
      </Form>
    </>
  );
}
/*194*/
