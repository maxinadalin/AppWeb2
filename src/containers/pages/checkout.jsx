import { connect } from "react-redux";
import Layout from "../../hocs/layout";
import FinalyCart from "../../components/cart/carritoFinal";


function Checkout({

}) {
    


  return (
    <Layout>
        <FinalyCart/>
    </Layout>
  );
}

const mapStateToProps = (state) => ({


});

export default connect(mapStateToProps, {

})(Checkout  );
