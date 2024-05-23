import { connect } from "react-redux";
import Layout from "../../hocs/layout";
import ProductsComplete from "../../components/products/productsComplete";

function ProdComplete({ }) {
  return (
    <Layout>
      <ProductsComplete />
    </Layout>
  );
}

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, {})(ProdComplete);
