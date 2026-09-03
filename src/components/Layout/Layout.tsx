import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import WrapperA from "../WrapperA/WrapperA";


export default function Layout() {
  return (
    <div className="">
        <WrapperA>
      <Header />
      </WrapperA>
      <Navbar />

      <div className="flex-grow">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}