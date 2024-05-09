import { connect } from "react-redux";
import Layout from "../../hocs/layout";
import SingUp from "../../components/auth/register";



function SingUps({

}) {
    


  return (
    <Layout>
    <SingUp/>  
    </Layout>
  );
}

const mapStateToProps = (state) => ({


});

export default connect(mapStateToProps, {

})(SingUps);
