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
import ProCards from "./containers/pages/productCards";



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
      <Route path="/Productos/:subcategoryid" element={<ProCards/>}></Route>

        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
