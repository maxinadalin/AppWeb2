import { connect } from "react-redux";
import Layout from "../../hocs/layout";
import Pay from "../../components/Payment/pagar"


function Payment({

}) {
    


  return (
    <Layout>
        <Pay/>
    </Layout>
  );
}

const mapStateToProps = (state) => ({


});

export default connect(mapStateToProps, {

})(Payment);
