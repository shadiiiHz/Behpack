import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Products from "./pages/products/Products";
import Newspage from "./pages/news/Newspage";
import SingleProduct from "./pages/product/SingleProduct";
import SingleAnnouncement from "./pages/announcement/SingleAnnouncement";
import ProductVideos from "./pages/product/productVideos/ProductVideos";
import HomePage from "./pages/dashboard/adminHomePage/HomePage";
import ProductsTable from "./pages/dashboard/productsDashboard/productTable/ProductsTable";
import NewsTable from "./pages/dashboard/newsDashboard/newsTable/NewsTable";
import AboutEdit from "./pages/dashboard/aboutUsDashboard/AboutEdit";
import NewProduct from "./pages/dashboard/productsDashboard/create/NewProduct";
import { useSelector } from "react-redux";
import UpdateProduct from "./pages/dashboard/productsDashboard/update/UpdateProduct";
import UpdateNews from "./pages/dashboard/newsDashboard/update/UpdateNews";
import NewNews from "./pages/dashboard/newsDashboard/create/NewNews";
import Search from "./pages/dashboard/slider/search/SliderShow";
import CreateSlider from "./pages/dashboard/slider/create/CreateSlider";
import Messages from "./pages/dashboard/contactDashboard/Messages";

function App() {
  const admin = useSelector((state) => state.admin.isAdmin);
  let isAdmin = admin;
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="/products/:id/videos" element={<ProductVideos />} />
        <Route path="/news" element={<Newspage />} />
        <Route path="/news/:id" element={<SingleAnnouncement />} />

        {/*                          admin routs                             */}
        <Route path="/dashboard" element={isAdmin ? <HomePage /> : <Login />} />

        {/* product routs */}
        <Route
          path="/productsTable"
          element={isAdmin ? <ProductsTable /> : <Login />}
        />
        <Route
          path="/newProduct"
          element={isAdmin ? <NewProduct /> : <Login />}
        />
        <Route
          path="/product/:id"
          element={isAdmin ? <UpdateProduct /> : <Login />}
        />

        {/* news routs */}
        <Route
          path="/newsTable"
          element={isAdmin ? <NewsTable /> : <Login />}
        />
        <Route
          path="/update-news/:id"
          element={isAdmin ? <UpdateNews /> : <Login />}
        />
        <Route path="/newNews" element={isAdmin ? <NewNews /> : <Login />} />

        <Route
          path="/aboutEdit"
          element={isAdmin ? <AboutEdit /> : <Login />}
        />
        {/* slider routs */}
        <Route path="/slider" element={isAdmin ? <Search /> : <Login />} />
        <Route
          path="/newSlider"
          element={isAdmin ? <CreateSlider /> : <Login />}
        />

        <Route path="/messages" element={isAdmin ? <Messages /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
