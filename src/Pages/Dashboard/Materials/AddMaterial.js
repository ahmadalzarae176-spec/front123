import { useEffect, useRef, useState } from "react";
import { Form, FormControl, FormGroup } from "react-bootstrap";
import { Axios } from "../../../Api/axios";
import { Mat } from "../../../Api/Api";
import LoadingSubmit from "../../../Components/Loading/Loading";

export default function AddMaterial() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [Loading, setLoading] = useState(false);

  // Ref
  const focus = useRef("");

  //  Handel Focus
  useEffect(() => {
    focus.current.focus();
  }, []);

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
      <Form className="white w-100 px-4 py-3 rounded shadow-sm" onSubmit={HandleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>المادة</Form.Label>
          <Form.Control
            ref={focus}
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
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
