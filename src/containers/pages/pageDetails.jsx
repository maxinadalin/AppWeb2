import { connect } from "react-redux";
import Layout from "../../hocs/layout";
import Product_Detail from "../../components/products/pagesDetail"


function PagesDetails({

}) {
    


  return (
    <Layout>
        <Product_Detail/>
    </Layout>
  );
}

const mapStateToProps = (state) => ({


});

export default connect(mapStateToProps, {

})(PagesDetails);
