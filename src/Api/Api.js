export const baseURL = "http://localhost:3025";

export const LOGIN = "student/login";

export const ALLSTD = "admin/all_students";
export const STD = "admin/add_student";
// export const DelSTD = "admin/delete_student";
// export const UpdSTD = "admin/update_student";
export const Class = "/admin/get_all_classes";
export const SubClas = "/admin/subjects";
export const MAT = (class_id) => `/admin/subjects/${class_id}`;
export const Mat = "/admin/add_new_subject";

export const PRO = "products";
export const Pro = "product";
export const LatestSale = "latest-sale";
export const Latest = "latest";
export const TopRatedApi = "top-rated";
export const CART = "cart";
