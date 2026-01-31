import {
  faPlus,
  faUsers,
  faPersonChalkboard,
  faFilePowerpoint,
} from "@fortawesome/free-solid-svg-icons";

export const links = [
  {
    name: "الطلاب",
    path: "users",
    icon: faUsers,
   // role: "1995",
  },
  {
    name: "إضافة طالب",
    path: "/dashboard/user/add",
    icon: faPlus,
   // role: "1995",
  },
  {
    name: "المواد",
    path: "/dashboard/categories",
    icon: faPersonChalkboard ,
 //   role: ["1995", "1999"],
  },
  {
    name: "إضافة مادة",
    path: "/dashboard/category/add",
    icon: faPlus,
  //  role: ["1995", "1999"],
  },
  {
    name: "الدروس",
    path: "/dashboard/products",
    icon: faFilePowerpoint,
  //  role: ["1995", "1999"],
  },
  {
    name: "إضافة درس",
    path: "/dashboard/product/add",
    icon: faPlus,
  //  role: ["1995", "1999"],
  },
  {
    name: "إضافة إعلان",
    path: "/dashboard/writer",
    icon: faPlus,
  //  role: ["1995", "1996"],
  },
];
