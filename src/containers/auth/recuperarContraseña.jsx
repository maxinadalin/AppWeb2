import { connect } from "react-redux";
import Layout from "../../hocs/layout";
import Recoverpass from "../../components/auth/recuperarContraseña";


function RecuperarPassword({}) {
  return (
    <Layout>
      <Recoverpass />
    </Layout>
  );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(RecuperarPassword);
