import { connect } from "react-redux";
import Layout from "../../hocs/layout";
import ResetPasswordConfirm from "../../components/auth/PasswordConfirm"



function PassConfirm({}) {
  return (
    <Layout>
      <ResetPasswordConfirm />
    </Layout>
  );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(PassConfirm);
