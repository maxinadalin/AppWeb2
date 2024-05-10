import { Provider } from "react-redux";
import store from "./store";
import "./style/index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./containers/pages/home"
import Error404 from "./containers/pages/error404";
import SingUps from "./containers/auth/register"
import SignIns from "./containers/auth/login"

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
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
