import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/Website/Home";
import Login from "./Pages/Auth/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";
import WindowContext from "./context/WindowContext";
import Users from "./Pages/Dashboard/Users/Users";
import MaterialsPage from "./Components/Website/Product/Materials/MaterialsPage";
import ProfilePage from "./Components/Website/Product/Profile/ProfilePage";
import AddStudent from "./Pages/Dashboard/Users/AddStudent";
import Err403 from "./Pages/Errors/403";
import Err404 from "./Pages/Errors/404";
import Student from "./Pages/Dashboard/Users/Student";
import Material from "./Pages/Dashboard/Materials/Material";
import AddMaterial from "./Pages/Dashboard/Materials/AddMaterial";
import Categories from "./Pages/Dashboard/Materials/Categories";
import Products from "./Pages/Dashboard/Lesson/Products";
import UpdateLesson from "./Pages/Dashboard/Lesson/Lesson";
import AddLesson from "./Pages/Dashboard/Lesson/AddLesson";

function App() {
  return (
    <div className="App">
      <WindowContext>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/materials" element={<MaterialsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/Err403" element={<Err403 />} />
          <Route path="/*" element={<Err404 />} />
          {/* Protected Routes */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="users" element={<Users />} />
            <Route path="users/:id" element={<Student />} />
            <Route path="user/add" element={<AddStudent />} />
            {/* Categories */}
            <Route path="categories" element={<Categories />} />
            <Route path="categories/:id" element={<Material />} />
            <Route path="category/add" element={<AddMaterial />} />
            {/* Products */}
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<UpdateLesson />} />
            <Route path="product/add" element={<AddLesson />} />
          </Route>
        </Routes>
      </WindowContext>
    </div>
  );
}

export default App;
