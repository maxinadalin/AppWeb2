import { connect } from "react-redux";
import Layout from "../../hocs/layout";
import Products from "../../components/products/products";



function Article({

}) {
    


  return (
    <Layout>
        <Products/>
    </Layout>
  );
}

const mapStateToProps = (state) => ({


});

export default connect(mapStateToProps, {

})(Article);
