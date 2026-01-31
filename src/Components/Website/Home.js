import Landing from "./Landing/Landing";
import Navbar from "./NavBar/NavBar";
import ShowLatestSaleProducts from "./Product/SaleProducts/ShowLatestSaleProducts";

export default function Home() {
  return (
    <div>
      <Navbar />
      {/* هنا بنضيف مسافة تحت النافبار */}
      <div style={{ marginTop: "50px" }}>
        <Landing />
        <ShowLatestSaleProducts />
      </div>
    </div>
  );
}
