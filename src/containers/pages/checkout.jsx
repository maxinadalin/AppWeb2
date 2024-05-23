import { connect } from "react-redux";
import Layout from "../../hocs/layout";
import FinalyCart from "../../components/cart/carritoFinal";

function Checkout({ items }) {
  return (
    <Layout>
      <FinalyCart />
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  items: state.Cart.items,
});

export default connect(mapStateToProps, {})(Checkout);
