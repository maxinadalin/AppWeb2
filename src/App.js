import { Provider } from "react-redux";
import store from "./store";
import "./style/index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./containers/pages/home"
import Error404 from "./containers/pages/error404";
import SingUps from "./containers/auth/register"
import SignIns from "./containers/auth/login"
import RecuperarPassword from "./containers/auth/recuperarContraseña";
import PassConfirm from "./containers/auth/passwordConfirm";
import Categories from "./containers/pages/categorias";
import Alert from "../src/components/alert/alert";
import Article from "../src/containers/pages/productos";
import PagesDetails from "../src/containers/pages/pageDetails"
import Checkout from "../src/containers/pages/checkout"
import Payment from "./containers/pages/payment";
import Searching from "./containers/pages/search"
import ProdComplete from "./containers/pages/productsComplet"
import Dashboards from "./containers/pages/dashboard/dashboard";
import Ordenes from "./containers/pages/dashboard/OrdersDetails/ordersDetails";
import Profile from "./containers/pages/dashboard/profile/profile";
import About from "./containers/pages/aboutUs"
import Contact from "./containers/pages/contacto";



function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
        <Route path="*" element={<Error404 />}></Route>
        <Route path="/" element={<Home/>}></Route>

      
      {/* Authentication */}
      <Route path="/Register" element={<SingUps/>}></Route>
      <Route path="/Login" element={<SignIns/>}></Route>
      <Route path="/RecuperarContraseña" element={<RecuperarPassword/>}></Route>
      <Route path="/password/reset/confirm/:uid/:token" element={<PassConfirm/>}></Route>

      {/* Categorias */}
      <Route path="/Categorias" element={<Categories/>}></Route>

      {/* Productos */}
      <Route path="/Productos/:subcategoryid" element={<Article/>}></Route>
      <Route path="/ProductosDetails/:productId" element={<PagesDetails/>}></Route>
      <Route path="/Productos/" element={<ProdComplete/>}></Route>

      {/* Sobre Nosotros */}
      <Route path="/AboutUs/" element={<About/>}></Route>

        {/* Contacto */}
        <Route path="/Contacto/" element={<Contact/>}></Route>


      {/* cart */}
      <Route path="/FinalyCart/" element={<Checkout/>}></Route>

      {/* Pago */}
      <Route path="/Pagar/" element={<Payment/>}></Route>

       {/* Search */}
       <Route path="/search/" element={<Searching/>}></Route>

        {/* Dashboard */}
        <Route path="/Dashboard/" element={<Dashboards/>}></Route>

        {/* Ordenes */}
        <Route path="/DetallesOrden/" element={<Ordenes/>}></Route>

        {/* Perfil */}
        {/* <Route path="/Perfil/" element={<Profile/>}></Route> */}


         

      
      

       


        </Routes>
      </Router>
      <Alert/>
    </Provider>
  );
}

export default App;
