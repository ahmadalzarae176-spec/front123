import { useEffect, useRef, useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { Axios } from "../../../Api/axios";
import { CAT, Pro } from "../../../Api/Api";
import LoadingSubmit from "../../../Components/Loading/Loading";
import { data, useNavigate, useParams } from "react-router-dom";

export default function UpdateLesson() {
  const [form, setForm] = useState({
    category: "Select Category",
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
    stock: 0,
  });

  const [images, setImages] = useState([]);
  const [imagesFromServer, setImagesFromServer] = useState([]);
  const [categories, setCategories] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [idsFromServer, setIdFromServer] = useState([]);
  const { id } = useParams();
  const nav = useNavigate();

  // Ref
  const focus = useRef("");
  const openImage = useRef(null);
  const progress = useRef([]);
  const ids = useRef([]);

  //  Handel Focus
  useEffect(() => {
    focus.current.focus();
  }, []);

  //    Get Data
  useEffect(() => {
    Axios.get(`/${Pro}/${id}`)
      .then((data) => {
        setForm(data.data[0]);
        setImagesFromServer(data.data[0].images);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleOpenImage() {
    openImage.current.click();
  }

  //  Get All Categories
  useEffect(() => {
    Axios.get(`/${CAT}`)
      .then((data) => setCategories(data.data))
      .catch((err) => console.log(err));
  }, []);

  //  Handle Edit
  async function HandleEdit(e) {
    setLoading(true);
    e.preventDefault();

    try {
      for (let i = 0; i < idsFromServer.length; i++) {
        await Axios.delete(`/product-img/${idsFromServer[i]}`).then((data) =>
          console.log(data)
        );
      }

      await Axios.post(`${Pro}/edit/${id}`, form);
      nav("/dashboard/products");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  // HandleChange
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Handle Image Chnages

  const j = useRef(-1);

  async function HandleImagesChnage(e) {
    setImages((prev) => [...prev, ...e.target.files]);
    const ImagesAsFiles = e.target.files;

    const data = new FormData();
    for (let i = 0; i < ImagesAsFiles.length; i++) {
      j.current++;
      data.append("image", ImagesAsFiles[i]);
      data.append("product_id", id);
      try {
        const res = await Axios.post("/product-img/add", data, {
          onUploadProgress: (ProgressEvent) => {
            const { loaded, total } = ProgressEvent;
            const percent = Math.floor((loaded * 100) / total);
            if (percent % 10 === 0) {
              progress.current[j.current].style.width = `${percent}%`;
              progress.current[j.current].setAttribute(
                "percent",
                `${percent}%`
              );
            }
          },
        });
        ids.current[j.current] = res.data.id;
      } catch (err) {
        console.log(err);
      }
    }
  }

  // Handle Image Delete
  async function HandleImagesDelete(id, file) {
    const findId = ids.current[id];
    try {
      await Axios.delete(`/product-img/${findId}`).then((data) =>
        console.log(data)
      );
      setImages((prev) => prev.filter((img) => img !== file));
      ids.current = ids.current.filter((i) => i !== findId);
      j.current--;
    } catch (err) {
      console.log(err);
    }
  }
  async function HandleDeleteImageFromServer(id) {
    setImagesFromServer((prev) => prev.filter((img) => img.id !== id));
    setIdFromServer((prev) => {
      return [...prev, id];
    });
  }

  // Mapping
  const categoriesShow = categories.map((item, key) => (
    <option key={key} value={item.id}>
      {item.title}
    </option>
  ));

  const imagesShow = images.map((img, key) => (
    <div key={key} className="border p-2 w-100">
      <div className="d-flex align-items-center justify-content-start gap-2 ">
        <img alt="" src={URL.createObjectURL(img)} width="80px"></img>
        <div>
          <p className="mb-1">{img.name}</p>
          <p>
            {img.size / 1024 < 900
              ? (img.size / 1024).toFixed(2) + "KB"
              : (img.size / (1024 * 1024)).toFixed(2) + "MB"}
          </p>
        </div>
      </div>
      <div className="custom-progress mt-3">
        <span
          ref={(e) => (progress.current[key] = e)}
          className="inner-progress"
        ></span>
      </div>
      <Button onClick={() => HandleImagesDelete(key, img)} variant="danger">
        Delete
      </Button>
    </div>
  ));
  const imagesFromServerShow = imagesFromServer.map((img, key) => (
    <div key={key} className="border p-2 col-2 position-relative">
      <div className="d-flex align-items-center justify-content-start gap-2 ">
        <img alt="" src={img.image} width="80px"></img>
      </div>
      <div
        style={{ cursor: "pointer" }}
        className="position-absolute top-0 end-0 bg-danger rounded text-white"
      >
        <p
          className="py-1 px-2 m-0"
          onClick={() => HandleDeleteImageFromServer(img.id)}
        >
          X
        </p>
      </div>
    </div>
  ));

  return (
    <>
      {Loading && <LoadingSubmit />}
      <Form className="white w-100 px-4 py-3 rounded shadow-sm" onSubmit={HandleEdit}>
        <Form.Group className="mb-3" controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Select
            ref={focus}
            value={form.category}
            onChange={handleChange}
            name="category"
            placeholder="Title..."
          >
            <option disabled>Select Category</option>
            {categoriesShow}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={form.title}
            required
            onChange={handleChange}
            name="title"
            type="text"
            placeholder="Title..."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            value={form.description}
            required
            onChange={handleChange}
            name="description"
            type="text"
            placeholder="Description..."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            value={form.price}
            required
            onChange={handleChange}
            name="price"
            type="text"
            placeholder="Price..."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="discount">
          <Form.Label>Discount</Form.Label>
          <Form.Control
            value={form.discount}
            required
            onChange={handleChange}
            name="discount"
            type="text"
            placeholder="Discount..."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="images">
          <Form.Label>About</Form.Label>
          <Form.Control
            value={form.About}
            required
            onChange={handleChange}
            name="About"
            type="text"
            placeholder="About..."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="stock">
          <Form.Label>Stock</Form.Label>
          <Form.Control
            value={form.stock}
            required
            onChange={handleChange}
            name="stock"
            type="number"
            placeholder="stock..."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="About">
          <Form.Label>Images</Form.Label>
          <Form.Control
            ref={openImage}
            hidden
            multiple
            onChange={HandleImagesChnage}
            type="file"
          />
        </Form.Group>
        <div
          onClick={handleOpenImage}
          className="d-flex align-items-center justify-content-center gap-2 py-3 rounded mb-2 w-100 flex-column"
          style={{
            border: "2px dashed #0086fe",
            cursor: "pointer",
          }}
        >
          <img
            src={require("../../../Assets/Upload-PNG-HD-Image.png")}
            alt="Upload Here"
            width="100px"
          />
          <p className="fw-bold mb-0" style={{ color: "#0086fe" }}>
            Upload Images
          </p>
        </div>
        <div className="d-flex align-item-start flex-wrap gap-2 ">
          {imagesFromServerShow}
        </div>
        <div className="d-flex align-item-start flex-column gap-2 ">
          {imagesShow}
        </div>
        <button className="btn btn-primary">Save</button>
      </Form>
    </>
  );
}
