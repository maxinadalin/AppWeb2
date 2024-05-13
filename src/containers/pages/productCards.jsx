import { connect } from "react-redux";
import Layout from "../../hocs/layout";
import ProCard from "../../components/products/ProductCard";


function ProCards({

}) {
    


  return (
    <Layout>
        <ProCard/>
    </Layout>
  );
}

const mapStateToProps = (state) => ({


});

export default connect(mapStateToProps, {

})(ProCards);
