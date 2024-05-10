import { connect } from "react-redux";
import Layout from "../../hocs/layout";
import Login from "../../components/auth/login";


function SignIns({}) {
  return (
    <Layout>
      <Login />
    </Layout>
  );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(SignIns);
